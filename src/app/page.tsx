import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Daanyam</p>
      <h1 className="mb-4 text-5xl text-[var(--primary)]">Virtual Gaushala Ritual</h1>
      <p className="mb-10 max-w-xl text-lg text-[var(--muted)]">
        Adopt your virtual cow, offer daily seva, and create a calm giving habit rooted in dharma.
      </p>
      <div className="flex gap-4">
        <Link className="cta" href="/register">
          Begin seva
        </Link>
        <Link className="rounded-xl border border-[var(--line)] px-6 py-3 text-[var(--primary)]" href="/login">
          Continue
        </Link>
      </div>
    </main>
  );
}
