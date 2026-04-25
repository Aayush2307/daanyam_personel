export type Circuit = {
  id: string;
  name: string;
  tag: string;
  details: string;
  price: string;
  nights: string;
  gradient: string;
};

export const circuits: Circuit[] = [
  {
    id: "kashi",
    name: "Kashi–Prayag",
    tag: "VIP darshan",
    details: "3 dhams · Ganga aarti",
    price: "₹32k+",
    nights: "7–9 nights",
    gradient: "var(--gradient-kashi)"
  },
  {
    id: "vaishno",
    name: "Vaishno Devi",
    tag: "Senior-ready",
    details: "Helicopter · palki",
    price: "₹18k+",
    nights: "3–5 nights",
    gradient: "var(--gradient-vaishno)"
  },
  {
    id: "ujjain",
    name: "Ujjain–Omkareshwar",
    tag: "Festival timing",
    details: "2 Jyotirlingas",
    price: "₹14k+",
    nights: "4–6 nights",
    gradient: "var(--gradient-ujjain)"
  },
  {
    id: "shirdi",
    name: "Shirdi–Nashik",
    tag: "NRI-preferred",
    details: "Sai · Trimbakeshwar",
    price: "₹11k+",
    nights: "2–4 nights",
    gradient: "var(--gradient-shirdi)"
  }
];

export const trustStats = [
  { label: "Pilgrims served", value: "2,400+" },
  { label: "Verified guides", value: "180+" },
  { label: "Global NRI families", value: "42 countries" }
];
