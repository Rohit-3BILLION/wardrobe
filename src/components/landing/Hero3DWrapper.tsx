"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// Lazy-load R3F 3D Canvas
const DynamicHero3DScene = dynamic(
  () => import("./Hero3DScene").then((mod) => mod.Hero3DScene),
  {
    ssr: false,
    loading: () => <Hero3DFallback isLoading />,
  }
);

// Fallback component for devices without WebGL or with reduced-motion
export function Hero3DFallback({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center p-6 relative">
      <div className="relative w-full max-w-md aspect-square rounded-3xl bg-surface/80 border border-espresso/10 p-8 shadow-xl flex flex-col justify-between overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-peach/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-terracotta/20 blur-3xl" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge variant="terracotta" className="gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Digital Atelier</span>
          </Badge>
          <span className="text-xs uppercase tracking-widest text-caramel font-semibold">
            Autumn / Winter
          </span>
        </div>

        {/* Layered Silhouette Mockup */}
        <div className="relative z-10 my-auto py-8 space-y-4">
          <div className="bg-cream/90 rounded-2xl p-4 border border-espresso/10 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-terracotta/20 flex items-center justify-center text-terracotta font-serif font-bold text-lg">
              01
            </div>
            <div>
              <p className="text-sm font-semibold text-espresso">Tailored Terracotta Overshirt</p>
              <p className="text-xs text-caramel">Outerwear · 100% Heavy Wool</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-espresso/10 transform rotate-2 hover:rotate-0 transition-transform duration-300 shadow-sm flex items-center gap-4 ml-6">
            <div className="w-14 h-14 rounded-xl bg-peach/30 flex items-center justify-center text-caramel font-serif font-bold text-lg">
              02
            </div>
            <div>
              <p className="text-sm font-semibold text-espresso">Pleated Sand Chinos</p>
              <p className="text-xs text-caramel">Trousers · Crisp Twill</p>
            </div>
          </div>
        </div>

        {/* Bottom Pill */}
        <div className="relative z-10 pt-4 border-t border-espresso/5 flex items-center justify-between text-xs text-espresso/70">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-caramel" />
            Curated from your closet
          </span>
          <span className="flex items-center gap-1 text-terracotta font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Fit
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero3DWrapper() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect WebGL capability safely in browser
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === false) {
    return <Hero3DFallback />;
  }

  return <DynamicHero3DScene />;
}
