"use client";

import { Clock } from "lucide-react";

interface HistoryEntry {
  date: string;
  title: string;
  index: number; // To map back to the original message
}

interface SidebarComponentProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onHistoryClick: (index: number) => void;
}

export default function SidebarComponent({ isOpen, onClose, history, onHistoryClick }: SidebarComponentProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-80 bg-white h-full shadow-md p-4 transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" /> Chat History
        </h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center">No chat history yet</p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.index}
                onClick={() => onHistoryClick(entry.index)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-150"
              >
                <p className="text-sm text-gray-800 font-medium truncate">{entry.title}</p>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {entry.date}
                </span>
              </div>
            ))
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}