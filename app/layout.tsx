import type { Metadata } from "next";
import { Raleway, Cairo } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adel DJIDJIK",
  description: "Adel Djidjik resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${cairo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
