import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

export type Language = "en" | "hi";

type Dictionary = typeof en;

export const dictionaries: Record<Language, Dictionary> = { en, hi };

export function getDictionary(language: Language) {
  return dictionaries[language];
}
