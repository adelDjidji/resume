import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Headings + code-flavoured labels
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});
// Body copy: technical grotesk that stays readable in long paragraphs
const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
// Seven-segment LCD digits for numbers (DSEG, SIL OFL 1.1 — see app/fonts/DSEG-LICENSE.txt)
const digital = localFont({
  variable: "--font-digital",
  src: "./fonts/DSEG7Classic-Bold.woff2",
  weight: "700",
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
    <html lang="en" className={`${mono.variable} ${sans.variable} ${digital.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
