import type { Metadata } from "next";
import {
  Inter,
  Instrument_Serif,
  Geist_Mono,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { Providers } from "./providers";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoDev = Noto_Sans_Devanagari({
  variable: "--font-noto-dev",
  subsets: ["devanagari", "latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishav Kumar — B2B SaaS Writer & Digital Builder",
  description:
    "B2B SaaS content writer and digital builder. Four plus years writing search-friendly content for HR tech, dev tools, and AI. Ships small web projects on the side.",
  metadataBase: new URL("https://rishavkumarkarn.in"),
  openGraph: {
    title: "Rishav Kumar — B2B SaaS Writer & Digital Builder",
    description:
      "Writes for B2B SaaS. Builds for the web. Based in Kolkata, India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} ${notoDev.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
