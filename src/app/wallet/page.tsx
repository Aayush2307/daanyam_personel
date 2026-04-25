import Link from "next/link";
import { AppScaffold } from "@/components/yaatri/AppScaffold";

const itinerary = [
  { label: "Sankalp call with Meera", status: "done" },
  { label: "Depart Delhi to Varanasi", status: "current" },
  { label: "Ganga aarti and darshan", status: "upcoming" }
] as const;

export default function WalletPage() {
  return (
    <AppScaffold tab="wallet">
      <section className="rounded-[14px] bg-[linear-gradient(155deg,#2D2660_0%,#534AB7_100%)] p-[14px] text-[var(--color-star-white)]">
        <p className="font-display text-sm">Kashi spiritual circuit</p>
        <p className="text-[11px] font-light text-[rgba(234,232,255,0.6)]">12 Aug – 20 Aug · 4 pilgrims</p>
        <div className="mt-2 flex items-center gap-2 text-[11px]"><span className="h-1.5 w-1.5 rounded-full bg-[#6AE870]" />Confirmed · Departing in 12 days</div>
        <div className="mt-2 h-[3px] rounded bg-white/20"><div className="h-full w-2/3 rounded bg-[#FFD87A]" /></div>
      </section>

      <section className="card p-[14px]">
        <h2 className="text-sm font-medium">Itinerary</h2>
        <div className="mt-2 space-y-3">
          {itinerary.map((item, index) => (
            <div key={item.label} className="flex gap-3">
              <div className="flex w-4 flex-col items-center">
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.status === "done"
                      ? "bg-[#6AE870]"
                      : item.status === "current"
                        ? "bg-[var(--color-amethyst)]"
                        : "border-[1.5px] border-[var(--color-amethyst)] bg-[var(--color-bg-surface)]"
                  }`}
                />
                {index < itinerary.length - 1 ? <span className="mt-1 h-8 w-[0.5px] bg-[var(--color-divider)]" /> : null}
              </div>
              <p className="text-xs text-[var(--color-text-mid)]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-[14px]">
        <h2 className="text-sm font-medium">Documents</h2>
        <div className="mt-2 space-y-2 text-xs">
          <Row label="Train tickets" status="Confirmed" confirmed />
          <Row label="Temple slots" status="Pending" />
        </div>
      </section>

      <section className="card p-[14px]">
        <h2 className="text-sm font-medium">Emergency contacts</h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Contact role="Concierge" name="Meera" phone="+91 98xxxxxx01" />
          <Contact role="Medical" name="Dr. Iyer" phone="+91 98xxxxxx98" />
        </div>
      </section>

      <Link href="/senior" className="tap-transition flex min-h-12 items-center justify-center rounded-[10px] border border-[0.5px] border-[var(--color-divider-strong)] text-xs text-[var(--color-text-mid)]">
        Open senior mode preview
      </Link>
    </AppScaffold>
  );
}

function Row({ label, status, confirmed = false }: { label: string; status: string; confirmed?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[0.5px] border-[var(--color-divider)] p-2">
      <span>{label}</span>
      <span className={`rounded-full px-2 py-1 text-[10px] ${confirmed ? "bg-[#E8F4E8] text-[#2A7A2A]" : "bg-[#FFF3E0] text-[#C47A20]"}`}>{status}</span>
    </div>
  );
}

function Contact({ role, name, phone }: { role: string; name: string; phone: string }) {
  return (
    <article className="rounded-[10px] border border-[0.5px] border-[rgba(200,184,255,0.2)] bg-[rgba(45,38,96,0.06)] p-2">
      <p className="text-[9px] text-[var(--color-text-muted)]">{role}</p>
      <p className="text-[11px] font-medium text-[var(--color-text-dark)]">{name}</p>
      <p className="text-[11px] text-[var(--color-text-muted)]">{phone}</p>
    </article>
  );
}
