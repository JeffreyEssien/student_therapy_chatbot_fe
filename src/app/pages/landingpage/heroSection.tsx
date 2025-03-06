"use client";

import Image from "next/image";
import landingpage1 from "../../../../public/landingpage1.jpg";

interface HeroSectionProps {
  navigateTo: (path: string) => void;
}

export default function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <div className="w-full py-12 px-6 md:px-14 bg-[#f8fafc] bg-opacity-90 bg-[radial-gradient(#3b82f6_0.5px,#f8fafc_0.5px)] bg-[size:12px_12px]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug animate-fade-in">
            Unleash the Power of <span className="text-blue-600 animate-text-pop">AI in Therapy</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed animate-fade-in-delay">
            Your dedicated 24/7 therapy companion, thoughtfully designed to support you through the emotional highs and
            challenging lows of student life. With deep empathy and a comprehensive understanding of the unique
            pressures students face, our AI-driven platform provides a safe space for reflection, guidance, and mental
            wellness support whenever you need it.
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {["Get Started", "Login"].map((text, i) => (
              <button
                key={i}
                className={`w-full md:w-auto px-6 py-3 rounded-lg text-lg font-semibold transition shadow-md flex items-center justify-center gap-2 ${
                  text === "Get Started"
                    ? "bg-blue-600 hover:bg-blue-700 text-white animate-bounce-slow"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800 md:hidden"
                }`}
                onClick={() => navigateTo(`/pages/signup`)}
                aria-label={text}
              >
                {text}
                {text === "Get Started" && (
                  <span className="inline-block animate-arrow-move">➔</span>
                )}
              </button>
            ))}
          </div>
        </div>
        <Image
          src={landingpage1}
          alt="Therapy illustration"
          width={500}
          height={350}
          className="rounded-2xl shadow-lg hidden md:flex animate-scale-in"
        />
      </div>
    </div>
  );
}