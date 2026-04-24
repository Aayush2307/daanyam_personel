"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlannerForm } from "@/components/PlannerForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("daanyam-token")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <p className="text-lg text-[var(--primary)]">Daanyam Planner</p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="rounded-lg border border-black/10 px-3 py-1 text-sm"
              onClick={() => {
                localStorage.removeItem("daanyam-token");
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <PlannerForm />
    </div>
  );
}
