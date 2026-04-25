"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { circuits, trustStats } from "@/data/yaatri";
import { type Language, getDictionary } from "@/lib/i18n";
import { AccountIcon, ExploreIcon, HomeIcon, PlanIcon, WalletIcon, YaatriLogo } from "./icons";

type Tab = "home" | "plan" | "explore" | "wallet" | "account";

export function AppScaffold({ tab = "home", children }: { tab?: Tab; children?: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const dict = useMemo(() => getDictionary(language), [language]);

  return (
    <main className="mx-auto min-h-screen max-w-md bg-[var(--color-bg-light)] pb-24 fade-rise app-shell md:my-6 md:min-h-[calc(100vh-3rem)] md:border md:border-[0.5px] md:border-[var(--color-divider)]">
      <header className="relative bg-[var(--color-indigo-deepest)] px-5 py-4 text-[var(--color-star-white)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <YaatriLogo className="h-[30px] w-[30px]" />
            <span className="text-xs font-light tracking-[0.18em]">YAATRI</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
              className="tap-transition min-h-12 rounded-full border border-[0.5px] border-white/35 px-3 text-[11px] font-normal"
            >
              EN · <span className="font-devanagari">हिं</span>
            </button>
            <div className="h-7 w-7 rounded-full border border-[0.5px] border-[var(--color-indigo-light)]/60" />
          </div>
        </div>

        <section className="relative overflow-hidden pt-4">
          <Watermark />
          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.18em] text-[var(--color-gold-warm)]">
              <span className="h-[0.5px] w-6 bg-[var(--color-gold-warm)]" />
              {dict.hero.eyebrow}
            </div>
            <h1 className="font-display text-[30px] font-light italic leading-[1.18] text-[var(--color-star-white)]">
              {dict.hero.title1} <span className="text-[var(--color-amethyst)]">{dict.hero.titleAccent}</span>
              {dict.hero.title2}
            </h1>
            <p className={`mt-2 max-w-[280px] text-xs font-light leading-[1.6] text-[rgba(234,232,255,0.5)] ${language === "hi" ? "font-devanagari" : ""}`}>
              {/* Update bilingual hero copy in src/locales/en.json and hi.json */}
              {dict.hero.subtitle}
            </p>
            <PanchangCard />
            <div className="mt-3 flex gap-2">
              <Link href="/plan" className="tap-transition min-h-12 flex-1 rounded-[10px] bg-[var(--color-indigo-mid)] px-4 py-3 text-center text-[13px] font-medium text-[var(--color-star-white)]">
                {dict.cta.plan}
              </Link>
              <Link href="/chat" className="tap-transition min-h-12 flex-1 rounded-[10px] border border-[0.5px] border-[rgba(200,184,255,0.35)] px-4 py-3 text-center text-[13px] font-normal text-[var(--color-amethyst)]">
                <span className="inline-flex items-center gap-1"><span className="h-[14px] w-[14px] rounded-full bg-[#25D366]" />{dict.cta.concierge}</span>
              </Link>
            </div>
          </div>
        </section>
      </header>

      <div className="space-y-4 px-5 py-4">
        <NextMuhurat />
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-medium text-[var(--color-text-dark)]">Sacred circuits</h2>
            <Link href="/explore" className="text-[11px] text-[var(--color-indigo-mid)]">View all →</Link>
          </div>
          <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2">
              {/* Update journey cards in src/data/yaatri.ts */}
              {circuits.map((c) => (
                <article key={c.id} className="w-[148px] shrink-0 overflow-hidden rounded-[14px] border border-[0.5px] border-[var(--color-divider-strong)] bg-[var(--color-bg-light)]">
                  <div className="relative h-[82px] p-2" style={{ background: c.gradient }}>
                    <span className="absolute bottom-2 left-2 rounded-[5px] bg-black/40 px-2 py-0.5 text-[9px] text-white">{c.tag}</span>
                    <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[0.5px] border-white/20">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><path d="M12 4l2.2 4.6 5 .7-3.6 3.6.8 5L12 15.7 7.6 18l.8-5-3.6-3.7 5-.7L12 4Z" stroke="white" strokeWidth="1" opacity="0.7"/></svg>
                    </div>
                  </div>
                  <div className="p-[11px]">
                    <h3 className="text-xs font-medium text-[var(--color-text-dark)]">{c.name}</h3>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{c.details}</p>
                    <div className="mt-[7px] flex items-center justify-between border-t border-[0.5px] border-[var(--color-divider)] pt-[7px]">
                      <span className="text-xs font-medium text-[var(--color-indigo-primary)]">{c.price}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">{c.nights}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ConciergeCard />

        <section className="card p-[14px]">
          <h2 className="text-sm font-medium text-[var(--color-text-dark)]">Trusted by modern pilgrims</h2>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {trustStats.map((item) => (
              <div key={item.label} className="rounded-lg border border-[0.5px] border-[var(--color-divider)] p-2">
                <p className="text-[12px] font-medium text-[var(--color-text-mid)]">{item.value}</p>
                <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {children}
      </div>

      <BottomNav tab={tab} nav={dict.nav} />
    </main>
  );
}

function PanchangCard() {
  return (
    <article className="mt-4 rounded-xl border border-[0.5px] border-[rgba(200,184,255,0.2)] bg-[rgba(127,119,221,0.12)] p-[14px]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-indigo-primary)] text-[var(--color-gold-note)]">ॐ</div>
        <div>
          <p className="text-[10px] text-[var(--color-amethyst)]">Today&apos;s tithi</p>
          <p className="text-xs text-[var(--color-star-white)]">Shukla Dashami</p>
        </div>
        <div className="h-8 w-[0.5px] bg-[rgba(200,184,255,0.3)]" />
        <div>
          <p className="text-[10px] text-[var(--color-amethyst)]">Auspicious for</p>
          <p className="text-xs text-[var(--color-star-white)]">Shiv darshan yatra</p>
        </div>
      </div>
    </article>
  );
}

function NextMuhurat() {
  return (
    <section className="card p-[14px]">
      <p className="text-[10px] tracking-[0.12em] text-[var(--color-text-muted)]">Next muhurat</p>
      <p className="mt-1 text-sm font-medium text-[var(--color-text-dark)]">Sunday, 5:42 AM – 7:10 AM</p>
      <p className="mt-1 text-xs text-[var(--color-text-muted)]">Considered deeply auspicious for ancestral rites and new beginnings.</p>
    </section>
  );
}

function ConciergeCard() {
  return (
    <section className="rounded-2xl bg-[var(--color-indigo-deepest)] p-4 text-[var(--color-star-white)]">
      <div className="flex gap-3">
        <div className="h-11 w-11 rounded-full border border-[0.5px] border-[var(--color-amethyst)] bg-[var(--color-indigo-mid)]" />
        <div className="flex-1">
          <p className="text-xs font-medium">Meera</p>
          <p className="text-[10px] text-[var(--color-amethyst)]">Lead spiritual concierge</p>
          <p className="mt-1 text-[11px] font-light italic leading-[1.55] text-[rgba(234,232,255,0.6)]">Tell me your sankalp. I&apos;ll build the entire yatra around it.</p>
          <div className="mt-2 flex gap-2">
            <button className="tap-transition min-h-12 rounded-[7px] bg-[#25D366] px-3 py-2 text-[11px] text-white">WhatsApp</button>
            <button className="tap-transition min-h-12 rounded-[7px] border border-[0.5px] border-[var(--color-amethyst)] px-3 py-2 text-[11px] text-[var(--color-amethyst)]">Call</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Watermark() {
  return (
    <svg className="pointer-events-none absolute -right-24 -top-20 h-[220px] w-[220px] opacity-[0.06]" viewBox="0 0 220 220" fill="none">
      <circle cx="110" cy="110" r="90" stroke="white" strokeWidth="0.8" /><circle cx="110" cy="110" r="70" stroke="white" strokeWidth="0.6" /><circle cx="110" cy="110" r="50" stroke="white" strokeWidth="0.4" />
      <path d="M20 110h180M110 20v180M46 46l128 128M46 174l128-128" stroke="white" strokeWidth="0.5" />
      <ellipse cx="110" cy="65" rx="7" ry="12" stroke="white" strokeWidth="0.5" transform="rotate(22.5 110 110)" />
      <ellipse cx="110" cy="65" rx="7" ry="12" stroke="white" strokeWidth="0.5" transform="rotate(67.5 110 110)" />
      <ellipse cx="110" cy="65" rx="7" ry="12" stroke="white" strokeWidth="0.5" transform="rotate(112.5 110 110)" />
    </svg>
  );
}

function BottomNav({ tab, nav }: { tab: Tab; nav: Record<string, string> }) {
  const items = [
    { key: "home", label: nav.home, href: "/", icon: HomeIcon },
    { key: "plan", label: nav.plan, href: "/plan", icon: PlanIcon },
    { key: "explore", label: nav.explore, href: "/explore", icon: ExploreIcon },
    { key: "wallet", label: nav.wallet, href: "/wallet", icon: WalletIcon },
    { key: "account", label: nav.account, href: "/account", icon: AccountIcon }
  ] as const;

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-[0.5px] border-[var(--color-divider)] bg-white px-1 pb-4 pt-2 dark:bg-[var(--color-bg-surface)]">
      <ul className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const isActive = tab === item.key;
          const Icon = item.icon;
          return (
            <li key={item.key}>
              <Link href={item.href} className="tap-transition flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg">
                <Icon className={`h-5 w-5 ${isActive ? "text-[var(--color-indigo-mid)]" : "text-[var(--color-text-muted)]"}`} />
                <span className={`text-[10px] ${isActive ? "text-[var(--color-indigo-mid)]" : "text-[var(--color-text-muted)]"}`}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
