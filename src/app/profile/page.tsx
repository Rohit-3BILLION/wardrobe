"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Shield,
  Palette,
  MapPin,
  Trash2,
  LogOut,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, updateProfile, signOut } = useAuth();

  const [displayName, setDisplayName] = useState(profile?.display_name || user?.display_name || "");
  const [city, setCity] = useState(profile?.city || "");
  const [savedMessage, setSavedMessage] = useState(false);
  const [confirmClearData, setConfirmClearData] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      display_name: displayName.trim(),
      city: city.trim() || undefined,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleResetData = () => {
    localStorage.removeItem("closetcue_wardrobe_items");
    localStorage.removeItem("closetcue_saved_outfits");
    localStorage.removeItem("closetcue_wear_history");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AppNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="pb-8 border-b border-espresso/10">
          <Badge variant="terracotta">Account & Atelier</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso mt-2">
            Styling Preferences & Settings
          </h1>
          <p className="text-sm text-espresso/70 mt-1">
            Manage your personal profile, privacy settings, and styling preferences.
          </p>
        </div>

        <div className="pt-8 space-y-8">
          {savedMessage && (
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-xs font-medium text-green-800 flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-green-700" />
              <span>Preferences saved successfully.</span>
            </div>
          )}

          {/* Form */}
          <Card className="bg-surface p-6 sm:p-8 rounded-3xl border border-espresso/10 space-y-6">
            <h2 className="font-serif text-xl font-bold text-espresso flex items-center gap-2">
              <User className="w-5 h-5 text-caramel" />
              <span>Profile Information</span>
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || "alex@closetcue.app"}
                    className="w-full px-3.5 py-2.5 bg-cream/10 border border-espresso/10 rounded-xl text-sm text-espresso/50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-caramel" />
                  <span>Weather City (Optional)</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. London, New York, Tokyo, Milan"
                  className="w-full sm:max-w-md px-3.5 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" type="submit" className="shadow-sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Privacy & Data Storage Guarantee */}
          <Card className="bg-surface p-6 sm:p-8 rounded-3xl border border-espresso/10 space-y-4">
            <h2 className="font-serif text-xl font-bold text-espresso flex items-center gap-2">
              <Shield className="w-5 h-5 text-caramel" />
              <span>Data Protection & Privacy</span>
            </h2>
            <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed">
              ClosetCue does not sell your photographs or style habits to third parties or advertising networks. Your wardrobe images are stored in a private vault isolated by Row Level Security (RLS) policies.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-caramel font-semibold">
              <span className="px-3 py-1 rounded-full bg-cream/80 border border-espresso/5">
                ✓ Isolated Row-Level Policies
              </span>
              <span className="px-3 py-1 rounded-full bg-cream/80 border border-espresso/5">
                ✓ Private Image Storage
              </span>
              <span className="px-3 py-1 rounded-full bg-cream/80 border border-espresso/5">
                ✓ Client-Controlled Data
              </span>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="bg-surface p-6 sm:p-8 rounded-3xl border border-espresso/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-espresso">
                Account Actions
              </h3>
              <p className="text-xs text-espresso/60">
                Sign out of this session or reset demo atelier data.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {confirmClearData ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600 font-semibold">Reset all wardrobe items?</span>
                  <Button variant="primary" size="sm" onClick={handleResetData} className="bg-red-600 hover:bg-red-700">
                    Yes, Reset
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmClearData(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmClearData(true)}
                  className="gap-1.5 text-xs text-espresso/70"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </Button>
              )}

              <Button
                variant="primary"
                size="sm"
                onClick={handleSignOut}
                className="gap-1.5 text-xs shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
