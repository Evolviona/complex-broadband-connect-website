import type { Metadata } from "next";
import { Audiowide, Quicksand } from "next/font/google";
import "./globals.css";
import { SegmentProvider } from "@/contexts/SegmentContext";
import Navigation from "@/components/sections/navigation/Navigation";

// Optimized font loading
const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
  display: 'swap',
});

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Broadband Connect | Professional Telecommunications Training",
  description: "Australia's leading telecommunications training provider. Accredited courses, hands-on training, and industry-ready certification for technicians and apprentices.",
  keywords: [
    "telecommunications training",
    "nbn training",
    "ACMA certification",
    "optical fiber course",
    "telecom apprenticeship",
    "Queensland training",
    "RTO 52423"
  ],
  authors: [{ name: "Broadband Connect" }],
  creator: "Broadband Connect",
  publisher: "Broadband Connect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Broadband Connect | Professional Telecommunications Training",
    description: "Australia's leading telecommunications training provider with hands-on courses and industry certification.",
    url: "https://broadbandconnect.edu.au",
    siteName: "Broadband Connect",
    locale: "en_AU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${audiowide.variable} ${quicksand.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0B8FE5" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="font-quicksand antialiased">
        <SegmentProvider>
          <Navigation />
          {children}
        </SegmentProvider>
      </body>
    </html>
  );
}
