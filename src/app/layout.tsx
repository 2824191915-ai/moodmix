import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "MoodMix · A Cocktail Ritual for the Night",
  description: "用八个瞬间，读出今晚的情绪、人格与一杯属于你的经典鸡尾酒。",
  applicationName: "MoodMix",
  keywords: ["MoodMix", "cocktail", "mood", "coffee symbols", "night ritual"],
  openGraph: {
    title: "MoodMix · A Cocktail Ritual for the Night",
    description: "用八个瞬间，创造一杯属于今晚的经典鸡尾酒。",
    type: "website",
    images: [{ url: "/images/moodmix-night-table.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodMix · A Cocktail Ritual for the Night",
    description: "用八个瞬间，创造一杯属于今晚的经典鸡尾酒。",
    images: ["/images/moodmix-night-table.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08090a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
