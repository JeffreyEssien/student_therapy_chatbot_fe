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
}

export default function ChatWindow({ userMessages, botResponses, isBotTyping, messageRefs }: ChatWindowProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [userMessages, botResponses]);

  return (
    <main ref={chatRef} className="flex-1 overflow-y-auto bg-paper px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        {userMessages.length === 0 && !isBotTyping && (
          <div className="reveal pt-20 text-center">
            <p className="mb-4 font-mono text-eyebrow uppercase text-emerald">◇ &nbsp; A quiet beginning</p>
            <h2 className="font-serif text-3xl leading-snug tracking-editorial md:text-4xl">
              How are you, <span className="italic">really</span>?
            </h2>
            <p className="mt-4 text-sm text-ink/60">Anything you say here stays here.</p>
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
                <p className="font-sans text-[0.95rem] leading-relaxed">{userMsg.text}</p>
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
                <div className="border-l-2 border-emerald bg-smoke px-5 py-3">
                  <p className="font-serif text-[1.05rem] leading-relaxed text-ink">
                    {botResponses[index].text}
                  </p>
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
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-emerald" style={{ animationDelay: "150ms" }} />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-emerald" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
