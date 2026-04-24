import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";
import { realSevaSchema, sevaPlans } from "@/lib/validators";

async function createRazorpayOrder(amountInPaise: number, planCode: string) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return null;

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: "INR",
      notes: {
        planCode,
        product: "real-cow-seva"
      }
    })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.error?.description ?? "Razorpay order creation failed");
  }

  return response.json() as Promise<{ id: string }>;
}

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { planCode } = realSevaSchema.parse(await req.json());
    const plan = sevaPlans[planCode];

    const rzOrder = await createRazorpayOrder(plan.amountInPaise, planCode);

    if (!rzOrder) {
      const order = await prisma.realSevaOrder.create({
        data: {
          userId: auth.userId,
          planCode,
          amountInPaise: plan.amountInPaise,
          gatewayProvider: "mock",
          status: "created"
        }
      });

      return NextResponse.json({
        mode: "mock",
        message: "Razorpay keys missing. Created mock seva order.",
        orderId: order.id,
        amountInPaise: plan.amountInPaise,
        label: plan.label
      });
    }

    const saved = await prisma.realSevaOrder.create({
      data: {
        userId: auth.userId,
        planCode,
        amountInPaise: plan.amountInPaise,
        currency: "INR",
        gatewayProvider: "razorpay",
        gatewayOrderId: rzOrder.id,
        status: "created"
      }
    });

    return NextResponse.json({
      mode: "razorpay",
      dbOrderId: saved.id,
      razorpayOrderId: rzOrder.id,
      amountInPaise: plan.amountInPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
      label: plan.label
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
