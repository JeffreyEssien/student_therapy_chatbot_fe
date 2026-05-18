"use client";

import { Menu, MoreVertical, LogOut, LifeBuoy } from "lucide-react";
import ExportChat from "../components/ExportChat";

interface HeaderProps {
  onSidebarToggle: () => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
  exportableMessages: { user: string; bot: string }[];
  onClearChat: () => void;
  sessionName: string;
  onSignOut: () => void;
  onEscalate: () => void;
  hasMessages: boolean;
}

export default function Header({
  onSidebarToggle,
  menuOpen,
  onMenuToggle,
  exportableMessages,
  onClearChat,
  sessionName,
  onSignOut,
  onEscalate,
  hasMessages,
}: HeaderProps) {
  return (
    <header className="relative z-30 flex items-center justify-between border-b border-ink/8 bg-paper/80 px-6 py-4 backdrop-blur-xl">
      <button
        onClick={onSidebarToggle}
        className="btn-magnetic p-1 text-ink hover:text-emerald"
        aria-label="Open sidebar"
      >
        <Menu strokeWidth={1.4} />
      </button>

      <div className="flex flex-col items-center leading-tight">
        <h1 className="font-serif italic text-xl tracking-editorial text-ink">
          Chatmate<span className="text-emerald">.</span>
        </h1>
        <span className="hidden font-mono text-[0.62rem] uppercase tracking-caps text-ash sm:block">
          ◇ &nbsp;{sessionName}
        </span>
      </div>

      <div className="relative">
        <button
          onClick={onMenuToggle}
          className="btn-magnetic p-1 text-ink hover:text-emerald"
          aria-label="Open menu"
        >
          <MoreVertical strokeWidth={1.4} />
        </button>
        {menuOpen && (
          <div className="reveal absolute right-0 top-10 z-10 min-w-[240px] border border-ink/10 bg-paper shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
            <button
              onClick={onEscalate}
              disabled={!hasMessages}
              className="flex w-full items-center justify-between border-b border-ink/10 px-4 py-3 text-left font-mono text-eyebrow uppercase text-emerald transition-colors duration-300 hover:bg-emerald-deep hover:text-paper disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-emerald"
            >
              <span>Speak to a counselor</span>
              <LifeBuoy className="h-3.5 w-3.5" strokeWidth={1.4} />
            </button>
            <ExportChat messages={exportableMessages} />
            <button
              onClick={onClearChat}
              className="block w-full border-b border-ink/10 px-4 py-3 text-left font-mono text-eyebrow uppercase text-ink/80 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Clear chat
            </button>
            <button
              onClick={onSignOut}
              className="flex w-full items-center justify-between px-4 py-3 text-left font-mono text-eyebrow uppercase text-ink/80 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <span>Sign out</span>
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.4} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
