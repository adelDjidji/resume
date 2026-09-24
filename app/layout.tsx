import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adel Djidjik — Software Engineer",
  description:
    "Adel Djidjik is a full-stack JavaScript software engineer crafting fast, scalable web and mobile products with React, Next.js and Node.js.",
  openGraph: {
    title: "Adel Djidjik — Software Engineer",
    description:
      "Full-stack JavaScript engineer crafting fast, scalable web and mobile products.",
    images: ["/img/me.jpeg"],
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#081114",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
