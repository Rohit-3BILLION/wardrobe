"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Compass,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Hero3DWrapper } from "./Hero3DWrapper";

const HERO_VIBES = [
  { label: "Confident", emoji: "💼", color: "#B9684B", preview: "Structured wool & crisp lines" },
  { label: "Relaxed", emoji: "☕", color: "#A87549", preview: "Sun-washed linen & relaxed denim" },
  { label: "Classy", emoji: "🍷", color: "#302923", preview: "Monochrome espresso & fine cashmere" },
  { label: "Streetwear", emoji: "🧢", color: "#B9684B", preview: "Utility chore jackets & boxy cuts" },
  { label: "Romantic", emoji: "🌸", color: "#D99B79", preview: "Muted peach silk & gentle drapes" },
];

export function HeroSection() {
  const [activeVibeIndex, setActiveVibeIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const currentVibe = HERO_VIBES[activeVibeIndex];

  // Auto-cycle the mood word every 3.5 seconds unless user manually interacts
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveVibeIndex((prev) => (prev + 1) % HERO_VIBES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  // Track mouse coordinates inside hero for the ambient fashion spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const wardrobeSection = document.getElementById("wardrobe");
    if (wardrobeSection) {
      const navOffset = 70;
      const elementPosition = wardrobeSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  const handleVibeClick = (index: number) => {
    setActiveVibeIndex(index);
    setIsAutoCycling(false);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-cream min-h-screen flex flex-col justify-between select-none"
    >
      {/* Interactive Ambient Mouse Spotlight Halo */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 155, 121, 0.18), transparent 75%)`,
        }}
      />

      {/* Atmospheric Background Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-peach/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Interactive Editorial Headline & Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Subtitle Badge with Micro-Interactivity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2"
            >
              <Badge
                variant="terracotta"
                className="py-1.5 px-3.5 text-xs font-semibold uppercase tracking-wider shadow-sm hover:scale-105 transition-transform cursor-pointer"
                onClick={() => {
                  setActiveVibeIndex((prev) => (prev + 1) % HERO_VIBES.length);
                  setIsAutoCycling(false);
                }}
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                <span>AI-Powered Personal Stylist</span>
              </Badge>
              <span className="text-xs uppercase tracking-widest text-caramel font-semibold hidden sm:inline-block">
                Digital Wardrobe Platform
              </span>
            </motion.div>

            {/* Core Animated Headline with Dynamic Interactive Word Flip */}
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-espresso leading-[1.08]"
              >
                <span>Your wardrobe.</span>
                <br />
                {/* Dynamic Rotating Mood Pill */}
                <span className="inline-flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                  <span className="font-normal italic text-espresso/60">Your</span>
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    onClick={() => {
                      setActiveVibeIndex((prev) => (prev + 1) % HERO_VIBES.length);
                      setIsAutoCycling(false);
                    }}
                    className="relative cursor-pointer inline-flex items-center px-4 py-1 rounded-2xl bg-surface/90 border border-espresso/10 hover:border-terracotta/40 shadow-sm hover:shadow-md transition-colors duration-300 hover:scale-105 active:scale-95 group select-none"
                    title="Click to switch vibe"
                  >
                    <span className="relative inline-flex items-center overflow-hidden h-[1.2em]">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={currentVibe.label}
                          initial={{ y: "110%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-110%", opacity: 0 }}
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          className="italic font-normal text-terracotta inline-flex items-center gap-2 will-change-transform"
                        >
                          <span>{currentVibe.label}</span>
                          <span className="text-2xl not-italic">{currentVibe.emoji}</span>
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <RefreshCw className="w-3.5 h-3.5 text-espresso/30 ml-2 group-hover:text-terracotta group-hover:rotate-180 transition-all duration-500 shrink-0" />
                  </motion.span>
                  <span className="font-normal italic text-espresso/60">mood.</span>
                </span>
                <br />
                <span>Your style.</span>
              </motion.h1>
            </div>

            {/* Interactive Vibe Chips Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-caramel mr-1">
                  Try Vibes:
                </span>
                {HERO_VIBES.map((vibe, idx) => {
                  const isActive = idx === activeVibeIndex;
                  return (
                    <button
                      key={vibe.label}
                      onClick={() => handleVibeClick(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? "bg-espresso text-cream shadow-md scale-105 ring-2 ring-terracotta/40"
                          : "bg-surface/80 text-espresso/70 hover:bg-surface hover:text-espresso border border-espresso/10 hover:scale-102"
                      }`}
                    >
                      <span>{vibe.emoji}</span>
                      <span>{vibe.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Vibe Description Subtext with Smooth Roll */}
              <div className="h-5 relative overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={currentVibe.label}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="text-xs text-espresso/60 italic font-serif truncate will-change-transform"
                  >
                    "{currentVibe.preview} — tailored from physical pieces in your wardrobe"
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Supporting Copy with Stagger */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-espresso/80 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Turn the clothes you already own into outfits that feel like you.
              Organize your digital closet, explore your vibe, and let ClosetCue help you
              decide what to wear every morning—without inventing unavailable clothes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1"
            >
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-md group">
                  <span>Build Your Wardrobe</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#wardrobe" onClick={scrollToExplore} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <Compass className="w-4 h-4 text-caramel" />
                  <span>Explore ClosetCue</span>
                </Button>
              </a>
            </motion.div>

            {/* Trust and Feature Micro-Badges with Interactive Hover Lift */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 border-t border-espresso/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left"
            >
              {[
                { title: "100% Real Clothes", desc: "No fabricated garments" },
                { title: "Bento Wardrobe", desc: "Modular categorization" },
                { title: "Zero Hallucination", desc: "Isolated owner vault" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-surface/60 border border-espresso/5 hover:border-terracotta/30 hover:bg-surface hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 flex items-start gap-2 cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-espresso">{badge.title}</p>
                    <p className="text-[10px] text-espresso/60">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Scene / Spatial Curation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-full relative">
              <Hero3DWrapper />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator Button */}
      <div className="relative z-10 text-center pt-8 pb-2">
        <button
          onClick={scrollToExplore}
          className="inline-flex flex-col items-center gap-1.5 text-espresso/50 hover:text-terracotta transition-colors group cursor-pointer"
          title="Scroll to discover features"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase">
            Scroll to Explore
          </span>
          <div className="w-8 h-8 rounded-full border border-espresso/15 flex items-center justify-center group-hover:border-terracotta/40 transition-colors bg-surface/50 shadow-sm animate-bounce">
            <ChevronDown className="w-4 h-4 text-terracotta" />
          </div>
        </button>
      </div>
    </section>
  );
}
