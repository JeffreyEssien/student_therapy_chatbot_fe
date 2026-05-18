"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  navigateTo: (path: string) => void;
}

export default function Header({ navigateTo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-700 ease-liquid ${
        scrolled
          ? "border-ink/12 bg-paper/85 supports-[backdrop-filter]:bg-paper/70"
          : "border-transparent bg-paper/40"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-baseline justify-between px-6 transition-[padding] duration-700 ease-liquid md:px-12 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <button
          onClick={() => navigateTo("/")}
          className={`font-serif italic tracking-editorial text-ink transition-all duration-700 ease-liquid hover:opacity-70 ${
            scrolled ? "text-xl" : "text-2xl"
          }`}
        >
          Chatmate<span className="text-emerald">.</span>
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          <span className="font-mono text-eyebrow uppercase text-ash">
            <span className="text-ink">01</span> / Therapy, reimagined
          </span>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => navigateTo("/login")}
            className="btn-magnetic font-mono text-eyebrow uppercase px-4 py-2 text-ink hover:text-emerald"
          >
            Sign in
          </button>
          <button
            onClick={() => navigateTo("/signup")}
            className="btn-magnetic font-mono text-eyebrow uppercase px-5 py-2.5 bg-ink text-paper hover:bg-emerald-deep"
          >
            Begin →
          </button>
        </div>
      </div>
    </header>
  );
}
