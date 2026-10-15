"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/lib/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthUser {
  id: string;
  email: string;
  display_name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithPassword: (email: string, password: string, displayName?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string; success?: boolean }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_ID = "demo-user-123456";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Local development fallback
      setIsDemoMode(true);
      const storedUser = localStorage.getItem("closetcue_demo_user");
      const storedProfile = localStorage.getItem("closetcue_demo_profile");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        // Default guest / demo user for smooth developer experience
        const defaultUser: AuthUser = {
          id: DEMO_USER_ID,
          email: "alex@closetcue.app",
          display_name: "Alex Vance",
        };
        setUser(defaultUser);
        localStorage.setItem("closetcue_demo_user", JSON.stringify(defaultUser));
      }

      if (storedProfile) {
        try {
          setProfile(JSON.parse(storedProfile));
        } catch {
          setProfile(null);
        }
      } else {
        const defaultProfile: UserProfile = {
          id: DEMO_USER_ID,
          display_name: "Alex Vance",
          style_preferences: ["Minimal", "Classy", "Relaxed"],
          favorite_colors: ["Terracotta", "Warm Cream", "Caramel"],
          city: "London",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(defaultProfile);
        localStorage.setItem("closetcue_demo_profile", JSON.stringify(defaultProfile));
      }
      setIsLoading(false);
      return;
    }

    // Live Supabase Auth
    const supabase = createClient();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    async function loadUser() {
      const {
        data: { user: supabaseUser },
      } = await supabase!.auth.getUser();

      if (supabaseUser) {
        const currentUser: AuthUser = {
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          display_name:
            supabaseUser.user_metadata?.display_name ||
            supabaseUser.email?.split("@")[0] ||
            "Style Explorer",
        };
        setUser(currentUser);

        // Fetch profile
        const { data: profileData } = await supabase!
          .from("profiles")
          .select("*")
          .eq("id", supabaseUser.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const currentUser: AuthUser = {
          id: session.user.id,
          email: session.user.email || "",
          display_name:
            session.user.user_metadata?.display_name ||
            session.user.email?.split("@")[0] ||
            "Style Explorer",
        };
        setUser(currentUser);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    if (isDemoMode) {
      if (!email || !password) {
        return { error: "Please enter both email and password." };
      }
      const demoUser: AuthUser = {
        id: DEMO_USER_ID,
        email,
        display_name: email.split("@")[0] || "Alex Vance",
      };
      setUser(demoUser);
      localStorage.setItem("closetcue_demo_user", JSON.stringify(demoUser));
      return {};
    }

    const supabase = createClient();
    if (!supabase) return { error: "Supabase client not initialized." };

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  };

  const signUpWithPassword = async (email: string, password: string, displayName?: string) => {
    if (isDemoMode) {
      if (!email || !password) {
        return { error: "Please provide a valid email and password." };
      }
      const demoUser: AuthUser = {
        id: `user-${Date.now()}`,
        email,
        display_name: displayName || email.split("@")[0] || "Alex Vance",
      };
      setUser(demoUser);
      localStorage.setItem("closetcue_demo_user", JSON.stringify(demoUser));
      return {};
    }

    const supabase = createClient();
    if (!supabase) return { error: "Supabase client not initialized." };

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split("@")[0],
        },
      },
    });

    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null);
      localStorage.removeItem("closetcue_demo_user");
      return;
    }
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    if (isDemoMode) {
      return { success: true };
    }
    const supabase = createClient();
    if (!supabase) return { error: "Supabase client not initialized." };
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { error: error.message };
    return { success: true };
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const newProfile: UserProfile = {
      ...(profile || {
        id: user.id,
        display_name: user.display_name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
      ...updates,
      updated_at: new Date().toISOString(),
    };

    setProfile(newProfile);

    if (isDemoMode) {
      localStorage.setItem("closetcue_demo_profile", JSON.stringify(newProfile));
      return;
    }

    const supabase = createClient();
    if (supabase) {
      await supabase.from("profiles").upsert(newProfile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isDemoMode,
        signInWithPassword,
        signUpWithPassword,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
