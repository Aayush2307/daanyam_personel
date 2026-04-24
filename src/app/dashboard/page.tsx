"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GaushalaRitual } from "@/components/GaushalaRitual";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("daanyam-token")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto mb-6 flex w-full max-w-2xl items-center justify-between">
        <p className="text-lg text-[var(--primary)]">Daanyam · Daily Gau Seva</p>
        <button
          className="rounded-xl border border-[var(--line)] px-3 py-1 text-sm"
          onClick={() => {
            localStorage.removeItem("daanyam-token");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
      <GaushalaRitual />
    </main>
  );
}
