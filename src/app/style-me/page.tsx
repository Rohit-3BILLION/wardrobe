"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Bookmark,
  Check,
  Calendar,
  Layers,
  AlertTriangle,
  Shirt,
  Compass,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { WardrobeItem, Outfit, MoodVibe, OccasionType } from "@/lib/types";
import { WardrobeService } from "@/lib/services/wardrobeStorage";
import { OutfitEngine } from "@/lib/services/outfitEngine";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const MOODS: MoodVibe[] = [
  "Confident",
  "Relaxed",
  "Classy",
  "Minimal",
  "Streetwear",
  "Sporty",
  "Creative",
  "Romantic",
  "Professional",
  "Bold",
];

const OCCASIONS: OccasionType[] = [
  "Everyday wear",
  "Casual outing",
  "Work",
  "Date",
  "College / University",
  "Party",
  "Interview",
  "Travel",
  "Special event",
];

export default function StyleMePage() {
  const { user, profile } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [isLoadingWardrobe, setIsLoadingWardrobe] = useState(true);

  // Styling inputs
  const [selectedMood, setSelectedMood] = useState<string>("Confident");
  const [customMoodInput, setCustomMoodInput] = useState<string>("");
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>("Everyday wear");
  const [weatherAware, setWeatherAware] = useState<boolean>(true);

  // Recommendations state
  const [recommendations, setRecommendations] = useState<Outfit[]>([]);
  const [missingCategories, setMissingCategories] = useState<string[] | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedOutfitIds, setSavedOutfitIds] = useState<string[]>([]);
  const [wornOutfitIds, setWornOutfitIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      if (user?.id) {
        setIsLoadingWardrobe(true);
        const items = await WardrobeService.getItems(user.id);
        setWardrobeItems(items);
        setIsLoadingWardrobe(false);

        // Generate initial batch
        if (items.length > 0) {
          const res = OutfitEngine.generateRecommendations(
            items,
            {
              mood: "Confident",
              occasion: "Everyday wear",
              weatherTempC: 18,
            },
            user.id
          );
          setRecommendations(res.outfits);
          setMissingCategories(res.missingCategories);
        }
      }
    }
    load();
  }, [user?.id]);

  const handleGenerate = () => {
    if (wardrobeItems.length === 0) return;

    setIsGenerating(true);
    const activeMood = customMoodInput.trim() || selectedMood;

    setTimeout(() => {
      const res = OutfitEngine.generateRecommendations(
        wardrobeItems,
        {
          mood: activeMood,
          occasion: selectedOccasion,
          weatherTempC: weatherAware ? 17 : undefined,
        },
        user?.id || "demo-user-123456"
      );
      setRecommendations(res.outfits);
      setMissingCategories(res.missingCategories);
      setIsGenerating(false);
    }, 300);
  };

  const handleSaveOutfit = async (outfit: Outfit) => {
    await WardrobeService.saveOutfit(outfit);
    setSavedOutfitIds((prev) => [...prev, outfit.id]);
  };

  const handleMarkAsWorn = async (outfit: Outfit) => {
    await WardrobeService.markAsWorn(outfit.id, user?.id || "demo-user-123456", "loved");
    setWornOutfitIds((prev) => [...prev, outfit.id]);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Top Heading */}
        <div className="max-w-3xl mb-10">
          <Badge variant="terracotta" className="gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Stylist Atelier</span>
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-espresso tracking-tight">
            Style Me Today
          </h1>
          <p className="text-espresso/70 text-base sm:text-lg mt-2">
            Harmonizing your mood with the pieces hanging in your actual closet.
          </p>
        </div>

        {/* Input Configuration Bento Panel */}
        <Card className="bg-surface p-6 sm:p-8 rounded-3xl border border-espresso/10 shadow-sm mb-12">
          <div className="space-y-6">
            {/* 1. Mood Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-caramel">
                  1. How do you want to feel? (Mood / Vibe)
                </label>
                {customMoodInput && (
                  <span className="text-xs text-terracotta font-medium">
                    Custom vibe active
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {MOODS.map((mood) => {
                  const active = selectedMood === mood && !customMoodInput;
                  return (
                    <button
                      key={mood}
                      onClick={() => {
                        setSelectedMood(mood);
                        setCustomMoodInput("");
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        active
                          ? "bg-espresso text-cream shadow-sm scale-105"
                          : "bg-cream/60 text-espresso/70 hover:bg-cream border border-espresso/10"
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>

              {/* Free-form custom mood input */}
              <div className="max-w-md">
                <input
                  type="text"
                  value={customMoodInput}
                  onChange={(e) => setCustomMoodInput(e.target.value)}
                  placeholder="Or express your vibe in your own words (e.g. 'Cozy French Coffee Run')..."
                  className="w-full px-3.5 py-2 text-xs bg-cream/30 border border-espresso/15 rounded-xl text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
              </div>
            </div>

            {/* 2. Occasion Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-caramel mb-3">
                2. Where are you going? (Occasion)
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => {
                  const active = selectedOccasion === occ;
                  return (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        active
                          ? "bg-terracotta text-white shadow-sm"
                          : "bg-cream/60 text-espresso/70 hover:bg-cream border border-espresso/10"
                      }`}
                    >
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Controls & Weather Toggle */}
            <div className="pt-4 border-t border-espresso/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={weatherAware}
                  onChange={(e) => setWeatherAware(e.target.checked)}
                  className="w-4 h-4 rounded text-terracotta focus:ring-terracotta border-espresso/20"
                />
                <span className="text-xs text-espresso/80 font-medium">
                  Weather-aware layering (Factoring {profile?.city || "Local"} weather)
                </span>
              </label>

              <Button
                variant="primary"
                size="md"
                onClick={handleGenerate}
                disabled={isGenerating || wardrobeItems.length === 0}
                className="gap-2 shadow-sm self-start sm:self-auto"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                <span>Curate Outfits</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Missing items notification if wardrobe is incomplete */}
        {missingCategories && missingCategories.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-900">
                Wardrobe Composition Alert: Missing {missingCategories.join(", ")}
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                ClosetCue generates outfits solely from your physical wardrobe. To unlock full
                outfit combinations, consider cataloguing items in these categories.
              </p>
              <Link href="/wardrobe" className="inline-block text-xs font-semibold text-terracotta hover:underline pt-1">
                + Add missing garments to closet
              </Link>
            </div>
          </div>
        )}

        {/* Generated Recommendations Showcase */}
        {isLoadingWardrobe ? (
          <div className="py-20 text-center">
            <Sparkles className="w-8 h-8 text-terracotta animate-spin mx-auto mb-3" />
            <p className="text-sm text-espresso/60">Scanning your wardrobe fabrics and colors...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-4">
            <Shirt className="w-12 h-12 text-caramel/40 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-espresso">
              Wardrobe Needs Items
            </h3>
            <p className="text-sm text-espresso/70">
              Please upload at least a top and a bottom to generate outfit recommendations.
            </p>
            <Link href="/wardrobe">
              <Button variant="primary" size="md">
                Go to Wardrobe Manager
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-espresso">
                Curated Recommendations ({recommendations.length} Options)
              </h2>
              <span className="text-xs text-caramel font-semibold">
                Mood: {customMoodInput || selectedMood} · {selectedOccasion}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {recommendations.map((outfit, index) => {
                const isSaved = savedOutfitIds.includes(outfit.id);
                const isWorn = wornOutfitIds.includes(outfit.id);

                return (
                  <Card
                    key={outfit.id}
                    className="bg-surface p-6 sm:p-8 rounded-3xl border border-espresso/10 shadow-md space-y-6"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-espresso/10 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="terracotta">Look 0{index + 1}</Badge>
                          <span className="text-xs font-medium text-caramel uppercase tracking-wider">
                            {outfit.occasion}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-espresso mt-1">
                          {outfit.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={isSaved ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleSaveOutfit(outfit)}
                          className="gap-1.5"
                        >
                          {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          <span>{isSaved ? "Saved" : "Save Look"}</span>
                        </Button>

                        <Button
                          variant={isWorn ? "primary" : "ghost"}
                          size="sm"
                          onClick={() => handleMarkAsWorn(outfit)}
                          className="gap-1.5"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{isWorn ? "Marked as Worn" : "Wear Today"}</span>
                        </Button>
                      </div>
                    </div>

                    {/* Editorial Explanation */}
                    <div className="p-4 rounded-2xl bg-cream/50 border border-espresso/5">
                      <p className="text-sm font-serif italic text-espresso/80 leading-relaxed">
                        "{outfit.explanation}"
                      </p>
                    </div>

                    {/* Components Grid (Real Wardrobe Pieces) */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-caramel mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Composed from your clothing items:</span>
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {outfit.items.map((oi, i) => {
                          const item =
                            oi.item ||
                            wardrobeItems.find((w) => w.id === oi.wardrobe_item_id);

                          return (
                            <div
                              key={i}
                              className="group/comp bg-cream/30 rounded-2xl p-3 border border-espresso/5 hover:border-terracotta/40 hover:-translate-y-1 hover:shadow-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between cursor-pointer"
                            >
                              <div>
                                <div className="rounded-xl overflow-hidden aspect-square bg-cream/60 mb-2 relative flex items-center justify-center">
                                  {item?.image_url ? (
                                    <img
                                      src={item.image_url}
                                      alt={item.name}
                                      className="w-full h-full object-cover group-hover/comp:scale-110 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                                    />
                                  ) : (
                                    <Shirt className="w-6 h-6 text-caramel/40" />
                                  )}
                                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface/90 text-espresso backdrop-blur-sm transition-transform group-hover/comp:scale-105">
                                    {oi.garment_role}
                                  </span>
                                </div>
                                <h4 className="font-medium text-xs text-espresso line-clamp-1">
                                  {item?.name || "Wardrobe Item"}
                                </h4>
                              </div>
                              <p className="text-[11px] text-caramel font-medium mt-1">
                                {item?.primary_color}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
