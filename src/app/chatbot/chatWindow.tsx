"use client";

import { useEffect, useRef } from "react";

interface Message {
  id: number;
  date: string;
  text: string;
}

interface ChatWindowProps {
  userMessages: Message[];
  botResponses: Message[];
  isBotTyping: boolean;
  messageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onPickPrompt?: (text: string) => void;
}

const STARTERS = [
  "I have an exam at 9am and I can't sleep.",
  "I feel like I'm falling behind everyone else.",
  "I don't know who to talk to about what's going on at home.",
  "I just need someone to sit with me for a minute.",
];

function BotText({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}|\n/).filter((p) => p.length > 0);
  return (
    <div className="space-y-3 font-serif text-[1.05rem] leading-relaxed text-ink">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default function ChatWindow({
  userMessages,
  botResponses,
  isBotTyping,
  messageRefs,
  onPickPrompt,
}: ChatWindowProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [userMessages, botResponses]);

  const isEmpty = userMessages.length === 0 && !isBotTyping;

  return (
    <main ref={chatRef} className="flex-1 overflow-y-auto bg-paper px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        {isEmpty && (
          <div className="reveal pt-16">
            <p className="mb-4 text-center font-mono text-eyebrow uppercase text-emerald">
              ◇ &nbsp; A quiet beginning
            </p>
            <h2 className="text-center font-serif text-3xl leading-snug tracking-editorial md:text-4xl">
              How are you, <span className="italic">really</span>?
            </h2>
            <p className="mt-3 text-center text-sm text-ink/60">
              Anything you say here stays here. Start where you are.
            </p>

            <div className="mt-12">
              <p className="mb-4 text-center font-mono text-eyebrow uppercase text-ash">
                ◇ &nbsp; Or pick a starting point
              </p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {STARTERS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => onPickPrompt?.(s)}
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="reveal group border border-ink/10 px-5 py-4 text-left transition-all duration-500 ease-liquid hover:-translate-y-0.5 hover:border-emerald hover:bg-smoke/40"
                  >
                    <p className="font-serif text-base leading-snug text-ink/85 group-hover:text-ink">
                      {s}
                    </p>
                    <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-caps text-ash group-hover:text-emerald">
                      Use this →
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {userMessages.map((userMsg, index) => (
          <div key={userMsg.id} className="flex flex-col gap-5">
            <div
              ref={(el) => {
                messageRefs.current[index * 2] = el;
              }}
              className="self-end max-w-[80%]"
            >
              <div className="bg-ink px-5 py-3 text-paper">
                <p className="whitespace-pre-wrap font-sans text-[0.95rem] leading-relaxed">
                  {userMsg.text}
                </p>
              </div>
              <span className="mt-1 block text-right font-mono text-eyebrow uppercase text-ash">
                You · {userMsg.date}
              </span>
            </div>

            {botResponses[index] && (
              <div
                ref={(el) => {
                  messageRefs.current[index * 2 + 1] = el;
                }}
                className="self-start max-w-[80%]"
              >
                <div className="border-l-2 border-emerald bg-smoke px-5 py-4">
                  <BotText text={botResponses[index].text} />
                </div>
                <span className="mt-1 block font-mono text-eyebrow uppercase text-ash">
                  Chatmate · {botResponses[index].date}
                </span>
              </div>
            )}
          </div>
        ))}

        {isBotTyping && (
          <div className="self-start max-w-[80%]">
            <div className="flex items-center gap-1.5 border-l-2 border-emerald bg-smoke px-5 py-4">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-emerald" />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-emerald"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-emerald"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
