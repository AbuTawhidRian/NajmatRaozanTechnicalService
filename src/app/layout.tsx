import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Najmat Raozan Technical Service | Rolling Shutter & Sunshade Dubai",
    template: "%s | Najmat Raozan",
  },
  description: "Professional rolling shutter and sunshade installation, repair, and maintenance for shops, villas, and commercial properties across Dubai. Fast response and free site visits.",
  keywords: [
    "rolling shutter repair Dubai", 
    "automatic shutter installation", 
    "sunshade repair Dubai", 
    "outdoor curtains", 
    "commercial shutter maintenance",
    "Najmat Raozan Technical Service"
  ],
  authors: [{ name: "Najmat Raozan" }],
  creator: "Najmat Raozan Technical Service",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    title: "Najmat Raozan | Rolling Shutter & Sunshade Dubai",
    description: "Professional rolling shutter and sunshade installation, repair, and maintenance across Dubai. Fast, reliable, and professional service.",
    siteName: "Najmat Raozan Technical Service",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Najmat Raozan Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Najmat Raozan | Rolling Shutter & Sunshade Dubai",
    description: "Professional rolling shutter and sunshade installation, repair, and maintenance across Dubai.",
    images: ["/images/logo.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-brand-white text-brand-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
