"use client";

import { useEffect, useRef } from "react";
import { User, Bot } from "lucide-react";

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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [userMessages, botResponses]);

  return (
    <main ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
      {userMessages.map((userMsg, index) => (
        <div
          key={userMsg.id}
          ref={(el) => {
            messageRefs.current[index * 2] = el; // Assign user message ref
          }}
          className="flex flex-col space-y-2 animate-fade-in"
        >
          <div className="flex justify-end">
            <div className="p-3 rounded-lg bg-blue-500 text-white max-w-xs shadow-md flex flex-col relative">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4" /> {userMsg.text}
              </p>
              <span className="text-xs text-gray-200 self-end">{userMsg.date}</span>
              <div className="absolute -bottom-2 right-2 w-0 h-0 border-t-8 border-t-blue-500 border-l-8 border-l-transparent border-r-8 border-r-transparent" />
            </div>
          </div>

          {botResponses[index] && (
            <div
              ref={(el) => {
                messageRefs.current[index * 2 + 1] = el; // Assign bot message ref
              }}
              className="flex justify-start"
            >
              <div className="p-3 rounded-lg bg-gray-200 text-black max-w-xs shadow-md flex flex-col relative">
                <p className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-500" /> {botResponses[index].text}
                </p>
                <span className="text-xs text-gray-500 self-end">{botResponses[index].date}</span>
                <div className="absolute -bottom-2 left-2 w-0 h-0 border-t-8 border-t-gray-200 border-l-8 border-l-transparent border-r-8 border-r-transparent" />
              </div>
            </div>
          )}
        </div>
      ))}
      {isBotTyping && (
        <div className="flex justify-start">
          <div className="p-3 rounded-lg bg-gray-200 text-black max-w-xs shadow-md animate-pulse">
            <p className="text-gray-500">Bot is typing...</p>
          </div>
        </div>
      )}
    </main>
  );
}