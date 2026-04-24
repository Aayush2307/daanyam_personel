"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { CowStatusResponse } from "@/types/gaushala";

const moodCopy = {
  happy: "Happy and blessed",
  "low-energy": "Needs your attention",
  hungry: "Hungry - seva is due"
};

const sevaPlans = [
  { code: "single", label: "₹20 - Feed once" },
  { code: "weekly", label: "₹99 - 7-day seva" },
  { code: "monthly", label: "₹999 - Monthly sponsorship" }
] as const;

export function GaushalaRitual() {
  const [status, setStatus] = useState<CowStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const loadStatus = useCallback(async () => {
    try {
      const data = await apiFetch<CowStatusResponse>("/api/cow/status");
      setStatus(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.push("/login");
        return;
      }
      setMessage(error instanceof Error ? error.message : "Unable to load your cow right now.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const feedCow = async () => {
    setProcessing(true);
    setMessage("");
    try {
      const data = await apiFetch<{ message: string }>("/api/cow/feed", { method: "POST", body: JSON.stringify({}) });
      setMessage(data.message);
      await loadStatus();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to feed right now.");
    } finally {
      setProcessing(false);
    }
  };

  const startRealSeva = async (planCode: (typeof sevaPlans)[number]["code"]) => {
    setProcessing(true);
    setMessage("");
    try {
      const data = await apiFetch<{ mode: "mock" | "razorpay"; message?: string; razorpayOrderId?: string }>(
        "/api/seva/real-feed",
        {
          method: "POST",
          body: JSON.stringify({ planCode })
        }
      );

      if (data.mode === "mock") {
        setMessage(data.message ?? "Mock seva created.");
      } else {
        setMessage(`Razorpay order created: ${data.razorpayOrderId}. Connect checkout in next step.`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not start real-cow seva.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p className="text-center text-sm">Preparing your gaushala ritual...</p>;
  if (!status) return <p className="text-center text-sm">Could not load ritual data.</p>;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <section className="card p-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Virtual Gaushala</p>
        <div className="my-6 text-8xl">🐄</div>
        <h1 className="text-4xl text-[var(--primary)]">{status.cow.name}</h1>
        <p className="mt-2 text-lg text-[var(--muted)]">{moodCopy[status.cow.mood]}</p>

        <button onClick={feedCow} disabled={processing} className="cta mt-6 w-full sm:w-auto">
          {processing ? "Completing seva..." : "Feed your cow (once daily)"}
        </button>

        <p className="mt-6 text-sm">Prosperity Points: <span className="font-semibold">{status.prosperityPoints}</span></p>
        {status.cow.lastFedAt ? (
          <p className="mt-1 text-xs text-[var(--muted)]">Last fed: {new Date(status.cow.lastFedAt).toLocaleString()}</p>
        ) : (
          <p className="mt-1 text-xs text-[var(--muted)]">Your seva begins today.</p>
        )}
      </section>

      <section className="card p-6">
        <h2 className="text-2xl text-[var(--primary)]">Feed a real cow</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Bridge your digital ritual with verified real-world gaushala seva.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {sevaPlans.map((plan) => (
            <button key={plan.code} onClick={() => startRealSeva(plan.code)} disabled={processing} className="option-btn">
              {plan.label}
            </button>
          ))}
        </div>
      </section>

      {message ? <p className="text-center text-sm text-[var(--primary)]">{message}</p> : null}
    </div>
  );
}
