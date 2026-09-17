import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const company = settings.companyName;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: {
      default: `${company} | Rolling Shutter & Sunshade Dubai`,
      template: `%s | ${company}`,
    },
    description: "Professional rolling shutter and sunshade installation, repair, and maintenance for shops, villas, and commercial properties across Dubai. Fast response and free site visits.",
    keywords: [
      "rolling shutter repair Dubai", 
      "automatic shutter installation", 
      "sunshade repair Dubai", 
      "outdoor curtains", 
      "commercial shutter maintenance",
      company
    ],
    authors: [{ name: company }],
    creator: company,
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "/",
      title: `${company} | Rolling Shutter & Sunshade Dubai`,
      description: "Professional rolling shutter and sunshade installation, repair, and maintenance across Dubai. Fast, reliable, and professional service.",
      siteName: company,
      images: [
        {
          url: "/images/logo.png",
          width: 800,
          height: 600,
          alt: `${company} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${company} | Rolling Shutter & Sunshade Dubai`,
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
}

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
