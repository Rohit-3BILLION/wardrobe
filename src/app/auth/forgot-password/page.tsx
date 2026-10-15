"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Failed to send reset link. Please check the email entered.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-peach/20 blur-3xl pointer-events-none" />

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
          Reset your password
        </h2>
        <p className="text-sm text-espresso/70">
          Enter your email and we’ll send instructions to restore your access.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Card className="bg-surface py-8 px-6 sm:px-10 rounded-3xl border border-espresso/10 shadow-lg">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-espresso">
                Check your inbox
              </h3>
              <p className="text-sm text-espresso/70">
                We've sent a recovery link to <strong>{email}</strong>. Follow the instructions to choose a new password.
              </p>
              <div className="pt-4">
                <Link href="/auth/login">
                  <Button variant="outline" size="md" className="w-full gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Sign In</span>
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-espresso/15 rounded-xl text-sm text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full shadow-sm"
              >
                {isLoading ? "Sending Link..." : "Send Reset Link"}
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 text-xs text-caramel hover:text-terracotta font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
