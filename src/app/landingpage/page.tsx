"use client";

import { useRouter } from "next/navigation";
import Header from "./header";
import HeroSection from "./heroSection";
import FeaturesSection from "./features";
import Footer from "./footer";

export default function LandingPage() {
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
