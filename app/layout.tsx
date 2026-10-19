import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Tervana — Find a place you'll love living in",
  description: "Buy, rent or sell with Tervana: curated homes, local advisors and a clear breakdown of every cost.",
  openGraph: { images: ["/img/home-1-1200.webp"] },
};

export const viewport: Viewport = { themeColor: "#1f6fd8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
