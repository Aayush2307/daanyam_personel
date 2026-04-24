import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validators";
import { signToken, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const data = authSchema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });

    if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ token: signToken({ userId: user.id, email: user.email }) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
