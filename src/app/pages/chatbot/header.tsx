"use client";

import { Menu, MoreVertical, MessageSquare } from "lucide-react";
import ExportChat from "../../components/ExportChat"; // Adjust path

interface HeaderProps {
  onSidebarToggle: () => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
  exportableMessages: { user: string; bot: string }[];
  onClearChat: () => void; // Add the new prop
}

export default function Header({ onSidebarToggle, menuOpen, onMenuToggle, exportableMessages, onClearChat }: HeaderProps) {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <button onClick={onSidebarToggle} className="text-white text-2xl">
        <Menu />
      </button>
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <MessageSquare /> Chatmate
      </h1>
      <button onClick={onMenuToggle} className="text-white text-2xl">
        <MoreVertical />
      </button>
      {menuOpen && (
        <div className="absolute right-4 top-14 bg-white shadow-lg p-2 border rounded-md transition-opacity duration-200 z-10">
          <ExportChat messages={exportableMessages} />
          <button
            onClick={onClearChat}
            className="w-full text-left px-2 py-1 text-red-500 hover:bg-red-100 rounded-md transition-colors duration-150"
          >
            Clear Chat
          </button>
        </div>
      )}
    </header>
  );
}