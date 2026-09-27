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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adeldjidjik.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adel Djidjik — Full-Stack Software Engineer | React, Next.js, Node.js Developer",
    template: "%s | Adel Djidjik",
  },
  description:
    "Adel Djidjik is a full-stack JavaScript software engineer from Algeria specializing in React, Next.js, Node.js, and TypeScript. 5+ years building scalable web and mobile applications for startups and enterprises.",
  keywords: [
    "Adel Djidjik",
    "Adel Djidjik software engineer",
    "Adel Djidjik developer",
    "Adel Djidjik React",
    "Adel Djidjik Algeria",
    "full-stack developer",
    "JavaScript developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "MERN stack developer",
    "web developer Algeria",
    "software engineer Algeria",
    "freelance developer",
    "remote developer",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Adel Djidjik", url: siteUrl }],
  creator: "Adel Djidjik",
  publisher: "Adel Djidjik",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Adel Djidjik Portfolio",
    title: "Adel Djidjik — Full-Stack Software Engineer",
    description:
      "Full-stack JavaScript engineer with 5+ years experience building scalable web and mobile products with React, Next.js, and Node.js.",
    images: [
      {
        url: "/img/me.jpeg",
        width: 800,
        height: 800,
        alt: "Adel Djidjik — Software Engineer",
      },
    ],
    firstName: "Adel",
    lastName: "Djidjik",
    username: "adelDjidji",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adel Djidjik — Full-Stack Software Engineer",
    description:
      "Full-stack JavaScript engineer building scalable web and mobile products with React, Next.js, and Node.js.",
    images: ["/img/me.jpeg"],
    creator: "@adelDjidji",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#081114",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adel Djidjik",
  givenName: "Adel",
  familyName: "Djidjik",
  jobTitle: "Full-Stack Software Engineer",
  description:
    "Full-stack JavaScript software engineer specializing in React, Next.js, Node.js, and TypeScript. Building scalable web and mobile applications.",
  url: "https://adeldjidjik.com",
  image: "https://adeldjidjik.com/img/me.jpeg",
  email: "djidjik.adel.sp@gmail.com",
  telephone: "+213669479443",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boumerdès",
    addressCountry: "Algeria",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "REST API",
    "GraphQL",
    "React Native",
    "Tailwind CSS",
    "Git",
    "Agile",
    "Scrum",
  ],
  sameAs: [
    "https://www.linkedin.com/in/adel-djidjik/",
    "https://github.com/adelDjidji",
    "https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Skaalab",
    url: "https://www.skaalab.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${digital.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
