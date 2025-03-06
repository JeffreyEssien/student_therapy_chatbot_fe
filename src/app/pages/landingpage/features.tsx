"use client";

import { ShieldCheck, Clock, UserCheck, HeartPulse, MessageSquareText, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { icon: ShieldCheck, title: "Anonymity & Privacy", desc: "Confidential therapy sessions to ensure your privacy and safety." },
  { icon: Clock, title: "24/7 Availability", desc: "Support is always available, anytime you need it." },
  { icon: UserCheck, title: "Personalized Responses", desc: "AI adapts to your needs, providing tailored guidance." },
  { icon: HeartPulse, title: "Daily Check-ins", desc: "Monitor your emotional well-being with structured check-ins." },
  { icon: MessageSquareText, title: "Counseling Support", desc: "Connect with AI-driven insights or human counselors when needed." },
];

export default function FeaturesSection() {
  return (
    <div className="w-full py-12 px-6 md:px-14 bg-white text-gray-800 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fade-in">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 p-4 bg-blue-50 border border-blue-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <Icon className={`text-blue-600 w-10 h-10 ${Icon === Clock ? "animate-icon-spin" : ""}`} />
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}