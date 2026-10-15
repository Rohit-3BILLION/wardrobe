"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithPassword, isDemoMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signInWithPassword(email, password);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setEmail("alex@closetcue.app");
    setPassword("password123");
    setIsLoading(true);
    await signInWithPassword("alex@closetcue.app", "password123");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Warm Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-peach/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

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
          Welcome back to your atelier
        </h2>
        <p className="text-sm text-espresso/70">
          Sign in to access your digital wardrobe and daily outfits.
        </p>

        {isDemoMode && (
          <div className="pt-2">
            <Badge variant="terracotta" className="text-xs">
              Development Mode Active · Instant Demo Sign-In Available
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Card className="bg-surface py-8 px-6 sm:px-10 rounded-3xl border border-espresso/10 shadow-lg">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

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
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-espresso/80"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-caramel hover:text-terracotta font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full group shadow-sm mt-2"
            >
              <span>{isLoading ? "Signing in..." : "Sign In to ClosetCue"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {isDemoMode && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleDemoSignIn}
                className="w-full text-xs text-caramel border-dashed border-caramel/40 hover:bg-cream"
              >
                ⚡ Quick Demo Sign-In (Alex Vance)
              </Button>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-espresso/10 text-center">
            <p className="text-xs text-espresso/70">
              Don’t have an atelier yet?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-terracotta hover:underline"
              >
                Build Your Wardrobe
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
