"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YaatriLogo } from "@/components/yaatri/icons";

type Step = 1 | 2 | 3 | 4;

const intentions = [
  { title: "Ancestral rites", subtitle: "Pitru tarpan, shraddha" },
  { title: "Darshan & devotion", subtitle: "Temple visits, puja" },
  { title: "Mannat & gratitude", subtitle: "Fulfillment of vow" },
  { title: "Spiritual seeking", subtitle: "Meditation, satsang" }
] as const;

const languages = [
  { key: "en", label: "English", subtitle: "Primary language" },
  { key: "hi", label: "हिंदी", subtitle: "Hindi" },
  { key: "bi", label: "EN + हिं", subtitle: "Bilingual" }
] as const;

export function OnboardingExperience() {
  const [step, setStep] = useState<Step>(1);
  const [selectedIntent, setSelectedIntent] = useState(0);
  const [groupSize, setGroupSize] = useState("3");
  const [senior, setSenior] = useState("yes");
  const [mobility, setMobility] = useState("wheelchair");
  const [language, setLanguage] = useState("en");

  const title = useMemo(() => {
    if (step === 1) return "01 — Splash";
    if (step === 2) return "02 — Welcome / Intent";
    if (step === 3) return "03 — Profile setup";
    return "04 — Language select";
  }, [step]);

  return (
    <main className="mx-auto min-h-screen max-w-sm bg-black px-5 py-6 text-[var(--color-star-white)]">
      <p className="mb-3 text-center text-[11px] tracking-[0.12em] text-[var(--color-text-muted)]">{title}</p>

      <div className="overflow-hidden rounded-[28px] border border-[0.5px] border-[rgba(200,184,255,0.7)] bg-[var(--color-indigo-deepest)]">
        {step === 1 ? <SplashStep onContinue={() => setStep(2)} /> : null}
        {step === 2 ? (
          <IntentStep
            selectedIntent={selectedIntent}
            onSelect={setSelectedIntent}
            onContinue={() => setStep(3)}
          />
        ) : null}
        {step === 3 ? (
          <ProfileStep
            groupSize={groupSize}
            onGroupSize={setGroupSize}
            senior={senior}
            onSenior={setSenior}
            mobility={mobility}
            onMobility={setMobility}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
          />
        ) : null}
        {step === 4 ? (
          <LanguageStep
            language={language}
            onLanguage={setLanguage}
            onBack={() => setStep(3)}
          />
        ) : null}
      </div>
    </main>
  );
}

function SplashStep({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="relative flex min-h-[620px] flex-col items-center justify-center px-6 pb-10 pt-14 text-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[0.5px] border-[var(--color-indigo-light)]/30" />
        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[0.5px] border-[var(--color-indigo-light)]/30" />
        <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[0.5px] border-[var(--color-indigo-light)]/30" />
      </div>
      <YaatriLogo className="relative z-10 h-14 w-14" />
      <h1 className="mt-6 text-[48px] font-light tracking-[0.18em]">YAATRI</h1>
      <p className="mt-2 text-[16px] tracking-[0.14em] text-[var(--color-text-muted)]">Spiritual concierge</p>
      <button onClick={onContinue} className="tap-transition mt-16 h-2 w-[74px] rounded-full bg-[var(--color-indigo-mid)]" aria-label="Continue" />
    </section>
  );
}

function IntentStep({
  selectedIntent,
  onSelect,
  onContinue
}: {
  selectedIntent: number;
  onSelect: (index: number) => void;
  onContinue: () => void;
}) {
  return (
    <section className="min-h-[620px] px-7 pb-6 pt-9">
      <div className="mb-5 flex items-center gap-3 text-xl tracking-[0.12em]"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-[0.5px] border-[var(--color-indigo-light)]">▶</span>YAATRI</div>
      <p className="mb-3 flex items-center gap-2 text-[13px] tracking-[0.12em] text-[var(--color-gold-warm)]"><span className="h-[0.5px] w-6 bg-[var(--color-gold-warm)]" />WELCOME</p>
      <h2 className="font-display text-[58px] font-light italic leading-[1.05]">What calls you to this yatra?</h2>
      <p className="mt-3 text-[18px] leading-[1.4] text-[var(--color-text-muted)]">Your journey begins with intention. Tell us what moves you.</p>

      <div className="mt-6 space-y-3">
        {/* Update intent options here for your onboarding copy */}
        {intentions.map((item, index) => (
          <button
            key={item.title}
            onClick={() => onSelect(index)}
            className={`tap-transition w-full rounded-[14px] border border-[0.5px] px-4 py-3 text-left ${selectedIntent === index ? "border-[var(--color-amethyst)] bg-[rgba(83,74,183,0.3)]" : "border-[var(--color-indigo-light)]/40 bg-[rgba(83,74,183,0.16)]"}`}
          >
            <p className="text-[16px] font-medium">{item.title}</p>
            <p className="text-[14px] text-[var(--color-text-muted)]">{item.subtitle}</p>
          </button>
        ))}
      </div>

      <button onClick={onContinue} className="tap-transition mt-6 min-h-12 w-full rounded-[14px] bg-[var(--color-indigo-mid)] text-[34px] font-medium">Continue</button>
    </section>
  );
}

