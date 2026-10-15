import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso text-cream/90 pt-16 pb-12 border-t border-espresso/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cream/10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                ClosetCue
              </span>
            </div>
            <p className="text-sm text-cream/70 max-w-sm leading-relaxed">
              Your wardrobe. Your mood. Your style. <br />
              An AI-powered digital wardrobe platform designed to help you curate, wear, and love the clothes you already own.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-peach">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-cream/75">
              <li>
                <Link href="#wardrobe" className="hover:text-cream transition-colors">
                  Digital Wardrobe
                </Link>
              </li>
              <li>
                <Link href="#mood-styling" className="hover:text-cream transition-colors">
                  Mood & Vibe Styling
                </Link>
              </li>
              <li>
                <Link href="#dashboard-preview" className="hover:text-cream transition-colors">
                  Daily Headquarters
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-cream transition-colors">
                  Roadmap & Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-peach">
              Privacy & Access
            </h4>
            <ul className="space-y-2 text-sm text-cream/75">
              <li>
                <Link href="/auth/login" className="hover:text-cream transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-cream transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <span className="text-cream/50 cursor-default">
                  Zero Data Selling
                </span>
              </li>
              <li>
                <span className="text-cream/50 cursor-default">
                  Private Cloud Storage
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
          <p>© 2026 ClosetCue. Designed for conscious, intentional personal style.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with intention & craftsmanship</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
          </p>
        </div>
      </div>
    </footer>
  );
}
