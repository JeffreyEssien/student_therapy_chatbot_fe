"use client";

import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function MessageInput({ input, onInputChange, onSend }: MessageInputProps) {
  return (
    <form
      onSubmit={onSend}
      className="border-t border-ink/8 bg-paper/85 px-6 py-5 backdrop-blur-xl md:px-12"
    >
      <div className="mx-auto flex max-w-2xl items-center gap-3 border-b border-ink/20 transition-colors duration-500 ease-liquid focus-within:border-emerald">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          required
          placeholder="What's on your mind?"
          className="flex-1 bg-transparent py-3 font-sans text-base text-ink placeholder:text-ash/80 outline-none"
        />
        <button
          type="submit"
          className="btn-magnetic inline-flex items-center gap-2 px-3 py-2 font-mono text-eyebrow uppercase text-ink hover:text-emerald"
          aria-label="Send"
        >
          Send <Send className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>
    </form>
  );
}
