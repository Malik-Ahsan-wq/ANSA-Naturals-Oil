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
  { href: "/contact", label: "Contact" },
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

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#fafafa]/95 backdrop-blur-lg border-b border-zinc-200 shadow-md"
          : "bg-[#fafafa]/60 backdrop-blur-md border-b border-zinc-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="group flex items-center">
            <div
           
            >
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
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-300 hover:text-[#111111] ${
                    isActive ? "text-[#111111] font-bold" : "text-zinc-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/products"
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#111111] to-[#333333] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              <FaLeaf />
              Buy Now
            </Link>

            <Link
              href="/admin/dashboard"
              className="hidden sm:inline-flex items-center justify-center text-lg text-zinc-600 transition-colors duration-300 hover:text-[#111111]"
              aria-label="Admin"
            >
              <FaUserShield />
            </Link>

            <button
              onClick={openCart}
              className="relative rounded-full p-2 text-zinc-700 transition-colors duration-300 hover:text-[#111111]"
              aria-label="Open cart"
            >
              <FaShoppingCart className="text-xl" />

              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c08a2e] text-[10px] font-bold text-white">
                  {getCartCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-700 transition-colors duration-300 lg:hidden hover:text-[#111111]"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-[28rem]" : "max-h-0"
          }`}
        >
          <div className="mt-1 mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <nav className="flex flex-col">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-[#111111]"
                  >
                    <FaLeaf className="text-xs text-zinc-400" />
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-gray-200 p-4">
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#111111] to-[#333333] py-3 text-sm font-bold text-white shadow-lg"
                >
                  <FaShoppingCart />
                  Shop Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}