"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-espresso/5 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark with Smooth Scroll-To-Top on Click */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="group flex items-center gap-2.5 cursor-pointer"
            title="Scroll to top"
          >
            <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#a4593f]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-espresso leading-none group-hover:text-terracotta transition-colors">
                ClosetCue
              </span>
              <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold">
                Digital Wardrobe
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Smooth Scroll */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#wardrobe"
              onClick={(e) => scrollToSection(e, "wardrobe")}
              className="text-sm font-medium text-espresso/75 hover:text-terracotta transition-colors cursor-pointer"
            >
              Digital Wardrobe
            </a>
            <a
              href="#mood-styling"
              onClick={(e) => scrollToSection(e, "mood-styling")}
              className="text-sm font-medium text-espresso/75 hover:text-terracotta transition-colors cursor-pointer"
            >
              Mood Styling
            </a>
            <a
              href="#dashboard-preview"
              onClick={(e) => scrollToSection(e, "dashboard-preview")}
              className="text-sm font-medium text-espresso/75 hover:text-terracotta transition-colors cursor-pointer"
            >
              Dashboard
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="text-sm font-medium text-espresso/75 hover:text-terracotta transition-colors cursor-pointer"
            >
              Philosophy
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm" className="group shadow-sm">
                <span>Build Your Wardrobe</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-espresso/80 hover:bg-espresso/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-surface rounded-2xl border border-espresso/10 shadow-lg space-y-3 animate-in fade-in slide-in-from-top-2">
            <a
              href="#wardrobe"
              onClick={(e) => scrollToSection(e, "wardrobe")}
              className="block px-3 py-2 text-sm font-medium text-espresso/80 hover:text-terracotta rounded-lg hover:bg-espresso/[0.03]"
            >
              Digital Wardrobe
            </a>
            <a
              href="#mood-styling"
              onClick={(e) => scrollToSection(e, "mood-styling")}
              className="block px-3 py-2 text-sm font-medium text-espresso/80 hover:text-terracotta rounded-lg hover:bg-espresso/[0.03]"
            >
              Mood Styling
            </a>
            <a
              href="#dashboard-preview"
              onClick={(e) => scrollToSection(e, "dashboard-preview")}
              className="block px-3 py-2 text-sm font-medium text-espresso/80 hover:text-terracotta rounded-lg hover:bg-espresso/[0.03]"
            >
              Dashboard
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="block px-3 py-2 text-sm font-medium text-espresso/80 hover:text-terracotta rounded-lg hover:bg-espresso/[0.03]"
            >
              Philosophy
            </a>
            <div className="pt-2 border-t border-espresso/10 flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Build Your Wardrobe
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
