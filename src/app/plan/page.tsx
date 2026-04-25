"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppScaffold } from "@/components/yaatri/AppScaffold";
import { circuits } from "@/data/yaatri";

type FormState = {
  destination: string;
  dates: string;
  people: string;
  phone: string;
  intention: string;
};

const initialState: FormState = {
  destination: "",
  dates: "",
  people: "",
  phone: "",
  intention: ""
};

export default function PlanPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const whatsappLink = useMemo(() => {
    const message = `Namaste YAATRI, please help plan my yatra. Destination: ${form.destination || "Not set"}, Dates: ${form.dates || "Not set"}, People: ${form.people || "Not set"}, Phone: ${form.phone || "Not set"}, Intention: ${form.intention || "Not set"}`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  }, [form]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <AppScaffold tab="plan">
      <section className="card p-[14px]">
        <h2 className="text-base font-medium text-[var(--color-text-dark)]">Guided planner</h2>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">What draws you to this yatra? Tell us your intention — we&apos;ll build the rest.</p>

        {/* Update planner form fields/content here for production API wiring later. */}
        <form onSubmit={onSubmit} className="mt-3 space-y-2">
          {[
            { key: "destination", label: "Destination", type: "text" },
            { key: "dates", label: "Travel dates", type: "text" },
            { key: "people", label: "Number of people", type: "number" },
            { key: "phone", label: "Phone number", type: "tel" }
          ].map((field) => (
            <label key={field.key} className="block text-[10px] text-[var(--color-text-muted)]">
              {field.label}
              <input
                required
                min={field.key === "people" ? 1 : undefined}
                inputMode={field.key === "phone" ? "tel" : undefined}
                type={field.type}
                value={form[field.key as keyof FormState]}
                onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))}
                className="mt-1 min-h-12 w-full rounded-[10px] border border-[0.5px] border-[var(--color-divider-strong)] bg-white px-3 text-sm text-[var(--color-text-dark)] outline-none dark:bg-[var(--color-bg-surface)]"
              />
            </label>
          ))}

          <label className="block text-[10px] text-[var(--color-text-muted)]">
            Special needs or spiritual intention
            <textarea
              value={form.intention}
              onChange={(event) => setForm((prev) => ({ ...prev, intention: event.target.value }))}
              rows={3}
              className="mt-1 w-full rounded-[10px] border border-[0.5px] border-[var(--color-divider-strong)] bg-white px-3 py-2 text-sm text-[var(--color-text-dark)] outline-none dark:bg-[var(--color-bg-surface)]"
            />
          </label>

          <button type="submit" className="tap-transition min-h-12 w-full rounded-[10px] bg-[var(--color-indigo-mid)] text-sm font-medium text-[var(--color-star-white)]">
            Continue →
          </button>
        </form>

        {submitted ? <p className="mt-2 text-xs text-[var(--color-text-mid)]">Your yatra is held. Meera will reach you 48 hours before departure.</p> : null}

        <a href={whatsappLink} target="_blank" className="tap-transition mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-[10px] border border-[0.5px] border-[var(--color-divider-strong)] text-xs text-[var(--color-text-mid)]" rel="noreferrer">
          Continue on WhatsApp
        </a>
      </section>

      <section className="card p-[14px]">
        <p className="text-[10px] text-[var(--color-text-muted)]">5-step wizard preview</p>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((dot, index) => <span key={dot} className={`h-2 flex-1 rounded-full ${index < 2 ? "bg-[var(--color-indigo-mid)]" : "bg-[var(--color-divider)]"}`} />)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {circuits.map((c) => (
            <span key={c.id} className="min-h-12 rounded-full border border-[0.5px] border-[var(--color-divider)] px-3 py-3 text-[11px] text-[var(--color-text-mid)]">
              {c.name}
            </span>
          ))}
        </div>
      </section>
    </AppScaffold>
  );
}
