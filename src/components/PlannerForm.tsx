"use client";

import { motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { DayEntry, WeeklyInsights } from "@/types/planner";
import { apiFetch } from "@/lib/api";

const defaultEntry = (date: string): DayEntry => ({
  date,
  sankalp: "",
  outcomes: [
    { order: 0, text: "" },
    { order: 1, text: "" },
    { order: 2, text: "" }
  ],
  tasks: [],
  ideas: "",
  observations: "",
  reflection: "",
  energyRating: 5
});

const today = () => new Date().toISOString().split("T")[0];

export function PlannerForm() {
  const [selectedDate, setSelectedDate] = useState(today());
  const [entry, setEntry] = useState<DayEntry>(defaultEntry(today()));
  const [timeline, setTimeline] = useState<DayEntry[]>([]);
  const [insights, setInsights] = useState<WeeklyInsights | null>(null);
  const [status, setStatus] = useState("Idle");

  const outcomesReady = useMemo(() => entry.outcomes.every((o) => o.text.trim().length > 0), [entry.outcomes]);
  const reflectionUnlocked = new Date().getHours() >= 18;

  const loadEntry = async (date: string) => {
    try {
      const res = await apiFetch<{ entry: DayEntry }>(`/api/entries/today?date=${date}`);
      setEntry(
        res.entry ?? {
          ...defaultEntry(date),
          date
        }
      );
    } catch {
      setEntry(defaultEntry(date));
    }
  };

  const refreshSidebar = async () => {
    const [timelineRes, insightRes] = await Promise.all([
      apiFetch<{ entries: DayEntry[] }>("/api/entries/timeline"),
      apiFetch<WeeklyInsights>("/api/entries/weekly-insights")
    ]);
    setTimeline(timelineRes.entries);
    setInsights(insightRes);
  };

  useEffect(() => {
    loadEntry(selectedDate);
    refreshSidebar();
  }, [selectedDate]);

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        await apiFetch("/api/entries/today", {
          method: "PUT",
          body: JSON.stringify(entry)
        });
        setStatus(`Autosaved at ${new Date().toLocaleTimeString()}`);
      } catch {
        setStatus("Autosave failed");
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [entry]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await apiFetch("/api/entries/today", { method: "PUT", body: JSON.stringify(entry) });
    setStatus("Saved");
    refreshSidebar();
  };

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="card space-y-5 p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl text-[var(--primary)]">Daily Sankalp + Karma</h1>
          <input
            type="date"
            className="input w-auto"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <section>
          <label className="mb-1 block font-medium">Sankalp (intention)</label>
          <input
            className="input"
            value={entry.sankalp}
            onChange={(e) => setEntry({ ...entry, sankalp: e.target.value })}
            placeholder="How do I wish to show up today?"
          />
        </section>

        <section>
          <p className="mb-2 font-medium">Top 3 outcomes (required)</p>
          <div className="space-y-2">
            {entry.outcomes.map((outcome, idx) => (
              <input
                key={idx}
                className="input"
                placeholder={`Outcome ${idx + 1}`}
                value={outcome.text}
                onChange={(e) => {
                  const outcomes = [...entry.outcomes];
                  outcomes[idx] = { ...outcome, text: e.target.value, order: idx };
                  setEntry({ ...entry, outcomes });
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-medium">Karma (actions/tasks)</p>
            <button
              type="button"
              disabled={!outcomesReady}
              onClick={() => setEntry({ ...entry, tasks: [...entry.tasks, { text: "", completed: false }] })}
              className="rounded-lg bg-[var(--accent)] px-3 py-1 text-sm text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add task
            </button>
          </div>
          {!outcomesReady ? <p className="text-sm text-amber-700">Fill all outcomes before adding tasks.</p> : null}
          <div className="space-y-2">
            {entry.tasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => {
                    const tasks = [...entry.tasks];
                    tasks[idx] = { ...task, completed: e.target.checked };
                    setEntry({ ...entry, tasks });
                  }}
                />
                <input
                  className="input"
                  value={task.text}
                  placeholder="Action"
                  onChange={(e) => {
                    const tasks = [...entry.tasks];
                    tasks[idx] = { ...task, text: e.target.value };
                    setEntry({ ...entry, tasks });
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <label className="mb-1 block font-medium">Idea capture</label>
          <textarea
            className="input min-h-28"
            value={entry.ideas}
            onChange={(e) => setEntry({ ...entry, ideas: e.target.value })}
            placeholder="Free-flow thoughts"
          />
        </section>

        <section>
          <label className="mb-1 block font-medium">Observations</label>
          <textarea
            className="input min-h-24"
            value={entry.observations}
            onChange={(e) => setEntry({ ...entry, observations: e.target.value })}
            placeholder="What are you noticing?"
          />
        </section>

        <section>
          <label className="mb-1 block font-medium">Evening reflection (unlocks after 6 PM)</label>
          <textarea
            className="input min-h-24"
            value={entry.reflection}
            disabled={!reflectionUnlocked}
            onChange={(e) => setEntry({ ...entry, reflection: e.target.value })}
            placeholder={reflectionUnlocked ? "What did the day teach you?" : "Available after 6 PM"}
          />
        </section>

        <section>
          <label className="mb-1 block font-medium">Energy rating: {entry.energyRating}/10</label>
          <input
            type="range"
            min={1}
            max={10}
            value={entry.energyRating}
            onChange={(e) => setEntry({ ...entry, energyRating: Number(e.target.value) })}
            className="w-full accent-[var(--primary)]"
          />
        </section>

        <div className="flex items-center justify-between">
          <p className="text-sm text-black/60 dark:text-white/60">{status}</p>
          <button className="rounded-xl bg-[var(--primary)] px-5 py-2 text-white">Save now</button>
        </div>
      </motion.form>

      <aside className="space-y-6">
        <div className="card p-5">
          <h2 className="mb-3 text-xl text-[var(--primary)]">Timeline</h2>
          <div className="space-y-2">
            {timeline.map((t) => (
              <button
                key={t.date}
                onClick={() => setSelectedDate(t.date)}
                className="block w-full rounded-lg border border-black/10 px-3 py-2 text-left text-sm hover:bg-black/5"
              >
                <p>{t.date}</p>
                <p className="truncate text-xs text-black/60 dark:text-white/60">{t.sankalp || "No sankalp"}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-3 text-xl text-[var(--primary)]">Weekly insights</h2>
          {insights ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Streak: {insights.streakCount} days</p>
              </div>
              <div>
                <p className="mb-1 font-medium">Repeated ideas</p>
                <ul className="list-disc pl-5">
                  {insights.repeatedIdeas.length ? insights.repeatedIdeas.map((item) => <li key={item}>{item}</li>) : <li>None yet</li>}
                </ul>
              </div>
              <div>
                <p className="mb-1 font-medium">Incomplete tasks</p>
                <ul className="list-disc pl-5">
                  {insights.incompleteTasks.length
                    ? insights.incompleteTasks.map((task) => <li key={task}>{task}</li>)
                    : <li>Beautiful closure this week.</li>}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm">Loading insights...</p>
          )}
        </div>
      </aside>
    </div>
  );
}
