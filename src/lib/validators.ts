import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const realSevaSchema = z.object({
  planCode: z.enum(["single", "weekly", "monthly"])
});

export const sevaPlans = {
  single: { amountInPaise: 2000, label: "Feed once" },
  weekly: { amountInPaise: 9900, label: "7-day seva" },
  monthly: { amountInPaise: 99900, label: "Monthly sponsorship" }
} as const;
