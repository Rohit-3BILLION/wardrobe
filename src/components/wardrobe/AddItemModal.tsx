"use client";

import React, { useState, useRef } from "react";
import { X, Upload, Camera, Sparkles, Check, AlertCircle } from "lucide-react";
import { ClothingCategory, WardrobeItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (item: Omit<WardrobeItem, "id" | "created_at" | "updated_at">) => void;
  userId: string;
}

const CATEGORIES: ClothingCategory[] = [
  "T-shirts",
  "Shirts",
  "Trousers",
  "Jeans",
  "Shorts",
  "Dresses",
  "Skirts",
  "Jackets",
  "Sweaters",
  "Shoes",
  "Bags",
  "Accessories",
];

export function AddItemModal({ isOpen, onClose, onItemAdded, userId }: AddItemModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSource, setAiSource] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ClothingCategory>("Shirts");
  const [primaryColor, setPrimaryColor] = useState("Warm Terracotta");
  const [styleTags, setStyleTags] = useState<string[]>(["Everyday", "Minimal"]);
  const [tagInput, setTagInput] = useState("");
  const [seasonWeather, setSeasonWeather] = useState<"Warm" | "Cold" | "Transitional" | "All-Season">("All-Season");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File exceeds 10MB limit. Please select a smaller photo.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      // Trigger AI vision recognition
      setIsAnalyzing(true);
      try {
        const res = await fetch("/api/ai/recognize-clothing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            filename: file.name,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.suggestions) {
            setName(data.suggestions.name || "");
            setCategory(data.suggestions.category || "Shirts");
            setPrimaryColor(data.suggestions.primary_color || "Warm Terracotta");
            if (data.suggestions.style_tags?.length) {
              setStyleTags(data.suggestions.style_tags);
            }
            if (data.suggestions.season_weather) {
              setSeasonWeather(data.suggestions.season_weather);
            }
            setAiSource(data.source === "ai_vision" ? "Vision AI" : "Smart Fashion Engine");
          }
        }
      } catch (err) {
        console.warn("AI recognition fallback active:", err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!styleTags.includes(tagInput.trim())) {
        setStyleTags([...styleTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setStyleTags(styleTags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!imagePreview) {
      setError("Please capture or select an image for this item.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter a name for this garment.");
      return;
    }

    onItemAdded({
      user_id: userId,
      image_url: imagePreview,
      name: name.trim(),
      category,
      primary_color: primaryColor,
      secondary_colors: ["Caramel"],
      style_tags: styleTags,
      season_weather: seasonWeather,
      status: "active",
    });

    handleClose();
  };

  const handleClose = () => {
    setImagePreview(null);
    setName("");
    setCategory("Shirts");
    setPrimaryColor("Warm Terracotta");
    setStyleTags(["Everyday", "Minimal"]);
    setError(null);
    setAiSource(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface w-full max-w-2xl rounded-3xl border border-espresso/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-espresso/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-espresso">
                Add Wardrobe Piece
              </h3>
              <p className="text-xs text-espresso/60">
                Upload or capture an item from your real collection
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-espresso/50 hover:text-espresso rounded-full hover:bg-espresso/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-2">
              Garment Photograph
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-espresso/15 aspect-[4/3] bg-cream/30 flex items-center justify-center group">
                <img
                  src={imagePreview}
                  alt="Garment preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Retake or Replace Image</span>
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed border-espresso/20 p-8 text-center bg-cream/20 hover:bg-cream/50 hover:border-terracotta/50 cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-espresso">
                    Click to select photo or open camera
                  </p>
                  <p className="text-xs text-espresso/50">
                    Supports JPG, PNG, WEBP (Max 10MB)
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* AI Recognition Status */}
          {isAnalyzing && (
            <div className="p-3.5 rounded-2xl bg-peach/20 border border-peach/40 flex items-center gap-3 animate-pulse">
              <Sparkles className="w-4 h-4 text-terracotta animate-spin" />
              <span className="text-xs font-medium text-espresso">
                Analyzing garment silhouette, texture, and color palette...
              </span>
            </div>
          )}

          {aiSource && !isAnalyzing && (
            <div className="flex items-center justify-between text-xs text-caramel bg-cream/70 px-3.5 py-2 rounded-xl border border-espresso/5">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                Pre-filled by {aiSource}
              </span>
              <span className="text-[11px] text-espresso/60">Editable below</span>
            </div>
          )}

          {/* Metadata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
                Garment Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tailored Terracotta Blazer"
                className="w-full px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                className="w-full px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
                Primary Color
              </label>
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="e.g. Terracotta, Warm Cream, Olive"
                className="w-full px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
                Season / Weather
              </label>
              <select
                value={seasonWeather}
                onChange={(e) =>
                  setSeasonWeather(e.target.value as "Warm" | "Cold" | "Transitional" | "All-Season")
                }
                className="w-full px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              >
                <option value="All-Season">All-Season</option>
                <option value="Warm">Warm / Summer</option>
                <option value="Cold">Cold / Winter</option>
                <option value="Transitional">Transitional (Spring/Autumn)</option>
              </select>
            </div>
          </div>

          {/* Style Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
              Style Tags (Press Enter to add)
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-cream/30 border border-espresso/15 rounded-xl">
              {styleTags.map((tag) => (
                <Badge key={tag} variant="caramel" className="gap-1 pr-1.5">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-terracotta"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag & Enter..."
                className="bg-transparent text-xs text-espresso focus:outline-none p-1 flex-1 min-w-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-espresso/10 bg-cream/20 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={!imagePreview || !name.trim()}
            className="gap-2 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Save to Wardrobe</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
