import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

const fontSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AB Restaurant",
  description: "Professional restaurant website with menu and ordering via WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/assets/headerchef.png" />
      </head>
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        <CartProvider>
          <AOSInit />
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
