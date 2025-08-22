import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ErrorBoundary from '@/components/ErrorBoundary';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeux pour Enfants",
  description: "Découvre nos jeux amusants avec tes personnages préférés !",
  
  // Open Graph metadata
  openGraph: {
    title: "Jeux pour Enfants",
    description: "Découvre nos jeux amusants avec tes personnages préférés !",
    url: "https://qui-est-ce-schwepps.vercel.app/",
    siteName: "Jeux pour Enfants",
    images: [
      {
        url: "/images/logo/logo-large.png",
        width: 1200,
        height: 630,
        alt: "Jeux pour Enfants - Collection de jeux avec personnages de dessins animés",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Jeux pour Enfants",
    description: "Découvre nos jeux amusants avec tes personnages préférés !",
    images: ["/images/logo/logo-large.png"],
  },
  
  // Additional SEO metadata
  keywords: ["jeux", "enfants", "dessins animés", "qui est-ce", "mémo", "memory", "devinettes"],
  authors: [{ name: "Schwepps" }],
  creator: "Schwepps",
  publisher: "Schwepps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
