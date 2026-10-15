"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutGrid,
  Shirt,
  Wand2,
  Bookmark,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "My Wardrobe", href: "/wardrobe", icon: Shirt },
  { label: "Style Me", href: "/style-me", icon: Wand2, highlight: true },
  { label: "Saved Outfits", href: "/outfits", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: User },
];

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-espresso/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Wordmark */}
          <a href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-espresso">
              ClosetCue
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                    active
                      ? "bg-espresso text-cream shadow-sm"
                      : item.highlight
                      ? "text-terracotta hover:bg-terracotta/10"
                      : "text-espresso/75 hover:bg-espresso/5 hover:text-espresso"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* User Profile & Sign Out */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/70 border border-espresso/10 hover:border-terracotta/30 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-peach/40 flex items-center justify-center text-xs font-bold text-terracotta">
                {(profile?.display_name || user?.display_name || "A")[0].toUpperCase()}
              </div>
              <span className="text-xs font-medium text-espresso max-w-[120px] truncate">
                {profile?.display_name || user?.display_name || "Alex"}
              </span>
            </a>

            <button
              onClick={handleSignOut}
              className="p-2 text-espresso/50 hover:text-terracotta transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-espresso/80"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-espresso/10 space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    active
                      ? "bg-espresso text-cream"
                      : "text-espresso/80 hover:bg-espresso/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-3 border-t border-espresso/10 flex items-center justify-between px-3">
              <span className="text-xs text-espresso/60 truncate">
                {user?.email || "alex@closetcue.app"}
              </span>
              <button
                onClick={handleSignOut}
                className="text-xs text-terracotta font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
