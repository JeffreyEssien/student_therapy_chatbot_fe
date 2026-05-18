"use client";

interface HistoryEntry {
  date: string;
  title: string;
  index: number;
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
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        className="reveal flex h-full w-full max-w-sm flex-col bg-paper px-8 py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-10 flex items-baseline justify-between">
          <p className="font-mono text-eyebrow uppercase text-ash">◇ &nbsp; Conversations</p>
          <button
            onClick={onClose}
            className="font-mono text-eyebrow uppercase text-ink hover:text-emerald"
          >
            Close
          </button>
        </div>

        <h2 className="mb-10 font-serif text-3xl tracking-editorial">
          What you&apos;ve <span className="italic">said.</span>
        </h2>

        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="font-mono text-eyebrow uppercase text-ash">No conversations yet</p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {history.map((entry) => (
                <li key={entry.index}>
                  <button
                    onClick={() => onHistoryClick(entry.index)}
                    className="group flex w-full items-baseline justify-between gap-4 py-4 text-left transition-colors duration-300 ease-liquid hover:text-emerald"
                  >
                    <span className="font-serif text-base leading-snug truncate">{entry.title}</span>
                    <span className="font-mono text-eyebrow uppercase text-ash group-hover:text-emerald">
                      {entry.date}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
