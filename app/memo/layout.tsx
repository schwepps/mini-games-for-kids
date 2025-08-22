import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mémo - Jeu de mémoire",
  description: "Jeu de mémoire avec tes personnages préférés !",
  
  // Open Graph metadata
  openGraph: {
    title: "Mémo - Jeu de mémoire",
    description: "Jeu de mémoire avec tes personnages préférés !",
    url: "https://qui-est-ce-schwepps.vercel.app/memo",
    siteName: "Mémo",
    images: [
      {
        url: "/images/logo/memo-logo-large.png",
        width: 1200,
        height: 630,
        alt: "Mémo - Jeu de mémoire avec personnages de dessins animés",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Mémo - Jeu de mémoire",
    description: "Jeu de mémoire avec tes personnages préférés !",
    images: ["/images/logo/memo-logo-large.png"],
  },
  
  // Additional SEO metadata
  keywords: ["jeu", "mémoire", "mémo", "dessins animés", "enfants", "memory"],
  authors: [{ name: "Schwepps" }],
  creator: "Schwepps",
  publisher: "Schwepps",
};

export default function MemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}