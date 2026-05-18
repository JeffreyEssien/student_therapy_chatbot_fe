"use client";

import { useEffect, useRef } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

export default function MessageInput({
  input,
  onInputChange,
  onSend,
  disabled,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-grow to content, cap at ~6 lines
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSend}
      className="border-t border-ink/8 bg-paper/85 px-6 py-5 backdrop-blur-xl md:px-12"
    >
      <div className="mx-auto flex max-w-2xl items-end gap-3 border-b border-ink/20 transition-colors duration-500 ease-liquid focus-within:border-emerald">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          required
          rows={1}
          disabled={disabled}
          placeholder="What's on your mind?"
          className="flex-1 resize-none bg-transparent py-3 font-sans text-base leading-relaxed text-ink placeholder:text-ash/80 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled}
          className="btn-magnetic inline-flex items-center gap-2 px-3 py-2 pb-3 font-mono text-eyebrow uppercase text-ink hover:text-emerald disabled:opacity-40"
          aria-label="Send"
        >
          Send <Send className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-2xl font-mono text-[0.62rem] uppercase tracking-caps text-ash">
        Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
}
