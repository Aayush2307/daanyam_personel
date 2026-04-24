export type CowMood = "happy" | "low-energy" | "hungry";

export type CowStatusResponse = {
  cow: {
    id: string;
    name: string;
    mood: CowMood;
    lastFedAt: string | null;
  };
  prosperityPoints: number;
};
