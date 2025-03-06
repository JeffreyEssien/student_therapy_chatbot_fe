"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/logo.png";

interface HeaderProps {
  navigateTo: (path: string) => void;
}

export default function Header({ navigateTo }: HeaderProps) {
  return (
    <div className="flex justify-between items-center w-full px-6 md:px-10 shadow-md bg-white">
      <Image
        src={Logo}
        alt="Logo"
        width={250}
        className="cursor-pointer animate-bounce-slow"
        onClick={() => navigateTo("/")}
      />
      <div className="hidden md:flex space-x-6">
        {["Login", "Signup"].map((text, i) => (
          <button
            key={i}
            className="bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-transform duration-200"
            onClick={() => navigateTo(`/pages/${text.toLowerCase()}`)}
            aria-label={text}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}