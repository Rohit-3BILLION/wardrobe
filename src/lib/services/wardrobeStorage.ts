"use client";

import { WardrobeItem, Outfit, WearHistoryRecord, ClothingCategory, MoodVibe, OccasionType } from "@/lib/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const LOCAL_WARDROBE_KEY = "closetcue_wardrobe_items";
const LOCAL_OUTFITS_KEY = "closetcue_saved_outfits";
const LOCAL_WEAR_HISTORY_KEY = "closetcue_wear_history";

// Initial realistic default wardrobe pieces with warm editorial fashion aesthetics
const DEFAULT_INITIAL_ITEMS: WardrobeItem[] = [
  {
    id: "item-01",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
    name: "Tailored Terracotta Wool Blazer",
    category: "Jackets",
    primary_color: "Terracotta",
    secondary_colors: ["Caramel"],
    style_tags: ["Tailored", "Classy", "Confident"],
    season_weather: "Cold",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "item-02",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    name: "Classic Silk-Blend Cream Shirt",
    category: "Shirts",
    primary_color: "Warm Cream",
    secondary_colors: ["Ivory"],
    style_tags: ["Minimalist", "Classy", "Work"],
    season_weather: "All-Season",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "item-03",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80",
    name: "Pleated Sand Tailored Chinos",
    category: "Trousers",
    primary_color: "Sand Khaki",
    secondary_colors: ["Caramel"],
    style_tags: ["Tailored", "Classy", "Minimal"],
    season_weather: "Transitional",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "item-04",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80",
    name: "Burnished Caramel Bit Loafers",
    category: "Shoes",
    primary_color: "Caramel",
    secondary_colors: ["Gold"],
    style_tags: ["Classy", "Heritage", "Work"],
    season_weather: "All-Season",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "item-05",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
    name: "Muted Peach Open Knit Cardigan",
    category: "Sweaters",
    primary_color: "Muted Peach",
    secondary_colors: ["Cream"],
    style_tags: ["Relaxed", "Romantic", "Soft"],
    season_weather: "Transitional",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "item-06",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80",
    name: "Relaxed Straight Vintage Selvedge Denim",
    category: "Jeans",
    primary_color: "Washed Indigo",
    secondary_colors: ["Blue"],
    style_tags: ["Relaxed", "Streetwear", "Everyday"],
    season_weather: "All-Season",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "item-07",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    name: "Heavyweight Boxy White Tee",
    category: "T-shirts",
    primary_color: "Warm Cream",
    secondary_colors: ["White"],
    style_tags: ["Minimalist", "Everyday", "Streetwear"],
    season_weather: "Warm",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "item-08",
    user_id: "demo-user-123456",
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    name: "Structured Caramel Crossbody Bag",
    category: "Bags",
    primary_color: "Caramel",
    secondary_colors: ["Brass"],
    style_tags: ["Classy", "Minimal", "Essential"],
    season_weather: "All-Season",
    status: "active",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export const WardrobeService = {
  // Get all wardrobe items
  getItems: async (userId: string): Promise<WardrobeItem[]> => {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("wardrobe_items")
          .select("*")
          .eq("user_id", userId)
          .eq("status", "active")
          .order("created_at", { ascending: false });

        if (!error && data) {
          return data as WardrobeItem[];
        }
      }
    }

    // LocalStorage fallback
    const raw = localStorage.getItem(LOCAL_WARDROBE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_WARDROBE_KEY, JSON.stringify(DEFAULT_INITIAL_ITEMS));
      return DEFAULT_INITIAL_ITEMS;
    }
    try {
      const items = JSON.parse(raw) as WardrobeItem[];
      return items.filter((i) => i.status === "active");
    } catch {
      return DEFAULT_INITIAL_ITEMS;
    }
  },

  // Save new item
  addItem: async (item: Omit<WardrobeItem, "id" | "created_at" | "updated_at">): Promise<WardrobeItem> => {
    const newItem: WardrobeItem = {
      ...item,
      id: `item-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("wardrobe_items")
          .insert([newItem])
          .select()
          .single();

        if (!error && data) {
          return data as WardrobeItem;
        }
      }
    }

    // Local fallback
    const existing = await WardrobeService.getItems(item.user_id);
    const updated = [newItem, ...existing];
    localStorage.setItem(LOCAL_WARDROBE_KEY, JSON.stringify(updated));
    return newItem;
  },

  // Update item
  updateItem: async (id: string, updates: Partial<WardrobeItem>): Promise<WardrobeItem | null> => {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("wardrobe_items")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          return data as WardrobeItem;
        }
      }
    }

    const raw = localStorage.getItem(LOCAL_WARDROBE_KEY);
    if (!raw) return null;
    try {
      const items = JSON.parse(raw) as WardrobeItem[];
      const idx = items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates, updated_at: new Date().toISOString() };
        localStorage.setItem(LOCAL_WARDROBE_KEY, JSON.stringify(items));
        return items[idx];
      }
    } catch {
      // ignore
    }
    return null;
  },

  // Delete item
  deleteItem: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase
          .from("wardrobe_items")
          .delete()
          .eq("id", id);
        return !error;
      }
    }

    const raw = localStorage.getItem(LOCAL_WARDROBE_KEY);
    if (!raw) return false;
    try {
      const items = JSON.parse(raw) as WardrobeItem[];
      const filtered = items.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_WARDROBE_KEY, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  },

  // Outfits: Get saved outfits
  getSavedOutfits: async (userId: string): Promise<Outfit[]> => {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("outfits")
          .select(`
            *,
            outfit_items (
              wardrobe_item_id,
              garment_role
            )
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (!error && data) {
          return data as Outfit[];
        }
      }
    }

    const raw = localStorage.getItem(LOCAL_OUTFITS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Outfit[];
    } catch {
      return [];
    }
  },

  // Outfits: Save an outfit
  saveOutfit: async (outfit: Omit<Outfit, "id" | "created_at">): Promise<Outfit> => {
    const newOutfit: Outfit = {
      ...outfit,
      id: `outfit-${Date.now()}`,
      created_at: new Date().toISOString(),
      is_favorite: true,
      worn_count: 0,
    };

    if (isSupabaseConfigured) {
      const supabase = createClient();
      if (supabase) {
        const { data } = await supabase
          .from("outfits")
          .insert([
            {
              name: newOutfit.name,
              user_id: newOutfit.user_id,
              mood: newOutfit.mood,
              occasion: newOutfit.occasion,
              explanation: newOutfit.explanation,
              is_favorite: true,
            },
          ])
          .select()
          .single();

        if (data) {
          // insert junction items
          const junctionRows = newOutfit.items.map((it) => ({
            outfit_id: data.id,
            wardrobe_item_id: it.wardrobe_item_id,
            garment_role: it.garment_role,
          }));
          await supabase.from("outfit_items").insert(junctionRows);
          return { ...newOutfit, id: data.id };
        }
      }
    }

    const saved = await WardrobeService.getSavedOutfits(outfit.user_id);
    const updated = [newOutfit, ...saved];
    localStorage.setItem(LOCAL_OUTFITS_KEY, JSON.stringify(updated));
    return newOutfit;
  },

  // Outfits: Mark as worn
  markAsWorn: async (outfitId: string, userId: string, feedback?: "loved" | "good" | "neutral" | "not_great") => {
    const historyRecord: WearHistoryRecord = {
      id: `wear-${Date.now()}`,
      user_id: userId,
      outfit_id: outfitId,
      worn_date: new Date().toISOString().split("T")[0],
      feedback: feedback || "loved",
      created_at: new Date().toISOString(),
    };

    const raw = localStorage.getItem(LOCAL_WEAR_HISTORY_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    localStorage.setItem(LOCAL_WEAR_HISTORY_KEY, JSON.stringify([historyRecord, ...existing]));

    // update outfit wear count
    const outfitsRaw = localStorage.getItem(LOCAL_OUTFITS_KEY);
    if (outfitsRaw) {
      try {
        const outfits = JSON.parse(outfitsRaw) as Outfit[];
        const idx = outfits.findIndex((o) => o.id === outfitId);
        if (idx !== -1) {
          outfits[idx].worn_count = (outfits[idx].worn_count || 0) + 1;
          outfits[idx].last_worn_at = new Date().toISOString();
          localStorage.setItem(LOCAL_OUTFITS_KEY, JSON.stringify(outfits));
        }
      } catch {
        // ignore
      }
    }
    return historyRecord;
  },

  // Wear history
  getWearHistory: async (userId: string): Promise<WearHistoryRecord[]> => {
    const raw = localStorage.getItem(LOCAL_WEAR_HISTORY_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as WearHistoryRecord[];
    } catch {
      return [];
    }
  },
};
