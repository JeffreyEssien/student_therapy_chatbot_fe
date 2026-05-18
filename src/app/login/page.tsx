"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEMO_USER, loginUser, seedDemoUser } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    seedDemoUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await loginUser(email, password);
    if (!result.ok) {
      setError(result.reason);
      setIsLoading(false);
      return;
    }
    router.push("/chatbot");
  };

  const fillDemo = () => {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-12 px-6 md:px-12">
        <aside className="col-span-12 hidden flex-col justify-between py-12 md:col-span-5 md:flex">
          <Link href="/" className="font-serif italic text-2xl tracking-editorial">
            Chatmate<span className="text-emerald">.</span>
          </Link>
          <div className="max-w-sm reveal">
            <p className="mb-6 font-mono text-eyebrow uppercase text-emerald">◇ &nbsp; Welcome back</p>
            <h1 className="font-serif text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.02] tracking-tightest">
              Pick up
              <br />
              where you <span className="italic">left off.</span>
            </h1>
            <button
              type="button"
              onClick={fillDemo}
              className="glow-on-hover mt-10 block w-full max-w-sm border border-ink/15 p-5 text-left transition-colors duration-500 ease-liquid hover:border-emerald"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <span className="font-mono text-eyebrow uppercase text-ash">◇ &nbsp; For reviewers</span>
              <p className="mt-3 font-serif text-base leading-snug">
                Click here to <span className="italic text-emerald">fill the demo account</span> automatically.
              </p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-caps text-ash">
                {DEMO_USER.email}
              </p>
            </button>
          </div>
          <span className="font-mono text-eyebrow uppercase text-ash">Fig. 03 — Session resumed</span>
        </aside>

        <section className="col-span-12 flex items-center md:col-span-7 md:pl-16">
          <form onSubmit={handleSubmit} className="reveal w-full max-w-md">
            <p className="mb-3 font-mono text-eyebrow uppercase text-ash md:hidden">◇ Welcome back</p>
            <h2 className="mb-10 font-serif text-3xl tracking-editorial md:hidden">Sign in to Chatmate.</h2>

            <label className="field-underline mb-8 block">
              <span className="mb-2 block font-mono text-eyebrow uppercase text-ash">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="you@university.edu"
                className="w-full border-b border-ink/20 bg-transparent py-3 font-sans text-base text-ink placeholder:text-ash/70 outline-none"
              />
            </label>

            <label className="field-underline mb-10 block">
              <span className="mb-2 block font-mono text-eyebrow uppercase text-ash">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="••••••••"
                className="w-full border-b border-ink/20 bg-transparent py-3 font-sans text-base text-ink placeholder:text-ash/70 outline-none"
              />
            </label>

            {error && (
              <p className="reveal mb-6 font-mono text-eyebrow uppercase text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-magnetic group inline-flex w-full items-center justify-between bg-ink px-6 py-4 text-paper hover:bg-emerald-deep disabled:opacity-60"
            >
              <span className="font-mono text-eyebrow uppercase">
                {isLoading ? "Signing in…" : "Sign in"}
              </span>
              <span className="font-mono text-sm transition-transform duration-500 ease-liquid group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={fillDemo}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 border-b border-ink/15 px-2 py-3 font-mono text-eyebrow uppercase text-ink/70 transition-colors duration-500 ease-liquid hover:text-emerald md:hidden"
            >
              Use demo account
            </button>

            <p className="mt-10 font-mono text-eyebrow uppercase text-ash">
              New here?{" "}
              <a href="/signup" className="text-ink underline-offset-4 hover:text-emerald hover:underline">
                Create an account
              </a>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
