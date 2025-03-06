"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../chatbot/header";
import SidebarComponent from "../chatbot/sidebarComponent";
import ChatWindow from "../chatbot/chatWindow";
import MessageInput from "../chatbot/messageInput";

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

export default function ChatbotPage() {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [botResponses, setBotResponses] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load chat history from local storage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem("chatData");
    if (savedChat) {
      try {
        const parsedChat: StoredChatData = JSON.parse(savedChat);
        if (parsedChat.userMessages && parsedChat.botResponses) {
          setUserMessages(parsedChat.userMessages);
          setBotResponses(parsedChat.botResponses);
        }
      } catch (error) {
        console.error("Failed to load chat data:", error);
        localStorage.removeItem("chatData"); // Clear invalid data
      }
    }
  }, []);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const date = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newUserMessage: Message = { id: userMessages.length + 1, date, text: input };

    setUserMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      const newBotResponse: Message = {
        id: botResponses.length + 1,
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: generateBotResponse(input),
      };
      setBotResponses((prev) => [...prev, newBotResponse]);
      setIsBotTyping(false);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes("hello")) return "Hey there! How’s it going?";
    if (input.includes("i need help")) return "I’m here for you! What’s the issue?";
    if (input.includes("goodbye")) return "See you later! Take care!";
    if (input.includes("how are you")) return "I’m doing great, thanks! How about you?";
    if (input.includes("escalate")) return "I’ll notify an admin. Hang tight!";
    return `Hmm, I’m not sure about "${userInput}". Could you clarify?`;
  };

  // Generate history entries from user messages with safety check
  const history: HistoryEntry[] = userMessages.map((msg, index) => ({
    date: msg.date,
    title: msg.text && typeof msg.text === "string"
      ? msg.text.split(" ").slice(0, 3).join(" ") + (msg.text.split(" ").length > 3 ? "..." : "")
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

  // Persist both user messages and bot responses to local storage
  useEffect(() => {
    if (userMessages.length > 0 || botResponses.length > 0) {
      const chatData: StoredChatData = { userMessages, botResponses };
      localStorage.setItem("chatData", JSON.stringify(chatData));
    }
  }, [userMessages, botResponses]);

  // Clear chat function
  const handleClearChat = () => {
    setUserMessages([]);
    setBotResponses([]);
    localStorage.removeItem("chatData");
    setMenuOpen(false); // Close the menu after clearing
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        exportableMessages={exportableMessages}
        onClearChat={handleClearChat}
      />
      <SidebarComponent
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        history={history}
        onHistoryClick={handleHistoryClick}
      />
      <ChatWindow
        userMessages={userMessages}
        botResponses={botResponses}
        isBotTyping={isBotTyping}
        messageRefs={messageRefs}
      />
      <MessageInput input={input} onInputChange={setInput} onSend={handleSend} />
    </div>
  );
}