import { AppScaffold } from "@/components/yaatri/AppScaffold";

export default function SeniorModePage() {
  return (
    <AppScaffold tab="wallet">
      <section className="card p-[14px]">
        <h2 className="text-[22px] font-medium">Senior mode</h2>
        <p className="mt-2 text-base text-[var(--color-text-mid)]">Larger text, simple layout, calm actions.</p>

        <div className="mt-3 space-y-2">
          <button className="tap-transition min-h-[60px] w-full rounded-[10px] bg-[#25D366] text-base text-white">Call Meera (concierge)</button>
          <button className="tap-transition min-h-[60px] w-full rounded-[10px] bg-[var(--color-bg-surface)] text-base text-[var(--color-text-dark)]">View full plan</button>
          <button className="tap-transition min-h-[60px] w-full rounded-[10px] bg-[rgba(220,38,38,0.08)] text-base text-[#B91C1C]">Emergency help</button>
        </div>

        <div className="mt-3 rounded-[10px] border border-[0.5px] border-[var(--color-divider)] p-3">
          <p className="text-base">Today&apos;s schedule</p>
          <p className="mt-1 text-base text-[var(--color-text-muted)]">7:00 AM · Temple darshan</p>
          <p className="text-base text-[var(--color-text-muted)]">10:30 AM · Rest and breakfast</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-base">
          {[
            "Wheelchair",
            "Ground floor",
            "Satvik meals"
          ].map((badge) => (
            <span key={badge} className="min-h-12 rounded-full border border-[0.5px] border-[var(--color-divider)] px-3 py-3">{badge}</span>
          ))}
        </div>
      </section>
    </AppScaffold>
  );
}
