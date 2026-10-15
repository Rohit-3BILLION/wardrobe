"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Plus, CloudSun, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="py-28 bg-surface border-b border-espresso/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <Badge variant="peach" className="gap-1.5 py-1 px-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard Experience</span>
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Your daily styling headquarters.
          </h2>
          <p className="text-espresso/75 text-base sm:text-lg">
            A clean, distraction-free Bento interface designed to help you start your morning
            with intention and confidence.
          </p>
        </motion.div>

        {/* Dashboard Bento Mockup Interface with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto rounded-3xl bg-cream/70 border border-espresso/10 p-4 sm:p-8 shadow-2xl"
        >
          {/* Top Bar inside mockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-espresso/10 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-caramel font-semibold">
                Thursday Morning
              </p>
              <h3 className="font-serif text-2xl font-bold text-espresso">
                Welcome back, Alex.
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-espresso/10 text-xs font-medium text-espresso/80">
                <CloudSun className="w-4 h-4 text-caramel" />
                <span>18°C · Mild & Breezy</span>
              </div>
              <Link href="/auth/register">
                <Button size="sm" variant="primary" className="gap-1.5 shadow-sm">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Bento Grid Interior */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Cell 1: Today's Recommended Outfit */}
            <Card className="md:col-span-2 bg-surface p-6 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="terracotta">Today's Curated Vibe: Relaxed Chic</Badge>
                  <span className="text-xs text-caramel font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Worn 1 time before
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-espresso mb-2">
                  Caramel Trench + Off-White Rib Knit + Wide Trousers
                </h4>
                <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed mb-6">
                  Selected for the mild 18°C forecast and your planned casual meetings. The drape
                  of the trench adds sophistication without sacrificing all-day ease.
                </p>

                {/* 3 Component Thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-cream/60 rounded-xl p-3 border border-espresso/5 text-center">
                    <div className="w-full h-16 rounded-lg bg-caramel/20 flex items-center justify-center text-caramel text-xs font-bold mb-2">
                      Outerwear
                    </div>
                    <p className="text-xs font-semibold text-espresso truncate">Caramel Trench</p>
                  </div>

                  <div className="bg-cream/60 rounded-xl p-3 border border-espresso/5 text-center">
                    <div className="w-full h-16 rounded-lg bg-peach/30 flex items-center justify-center text-terracotta text-xs font-bold mb-2">
                      Top
                    </div>
                    <p className="text-xs font-semibold text-espresso truncate">Ribbed Cream Knit</p>
                  </div>

                  <div className="bg-cream/60 rounded-xl p-3 border border-espresso/5 text-center">
                    <div className="w-full h-16 rounded-lg bg-espresso/15 flex items-center justify-center text-espresso text-xs font-bold mb-2">
                      Bottom
                    </div>
                    <p className="text-xs font-semibold text-espresso truncate">Sand Wide Trousers</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-espresso/5 flex items-center justify-between">
                <span className="text-xs text-espresso/60 font-medium">Ready to wear?</span>
                <Link href="/auth/register">
                  <Button variant="secondary" size="sm" className="gap-1">
                    <span>Mark As Worn Today</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Bento Cell 2: Wardrobe Snapshot */}
            <div className="space-y-6">
              <Card className="bg-surface p-6 rounded-2xl shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-caramel mb-4">
                  Wardrobe Composition
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-espresso/70">Total Catalogued</span>
                    <span className="font-bold text-espresso text-base">38 pieces</span>
                  </div>
                  <div className="w-full bg-cream rounded-full h-2 overflow-hidden flex">
                    <div className="bg-terracotta h-full w-[40%]" title="Tops 40%" />
                    <div className="bg-caramel h-full w-[30%]" title="Bottoms 30%" />
                    <div className="bg-peach h-full w-[15%]" title="Outerwear 15%" />
                    <div className="bg-espresso h-full w-[15%]" title="Shoes 15%" />
                  </div>
                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-espresso/60">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-terracotta" /> Tops (15)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-caramel" /> Bottoms (11)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-peach" /> Outerwear (6)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-espresso" /> Shoes (6)
                    </span>
                  </div>
                </div>
              </Card>

              {/* Style Me Quick Launcher */}
              <Card className="bg-terracotta text-white p-6 rounded-2xl flex flex-col justify-between shadow-md">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                    Instant Styling
                  </Badge>
                  <h4 className="font-serif text-xl font-bold">Have an upcoming event?</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Choose an occasion and vibe to create an outfit in seconds.
                  </p>
                </div>
                <div className="mt-4">
                  <Link href="/auth/register">
                    <Button variant="outline" size="sm" className="w-full bg-white text-terracotta border-transparent hover:bg-cream">
                      Launch "Style Me"
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
