import type { Metadata } from "next";
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
});

const fontSerif = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const product = products[0];

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "ANSA Naturals", "black seed oil", "Organic hair oil", "pure natural oil",
    "kalonji oil", "organic hair oil", "natural hair oil", "hair growth oil", "hair care oil",
  ],
  metadataBase: new URL("https://ansanaturals.com"),
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    type: "website",
    locale: "en_PK",
    images: [{ url: brand.logo, width: 1536, height: 1024, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: [brand.logo],
  },
  icons: {
    icon: brand.logo,
    apple: brand.logo,
  },
  other: {
    "theme-color": "#000000",
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
    image: [brand.logo],
    description: product.description,
    brand: { "@type": "Brand", name: brand.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviews),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: String(product.price),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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