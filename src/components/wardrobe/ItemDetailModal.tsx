"use client";

import React, { useState } from "react";
import { X, Trash2, Edit3, Check, Calendar, Tag } from "lucide-react";
import { WardrobeItem, ClothingCategory } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ItemDetailModalProps {
  item: WardrobeItem | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<WardrobeItem>) => void;
  onDelete: (id: string) => void;
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

export function ItemDetailModal({ item, onClose, onUpdate, onDelete }: ItemDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item?.name || "");
  const [category, setCategory] = useState<ClothingCategory>(item?.category || "Shirts");
  const [primaryColor, setPrimaryColor] = useState(item?.primary_color || "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!item) return null;

  const handleSave = () => {
    onUpdate(item.id, {
      name: name.trim() || item.name,
      category,
      primary_color: primaryColor.trim() || item.primary_color,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface w-full max-w-xl rounded-3xl border border-espresso/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-espresso/10">
          <Badge variant="terracotta">{item.category}</Badge>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-espresso/60 hover:text-espresso rounded-full hover:bg-espresso/5"
                title="Edit item"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="p-2 text-green-700 bg-green-50 rounded-full hover:bg-green-100"
                title="Save changes"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-espresso/50 hover:text-espresso rounded-full hover:bg-espresso/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image Display */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-cream/40 border border-espresso/10 flex items-center justify-center">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-espresso/70">
                    Garment Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-espresso/70">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                      className="w-full mt-1 px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-espresso/70">
                      Primary Color
                    </label>
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full mt-1 px-3.5 py-2 bg-cream/30 border border-espresso/15 rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl font-bold text-espresso">{item.name}</h3>
                <p className="text-xs text-caramel font-semibold mt-1">
                  Primary Tone: {item.primary_color}
                </p>
              </div>
            )}

            {/* Tags */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-espresso/60 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Style Tags</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.style_tags.map((t) => (
                  <Badge key={t} variant="caramel">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Date metadata */}
            <div className="pt-3 border-t border-espresso/5 flex items-center justify-between text-xs text-espresso/50">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Added on {new Date(item.created_at).toLocaleDateString()}
              </span>
              <span>Season: {item.season_weather || "All-Season"}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-espresso/10 bg-cream/20 flex items-center justify-between">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-600 font-medium">Delete this piece?</span>
              <Button variant="primary" size="sm" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Yes, Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs text-red-600/80 hover:text-red-700 flex items-center gap-1.5 font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove from Wardrobe</span>
            </button>
          )}

          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
