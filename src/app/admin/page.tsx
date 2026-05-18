"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import {
  Escalation,
  listEscalations,
  reopenEscalation,
  resolveEscalation,
} from "@/lib/escalations";
import ReportCard from "./reportCard";
import ResolveModal from "./toast";

type Filter = "pending" | "resolved" | "all";

const filterLabel: Record<Filter, string> = {
  pending: "Pending",
  resolved: "Resolved",
  all: "All",
};

function relativeTime(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function AdminPage() {
  const [items, setItems] = useState<Escalation[]>([]);
  const [filter, setFilter] = useState<Filter>("pending");
  const [resolving, setResolving] = useState<Escalation | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(listEscalations());
    setMounted(true);
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((e) => e.status === filter)),
    [items, filter],
  );

  const stats = useMemo(() => {
    const pending = items.filter((e) => e.status === "pending").length;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const resolvedToday = items.filter(
      (e) => e.status === "resolved" && (e.resolvedAt ?? 0) >= todayStart.getTime(),
    ).length;
    const avgResponse =
      items
        .filter((e) => e.resolvedAt)
        .reduce((sum, e) => sum + (e.resolvedAt! - e.createdAt), 0) /
      (items.filter((e) => e.resolvedAt).length || 1);
    const avgMin = Math.round(avgResponse / 60000);
    return { pending, resolvedToday, avgMin: isNaN(avgMin) ? 0 : avgMin };
  }, [items]);

  const handleConfirmResolve = (note: string) => {
    if (!resolving) return;
    resolveEscalation(resolving.id, note);
    setItems(listEscalations());
    toast.success("Marked as resolved.", {
      style: {
        background: "#0A0A0A",
        color: "#FDFDFD",
        borderRadius: 0,
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "12px 20px",
      },
    });
    setResolving(null);
  };

  const handleReopen = (id: string) => {
    reopenEscalation(id);
    setItems(listEscalations());
  };

  const counts: Record<Filter, number> = {
    pending: items.filter((e) => e.status === "pending").length,
    resolved: items.filter((e) => e.status === "resolved").length,
    all: items.length,
  };

  return (
    <main className="min-h-screen w-full bg-paper text-ink">
      <Toaster position="top-center" />

      <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-baseline justify-between px-6 py-5 md:px-12">
          <Link href="/" className="font-serif italic text-2xl tracking-editorial">
            Chatmate<span className="text-emerald">.</span>
          </Link>
          <span className="font-mono text-eyebrow uppercase text-ash">
            Counselor console · v1
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-32 md:px-12">
        {/* Section header */}
        <div className="reveal grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-eyebrow uppercase text-ash">03 — Counselor desk</p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h1 className="font-serif text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-editorial">
              The students who asked
              <br />
              for a <span className="italic">human.</span>
            </h1>
          </div>
        </div>

        {/* Stats — bento strip */}
        <div className="reveal mb-12 grid grid-cols-1 gap-3 md:grid-cols-12" style={{ animationDelay: "0.15s" }}>
          <article className="md:col-span-5 bg-ink p-8 text-paper md:p-10">
            <p className="font-mono text-eyebrow uppercase opacity-60">03.01 — Pending</p>
            <p className="mt-4 font-serif text-[clamp(3rem,8vw,6rem)] leading-none tracking-tightest">
              {mounted ? stats.pending.toString().padStart(2, "0") : "—"}
            </p>
            <p className="mt-3 font-sans text-sm opacity-70">
              students currently waiting to speak with a counselor.
            </p>
          </article>
          <article className="md:col-span-4 bg-smoke p-8 md:p-10">
            <p className="font-mono text-eyebrow uppercase text-ash">03.02 — Resolved today</p>
            <p className="mt-4 font-serif text-[clamp(3rem,7vw,5rem)] leading-none tracking-tightest">
              {mounted ? stats.resolvedToday.toString().padStart(2, "0") : "—"}
            </p>
            <p className="mt-3 font-sans text-sm text-ink/65">conversations closed since midnight.</p>
          </article>
          <article className="md:col-span-3 bg-emerald-deep p-8 text-paper md:p-10">
            <p className="font-mono text-eyebrow uppercase opacity-60">03.03 — Avg. response</p>
            <p className="mt-4 font-serif text-[clamp(3rem,6vw,4rem)] leading-none tracking-tightest">
              {mounted ? stats.avgMin : "—"}
              <span className="ml-1 font-sans text-xl tracking-normal opacity-70">min</span>
            </p>
            <p className="mt-3 font-sans text-sm opacity-70">from escalation to first contact.</p>
          </article>
        </div>

        {/* Filter tabs with animated indicator */}
        <div className="mb-10 flex items-end justify-between border-b border-ink/10">
          <nav className="flex gap-10">
            {(Object.keys(filterLabel) as Filter[]).map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative pb-4 transition-colors duration-500 ease-liquid"
                >
                  <span
                    className={`font-mono text-eyebrow uppercase ${
                      active ? "text-ink" : "text-ash hover:text-ink"
                    }`}
                  >
                    {filterLabel[f]}
                    <span className="ml-2 text-ash">{counts[f].toString().padStart(2, "0")}</span>
                  </span>
                  <span
                    className={`absolute -bottom-px left-0 right-0 h-px origin-left bg-emerald transition-transform duration-700 ease-liquid ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Report list */}
        {!mounted ? (
          <p className="py-20 text-center font-mono text-eyebrow uppercase text-ash">
            ◇ &nbsp; Loading desk…
          </p>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-mono text-eyebrow uppercase text-emerald">◇ &nbsp; Inbox zero</p>
            <h3 className="mt-3 font-serif text-3xl tracking-editorial">
              Nothing to look at <span className="italic">right now.</span>
            </h3>
            <p className="mt-3 font-sans text-sm text-ink/60">
              When a student requests a counselor, they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-ink/10">
            {filtered.map((esc, i) => (
              <ReportCard
                key={esc.id}
                escalation={esc}
                index={i}
                onResolve={() => setResolving(esc)}
                onReopen={() => handleReopen(esc.id)}
                relativeTime={relativeTime}
              />
            ))}
          </ul>
        )}
      </div>

      {resolving && (
        <ResolveModal
          escalation={resolving}
          onConfirm={handleConfirmResolve}
          onCancel={() => setResolving(null)}
        />
      )}
    </main>
  );
}
