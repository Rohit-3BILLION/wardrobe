"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  Calendar,
  Trash2,
  Check,
  Shirt,
  Sparkles,
  Heart,
  History,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Outfit, WardrobeItem, WearHistoryRecord } from "@/lib/types";
import { WardrobeService } from "@/lib/services/wardrobeStorage";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function OutfitsPage() {
  const { user } = useAuth();
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [wearHistory, setWearHistory] = useState<WearHistoryRecord[]>([]);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [activeTab, setActiveTab] = useState<"saved" | "history">("saved");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (user?.id) {
        setIsLoading(true);
        const outfits = await WardrobeService.getSavedOutfits(user.id);
        const history = await WardrobeService.getWearHistory(user.id);
        const items = await WardrobeService.getItems(user.id);

        setSavedOutfits(outfits);
        setWearHistory(history);
        setWardrobeItems(items);
        setIsLoading(false);
      }
    }
    load();
  }, [user?.id]);

  const handleRemoveOutfit = (id: string) => {
    const raw = localStorage.getItem("closetcue_saved_outfits");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Outfit[];
        const filtered = parsed.filter((o) => o.id !== id);
        localStorage.setItem("closetcue_saved_outfits", JSON.stringify(filtered));
        setSavedOutfits(filtered);
      } catch {
        // ignore
      }
    }
  };

  const handleMarkAsWorn = async (outfit: Outfit) => {
    await WardrobeService.markAsWorn(outfit.id, user?.id || "demo-user-123456", "loved");
    const updatedHistory = await WardrobeService.getWearHistory(user?.id || "demo-user-123456");
    const updatedOutfits = await WardrobeService.getSavedOutfits(user?.id || "demo-user-123456");
    setWearHistory(updatedHistory);
    setSavedOutfits(updatedOutfits);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-espresso/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="terracotta">Lookbook</Badge>
              <span className="text-xs text-caramel font-semibold uppercase tracking-wider">
                {savedOutfits.length} curated combinations
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso mt-2">
              Saved Outfits & Wear Log
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-surface p-1 rounded-full border border-espresso/10 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "saved"
                  ? "bg-espresso text-cream shadow-sm"
                  : "text-espresso/70 hover:text-espresso"
              }`}
            >
              Saved Looks ({savedOutfits.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "history"
                  ? "bg-espresso text-cream shadow-sm"
                  : "text-espresso/70 hover:text-espresso"
              }`}
            >
              Wear History ({wearHistory.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Saved Outfits */}
        {activeTab === "saved" && (
          <div className="pt-8">
            {isLoading ? (
              <div className="py-20 text-center">
                <Sparkles className="w-8 h-8 text-terracotta animate-spin mx-auto mb-3" />
                <p className="text-sm text-espresso/60">Loading lookbook...</p>
              </div>
            ) : savedOutfits.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto space-y-4">
                <Bookmark className="w-12 h-12 text-caramel/40 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-espresso">
                  No Saved Outfits Yet
                </h3>
                <p className="text-sm text-espresso/70">
                  Head over to "Style Me" to generate outfits matching your mood and save your favourites here.
                </p>
                <Link href="/style-me">
                  <Button variant="primary" size="md">
                    Open Style Me
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedOutfits.map((outfit) => (
                  <Card
                    key={outfit.id}
                    className="bg-surface p-6 rounded-3xl border border-espresso/10 shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="terracotta">{outfit.mood}</Badge>
                          <span className="text-xs text-caramel font-semibold uppercase tracking-wider">
                            {outfit.occasion}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveOutfit(outfit.id)}
                          className="p-1.5 text-espresso/40 hover:text-red-600 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-espresso">
                        {outfit.name}
                      </h3>

                      <p className="text-xs font-serif italic text-espresso/75 leading-relaxed bg-cream/40 p-3 rounded-xl border border-espresso/5">
                        "{outfit.explanation}"
                      </p>

                      {/* Items thumbnails */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                        {outfit.items.map((oi, i) => {
                          const it = oi.item || wardrobeItems.find((w) => w.id === oi.wardrobe_item_id);
                          return (
                            <div key={i} className="group/outfitItem bg-cream/40 p-2 rounded-xl text-center border border-espresso/5 hover:border-terracotta/40 hover:-translate-y-1 hover:shadow-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer">
                              <div className="rounded-lg overflow-hidden aspect-square bg-cream/80 mb-1 flex items-center justify-center">
                                {it?.image_url ? (
                                  <img src={it.image_url} alt={it.name} className="w-full h-full object-cover group-hover/outfitItem:scale-115 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform" />
                                ) : (
                                  <Shirt className="w-4 h-4 text-caramel/40" />
                                )}
                              </div>
                              <p className="text-[10px] font-semibold text-espresso truncate">
                                {it?.name || "Item"}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-espresso/5 flex items-center justify-between text-xs">
                      <span className="text-espresso/60 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-caramel" />
                        Worn {outfit.worn_count || 0} times
                      </span>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMarkAsWorn(outfit)}
                        className="text-xs"
                      >
                        Mark as Worn Today
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wear History */}
        {activeTab === "history" && (
          <div className="pt-8">
            {wearHistory.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto space-y-4">
                <History className="w-12 h-12 text-caramel/40 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-espresso">
                  No Wear Log Yet
                </h3>
                <p className="text-sm text-espresso/70">
                  When you wear an outfit, mark it as worn to track your repeat frequency and maximize cost-per-wear!
                </p>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-3">
                {wearHistory.map((rec) => {
                  const outfit = savedOutfits.find((o) => o.id === rec.outfit_id);
                  return (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl bg-surface border border-espresso/10 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-peach/30 text-terracotta flex items-center justify-center font-bold">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-espresso">
                            {outfit?.name || "Curated Daily Outfit"}
                          </h4>
                          <p className="text-xs text-caramel font-medium">
                            {rec.worn_date} · Feedback: {rec.feedback || "Loved"}
                          </p>
                        </div>
                      </div>

                      <Badge variant="terracotta" className="text-[10px]">
                        Logged Worn
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
