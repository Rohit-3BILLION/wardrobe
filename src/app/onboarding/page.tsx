"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Check, MapPin, Compass } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const STYLE_OPTIONS = [
  "Minimalist",
  "Tailored & Classy",
  "Relaxed & Casual",
  "Contemporary Streetwear",
  "Creative & Eclectic",
  "Vintage & Heritage",
  "Sporty & Athleisure",
  "Romantic & Fluid",
];

const COLOR_OPTIONS = [
  { name: "Warm Terracotta", hex: "#B9684B" },
  { name: "Caramel Brown", hex: "#A87549" },
  { name: "Muted Peach", hex: "#D99B79" },
  { name: "Warm Cream", hex: "#F8F1E8" },
  { name: "Deep Espresso", hex: "#302923" },
  { name: "Sage Olive", hex: "#6E7A68" },
  { name: "Classic Navy", hex: "#2C3E50" },
  { name: "Charcoal Slate", hex: "#4A4E54" },
];

const OCCASION_OPTIONS = [
  "Everyday wear",
  "Work & Office",
  "Casual outings",
  "Date night",
  "College / University",
  "Dinners & Parties",
  "Travel & Weekenders",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    profile?.style_preferences || ["Minimalist", "Relaxed & Casual"]
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    profile?.favorite_colors || ["Warm Terracotta", "Warm Cream"]
  );
  const [city, setCity] = useState<string>(profile?.city || "");

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const handleFinish = async () => {
    await updateProfile({
      style_preferences: selectedStyles,
      favorite_colors: selectedColors,
      city: city.trim() || undefined,
    });
    router.push("/dashboard");
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-2xl mx-auto w-full relative z-10 space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between text-xs text-espresso/60 font-medium">
          <span className="flex items-center gap-1.5 text-terracotta">
            <Sparkles className="w-3.5 h-3.5" />
            Personal Atelier Setup
          </span>
          <span>Step {step} of 3</span>
        </div>

        <div className="w-full bg-espresso/10 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-terracotta h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <Card className="bg-surface p-6 sm:p-10 rounded-3xl border border-espresso/10 shadow-lg">
          {/* STEP 1: STYLE PREFERENCES */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <Badge variant="caramel">Aesthetic Foundation</Badge>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">
                  What styles resonate with you most?
                </h2>
                <p className="text-sm text-espresso/70">
                  Select styles that match your everyday personality. You can adjust this anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {STYLE_OPTIONS.map((style) => {
                  const selected = selectedStyles.includes(style);
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleStyle(style)}
                      className={`p-3.5 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                        selected
                          ? "bg-espresso text-cream border-espresso shadow-sm"
                          : "bg-cream/40 text-espresso hover:bg-cream border-espresso/10"
                      }`}
                    >
                      <span>{style}</span>
                      {selected && <Check className="w-4 h-4 text-peach" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-espresso/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-xs text-espresso/60 hover:text-espresso font-medium"
                >
                  Skip for now
                </button>
                <Button variant="primary" onClick={() => setStep(2)} className="gap-2">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: FAVORITE COLORS */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <Badge variant="peach">Color Harmony</Badge>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">
                  Which tones feel like home?
                </h2>
                <p className="text-sm text-espresso/70">
                  Select hues you love wearing. ClosetCue uses these to harmonize your daily outfits.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {COLOR_OPTIONS.map((col) => {
                  const selected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => toggleColor(col.name)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 ${
                        selected
                          ? "ring-2 ring-terracotta border-terracotta bg-cream/70"
                          : "border-espresso/10 bg-cream/30 hover:bg-cream"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-espresso/20 shadow-inner"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-xs font-medium text-espresso leading-tight">
                        {col.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-espresso/10 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)} className="gap-2">
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: WEATHER & CITY PREFERENCE */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <Badge variant="terracotta">Weather Intelligence</Badge>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">
                  Where do you dress each day?
                </h2>
                <p className="text-sm text-espresso/70">
                  Optional city entry allows ClosetCue to factor in morning temperature, wind, and rain when recommending layers.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80">
                  Your City / Region (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. London, New York, Tokyo, Milan"
                    className="w-full pl-10 pr-4 py-3 bg-cream/40 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta"
                  />
                </div>
                <p className="text-[11px] text-espresso/60 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-caramel" />
                  We only use this for weather lookups. Never for tracking or advertising.
                </p>
              </div>

              <div className="pt-6 border-t border-espresso/10 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handleFinish} className="gap-2 shadow-sm">
                  <span>Enter My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
