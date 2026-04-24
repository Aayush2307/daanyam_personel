import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dayEntrySchema } from "@/lib/validators";
import { getAuthFromRequest } from "@/lib/auth";

function normalizeDate(value: string) {
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
}

function toResponse(entry: Awaited<ReturnType<typeof prisma.dayEntry.findFirst>>) {
  if (!entry) return null;
  return {
    ...entry,
    date: entry.date.toISOString().split("T")[0]
  };
}

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const date = req.nextUrl.searchParams.get("date") ?? new Date().toISOString().split("T")[0];
  const entry = await prisma.dayEntry.findUnique({
    where: { userId_date: { userId: auth.userId, date: normalizeDate(date) } },
    include: { outcomes: { orderBy: { order: "asc" } }, tasks: true }
  });

  return NextResponse.json({ entry: toResponse(entry) });
}

export async function PUT(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = dayEntrySchema.parse(await req.json());
    const dateObj = normalizeDate(data.date);

    const saved = await prisma.$transaction(async (tx) => {
      const base = await tx.dayEntry.upsert({
        where: { userId_date: { userId: auth.userId, date: dateObj } },
        create: {
          date: dateObj,
          sankalp: data.sankalp,
          ideas: data.ideas,
          observations: data.observations,
          reflection: data.reflection,
          energyRating: data.energyRating,
          userId: auth.userId
        },
        update: {
          sankalp: data.sankalp,
          ideas: data.ideas,
          observations: data.observations,
          reflection: data.reflection,
          energyRating: data.energyRating
        }
      });

      await tx.outcome.deleteMany({ where: { dayEntryId: base.id } });
      await tx.task.deleteMany({ where: { dayEntryId: base.id } });

      await tx.outcome.createMany({
        data: data.outcomes.map((o) => ({ dayEntryId: base.id, text: o.text, order: o.order }))
      });

      if (data.tasks.length) {
        await tx.task.createMany({
          data: data.tasks.map((t) => ({ dayEntryId: base.id, text: t.text, completed: t.completed }))
        });
      }

      return tx.dayEntry.findUnique({
        where: { id: base.id },
        include: { outcomes: { orderBy: { order: "asc" } }, tasks: true }
      });
    });

    return NextResponse.json({ entry: toResponse(saved) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
