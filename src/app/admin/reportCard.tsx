"use client";

import { useState } from "react";
import { ChevronDown, PhoneCall, RotateCcw } from "lucide-react";
import type { Escalation } from "@/lib/escalations";

interface Props {
  escalation: Escalation;
  index: number;
  onResolve: () => void;
  onReopen: () => void;
  relativeTime: (ts: number) => string;
}

export default function ReportCard({
  escalation,
  index,
  onResolve,
  onReopen,
  relativeTime,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const isPending = escalation.status === "pending";

  return (
    <li
      className="reveal group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full py-7 text-left transition-colors duration-500 ease-liquid hover:bg-smoke/40"
        aria-expanded={expanded}
      >
        <div className="grid grid-cols-12 items-baseline gap-x-6 px-2">
          <div className="col-span-12 md:col-span-1">
            <span className="font-mono text-eyebrow uppercase text-ash">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="col-span-12 md:col-span-7">
            <h3 className="font-serif text-xl leading-snug tracking-editorial md:text-2xl">
              {escalation.reason}
            </h3>
            <p className="mt-2 font-mono text-eyebrow uppercase text-ash">
              {escalation.studentName} · {escalation.studentEmail}
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <span className="font-mono text-eyebrow uppercase text-ash">
              {relativeTime(escalation.createdAt)}
            </span>
          </div>

          <div className="col-span-6 flex items-center justify-end gap-3 md:col-span-2">
            <span
              className={`inline-flex items-center gap-2 font-mono text-eyebrow uppercase ${
                isPending ? "text-emerald" : "text-ash"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isPending ? "bg-emerald animate-pulse" : "bg-ash"
                }`}
              />
              {isPending ? "Pending" : "Resolved"}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-ink/40 transition-transform duration-500 ease-liquid ${
                expanded ? "rotate-180 text-emerald" : ""
              }`}
              strokeWidth={1.4}
            />
          </div>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-liquid ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-12 gap-x-6 px-2 pb-10 pt-2">
            <div className="col-span-12 md:col-span-1" />

            <div className="col-span-12 md:col-span-7">
              <p className="mb-4 font-mono text-eyebrow uppercase text-ash">
                ◇ &nbsp; Conversation context
              </p>
              <div className="space-y-4">
                {escalation.conversation.map((turn, i) => (
                  <div
                    key={i}
                    className={`max-w-[90%] ${
                      turn.role === "user" ? "ml-auto" : ""
                    }`}
                  >
                    <p className="mb-1 font-mono text-[0.62rem] uppercase tracking-caps text-ash">
                      {turn.role === "user" ? "Student" : "Chatmate"}
                    </p>
                    <div
                      className={`px-4 py-3 ${
                        turn.role === "user"
                          ? "bg-ink text-paper font-sans text-sm"
                          : "border-l-2 border-emerald bg-smoke font-serif text-base text-ink"
                      }`}
                    >
                      {turn.text}
                    </div>
                  </div>
                ))}
              </div>

              {escalation.resolvedNote && (
                <div className="mt-8 border-l-2 border-ash/40 pl-4">
                  <p className="font-mono text-eyebrow uppercase text-ash">
                    Counselor note · {escalation.resolvedAt && relativeTime(escalation.resolvedAt)}
                  </p>
                  <p className="mt-2 font-serif text-base italic text-ink/80">
                    {escalation.resolvedNote}
                  </p>
                </div>
              )}
            </div>

            <div className="col-span-12 md:col-span-4 md:pl-8">
              <p className="mb-4 font-mono text-eyebrow uppercase text-ash">◇ &nbsp; Actions</p>
              <div className="flex flex-col gap-3">
                {isPending ? (
                  <>
                    <a
                      href={`mailto:${escalation.studentEmail}`}
                      className="btn-magnetic inline-flex items-center justify-between border border-ink/15 px-5 py-3 font-mono text-eyebrow uppercase text-ink transition-colors duration-500 ease-liquid hover:border-emerald hover:text-emerald"
                    >
                      <span>Email student</span>
                      <span>→</span>
                    </a>
                    <button
                      onClick={onResolve}
                      className="btn-magnetic group inline-flex items-center justify-between bg-ink px-5 py-3 text-paper hover:bg-emerald-deep"
                    >
                      <span className="font-mono text-eyebrow uppercase">Mark resolved</span>
                      <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.4} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onReopen}
                    className="btn-magnetic group inline-flex items-center justify-between border border-ink/15 px-5 py-3 font-mono text-eyebrow uppercase text-ink transition-colors duration-500 ease-liquid hover:border-emerald hover:text-emerald"
                  >
                    <span>Reopen</span>
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.4} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
