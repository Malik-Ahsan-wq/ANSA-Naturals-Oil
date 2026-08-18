import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import { brand } from "@/data/brand";
import { products } from "@/data/products";

const fontSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const fontSerif = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const product = products[0];

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ansanaturals.com"),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "ANSA Naturals", "organic oil", "Organic hair oil", "pure natural oil",
    "kalonji oil", "organic hair oil", "natural hair oil", "hair growth oil",
    "hair care oil", "cold pressed oil", "100% organic", "lab tested oil",
    "natural hair treatment", "hair fall solution", "hair growth treatment",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    url: "https://ansanaturals.com",
    siteName: brand.name,
    type: "website",
    locale: "en_PK",
    images: [
      {
        url: "/assets/banner.png",
        width: 1920,
        height: 600,
        alt: `${brand.name} - Pure Organic Hair Oil`,
        type: "image/png",
      },
      {
        url: "/assets/ansa-logo.png",
        width: 512,
        height: 512,
        alt: `${brand.name} Logo`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: ["/assets/banner.png"],
    creator: "@ansanaturals",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
    canonical: "https://ansanaturals.com",
  },
  other: {
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: ["/assets/WhatsApp Image 2026-08-17 at 11.13.19 PM.jpeg"],
    description: product.description,
    brand: { "@type": "Brand", name: brand.name },
    sku: "ANSA-OIL-001",
    offers: {
      "@type": "Offer",
      url: "https://ansanaturals.com/products",
      priceCurrency: "PKR",
      price: String(product.price),
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviews),
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: "https://ansanaturals.com",
    logo: "/assets/ansa-logo.png",
    description: brand.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.phone,
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      brand.social.instagram,
      brand.social.facebook,
      brand.social.tiktok,
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://ansanaturals.com" />
        <link rel="dns-prefetch" href="https://ansanaturals.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
