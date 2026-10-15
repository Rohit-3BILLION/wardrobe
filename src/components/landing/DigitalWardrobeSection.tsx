"use client";

import React from "react";
import { Camera, SlidersHorizontal, Palette, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function DigitalWardrobeSection() {
  return (
    <section id="wardrobe" className="py-28 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <Badge variant="terracotta" className="gap-1.5 py-1 px-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Wardrobe Management</span>
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Curate without the chaos. <br />
            <span className="text-caramel italic font-normal">A living archive of your closet.</span>
          </h2>
          <p className="text-espresso/75 text-base sm:text-lg">
            Snap your clothes once. ClosetCue organizes them by category, color harmony,
            fabric weight, and occasion suitability.
          </p>
        </motion.div>

        {/* Bento Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Camera & Gallery Upload */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card elevated className="bg-surface h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-espresso">
                  Frictionless Image Capture
                </h3>
                <p className="text-espresso/70 text-sm leading-relaxed max-w-xl">
                  Photograph garments on a hanger, flat lay, or worn. Our vision recognition
                  pre-populates category, garment type, and color palettes—with full manual control
                  to adjust every detail before saving.
                </p>
              </div>

              {/* Visual Micro-Mockup */}
              <div className="mt-8 pt-6 border-t border-espresso/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { cat: "Jackets", count: "8 items", color: "bg-terracotta/20 text-terracotta" },
                  { cat: "Knitwear", count: "12 items", color: "bg-peach/30 text-caramel" },
                  { cat: "Trousers", count: "9 items", color: "bg-caramel/20 text-caramel" },
                  { cat: "Footwear", count: "7 pairs", color: "bg-espresso/10 text-espresso" },
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-cream/50 border border-espresso/5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${c.color} mb-1`}>
                      {c.cat}
                    </span>
                    <p className="text-xs font-semibold text-espresso">{c.count}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 2: Color Harmony Engine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card elevated className="bg-surface h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-peach/30 flex items-center justify-center text-caramel">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-espresso">
                  Color Palette Intelligence
                </h3>
                <p className="text-espresso/70 text-sm leading-relaxed">
                  Automatically extracts dominant tones, secondary accents, and contrasting hues
                  to build cohesive, warm, and sophisticated outfits.
                </p>
              </div>

              {/* Swatches Visual */}
              <div className="mt-8 pt-6 border-t border-espresso/5 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {["#F8F1E8", "#D99B79", "#B9684B", "#A87549", "#302923"].map((hex, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-surface shadow-sm"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-caramel">Natural Harmony</span>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 3: Ownership & Privacy First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Card elevated className="bg-surface h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-espresso">
                  Private & Isolated
                </h3>
                <p className="text-espresso/70 text-sm leading-relaxed">
                  Your wardrobe is your private sanctuary. Row-level security guarantees
                  that your photographs and style choices are only ever visible to you.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-espresso/5 flex items-center gap-2 text-xs font-medium text-terracotta">
                <span>Encrypted Storage · No Ad Tracking</span>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 4: Repeat-Wear & Wardrobe Utilization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card elevated className="bg-surface h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-espresso/5 flex items-center justify-center text-espresso">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-espresso">
                  Rediscover Forgotten Favorites
                </h3>
                <p className="text-espresso/70 text-sm leading-relaxed max-w-xl">
                  Most people wear only 20% of their wardrobe regularly. ClosetCue tracks wear
                  frequency and breathes new life into neglected pieces by pairing them in fresh,
                  unexpected combinations.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-espresso/5 flex flex-wrap items-center gap-4 text-xs text-espresso/75">
                <span className="px-3 py-1.5 rounded-lg bg-cream font-medium">✓ Maximize Cost-Per-Wear</span>
                <span className="px-3 py-1.5 rounded-lg bg-cream font-medium">✓ Sustainable Fashion Approach</span>
                <span className="px-3 py-1.5 rounded-lg bg-cream font-medium">✓ Mindful Daily Dressing</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
