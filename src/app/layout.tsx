import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/context/AuthContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClosetCue — Your wardrobe. Your mood. Your style.",
  description:
    "AI-Powered Personal Stylist & Digital Wardrobe Platform. Turn the clothes you already own into outfits that feel like you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-cream text-espresso antialiased selection:bg-terracotta selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
