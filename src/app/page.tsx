"use client";

import { useRouter } from "next/navigation";
import Header from "./components/landing/Header";
import HeroSection from "./components/landing/HeroSection";
import FeaturesSection from "./components/landing/Features";
import Footer from "./components/landing/Footer";

export default function HomePage() {
  const router = useRouter();
  const navigateTo = (path: string) => router.push(path);

  return (
    <main className="min-h-screen w-full bg-paper text-ink">
      <Header navigateTo={navigateTo} />
      <HeroSection navigateTo={navigateTo} />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
