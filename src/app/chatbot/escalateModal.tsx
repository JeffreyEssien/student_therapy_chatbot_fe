"use client";

import { useEffect, useState } from "react";

interface Props {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export default function EscalateModal({ onConfirm, onCancel }: Props) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="reveal relative w-full max-w-lg border border-ink/10 bg-paper p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-eyebrow uppercase text-emerald">◇ &nbsp; Reach a human</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-editorial">
          Want a counselor to <span className="italic">reach out?</span>
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">
          Your conversation so far will be shared, in confidence, with the next available counselor.
          They'll contact you at the email on file. You don't have to wait alone.
        </p>

        <label className="field-underline mt-8 block">
          <span className="mb-2 block font-mono text-eyebrow uppercase text-ash">
            What's the main thing? (optional)
          </span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="e.g. exam anxiety, family situation, just feeling really low…"
            className="w-full resize-none border-b border-ink/20 bg-transparent py-3 font-sans text-base text-ink placeholder:text-ash/70 outline-none"
            autoFocus
          />
        </label>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="btn-magnetic px-5 py-3 font-mono text-eyebrow uppercase text-ink/70 hover:text-ink"
          >
            Not now
          </button>
          <button
            onClick={() => onConfirm(reason.trim())}
            className="btn-magnetic inline-flex items-center gap-3 bg-ink px-6 py-3 text-paper hover:bg-emerald-deep"
          >
            <span className="font-mono text-eyebrow uppercase">Send to counselor</span>
            <span className="font-mono text-sm">→</span>
          </button>
        </div>

        <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-caps text-ash">
          In immediate crisis? In Nigeria, call MANI 24/7 at 0809 111 6264.
        </p>
      </div>
    </div>
  );
}
