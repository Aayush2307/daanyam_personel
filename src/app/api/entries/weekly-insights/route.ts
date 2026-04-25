import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

function streakCount(dates: string[]) {
  const sorted = dates.sort((a, b) => (a < b ? 1 : -1));
  let streak = 0;
  const cursor = new Date();

  for (const dateString of sorted) {
    const d = new Date(`${dateString}T00:00:00.000Z`);
    if (d.toISOString().split("T")[0] === cursor.toISOString().split("T")[0]) {
      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else if (d < cursor) {
      break;
    }
  }
  return streak;
}

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const from = new Date();
  from.setUTCDate(from.getUTCDate() - 7);

  const entries = await prisma.dayEntry.findMany({
    where: { userId: auth.userId, date: { gte: from } },
    include: { tasks: true },
    orderBy: { date: "desc" }
  });

  const ideaCounts = new Map<string, number>();
  entries
    .flatMap((e) => e.ideas.split(/[\n,]/).map((part) => part.trim()).filter(Boolean))
    .forEach((idea) => ideaCounts.set(idea, (ideaCounts.get(idea) ?? 0) + 1));

  const repeatedIdeas = [...ideaCounts.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([idea]) => idea);

  const incompleteTasks = entries.flatMap((e) => e.tasks.filter((t) => !t.completed).map((t) => t.text));

  return NextResponse.json({
    repeatedIdeas,
    incompleteTasks: [...new Set(incompleteTasks)].slice(0, 8),
    streakCount: streakCount(entries.map((e) => e.date.toISOString().split("T")[0]))
  });
}
