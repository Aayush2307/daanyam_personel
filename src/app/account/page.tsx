import Link from "next/link";
import { AppScaffold } from "@/components/yaatri/AppScaffold";

export default function AccountPage() {
  return (
    <AppScaffold tab="account">
      <section className="card p-[14px] text-center">
        <h2 className="text-base font-medium text-[var(--color-text-dark)]">Profile and login</h2>
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">Coming soon</p>
        <Link href="/chat" className="mt-3 inline-flex min-h-12 items-center rounded-[10px] border border-[0.5px] border-[var(--color-divider)] px-4 text-xs text-[var(--color-text-mid)]">
          Open concierge chat preview
        </Link>
      </section>
    </AppScaffold>
  );
}
