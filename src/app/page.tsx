import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { DigitalWardrobeSection } from "@/components/landing/DigitalWardrobeSection";
import { MoodStylistSection } from "@/components/landing/MoodStylistSection";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { PricingTiersSection } from "@/components/landing/PricingTiersSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-espresso selection:bg-terracotta selection:text-white">
      <Navbar />
      <HeroSection />
      <DigitalWardrobeSection />
      <MoodStylistSection />
      <DashboardPreviewSection />
      <PricingTiersSection />
      <Footer />
    </main>
  );
}
