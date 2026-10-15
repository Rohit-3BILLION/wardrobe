"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function PricingTiersSection() {
  return (
    <section id="features" className="py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <Badge variant="caramel" className="gap-1.5 py-1 px-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Roadmap</span>
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Free core wardrobe. <br />
            <span className="text-terracotta italic font-normal">Thoughtfully designed for longevity.</span>
          </h2>
          <p className="text-espresso/75 text-base sm:text-lg">
            Organizing your own clothes should never be locked behind a paywall.
            ClosetCue's core digital wardrobe is 100% free.
          </p>
        </motion.div>

        {/* Pricing Cards Grid with Scroll Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Core Wardrobe (Free Forever) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <Card elevated className="bg-surface h-full p-8 sm:p-10 rounded-3xl border-2 border-terracotta/40 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3.5 right-8">
                <Badge variant="terracotta" className="py-1 px-3 shadow-sm font-semibold">
                  Available Now · 100% Free
                </Badge>
              </div>

              <div>
                <div className="space-y-1 mb-6">
                  <span className="text-xs uppercase tracking-widest text-caramel font-bold">
                    Core Edition
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-espresso">
                    Essential Wardrobe
                  </h3>
                  <p className="text-sm text-espresso/70">
                    Everything you need to catalog your clothing and dress with intention every day.
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-espresso/10">
                  <span className="text-4xl font-serif font-bold text-espresso">$0</span>
                  <span className="text-xs text-espresso/60 uppercase tracking-wider font-medium">
                    Free forever
                  </span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3.5 text-sm text-espresso/80">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Unlimited digital wardrobe items</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>AI-assisted category & color detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Instant mood & occasion styling engine</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>100% strictly your own clothes (No hallucinated items)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Saved favourite outfits & wear frequency history</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Encrypted, private data with Row-Level Security</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6">
                <Link href="/auth/register" className="w-full block">
                  <Button variant="primary" size="lg" className="w-full gap-2 shadow-sm">
                    <span>Start Building Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Future Studio / Premium */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="bg-surface/60 h-full p-8 sm:p-10 rounded-3xl border border-espresso/10 flex flex-col justify-between relative opacity-90 shadow-sm">
              <div className="absolute -top-3.5 right-8">
                <Badge variant="outline" className="py-1 px-3 font-semibold bg-surface">
                  Future Roadmap
                </Badge>
              </div>

              <div>
                <div className="space-y-1 mb-6">
                  <span className="text-xs uppercase tracking-widest text-caramel font-bold">
                    Studio Edition
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-espresso">
                    Color & Sourcing Lab
                  </h3>
                  <p className="text-sm text-espresso/70">
                    Advanced seasonal color science and intelligent gaps analysis for the deliberate shopper.
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-espresso/10">
                  <span className="text-4xl font-serif font-bold text-espresso">Planned</span>
                  <span className="text-xs text-espresso/60 uppercase tracking-wider font-medium">
                    Premium Tier
                  </span>
                </div>

                {/* Future features */}
                <ul className="space-y-3.5 text-sm text-espresso/70">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-espresso/5 flex items-center justify-center text-caramel shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>Personal seasonal color analysis estimation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-espresso/5 flex items-center justify-center text-caramel shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>Palette-aware outfit harmonizing filters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-espresso/5 flex items-center justify-center text-caramel shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>Ethical store matching for identified wardrobe gaps</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-espresso/5 flex items-center justify-center text-caramel shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>Curated capsule wardrobe export kits</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6">
                <Button variant="outline" size="lg" disabled className="w-full opacity-60">
                  Coming Later
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Reassurance pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-espresso/60 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-caramel" />
            <span>Zero advertising trackers. Your style data is never sold or shared.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
