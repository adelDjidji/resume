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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playwrite+AU+NSW:wght@100..400&display=swap"
        rel="stylesheet"
      ></link>
      <body className={`${raleway.variable} ${cairo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
