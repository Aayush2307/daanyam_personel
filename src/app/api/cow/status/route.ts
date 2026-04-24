import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";
import { getCowMood } from "@/lib/gaushala";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    include: { cow: true }
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const cow =
    user.cow ??
    (await prisma.cow.create({
      data: {
        userId: user.id,
        name: "Gauri"
      }
    }));

  return NextResponse.json({
    cow: {
      id: cow.id,
      name: cow.name,
      mood: getCowMood(cow.lastFedAt),
      lastFedAt: cow.lastFedAt
    },
    prosperityPoints: user.prosperity
  });
}
