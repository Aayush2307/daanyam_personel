import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";
import { canFeedToday, getCowMood, todayKey } from "@/lib/gaushala";

const POINTS_PER_FEED = 11;

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    include: { cow: true }
  });

  if (!user || !user.cow) {
    return NextResponse.json({ error: "Cow not found for user" }, { status: 404 });
  }

  if (!canFeedToday(user.cow)) {
    return NextResponse.json(
      {
        error: "Your cow has already been fed today. Return tomorrow for the next seva.",
        cow: {
          name: user.cow.name,
          mood: getCowMood(user.cow.lastFedAt),
          lastFedAt: user.cow.lastFedAt
        },
        prosperityPoints: user.prosperity
      },
      { status: 409 }
    );
  }

  const key = todayKey();

  const updated = await prisma.$transaction(async (tx) => {
    await tx.dailyAction.create({
      data: {
        userId: user.id,
        type: "feed-virtual-cow",
        dateKey: key
      }
    });

    await tx.cow.update({
      where: { id: user.cow!.id },
      data: { lastFedAt: new Date() }
    });

    return tx.user.update({
      where: { id: user.id },
      data: { prosperity: { increment: POINTS_PER_FEED } },
      include: { cow: true }
    });
  });

  return NextResponse.json({
    message: `Seva complete. +${POINTS_PER_FEED} prosperity points.`,
    prosperityPoints: updated.prosperity,
    cow: {
      name: updated.cow!.name,
      mood: getCowMood(updated.cow!.lastFedAt),
      lastFedAt: updated.cow!.lastFedAt
    }
  });
}
