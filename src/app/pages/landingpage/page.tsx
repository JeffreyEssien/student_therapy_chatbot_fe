"use client";

import { useRouter } from "next/navigation";
import Header from "../landingpage/header";
import HeroSection from "../landingpage/heroSection";
import FeaturesSection from "../landingpage/features";
import Footer from "../landingpage/footer"; // Add this import

export default function LandingPage() {
  const router = useRouter();
  const navigateTo = (path: string) => router.push(path);

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 text-gray-700 min-h-screen">
      <Header navigateTo={navigateTo} />
      <HeroSection navigateTo={navigateTo} />
      <FeaturesSection />
      <Footer /> {/* Add the footer here */}
    </div>
  );
}