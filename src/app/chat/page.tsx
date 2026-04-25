import { AppScaffold } from "@/components/yaatri/AppScaffold";

export default function ChatPage() {
  return (
    <AppScaffold tab="account">
      <section className="card p-[14px]">
        <div className="flex items-center gap-2 border-b border-[0.5px] border-[var(--color-divider)] pb-2">
          <div className="h-9 w-9 rounded-full bg-[var(--color-indigo-mid)]" />
          <div>
            <p className="text-xs font-medium">Meera</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Lead concierge · <span className="text-[#6AE870]">online</span></p>
          </div>
        </div>

        <p className="mt-3 text-[10px] font-medium text-[var(--color-amethyst)]">Meera</p>
        <div className="mt-1 max-w-[80%] rounded-[12px] rounded-bl-[3px] border border-[0.5px] border-[var(--color-divider)] bg-white p-2 text-xs leading-[1.55] text-[var(--color-text-mid)] dark:bg-[var(--color-bg-surface)]">
          Namaste. Share your intention and mobility needs. I will shape your full yatra.
        </div>
        <div className="mt-2 ml-auto max-w-[80%] rounded-[12px] rounded-br-[3px] bg-[var(--color-indigo-primary)] p-2 text-xs leading-[1.55] text-[var(--color-star-white)]">
          Planning for parents too. Please add wheelchair support.
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Yes, add wheelchair",
            "What\'s the ritual cost?",
            "Show me the hotel"
          ].map((chip) => (
            <button key={chip} className="min-h-12 rounded-full border border-[0.5px] border-[var(--color-divider)] px-3 text-[11px] text-[var(--color-text-mid)]">{chip}</button>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input className="min-h-12 flex-1 rounded-full bg-[var(--color-bg-surface)] px-4 text-xs outline-none" placeholder="Type your message" />
          <button className="tap-transition h-8 w-8 rounded-full bg-[var(--color-indigo-mid)] text-[var(--color-star-white)]">→</button>
        </div>
      </section>
    </AppScaffold>
  );
}
