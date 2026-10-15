import { WardrobeItem, Outfit, MoodVibe, OccasionType, OutfitItem } from "@/lib/types";

export interface StyleMeOptions {
  mood: MoodVibe | string;
  occasion: OccasionType | string;
  weatherTempC?: number;
  includeItemId?: string;
  avoidItemId?: string;
}

export interface RecommendationResult {
  outfits: Outfit[];
  missingCategories?: string[];
  totalWardrobeCount: number;
}

export const OutfitEngine = {
  generateRecommendations: (
    items: WardrobeItem[],
    options: StyleMeOptions,
    userId: string
  ): RecommendationResult => {
    if (!items || items.length === 0) {
      return {
        outfits: [],
        missingCategories: ["Tops", "Bottoms", "Shoes"],
        totalWardrobeCount: 0,
      };
    }

    // Filter active items and handle exclusions
    const activeItems = items.filter(
      (item) => item.status === "active" && item.id !== options.avoidItemId
    );

    // Group items by garment roles
    const tops = activeItems.filter((i) =>
      ["T-shirts", "Shirts", "Sweaters"].includes(i.category)
    );
    const bottoms = activeItems.filter((i) =>
      ["Trousers", "Jeans", "Shorts", "Skirts"].includes(i.category)
    );
    const onePieces = activeItems.filter((i) => i.category === "Dresses");
    const outerwear = activeItems.filter((i) =>
      ["Jackets", "Sweaters"].includes(i.category)
    );
    const shoes = activeItems.filter((i) => i.category === "Shoes");
    const bags = activeItems.filter((i) => i.category === "Bags");
    const accessories = activeItems.filter((i) => i.category === "Accessories");

    // Diagnostic check for missing essential layers
    const missing: string[] = [];
    if (tops.length === 0 && onePieces.length === 0) missing.push("Tops / Dresses");
    if (bottoms.length === 0 && onePieces.length === 0) missing.push("Bottoms");
    if (shoes.length === 0) missing.push("Shoes");

    const candidateOutfits: Outfit[] = [];

    // Helper to score an item against chosen mood & occasion
    const scoreItem = (item: WardrobeItem) => {
      let score = 0;
      const moodLower = options.mood.toLowerCase();
      const occasionLower = options.occasion.toLowerCase();

      // Style tag match
      item.style_tags.forEach((tag) => {
        const tagLower = tag.toLowerCase();
        if (tagLower.includes(moodLower) || moodLower.includes(tagLower)) score += 3;
        if (tagLower.includes(occasionLower) || occasionLower.includes(tagLower)) score += 2;
      });

      // Preferred items bonus
      if (options.includeItemId && item.id === options.includeItemId) score += 10;

      return score;
    };

    // Sort items by relevance to mood
    const sortedTops = [...tops].sort((a, b) => scoreItem(b) - scoreItem(a));
    const sortedBottoms = [...bottoms].sort((a, b) => scoreItem(b) - scoreItem(a));
    const sortedOnePieces = [...onePieces].sort((a, b) => scoreItem(b) - scoreItem(a));
    const sortedShoes = [...shoes].sort((a, b) => scoreItem(b) - scoreItem(a));
    const sortedOuterwear = [...outerwear].sort((a, b) => scoreItem(b) - scoreItem(a));
    const sortedBags = [...bags].sort((a, b) => scoreItem(b) - scoreItem(a));

    // GENERATE COMBINATION TYPE A: Top + Bottom
    for (let t = 0; t < Math.min(sortedTops.length, 3); t++) {
      for (let b = 0; b < Math.min(sortedBottoms.length, 3); b++) {
        const topItem = sortedTops[t];
        const bottomItem = sortedBottoms[b];

        const outfitItems: OutfitItem[] = [
          { wardrobe_item_id: topItem.id, garment_role: "top", item: topItem },
          { wardrobe_item_id: bottomItem.id, garment_role: "bottom", item: bottomItem },
        ];

        // Optional outerwear if temperature is cool or for formal mood
        const needsLayer =
          (options.weatherTempC !== undefined && options.weatherTempC < 19) ||
          ["Confident", "Classy", "Streetwear"].includes(options.mood as string);

        if (needsLayer && sortedOuterwear.length > 0) {
          const outer = sortedOuterwear[candidateOutfits.length % sortedOuterwear.length];
          outfitItems.push({
            wardrobe_item_id: outer.id,
            garment_role: "outerwear",
            item: outer,
          });
        }

        // Shoes
        if (sortedShoes.length > 0) {
          const shoe = sortedShoes[candidateOutfits.length % sortedShoes.length];
          outfitItems.push({
            wardrobe_item_id: shoe.id,
            garment_role: "shoes",
            item: shoe,
          });
        }

        // Bag / Accessory
        if (sortedBags.length > 0 && candidateOutfits.length % 2 === 0) {
          const bag = sortedBags[0];
          outfitItems.push({
            wardrobe_item_id: bag.id,
            garment_role: "bag",
            item: bag,
          });
        }

        // Editorial Explanation
        const title = `${topItem.primary_color} ${topItem.category.slice(0, -1)} with ${bottomItem.name}`;
        const explanation = `Constructed for a ${options.mood} aesthetic during your ${options.occasion}. The combination of ${topItem.primary_color.toLowerCase()} against ${bottomItem.primary_color.toLowerCase()} provides tonal equilibrium, allowing the textures to feel intentional and effortless.`;

        candidateOutfits.push({
          id: `rec-${candidateOutfits.length + 1}-${Date.now()}`,
          user_id: userId,
          name: title,
          mood: options.mood,
          occasion: options.occasion,
          explanation,
          items: outfitItems,
          created_at: new Date().toISOString(),
        });

        if (candidateOutfits.length >= 4) break;
      }
      if (candidateOutfits.length >= 4) break;
    }

    // GENERATE COMBINATION TYPE B: One-Piece (Dresses)
    if (sortedOnePieces.length > 0 && candidateOutfits.length < 4) {
      for (let d = 0; d < Math.min(sortedOnePieces.length, 2); d++) {
        const dress = sortedOnePieces[d];
        const outfitItems: OutfitItem[] = [
          { wardrobe_item_id: dress.id, garment_role: "one-piece", item: dress },
        ];

        if (sortedOuterwear.length > 0) {
          outfitItems.push({
            wardrobe_item_id: sortedOuterwear[0].id,
            garment_role: "outerwear",
            item: sortedOuterwear[0],
          });
        }

        if (sortedShoes.length > 0) {
          outfitItems.push({
            wardrobe_item_id: sortedShoes[0].id,
            garment_role: "shoes",
            item: sortedShoes[0],
          });
        }

        candidateOutfits.push({
          id: `rec-dress-${d + 1}-${Date.now()}`,
          user_id: userId,
          name: `${dress.name} Ensemble`,
          mood: options.mood,
          occasion: options.occasion,
          explanation: `A fluid one-piece statement tailored for ${options.occasion}. Its ${dress.primary_color.toLowerCase()} tone provides graceful movement and effortless styling.`,
          items: outfitItems,
          created_at: new Date().toISOString(),
        });
      }
    }

    return {
      outfits: candidateOutfits,
      missingCategories: missing.length > 0 ? missing : undefined,
      totalWardrobeCount: activeItems.length,
    };
  },
};
