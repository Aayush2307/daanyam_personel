import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.dayEntry.findMany({
    where: { userId: auth.userId },
    include: { outcomes: true, tasks: true },
    orderBy: { date: "desc" },
    take: 30
  });

  return NextResponse.json({
    entries: entries.map((e) => ({
      ...e,
      date: e.date.toISOString().split("T")[0]
    }))
  });
}
