"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      className={`reveal fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 font-mono text-eyebrow uppercase border ${
        type === "success"
          ? "bg-paper text-emerald border-emerald/40"
          : "bg-ink text-paper border-ink"
      }`}
    >
      {message}
    </div>
  );
}
