"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaLeaf, FaTiktok } from "react-icons/fa";
import { brand, whatsappLink } from "@/data/brand";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setState("success");
        setEmail("");
        setMessage("Welcome to the circle! Check your inbox for a confirmation.");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="relative bg-[#0c2b1d] text-emerald-100/70 pt-16 pb-8 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center">
              <div className="rounded-xl overflow-hidden bg-white/5 p-1.5">
                <Image src={brand.logo} alt={`${brand.name} logo`} width={0} height={0} sizes="168px" className="h-12 w-auto" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Pure, cold-pressed natural hair oil crafted with care — nature&apos;s most
              potent elixir for stronger, shinier, healthier-looking hair.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaInstagram, href: brand.social.instagram, label: "Instagram" },
                { icon: FaFacebook, href: brand.social.facebook, label: "Facebook" },
                { icon: FaTiktok, href: brand.social.tiktok, label: "TikTok" },
                { icon: FaWhatsapp, href: whatsappLink("Hello ANSA Naturals!"), label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-100/80 hover:bg-[#2e7d57] hover:border-[#2e7d57] hover:text-white transition-all">
                  <s.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-3.5">
              {[
                { label: "Our Story", href: "#about" },
                { label: "Benefits", href: "#benefits" },
                { label: "Ingredients", href: "#ingredients" },
                { label: "Reviews", href: "#reviews" },
                { label: "FAQs", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-[#e6c277] transition-colors flex items-center gap-2 group">
                    <FaLeaf className="text-[#2e7d57] text-xs group-hover:text-[#e6c277] transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#e6c277] shrink-0" />
                <span>{brand.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#e6c277] shrink-0" />
                <span>{brand.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#e6c277] shrink-0 mt-0.5" />
                <span>{brand.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Stay Nourished</h4>
            <p className="text-sm mb-4">Join our hair-care circle for exclusive offers and natural hair-nourishing tips.</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/40 outline-none focus:ring-2 focus:ring-[#c08a2e] transition-all"
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="rounded-xl bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white py-3 text-sm font-bold hover:shadow-lg hover:shadow-emerald-900/40 transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
              >
                {state === "submitting" ? "Subscribing…" : "Subscribe"}
              </button>
              {state === "success" && (
                <p className="text-xs font-semibold text-emerald-300">{message}</p>
              )}
              {state === "error" && (
                <p className="text-xs font-semibold text-red-300">{message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} {brand.name}. All rights reserved. Crafted with nature.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs uppercase tracking-widest">
            <Link href="/#faq" className="hover:text-[#e6c277] transition-colors">Privacy Policy</Link>
            <Link href="/#faq" className="hover:text-[#e6c277] transition-colors">Terms of Service</Link>
            <Link href="/#faq" className="hover:text-[#e6c277] transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}