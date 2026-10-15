"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Bookmark, Heart, Shirt, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface OutfitDemo {
  mood: string;
  occasion: string;
  title: string;
  description: string;
  items: {
    category: string;
    name: string;
    color: string;
    colorHex: string;
    tag: string;
  }[];
}

const SAMPLE_OUTFITS: Record<string, OutfitDemo> = {
  Confident: {
    mood: "Confident",
    occasion: "Work / Presentation",
    title: "Structured Terracotta & Crisp Lines",
    description:
      "A tailored terracotta blazer commands subtle authority, grounded by structured sand chinos and polished caramel loafers for an elevated, self-assured presence.",
    items: [
      {
        category: "Outerwear",
        name: "Tailored Terracotta Blazer",
        color: "Terracotta",
        colorHex: "#B9684B",
        tag: "100% Italian Wool",
      },
      {
        category: "Shirts",
        name: "Classic Silk-Blend Cream Shirt",
        color: "Warm Cream",
        colorHex: "#F8F1E8",
        tag: "Clean Collar",
      },
      {
        category: "Trousers",
        name: "Pleated Sand Tailored Chinos",
        color: "Sand Khaki",
        colorHex: "#D8C7B5",
        tag: "High Waisted",
      },
      {
        category: "Shoes",
        name: "Burnished Caramel Loafers",
        color: "Caramel Leather",
        colorHex: "#A87549",
        tag: "Brushed Brass Bit",
      },
    ],
  },
  Relaxed: {
    mood: "Relaxed",
    occasion: "Casual Outing / Weekend",
    title: "Sun-Washed Linen & Textured Denim",
    description:
      "Effortless layering with breathable materials. The soft muted peach knit pairs naturally with relaxed selvedge denim for laid-back weekend elegance.",
    items: [
      {
        category: "Sweaters",
        name: "Muted Peach Open-Knit Cardigan",
        color: "Muted Peach",
        colorHex: "#D99B79",
        tag: "Soft Bouclé",
      },
      {
        category: "T-shirts",
        name: "Heavyweight Boxy White Tee",
        color: "Pure White",
        colorHex: "#FFFFFF",
        tag: "Organic Cotton",
      },
      {
        category: "Jeans",
        name: "Relaxed Straight Vintage Denim",
        color: "Washed Indigo",
        colorHex: "#6B7C8E",
        tag: "Mid-Rise",
      },
      {
        category: "Shoes",
        name: "Minimalist Suede Court Sneakers",
        color: "Sand Suede",
        colorHex: "#E5DACD",
        tag: "Cushioned Sole",
      },
    ],
  },
  Classy: {
    mood: "Classy",
    occasion: "Date Night / Gallery Opening",
    title: "Monochrome Espresso & Cashmere Drapes",
    description:
      "Refined minimalism inspired by European salons. Deep espresso contrasts with warm caramel leather for an understated, timelessly chic impression.",
    items: [
      {
        category: "Sweaters",
        name: "Fine-Gauge Espresso Merino Turtleneck",
        color: "Deep Espresso",
        colorHex: "#302923",
        tag: "Merino Wool",
      },
      {
        category: "Trousers",
        name: "Fluid Charcoal Wide-Leg Trousers",
        color: "Charcoal",
        colorHex: "#454545",
        tag: "Deep Pleats",
      },
      {
        category: "Bags",
        name: "Structured Caramel Crossbody",
        color: "Caramel Leather",
        colorHex: "#A87549",
        tag: "Minimalist Hardware",
      },
      {
        category: "Shoes",
        name: "Sleek Pointed Leather Ankle Boots",
        color: "Black Espresso",
        colorHex: "#221E1B",
        tag: "Cuban Heel",
      },
    ],
  },
  Streetwear: {
    mood: "Streetwear",
    occasion: "City Exploration / Creative Meet",
    title: "Architectural Workwear & Bold Silhouettes",
    description:
      "Structured utility jacket layered over oversized jersey. Earthy terracotta accents give contemporary street style a grounded editorial tone.",
    items: [
      {
        category: "Jackets",
        name: "Boxy Terracotta Canvas Chore Jacket",
        color: "Terracotta",
        colorHex: "#B9684B",
        tag: "Heavy Duck Canvas",
      },
      {
        category: "T-shirts",
        name: "Oversized Off-White Graphic Tee",
        color: "Off-White",
        colorHex: "#FAF7F2",
        tag: "Dropped Shoulder",
      },
      {
        category: "Trousers",
        name: "Double-Knee Carpenter Pants",
        color: "Caramel Brown",
        colorHex: "#8B5F37",
        tag: "Relaxed Fit",
      },
      {
        category: "Shoes",
        name: "Retro Runner Suede Trainers",
        color: "Multi Earth",
        colorHex: "#B8A390",
        tag: "Gum Sole",
      },
    ],
  },
  Romantic: {
    mood: "Romantic",
    occasion: "Garden Brunch / Sunset Dinner",
    title: "Peach Silk Drapes & Soft Textures",
    description:
      "Flowing textiles and soft pastel undertones create poetic movement, balanced by delicate leather accents and gentle silhouettes.",
    items: [
      {
        category: "Dresses",
        name: "Muted Peach Tiered Silk Midi Dress",
        color: "Muted Peach",
        colorHex: "#D99B79",
        tag: "Mulberry Silk",
      },
      {
        category: "Jackets",
        name: "Cropped Cream Knit Bolero",
        color: "Warm Cream",
        colorHex: "#F8F1E8",
        tag: "Ribbed Cuff",
      },
      {
        category: "Accessories",
        name: "Vintage Hammered Gold Drop Earrings",
        color: "Brushed Gold",
        colorHex: "#D4AF37",
        tag: "Handcrafted",
      },
      {
        category: "Shoes",
        name: "Strappy Nude Kitten Heel Mules",
        color: "Warm Nude",
        colorHex: "#E2CCB8",
        tag: "Soft Leather",
      },
    ],
  },
};

