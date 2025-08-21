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
  title: "Qui est-ce ?",
  description: "Devine les personnages de dessins animés !",
  
  // Open Graph metadata
  openGraph: {
    title: "Qui est-ce ?",
    description: "Devine les personnages de dessins animés !",
    url: "https://your-domain.com",
    siteName: "Qui est-ce ?",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Qui est-ce ? - Jeu de devinettes avec personnages de dessins animés",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Qui est-ce ?",
    description: "Devine les personnages de dessins animés !",
    images: ["/images/logo/logo.png"],
  },
  
  // Additional SEO metadata
  keywords: ["jeu", "devinettes", "dessins animés", "enfants", "qui est-ce"],
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
