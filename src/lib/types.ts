export type ClothingCategory =
  | "T-shirts"
  | "Shirts"
  | "Trousers"
  | "Jeans"
  | "Shorts"
  | "Dresses"
  | "Skirts"
  | "Jackets"
  | "Sweaters"
  | "Shoes"
  | "Bags"
  | "Accessories";

export type MoodVibe =
  | "Confident"
  | "Relaxed"
  | "Classy"
  | "Minimal"
  | "Streetwear"
  | "Sporty"
  | "Creative"
  | "Romantic"
  | "Professional"
  | "Bold";

export type OccasionType =
  | "College / University"
  | "Work"
  | "Casual outing"
  | "Date"
  | "Party"
  | "Interview"
  | "Travel"
  | "Special event"
  | "Everyday wear";

export interface WardrobeItem {
  id: string;
  user_id: string;
  image_url: string;
  name: string;
  category: ClothingCategory;
  primary_color: string;
  secondary_colors?: string[];
  style_tags: string[];
  season_weather?: "Warm" | "Cold" | "Transitional" | "All-Season";
  status: "active" | "archived";
  created_at: string;
  updated_at: string;
}

export interface OutfitItem {
  wardrobe_item_id: string;
  garment_role: "top" | "bottom" | "one-piece" | "outerwear" | "shoes" | "accessory" | "bag";
  item?: WardrobeItem;
}

export interface Outfit {
  id: string;
  user_id: string;
  name: string;
  mood: MoodVibe | string;
  occasion: OccasionType | string;
  explanation: string;
  items: OutfitItem[];
  is_favorite?: boolean;
  worn_count?: number;
  last_worn_at?: string;
  created_at: string;
}

export interface WearHistoryRecord {
  id: string;
  user_id: string;
  outfit_id: string;
  worn_date: string;
  feedback?: "loved" | "good" | "neutral" | "not_great";
  created_at: string;
}

export interface UserProfile {
  id: string;
  display_name: string;
  style_preferences?: string[];
  favorite_colors?: string[];
  city?: string;
  created_at: string;
  updated_at: string;
}
