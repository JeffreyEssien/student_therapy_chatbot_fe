"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import SidebarComponent from "./sidebarComponent";
import ChatWindow from "./chatWindow";
import MessageInput from "./messageInput";
import EscalateModal from "./escalateModal";
import { getSession, signOut, type Session } from "@/lib/auth";
import { createEscalation, type ConversationTurn } from "@/lib/escalations";

interface Message {
  id: number;
  date: string;
  text: string;
}

interface HistoryEntry {
  date: string;
  title: string;
  index: number;
}

interface StoredChatData {
  userMessages: Message[];
  botResponses: Message[];
}

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatbotPage() {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [botResponses, setBotResponses] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [escalateOpen, setEscalateOpen] = useState<boolean>(false);
  const [escalateConfirmation, setEscalateConfirmation] = useState<string | null>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    setSession(s);
  }, [router]);

  const handleSignOut = () => {
    signOut();
    router.replace("/login");
  };

  useEffect(() => {
    const savedChat = localStorage.getItem("chatData");
    if (!savedChat) return;
    try {
      const parsed: StoredChatData = JSON.parse(savedChat);
      if (parsed.userMessages && parsed.botResponses) {
        setUserMessages(parsed.userMessages);
        setBotResponses(parsed.botResponses);
      }
    } catch {
      localStorage.removeItem("chatData");
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isBotTyping) return;

    const newUserMessage: Message = {
      id: userMessages.length + 1,
      date: now(),
      text: text.trim(),
    };
    const nextUserMessages = [...userMessages, newUserMessage];
    setUserMessages(nextUserMessages);
    setInput("");
    setIsBotTyping(true);

    const history: { role: "user" | "model"; text: string }[] = [];
    nextUserMessages.forEach((u, i) => {
      history.push({ role: "user", text: u.text });
      const reply = botResponses[i];
      if (reply) history.push({ role: "model", text: reply.text });
    });

    const botId = botResponses.length + 1;
    const startedAt = now();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "Something went wrong.");
        setBotResponses((prev) => [
          ...prev,
          { id: botId, date: startedAt, text: `[${errText.trim() || "Connection error."}]` },
        ]);
        setIsBotTyping(false);
        return;
      }

      setBotResponses((prev) => [...prev, { id: botId, date: startedAt, text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        if (firstChunk) {
          setIsBotTyping(false);
          firstChunk = false;
        }
        setBotResponses((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last.id === botId) {
            copy[copy.length - 1] = { ...last, text: acc };
          }
          return copy;
        });
      }
      setIsBotTyping(false);
    } catch {
      setBotResponses((prev) => [
        ...prev,
        { id: botId, date: startedAt, text: "[I couldn't reach the server. Please try again.]" },
      ]);
      setIsBotTyping(false);
    }
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handlePickPrompt = (text: string) => {
    void sendMessage(text);
  };

  const history: HistoryEntry[] = userMessages.map((msg, index) => ({
    date: msg.date,
    title:
      msg.text && typeof msg.text === "string"
        ? msg.text.split(" ").slice(0, 3).join(" ") +
          (msg.text.split(" ").length > 3 ? "..." : "")
        : "Untitled",
    index: index * 2,
  }));

  const exportableMessages = userMessages.map((userMsg, index) => ({
    user: userMsg.text,
    bot: botResponses[index]?.text || "",
  }));

  const handleHistoryClick = (index: number) => {
    const messageRef = messageRefs.current[index];
    if (messageRef) {
      messageRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (userMessages.length > 0 || botResponses.length > 0) {
      localStorage.setItem(
        "chatData",
        JSON.stringify({ userMessages, botResponses }),
      );
    }
  }, [userMessages, botResponses]);

  const handleClearChat = () => {
    setUserMessages([]);
    setBotResponses([]);
    localStorage.removeItem("chatData");
    setMenuOpen(false);
  };

  const handleEscalateOpen = () => {
    setMenuOpen(false);
    setEscalateOpen(true);
  };

  const handleEscalateConfirm = (reason: string) => {
    if (!session) return;
    const conversation: ConversationTurn[] = [];
    userMessages.forEach((u, i) => {
      conversation.push({ role: "user", text: u.text });
      const r = botResponses[i];
      if (r) conversation.push({ role: "model", text: r.text });
    });
    createEscalation({
      studentEmail: session.email,
      studentName: session.fullName ?? session.email,
      reason: reason || "Student requested human support.",
      conversation,
    });
    setEscalateOpen(false);
    setEscalateConfirmation(
      "A counselor has been notified. They'll reach out to you at the email on file.",
    );
    setTimeout(() => setEscalateConfirmation(null), 7000);
  };

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-paper text-ink">
        <p className="font-mono text-eyebrow uppercase text-ash">◇ &nbsp; Checking session…</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-paper text-ink">
      <Header
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        exportableMessages={exportableMessages}
        onClearChat={handleClearChat}
        sessionName={session.fullName ?? session.email}
        onSignOut={handleSignOut}
        onEscalate={handleEscalateOpen}
        hasMessages={userMessages.length > 0}
      />
      <SidebarComponent
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        history={history}
        onHistoryClick={handleHistoryClick}
      />

      {escalateConfirmation && (
        <div className="reveal border-b border-emerald/30 bg-emerald-deep px-6 py-3 text-paper md:px-12">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <p className="font-mono text-eyebrow uppercase">◇ &nbsp; {escalateConfirmation}</p>
            <button
              onClick={() => setEscalateConfirmation(null)}
              className="font-mono text-eyebrow uppercase opacity-60 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <ChatWindow
        userMessages={userMessages}
        botResponses={botResponses}
        isBotTyping={isBotTyping}
        messageRefs={messageRefs}
        onPickPrompt={handlePickPrompt}
      />
      <MessageInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        disabled={isBotTyping}
      />

      {escalateOpen && (
        <EscalateModal
          onConfirm={handleEscalateConfirm}
          onCancel={() => setEscalateOpen(false)}
        />
      )}
    </div>
  );
}
