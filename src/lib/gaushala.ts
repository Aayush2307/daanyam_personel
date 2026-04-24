import { Cow } from "@prisma/client";

export type CowMood = "happy" | "low-energy" | "hungry";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Ritual state logic for the virtual cow.
 * - fed today => happy
 * - fed within last 24-48h => low-energy
 * - not fed for 48h+ or never => hungry
 */
export function getCowMood(lastFedAt: Date | null): CowMood {
  if (!lastFedAt) return "hungry";

  const age = Date.now() - new Date(lastFedAt).getTime();
  if (age < ONE_DAY_MS) return "happy";
  if (age < ONE_DAY_MS * 2) return "low-energy";
  return "hungry";
}

export function canFeedToday(cow: Cow): boolean {
  if (!cow.lastFedAt) return true;

  const now = new Date();
  const fed = new Date(cow.lastFedAt);
  return !(fed.getUTCFullYear() === now.getUTCFullYear() && fed.getUTCMonth() === now.getUTCMonth() && fed.getUTCDate() === now.getUTCDate());
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}
