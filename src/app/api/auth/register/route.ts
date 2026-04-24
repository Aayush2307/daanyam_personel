import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { authSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const data = authSchema.parse(await req.json());

    const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: await hashPassword(data.password),
        cow: {
          create: {
            name: "Gauri"
          }
        }
      },
      include: { cow: true }
    });

    return NextResponse.json({ token: signToken({ userId: user.id, email: user.email }) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