function ProfileStep({
  groupSize,
  onGroupSize,
  senior,
  onSenior,
  mobility,
  onMobility,
  onBack,
  onContinue
}: {
  groupSize: string;
  onGroupSize: (value: string) => void;
  senior: string;
  onSenior: (value: string) => void;
  mobility: string;
  onMobility: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <section className="min-h-[620px] bg-[#e8e7f0] text-[var(--color-text-dark)]">
      <div className="bg-[var(--color-indigo-deepest)] px-7 pb-6 pt-8 text-[var(--color-star-white)]">
        <div className="mb-4 flex items-center justify-between text-[13px] text-[var(--color-text-muted)]">
          <button onClick={onBack}>←</button>
          <p>Step 1 of 3</p>
          <button className="text-[var(--color-gold-warm)]">Skip</button>
        </div>
        <h2 className="font-display text-[50px] font-light italic leading-[1.06]">Who&apos;s travelling?</h2>
        <p className="mt-1 text-[14px] text-[var(--color-text-muted)]">Help us personalise your experience</p>
      </div>

      <div className="space-y-4 px-7 py-5">
        <Field label="Your name"><input defaultValue="Rajiv Sharma" className="min-h-12 w-full rounded-[12px] border border-[0.5px] border-[var(--color-indigo-light)]/45 bg-transparent px-4 text-[14px] outline-none" /></Field>

        <Field label="Group size">
          <div className="grid grid-cols-5 gap-2">
            {["1", "2", "3", "4", "5+"].map((size) => (
              <button
                key={size}
                onClick={() => onGroupSize(size)}
                className={`tap-transition min-h-12 rounded-[12px] border border-[0.5px] ${groupSize === size ? "border-[var(--color-indigo-mid)] bg-[var(--color-indigo-primary)] text-[var(--color-star-white)]" : "border-[var(--color-indigo-light)]/45"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Senior traveller (60+)?">
          <div className="grid grid-cols-2 gap-2">
            {["yes", "no"].map((value) => (
              <button
                key={value}
                onClick={() => onSenior(value)}
                className={`tap-transition min-h-12 rounded-[12px] border border-[0.5px] ${senior === value ? "border-[var(--color-indigo-mid)] bg-[var(--color-indigo-primary)] text-[var(--color-star-white)]" : "border-[var(--color-indigo-light)]/45"}`}
              >
                {value === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Mobility needs">
          <div className="flex flex-wrap gap-2">
            {["wheelchair", "palki", "none needed"].map((value) => (
              <button
                key={value}
                onClick={() => onMobility(value)}
                className={`tap-transition min-h-12 rounded-full border border-[0.5px] px-4 ${mobility === value ? "border-[var(--color-indigo-mid)] bg-[rgba(83,74,183,0.16)]" : "border-[var(--color-indigo-light)]/45"}`}
              >
                {value === "none needed" ? "None needed" : value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </Field>

        <button onClick={onContinue} className="tap-transition min-h-12 w-full rounded-[14px] bg-[var(--color-indigo-mid)] text-[34px] font-medium text-[var(--color-star-white)]">Continue →</button>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <p className="mb-2 text-[13px] tracking-[0.12em] text-[var(--color-text-mid)]">{label}</p>
      {children}
    </label>
  );
}

function LanguageStep({
  language,
  onLanguage,
  onBack
}: {
  language: string;
  onLanguage: (value: string) => void;
  onBack: () => void;
}) {
  return (
    <section className="min-h-[620px] bg-[#e8e7f0] text-[var(--color-text-dark)]">
      <div className="flex min-h-[220px] flex-col items-center justify-center bg-[var(--color-indigo-deepest)] text-[var(--color-star-white)]">
        <button onClick={onBack} className="absolute left-8 top-8 text-sm text-[var(--color-amethyst)]">Back</button>
        <YaatriLogo className="h-9 w-9" />
        <p className="mt-5 text-[20px] tracking-[0.18em]">YAATRI</p>
      </div>

      <div className="px-7 pb-6 pt-5">
        <h2 className="text-center text-[28px]">Choose your language</h2>
        <p className="mb-4 text-center text-[18px] text-[var(--color-text-muted)] font-devanagari">भाषा चुनें</p>

        <div className="space-y-3">
          {/* Update language labels/options here for product localization strategy */}
          {languages.map((item) => (
            <button
              key={item.key}
              onClick={() => onLanguage(item.key)}
              className={`tap-transition w-full rounded-[14px] border border-[0.5px] px-4 py-3 text-left ${language === item.key ? "border-[var(--color-indigo-mid)] bg-[var(--color-indigo-primary)] text-[var(--color-star-white)]" : "border-[var(--color-indigo-light)]/45 bg-transparent"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[16px] ${item.key === "hi" ? "font-devanagari" : ""}`}>{item.label}</p>
                  <p className={`text-[14px] ${language === item.key ? "text-[var(--color-amethyst)]" : "text-[var(--color-text-muted)]"}`}>{item.subtitle}</p>
                </div>
                <span className={`h-7 w-7 rounded-full border border-[0.5px] ${language === item.key ? "border-[var(--color-amethyst)] bg-[var(--color-amethyst)] text-[var(--color-indigo-primary)]" : "border-[var(--color-indigo-light)]/45"} inline-flex items-center justify-center`}>{language === item.key ? "✓" : ""}</span>
              </div>
            </button>
          ))}
        </div>

        <Link href="/plan" className="tap-transition mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-[var(--color-indigo-mid)] text-[34px] font-medium text-[var(--color-star-white)]">
          Begin my yatra
        </Link>
      </div>
    </section>
  );
}
