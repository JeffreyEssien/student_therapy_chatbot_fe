"use client";

import { ShieldCheck, Clock, UserCheck, HeartPulse, MessageSquareText, LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useTilt } from "@/hooks/useTilt";

interface Feature {
  icon: LucideIcon;
  index: string;
  title: string;
  desc: string;
  span: string;
  tone: "ink" | "emerald" | "smoke";
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    index: "02.01",
    title: "Anonymity, by default",
    desc: "Conversations stay private. No names required to begin — only the willingness to.",
    span: "md:col-span-7 md:row-span-2",
    tone: "ink",
  },
  {
    icon: Clock,
    index: "02.02",
    title: "Always awake",
    desc: "Three in the morning is the loneliest hour. We are open at three in the morning.",
    span: "md:col-span-5",
    tone: "emerald",
  },
  {
    icon: UserCheck,
    index: "02.03",
    title: "Tailored, not templated",
    desc: "Responses shaped to your voice, not a script.",
    span: "md:col-span-5",
    tone: "smoke",
  },
  {
    icon: HeartPulse,
    index: "02.04",
    title: "Daily check-ins",
    desc: "A small, regular practice of noticing how you are.",
    span: "md:col-span-6",
    tone: "smoke",
  },
  {
    icon: MessageSquareText,
    index: "02.05",
    title: "Human handoff",
    desc: "When the moment calls for a person, we escalate to a counselor — discreetly.",
    span: "md:col-span-6",
    tone: "ink",
  },
];

const toneClasses: Record<Feature["tone"], string> = {
  ink: "bg-ink text-paper",
  emerald: "bg-emerald-deep text-paper",
  smoke: "bg-smoke text-ink",
};

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const { ref: revealRef, visible } = useReveal<HTMLElement>();
  const tiltRef = useTilt<HTMLDivElement>(3);
  const Icon = feature.icon;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={revealRef}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal ${feature.span}`}
    >
      <div
        ref={tiltRef}
        onPointerMove={onPointerMove}
        className={`glow-on-hover relative flex h-full min-h-[220px] flex-col justify-between p-8 transition-transform duration-700 ease-liquid md:p-10 ${toneClasses[feature.tone]}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-start justify-between">
          <Icon className="h-7 w-7 opacity-80" strokeWidth={1.2} />
          <span className="font-mono text-eyebrow uppercase opacity-60">{feature.index}</span>
        </div>
        <div>
          <h3 className="font-serif text-2xl md:text-3xl leading-tight tracking-editorial">
            {feature.title}
          </h3>
          <p className="mt-3 max-w-[40ch] text-sm leading-relaxed opacity-75">
            {feature.desc}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function FeaturesSection() {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full bg-paper px-6 py-32 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div
          ref={headRef}
          data-visible={headVisible}
          className="scroll-reveal grid grid-cols-12 gap-x-6 mb-16"
        >
          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-eyebrow uppercase text-ash">02 — Principles</p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-serif text-[clamp(2rem,4.5vw,4.2rem)] leading-[1.02] tracking-editorial">
              Built around the way <span className="italic">you actually</span> reach for help.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)]">
          {features.map((f, i) => (
            <FeatureCard key={f.index} feature={f} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
