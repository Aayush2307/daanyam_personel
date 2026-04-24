import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Daanyam Planner</p>
      <h1 className="mb-4 text-5xl text-[var(--primary)]">Sankalp before schedule.</h1>
      <p className="mb-10 max-w-xl text-lg text-black/70 dark:text-white/70">
        A calm daily ritual to set intention, define outcomes, act with awareness, and reflect each evening.
      </p>
      <div className="flex gap-4">
        <Link className="rounded-xl bg-[var(--primary)] px-6 py-3 text-white" href="/register">
          Begin your practice
        </Link>
        <Link className="rounded-xl border border-[var(--primary)] px-6 py-3 text-[var(--primary)]" href="/login">
          Continue
        </Link>
      </div>
    </main>
  );
}
