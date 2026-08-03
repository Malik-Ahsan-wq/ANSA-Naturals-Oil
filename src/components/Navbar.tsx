"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaLeaf, FaUserShield } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { brand } from "@/data/brand";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "Our Story" },
  { href: "#benefits", label: "Benefits" },
  { href: "#why-us", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount, openCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        solid
          ? "bg-[#fbf8f1]/90 backdrop-blur-lg border-b border-emerald-900/10 shadow-sm"
          : "bg-transparent backdrop-blur-[2px] border-b border-white/10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex items-center">
            <div className={`relative flex items-center rounded-xl overflow-hidden transition-shadow ${solid ? "bg-white shadow-sm border border-emerald-900/10" : ""}`}>
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={0}
                height={0}
                sizes="160px"
                priority
                className="h-9 lg:h-11 w-auto"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isSection = link.href.startsWith("#");
              const href = link.href === "/" ? "/" : isSection ? (isHome ? link.href : `/${link.href}`) : link.href;
              const isActive = !isSection && pathname === link.href;
              return (
                <a
                  key={link.label}
                  href={href}
                  className={`relative text-sm font-semibold transition-colors duration-300 hover:text-[#1f5c3d] ${
                    isActive ? "text-[#1f5c3d]" : solid ? "text-zinc-600" : "text-emerald-50/90"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/products"
              className={`hidden lg:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all active:scale-95 shadow-lg ${
                solid
                  ? "bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white hover:shadow-emerald-900/30"
                  : "bg-white text-[#1f5c3d] hover:bg-[#eef6ec]"
              }`}
            >
              <FaLeaf /> Buy Now
            </Link>

            <Link
              href="/admin/dashboard"
              className={`hidden sm:inline-flex items-center justify-center text-lg transition-colors duration-300 hover:text-[#1f5c3d] ${solid ? "text-zinc-500" : "text-white/80"}`}
              aria-label="Admin"
            >
              <FaUserShield />
            </Link>

            <button
              onClick={openCart}
              className={`relative p-2 rounded-full transition-colors duration-300 hover:text-[#1f5c3d] ${solid ? "text-zinc-600" : "text-white"}`}
              aria-label="Open cart"
            >
              <FaShoppingCart className="text-xl" />
              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#c08a2e] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 lg:hidden transition-colors duration-300 hover:text-[#1f5c3d] ${solid ? "text-zinc-700" : "text-white"}`}
              aria-label="Open menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[28rem]" : "max-h-0"}`}>
          <div className="mt-1 mb-3 rounded-2xl border border-emerald-900/10 bg-white shadow-xl overflow-hidden">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href === "/" ? "/" : `/${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3.5 text-sm font-semibold text-zinc-700 hover:bg-emerald-50 hover:text-[#1f5c3d] transition-colors flex items-center gap-2"
                >
                  <FaLeaf className="text-[#1f5c3d]/40 text-xs" />
                  {link.label}
                </a>
              ))}
              <div className="border-t border-emerald-900/5 p-4">
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white py-3 font-bold text-sm shadow-lg"
                >
                  <FaShoppingCart /> Shop Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}