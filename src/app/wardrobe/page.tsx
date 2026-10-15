"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Sparkles, Shirt, SlidersHorizontal } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { WardrobeItem, ClothingCategory } from "@/lib/types";
import { WardrobeService } from "@/lib/services/wardrobeStorage";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AddItemModal } from "@/components/wardrobe/AddItemModal";
import { ItemDetailModal } from "@/components/wardrobe/ItemDetailModal";

const CATEGORIES: (ClothingCategory | "All")[] = [
  "All",
  "Jackets",
  "Shirts",
  "T-shirts",
  "Trousers",
  "Jeans",
  "Sweaters",
  "Dresses",
  "Shoes",
  "Bags",
  "Accessories",
];

export default function WardrobePage() {
  const { user } = useAuth();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | "All">("All");

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

  useEffect(() => {
    async function load() {
      if (user?.id) {
        setIsLoading(true);
        const data = await WardrobeService.getItems(user.id);
        setItems(data);
        setIsLoading(false);
      }
    }
    load();
  }, [user?.id]);

  const handleItemAdded = async (newItemData: Omit<WardrobeItem, "id" | "created_at" | "updated_at">) => {
    const saved = await WardrobeService.addItem(newItemData);
    setItems((prev) => [saved, ...prev]);
  };

  const handleItemUpdate = async (id: string, updates: Partial<WardrobeItem>) => {
    const updated = await WardrobeService.updateItem(id, updates);
    if (updated) {
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      setSelectedItem(updated);
    }
  };

  const handleItemDelete = async (id: string) => {
    await WardrobeService.deleteItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItem(null);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.primary_color.toLowerCase().includes(query) ||
      item.style_tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-espresso/10">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="terracotta">Digital Wardrobe</Badge>
              <span className="text-xs text-caramel font-semibold uppercase tracking-wider">
                {items.length} garments catalogued
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso mt-2">
              My Clothing Archive
            </h1>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsAddOpen(true)}
            className="gap-2 shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Garment</span>
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search input */}
            <div className="relative w-full sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, color, or style tag..."
                className="w-full pl-10 pr-4 py-2 bg-surface border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              />
            </div>

            <div className="text-xs text-espresso/60 flex items-center gap-2 self-start sm:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-caramel" />
              <span>Showing {filteredItems.length} of {items.length} items</span>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-espresso text-cream shadow-sm"
                      : "bg-surface text-espresso/70 hover:bg-cream border border-espresso/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wardrobe Items Grid */}
        {isLoading ? (
          <div className="py-20 text-center">
            <Sparkles className="w-8 h-8 text-terracotta animate-spin mx-auto mb-3" />
            <p className="text-sm text-espresso/60 font-medium">Loading your atelier...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-peach/20 text-terracotta flex items-center justify-center mx-auto">
              <Shirt className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-espresso">
              No garments found
            </h3>
            <p className="text-xs sm:text-sm text-espresso/60">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search query or category filters."
                : "Your digital wardrobe is waiting for its first item! Take a photograph to get started."}
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddOpen(true)}
              className="gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Garment</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer bg-surface p-3 sm:p-4 rounded-2xl hover:border-terracotta/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
              >
                <div>
                  {/* Photo container */}
                  <div className="rounded-xl overflow-hidden aspect-square bg-cream/30 border border-espresso/5 mb-3 relative flex items-center justify-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="terracotta" className="text-[10px] py-0.5 px-2 bg-surface/90 backdrop-blur-sm shadow-sm transition-transform group-hover:scale-105">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="font-medium text-sm text-espresso line-clamp-1 group-hover:text-terracotta transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-caramel font-medium mt-0.5">
                    {item.primary_color}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-espresso/5 flex items-center justify-between">
                  <div className="flex items-center gap-1 overflow-hidden">
                    {item.style_tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-espresso/50 truncate max-w-[70px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-espresso/40">
                    View
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onItemAdded={handleItemAdded}
        userId={user?.id || "demo-user-123456"}
      />

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdate={handleItemUpdate}
        onDelete={handleItemDelete}
      />
    </div>
  );
}
