"use client";

import Image from "next/image";
import landingpage1 from "../../../public/landingpage1.jpg";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useParallax } from "@/hooks/useParallax";
import StaggerText from "../components/StaggerText";

interface HeroSectionProps {
  navigateTo: (path: string) => void;
}

export default function HeroSection({ navigateTo }: HeroSectionProps) {
  const magneticPrimary = useMagnetic<HTMLButtonElement>(0.25);
  const parallaxImg = useParallax<HTMLDivElement>(16);

  return (
    <section className="relative w-full overflow-hidden bg-paper">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 select-none font-serif italic text-[clamp(12rem,28vw,32rem)] leading-none text-ink/[0.035] tracking-tightest drift"
      >
        quiet
      </span>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-12 gap-x-6 px-6 pb-32 pt-20 md:px-12 md:pt-28">
        <div className="col-span-1 hidden md:flex md:items-start md:justify-center pt-4">
          <span className="vertical-caption font-mono text-eyebrow uppercase text-ash">
            Est. 2026 — A companion in stillness
          </span>
        </div>

        <div className="col-span-12 md:col-span-7">
          <p className="reveal mb-8 font-mono text-eyebrow uppercase text-emerald">
            ◇ &nbsp; 01 — For the student mind
          </p>

          <h1 className="font-serif font-normal text-display text-ink tracking-tightest">
            <StaggerText text="A softer place" as="span" delay={120} />
            <br />
            <StaggerText text="to " as="span" delay={620} />
            <em className="italic text-emerald">
              <StaggerText text="think" as="span" delay={720} />
            </em>
            <StaggerText text="," as="span" delay={920} />
            <br />
            <StaggerText text="and to be heard." as="span" delay={1040} />
          </h1>

          <p
            className="reveal mt-10 max-w-[44ch] font-sans text-base md:text-lg leading-relaxed text-ink/70"
            style={{ animationDelay: "1.6s" }}
          >
            Chatmate is a 24/7 therapy companion designed for the particular weight of student life —
            the deadlines, the doubt, the late hours. Not a replacement for care. A way to start.
          </p>

          <div className="reveal mt-12 flex flex-wrap items-center gap-3" style={{ animationDelay: "1.85s" }}>
            <button
              ref={magneticPrimary}
              onClick={() => navigateTo("/signup")}
              style={{ transition: "transform 0.7s var(--ease-liquid), background-color 0.5s var(--ease-liquid)" }}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink px-7 py-4 text-paper hover:bg-emerald-deep"
            >
              <span className="font-mono text-eyebrow uppercase">Begin a session</span>
              <span className="font-mono text-sm transition-transform duration-500 ease-liquid group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              onClick={() => navigateTo("/login")}
              className="field-underline btn-magnetic inline-flex items-center gap-2 border-b border-ink/30 px-2 py-4 font-mono text-eyebrow uppercase text-ink hover:text-emerald"
            >
              I already have an account
            </button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-24 reveal" style={{ animationDelay: "0.35s" }}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-smoke">
            <div ref={parallaxImg} className="absolute inset-0 transition-transform duration-700 ease-liquid">
              <Image
                src={landingpage1}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover grayscale-[15%] contrast-[1.02]"
                priority
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-ink/5 mix-blend-multiply" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-mono text-eyebrow uppercase text-ash">Fig. 01</span>
            <span className="font-mono text-eyebrow uppercase text-ash">Anonymous · Encrypted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
