"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUserShield } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Menu" },
  { href: "/ourStory", label: "Our Story" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount, openCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages always show solid bg since there's no hero underneath
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-lg border-b border-zinc-100 shadow-sm"
          : "bg-black/20 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-lg transition-transform group-hover:rotate-12">
              A
            </div>
            <span className={`text-lg font-black tracking-tight uppercase transition-colors duration-300 ${solid ? "text-zinc-900" : "text-white"}`}>
              AB <span className="text-orange-500">Restaurant</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-300 hover:text-orange-500 ${
                    isActive
                      ? "text-orange-500"
                      : solid ? "text-zinc-600" : "text-white/90"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[27px] left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className={`hidden sm:inline-flex items-center gap-1.5 font-medium transition-colors duration-300 text-sm hover:text-orange-500 ${solid ? "text-zinc-600" : "text-white/90"}`}
            >
              <FaUserShield className="text-lg" />
              <span className="hidden lg:inline">Admin</span>
            </Link>

            <button
              onClick={openCart}
              className={`relative p-2 transition-colors duration-300 hover:text-orange-500 ${solid ? "text-zinc-600" : "text-white"}`}
              aria-label="Open cart"
            >
              <FaShoppingCart className="text-xl" />
              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 md:hidden transition-colors duration-300 hover:text-orange-500 ${solid ? "text-zinc-600" : "text-white"}`}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden pb-3 rounded-xl border border-zinc-200 bg-white shadow-lg mt-2 mb-2">
            <nav className="flex flex-col divide-y divide-zinc-100">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-5 py-3.5 text-sm font-semibold ${
                    pathname === link.href ? "text-orange-600" : "text-zinc-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3.5 text-sm font-semibold text-zinc-700 flex items-center gap-2"
              >
                <FaUserShield /> Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
