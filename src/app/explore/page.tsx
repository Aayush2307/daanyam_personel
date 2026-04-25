import { AppScaffold } from "@/components/yaatri/AppScaffold";
import { circuits } from "@/data/yaatri";

export default function ExplorePage() {
  return (
    <AppScaffold tab="explore">
      <section className="space-y-2">
        <h2 className="text-base font-medium text-[var(--color-text-dark)]">Explore pilgrimages</h2>
        {circuits.map((c) => (
          <article key={c.id} className="rounded-[14px] border border-[0.5px] border-[var(--color-divider-strong)] bg-[var(--color-bg-surface)] p-[14px]">
            <div className="h-20 rounded-[10px]" style={{ background: c.gradient }} />
            <h3 className="mt-2 text-sm font-medium text-[var(--color-text-dark)]">{c.name}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{c.details}</p>
          </article>
        ))}
      </section>
    </AppScaffold>
  );
}
