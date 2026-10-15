-- ==============================================================================
-- CLOSETCUE: Supabase PostgreSQL Schema & Row Level Security (RLS) Migration
-- Version: 1.0.0
-- ==============================================================================

-- 1. PROFILES TABLE (Linked directly to Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  style_preferences TEXT[] DEFAULT '{}',
  favorite_colors TEXT[] DEFAULT '{}',
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. WARDROBE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'T-shirts', 'Shirts', 'Trousers', 'Jeans', 'Shorts',
    'Dresses', 'Skirts', 'Jackets', 'Sweaters', 'Shoes', 'Bags', 'Accessories'
  )),
  primary_color TEXT NOT NULL,
  secondary_colors TEXT[] DEFAULT '{}',
  style_tags TEXT[] DEFAULT '{}',
  season_weather TEXT CHECK (season_weather IN ('Warm', 'Cold', 'Transitional', 'All-Season')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. OUTFITS TABLE
CREATE TABLE IF NOT EXISTS public.outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  mood TEXT NOT NULL,
  occasion TEXT NOT NULL,
  explanation TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  worn_count INTEGER DEFAULT 0,
  last_worn_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OUTFIT ITEMS JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.outfit_items (
  outfit_id UUID NOT NULL REFERENCES public.outfits(id) ON DELETE CASCADE,
  wardrobe_item_id UUID NOT NULL REFERENCES public.wardrobe_items(id) ON DELETE CASCADE,
  garment_role TEXT NOT NULL CHECK (garment_role IN (
    'top', 'bottom', 'one-piece', 'outerwear', 'shoes', 'accessory', 'bag'
  )),
  PRIMARY KEY (outfit_id, wardrobe_item_id)
);

-- 5. WEAR HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.wear_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  outfit_id UUID NOT NULL REFERENCES public.outfits(id) ON DELETE CASCADE,
  worn_date DATE DEFAULT CURRENT_DATE NOT NULL,
  feedback TEXT CHECK (feedback IN ('loved', 'good', 'neutral', 'not_great')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_user_id ON public.wardrobe_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_category ON public.wardrobe_items(category);
CREATE INDEX IF NOT EXISTS idx_outfits_user_id ON public.outfits(user_id);
CREATE INDEX IF NOT EXISTS idx_outfit_items_outfit_id ON public.outfit_items(outfit_id);
CREATE INDEX IF NOT EXISTS idx_wear_history_user_id ON public.wear_history(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Users can ONLY access, modify, and delete their own records.
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wear_history ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Wardrobe Items Policies
CREATE POLICY "Users can view own wardrobe items"
  ON public.wardrobe_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wardrobe items"
  ON public.wardrobe_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wardrobe items"
  ON public.wardrobe_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wardrobe items"
  ON public.wardrobe_items FOR DELETE
  USING (auth.uid() = user_id);

-- Outfits Policies
CREATE POLICY "Users can view own outfits"
  ON public.outfits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own outfits"
  ON public.outfits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own outfits"
  ON public.outfits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own outfits"
  ON public.outfits FOR DELETE
  USING (auth.uid() = user_id);

-- Outfit Items Policies (Enforces that both outfit and items belong to the user)
CREATE POLICY "Users can view own outfit items"
  ON public.outfit_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.outfits
      WHERE public.outfits.id = outfit_items.outfit_id
      AND public.outfits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own outfit items"
  ON public.outfit_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.outfits
      WHERE public.outfits.id = outfit_items.outfit_id
      AND public.outfits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own outfit items"
  ON public.outfit_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.outfits
      WHERE public.outfits.id = outfit_items.outfit_id
      AND public.outfits.user_id = auth.uid()
    )
  );

-- Wear History Policies
CREATE POLICY "Users can view own wear history"
  ON public.wear_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wear history"
  ON public.wear_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH USER CREATION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (Private images with owner-only access)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('wardrobe-images', 'wardrobe-images', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload their own wardrobe images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'wardrobe-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own wardrobe images"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'wardrobe-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own wardrobe images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'wardrobe-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