const MOODS = ["Confident", "Relaxed", "Classy", "Streetwear", "Romantic"];

export function MoodStylistSection() {
  const [selectedMood, setSelectedMood] = useState<string>("Confident");
  const [isSaved, setIsSaved] = useState(false);

  const currentOutfit = SAMPLE_OUTFITS[selectedMood] || SAMPLE_OUTFITS["Confident"];

  return (
    <section id="mood-styling" className="py-28 bg-surface border-y border-espresso/5 relative overflow-hidden">
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
            <span>Interactive Styling Engine</span>
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Select your mood. <br />
            <span className="text-terracotta italic font-normal">We construct the outfit.</span>
          </h2>
          <p className="text-espresso/75 text-base sm:text-lg">
            Every recommendation is calculated from items in your actual wardrobe.
            Never generic catalogue links or garments you don’t own.
          </p>

          {/* Mood Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            {MOODS.map((mood) => {
              const active = mood === selectedMood;
              return (
                <button
                  key={mood}
                  onClick={() => {
                    setSelectedMood(mood);
                    setIsSaved(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-espresso text-cream shadow-md scale-105 ring-2 ring-terracotta/40"
                      : "bg-cream/80 text-espresso/70 hover:bg-cream hover:text-espresso border border-espresso/5 hover:scale-102"
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Outfit Showcase Card with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="bg-cream/40 border border-espresso/10 p-6 sm:p-10 rounded-3xl shadow-xl relative">
            {/* Top Bar inside Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-espresso/10 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="terracotta">Mood: {currentOutfit.mood}</Badge>
                  <span className="text-xs text-caramel font-semibold uppercase tracking-wider">
                    {currentOutfit.occasion}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mt-2">
                  {currentOutfit.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant={isSaved ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className="gap-1.5"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Saved to Favourites</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-caramel" />
                      <span>Save Outfit</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const idx = MOODS.indexOf(selectedMood);
                    const nextIdx = (idx + 1) % MOODS.length;
                    setSelectedMood(MOODS[nextIdx]);
                    setIsSaved(false);
                  }}
                  className="gap-1.5"
                  title="Generate another combination"
                >
                  <RefreshCw className="w-4 h-4 text-espresso/70" />
                  <span className="hidden sm:inline">Try Another</span>
                </Button>
              </div>
            </div>

            {/* Stylist Editorial Explanation */}
            <div className="py-6 border-b border-espresso/10">
              <p className="text-espresso/80 text-sm sm:text-base leading-relaxed italic font-serif">
                "{currentOutfit.description}"
              </p>
            </div>

            {/* Outfit Items Grid */}
            <div className="pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-caramel mb-4 flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                <span>Components from your digital closet ({currentOutfit.items.length} items)</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentOutfit.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-surface rounded-2xl p-4 border border-espresso/5 shadow-sm hover:border-terracotta/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Color indicator chip */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-espresso/50">
                          {item.category}
                        </span>
                        <div
                          className="w-4 h-4 rounded-full border border-espresso/10 shadow-inner"
                          style={{ backgroundColor: item.colorHex }}
                          title={item.color}
                        />
                      </div>
                      <h4 className="font-medium text-sm text-espresso line-clamp-2">
                        {item.name}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-espresso/5 flex items-center justify-between">
                      <span className="text-xs text-espresso/60">{item.tag}</span>
                      <Heart className="w-3.5 h-3.5 text-espresso/30 hover:text-terracotta cursor-pointer transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
