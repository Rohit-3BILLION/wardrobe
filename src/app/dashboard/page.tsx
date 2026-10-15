"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  CloudSun,
  Shirt,
  Bookmark,
  Calendar,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { WardrobeItem, Outfit } from "@/lib/types";
import { WardrobeService } from "@/lib/services/wardrobeStorage";
import { OutfitEngine } from "@/lib/services/outfitEngine";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [todayRecommendation, setTodayRecommendation] = useState<Outfit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState<string>("Today");

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    );

    async function load() {
      if (user?.id) {
        setIsLoading(true);
        const userItems = await WardrobeService.getItems(user.id);
        const userSaved = await WardrobeService.getSavedOutfits(user.id);
        setItems(userItems);
        setSavedOutfits(userSaved);

        if (userItems.length > 0) {
          const res = OutfitEngine.generateRecommendations(
            userItems,
            {
              mood: profile?.style_preferences?.[0] || "Confident",
              occasion: "Everyday wear",
              weatherTempC: 18,
            },
            user.id
          );
          if (res.outfits.length > 0) {
            setTodayRecommendation(res.outfits[0]);
          }
        }
        setIsLoading(false);
      }
    }
    load();
  }, [user?.id, profile]);

  const handleMarkAsWorn = async (outfit: Outfit) => {
    await WardrobeService.markAsWorn(outfit.id, user?.id || "demo-user-123456", "loved");
    const updated = await WardrobeService.getSavedOutfits(user?.id || "demo-user-123456");
    setSavedOutfits(updated);
  };

  // Wardrobe breakdown
  const topsCount = items.filter((i) => ["T-shirts", "Shirts", "Sweaters"].includes(i.category)).length;
  const bottomsCount = items.filter((i) => ["Trousers", "Jeans", "Shorts", "Skirts"].includes(i.category)).length;
  const outerwearCount = items.filter((i) => i.category === "Jackets").length;
  const shoesCount = items.filter((i) => i.category === "Shoes").length;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Top Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-espresso/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="terracotta">Personal Atelier</Badge>
              <span className="text-xs text-caramel font-semibold uppercase tracking-wider">
                {formattedDate}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso mt-2">
              Welcome back, {profile?.display_name || user?.display_name || "Alex"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface border border-espresso/10 text-xs font-medium text-espresso/80">
              <CloudSun className="w-4 h-4 text-caramel" />
              <span>{profile?.city ? `${profile.city} · 18°C Mild` : "18°C Mild Weather"}</span>
            </div>
            <Link href="/wardrobe">
              <Button size="sm" variant="primary" className="gap-1.5 shadow-sm">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
          {/* Bento Cell 1: Today's Style Pick (2 cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            <Card elevated className="bg-surface p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="terracotta">
                    Today's Curated Look · {todayRecommendation?.mood || "Confident"}
                  </Badge>
                  <span className="text-xs text-caramel font-semibold uppercase tracking-wider">
                    {todayRecommendation?.occasion || "Everyday wear"}
                  </span>
                </div>

                {todayRecommendation ? (
                  <>
                    <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                      {todayRecommendation.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-serif italic text-espresso/70 leading-relaxed mb-6">
                      "{todayRecommendation.explanation}"
                    </p>

                    {/* Wardrobe Items Display */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {todayRecommendation.items.map((oi, i) => {
                        const it = oi.item || items.find((x) => x.id === oi.wardrobe_item_id);
                        return (
                          <div
                            key={i}
                            className="group/thumb bg-cream/40 rounded-xl p-2.5 border border-espresso/5 hover:border-terracotta/30 hover:bg-cream/70 hover:-translate-y-1 hover:shadow-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between cursor-pointer"
                          >
                            <div className="rounded-lg overflow-hidden aspect-square bg-cream/80 mb-2 relative flex items-center justify-center">
                              {it?.image_url ? (
                                <img
                                  src={it.image_url}
                                  alt={it.name}
                                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                                />
                              ) : (
                                <Shirt className="w-6 h-6 text-caramel/40" />
                              )}
                              <span className="absolute bottom-1 left-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface/90 text-espresso transition-transform group-hover/thumb:scale-105">
                                {oi.garment_role}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-espresso truncate">
                              {it?.name || "Item"}
                            </p>
                            <p className="text-[10px] text-caramel font-medium">
                              {it?.primary_color}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <Shirt className="w-10 h-10 text-caramel/40 mx-auto" />
                    <p className="text-sm font-medium text-espresso">
                      Upload your clothes to receive daily curated outfits.
                    </p>
                    <Link href="/wardrobe">
                      <Button variant="primary" size="sm">
                        Add Garments
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {todayRecommendation && (
                <div className="pt-4 border-t border-espresso/5 flex items-center justify-between">
                  <Link href="/style-me">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-caramel">
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Explore other vibes</span>
                    </Button>
                  </Link>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMarkAsWorn(todayRecommendation)}
                    className="gap-1.5 text-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Mark As Worn</span>
                  </Button>
                </div>
              )}
            </Card>

            {/* Bento Cell 2: Recently Added Clothes */}
            <Card className="bg-surface p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-lg font-bold text-espresso">
                  Recently Catalogued
                </h4>
                <Link
                  href="/wardrobe"
                  className="text-xs font-medium text-terracotta hover:underline"
                >
                  View all ({items.length})
                </Link>
              </div>

              {items.length === 0 ? (
                <p className="text-xs text-espresso/60 py-4">No clothing items catalogued yet.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {items.slice(0, 6).map((item) => (
                    <Link
                      key={item.id}
                      href="/wardrobe"
                      className="group rounded-xl overflow-hidden aspect-square bg-cream/40 border border-espresso/5 hover:border-terracotta/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] relative block"
                      title={item.name}
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                      />
                      <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1 text-center">
                        <span className="text-[10px] text-white font-medium line-clamp-2">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Bento Cell 3: Right Sidebar Controls & Statistics */}
          <div className="space-y-6">
            {/* Quick "Style Me" Action Launcher */}
            <Card className="bg-terracotta text-white p-6 rounded-3xl shadow-md space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                  Daily Stylist
                </Badge>
                <h3 className="font-serif text-2xl font-bold leading-tight">
                  Need an outfit for an event?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Select your mood or describe your vibe in free-text. We generate coordinated looks using your real clothes.
                </p>
              </div>

              <Link href="/style-me" className="block pt-2">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full bg-white text-terracotta border-transparent hover:bg-cream font-medium gap-2 shadow-sm"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Launch "Style Me"</span>
                </Button>
              </Link>
            </Card>

            {/* Wardrobe Composition Summary */}
            <Card className="bg-surface p-6 rounded-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-caramel mb-4">
                Wardrobe Composition
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-espresso/70">Total Wardrobe Pieces</span>
                  <span className="font-bold text-espresso text-base">{items.length}</span>
                </div>

                {/* Progress bar visual */}
                {items.length > 0 && (
                  <div className="w-full bg-cream rounded-full h-2.5 overflow-hidden flex">
                    <div
                      className="bg-terracotta h-full"
                      style={{ width: `${(topsCount / items.length) * 100}%` }}
                      title={`Tops: ${topsCount}`}
                    />
                    <div
                      className="bg-caramel h-full"
                      style={{ width: `${(bottomsCount / items.length) * 100}%` }}
                      title={`Bottoms: ${bottomsCount}`}
                    />
                    <div
                      className="bg-peach h-full"
                      style={{ width: `${(outerwearCount / items.length) * 100}%` }}
                      title={`Outerwear: ${outerwearCount}`}
                    />
                    <div
                      className="bg-espresso h-full"
                      style={{ width: `${(shoesCount / items.length) * 100}%` }}
                      title={`Shoes: ${shoesCount}`}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs text-espresso/70 pt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-terracotta" /> Tops ({topsCount})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-caramel" /> Bottoms ({bottomsCount})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-peach" /> Outerwear ({outerwearCount})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-espresso" /> Shoes ({shoesCount})
                  </span>
                </div>
              </div>
            </Card>

            {/* Saved Outfits Snippet */}
            <Card className="bg-surface p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-caramel flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Saved Favourites</span>
                </h4>
                <Link href="/outfits" className="text-xs text-terracotta hover:underline">
                  View all ({savedOutfits.length})
                </Link>
              </div>

              {savedOutfits.length === 0 ? (
                <p className="text-xs text-espresso/60 py-3">
                  No favourite outfits saved yet. Use "Style Me" to discover and save combinations!
                </p>
              ) : (
                <div className="space-y-2 pt-1">
                  {savedOutfits.slice(0, 3).map((outfit) => (
                    <div
                      key={outfit.id}
                      className="p-2.5 rounded-xl bg-cream/40 border border-espresso/5 flex items-center justify-between"
                    >
                      <div className="overflow-hidden pr-2">
                        <p className="text-xs font-semibold text-espresso truncate">
                          {outfit.name}
                        </p>
                        <p className="text-[10px] text-caramel">{outfit.mood} · {outfit.occasion}</p>
                      </div>
                      <span className="text-[10px] font-bold text-espresso/50">
                        {outfit.items.length} pcs
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
