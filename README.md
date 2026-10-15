# ClosetCue — AI-Powered Personal Stylist & Digital Wardrobe Platform

> **"Your wardrobe. Your mood. Your style."**

ClosetCue is a polished, editorial web application that turns the clothes you already own into outfits that feel like you. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js, React Three Fiber, and Supabase.

---

## 🎨 Visual Identity & Warm Palette

ClosetCue embraces a combination of **Minimalism**, **Bento UI**, and **Editorial Fashion Design**:

* **Warm cream:** `#F8F1E8` (Page background & spacious surfaces)
* **Muted peach:** `#D99B79` (Soft accents & silk textures)
* **Terracotta:** `#B9684B` (Primary actions & tailored outerwear tone)
* **Caramel:** `#A87549` (Leather accents & secondary buttons)
* **Espresso:** `#302923` (High-contrast typography)
* **Soft neutral surface:** `#FFFFFF` (Card surfaces & clean containers)

Typography pairs **Playfair Display** (editorial serif headings) with **Plus Jakarta Sans** (clean, accessible UI body).

---

## 🚀 Quick Start on Windows 11

### 1. Open your terminal in the project folder:
```powershell
cd E:\wardrobe
```

### 2. Run the development server:
```powershell
npm run dev
```

### 3. Open in your browser:
Visit [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Application Structure

```
e:\wardrobe\
├── src/
│   ├── app/
│   │   ├── api/ai/recognize-clothing/  # AI clothing vision API + fallback
│   │   ├── auth/                       # Login, Register, Forgot Password
│   │   ├── dashboard/                  # Bento styling headquarters
│   │   ├── onboarding/                 # 3-step aesthetic & color setup
│   │   ├── outfits/                    # Saved looks & wear history log
│   │   ├── profile/                    # User preferences & privacy settings
│   │   ├── style-me/                   # The Core Feature: Mood-based styling
│   │   ├── wardrobe/                   # Digital wardrobe catalog & upload
│   │   ├── globals.css                 # Warm palette design tokens
│   │   ├── layout.tsx                  # Root layout with fonts & AuthProvider
│   │   └── page.tsx                    # Editorial Landing Page + 3D Hero
│   ├── components/
│   │   ├── landing/                    # Navbar, 3D Canvas, Bento showcases
│   │   ├── layout/                     # AppNavbar for interior routes
│   │   ├── ui/                         # Reusable Button, Card, Badge primitives
│   │   └── wardrobe/                   # AddItemModal, ItemDetailModal
│   └── lib/
│       ├── context/                    # AuthContext (Supabase + local demo mode)
│       ├── services/                   # WardrobeStorage & Hybrid OutfitEngine
│       ├── supabase/                   # Supabase SSR client config
│       ├── types.ts                    # Domain TypeScript models
│       └── utils.ts                    # Class merging helper
└── supabase/
    └── migrations/                     # Complete PostgreSQL + RLS SQL script
```

---

## 🗄️ Supabase Database & Security Setup

When you are ready to connect to a live Supabase project:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261015000000_closetcue_schema.sql` and run it. This will create:
   - `profiles`
   - `wardrobe_items`
   - `outfits`
   - `outfit_items`
   - `wear_history`
   - Row Level Security (RLS) policies guaranteeing that users can only ever access their own clothes.
   - Private storage bucket `wardrobe-images`.
4. Copy your project URL and Anon key into a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

*(Note: In local development mode without Supabase keys, ClosetCue runs in seamless demo mode with full interactive functionality.)*

---

## 🤖 AI Clothing Recognition Setup (Optional)

ClosetCue includes an AI Vision route (`/api/ai/recognize-clothing`) that automatically suggests category, primary color, and style tags when you photograph a garment.

To connect Gemini or OpenAI vision:
```env
GEMINI_API_KEY="your-gemini-api-key"
# or
OPENAI_API_KEY="your-openai-api-key"
```

If keys are omitted, ClosetCue's built-in intelligent fashion heuristic engine steps in immediately without breaking the user flow.
