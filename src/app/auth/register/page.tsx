"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const { signUpWithPassword, isDemoMode } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUpWithPassword(email, password, displayName);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Direct new user to personal onboarding flow
        router.push("/onboarding");
      }
    } catch {
      setError("An unexpected registration error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-peach/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-serif text-3xl font-bold tracking-tight text-espresso">
            ClosetCue
          </span>
        </Link>
        <h2 className="font-serif text-2xl font-bold text-espresso">
          Create your digital wardrobe
        </h2>
        <p className="text-sm text-espresso/70">
          Curate your clothing, explore your vibe, and dress with clarity every day.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Card className="bg-surface py-8 px-6 sm:px-10 rounded-3xl border border-espresso/10 shadow-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="displayName"
                className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5"
              >
                Your Name / Alias
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold uppercase tracking-wider text-espresso/80 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <p className="text-[11px] text-espresso/60 leading-normal pt-1">
              By creating an account, you agree to store your clothing photos securely in your private vault. We never sell your personal style data.
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full group shadow-sm mt-3"
            >
              <span>{isLoading ? "Creating Atelier..." : "Begin Free Onboarding"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-espresso/10 text-center">
            <p className="text-xs text-espresso/70">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-terracotta hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
