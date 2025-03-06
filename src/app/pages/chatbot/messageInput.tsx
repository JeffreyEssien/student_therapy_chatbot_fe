"use client";

import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function MessageInput({ input, onInputChange, onSend }: MessageInputProps) {
  return (
    <form onSubmit={onSend} className="flex p-4 border-t bg-white text-black items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What's on your mind?"
        required
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white rounded-lg px-5 py-2 font-semibold hover:bg-blue-600 transition flex items-center gap-2"
      >
        <Send className="w-5 h-5" /> Send
      </button>
    </form>
  );
}