import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const outcomeSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1).max(180),
  order: z.number().int().min(0).max(2)
});

export const taskSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1).max(180),
  completed: z.boolean().default(false)
});

export const dayEntrySchema = z.object({
  date: z.string(),
  sankalp: z.string().max(300).default(""),
  outcomes: z.array(outcomeSchema).length(3),
  tasks: z.array(taskSchema).default([]),
  ideas: z.string().max(5000).default(""),
  observations: z.string().max(5000).default(""),
  reflection: z.string().max(5000).default(""),
  energyRating: z.number().int().min(1).max(10).default(5)
});
