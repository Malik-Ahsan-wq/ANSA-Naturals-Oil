"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { FaShoppingCart, FaPlus, FaMinus, FaChevronLeft, FaChevronRight, FaFire, FaLeaf, FaAward } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const SLIDES = [
  { src: "/assets/hamza-nouasria-EKBlvpTW_fA-unsplash.jpg", tag: "Welcome",          title: "Authentic Pakistani Flavors", sub: "Handcrafted recipes passed down through generations of culinary mastery." },
  { src: "/assets/arrivalimage-6.jpg",                      tag: "BBQ Night",        title: "Smoke & Spice",               sub: "Our pits burn slow so every bite is tender, smoky and unforgettable." },
  { src: "/assets/irws-pUCck5WyUH4-unsplash.jpg",           tag: "Fresh Daily",      title: "A Culinary Journey",          sub: "Bold flavors, beautiful plating, and an experience worth remembering." },
  { src: "/assets/chickenbiryani.jpg",                      tag: "Chef's Special",   title: "Crafted With Passion",        sub: "Every plate is a story of taste, tradition, and the finest ingredients." },
  { src: "/assets/alexandru-bogdan-ghita-UeYkqQh4PoI-unsplash.jpg", tag: "Fine Dining", title: "Fine Dining, Local Soul", sub: "Restaurant-quality meals with the warmth of home cooking." },
  { src: "/assets/arrivalimage-7.jpg",                      tag: "Premium",          title: "Taste The Difference",        sub: "Sourced fresh each morning, cooked to perfection, served with love." },
  { src: "/assets/thumb-1920-1313839.jpg",                  tag: "Most Loved",       title: "Flavors That Inspire",        sub: "From our kitchen to your heart — pure delight in every bite." },
  { src: "/assets/arrivalimage-8.jpg",                      tag: "Popular",          title: "Explore Our Menu",            sub: "From sizzling BBQ platters to refreshing drinks — something for everyone." },
  { src: "/assets/kithchenchef.jpg",                        tag: "Behind the Scenes",title: "Masters of the Kitchen",      sub: "Our chefs bring years of expertise to every dish they create." },
  { src: "/assets/interior2.jpg",                           tag: "Dine With Us",     title: "Your Table is Ready",         sub: "Come dine with us and discover why we are the city's favourite spot." },
  { src: "/assets/arrivalimage-1.jpg",                      tag: "Signature Dish",   title: "Authentic Taste",             sub: "Every bite carries the legacy of traditional Pakistani cuisine." },
  { src: "/assets/bbqplatter.jpg",                          tag: "New Arrival",      title: "The Ultimate BBQ Platter",    sub: "Seekh kabab, tikka & malai boti — all on one glorious plate." },
];

const STATS = [
  { icon: FaAward, value: "15+", label: "Years of Excellence" },
  { icon: FaFire,  value: "50+", label: "Signature Dishes" },
  { icon: FaLeaf,  value: "100%", label: "Fresh Ingredients" },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);

  const goTo = useCallback((index: number) => {
    if (sliding) return;
    setSliding(true);
    setCurrent((index + SLIDES.length) % SLIDES.length);
    setTimeout(() => setSliding(false), 700);
  }, [sliding]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative w-full -mt-16 h-[55vh] sm:h-[70vh] lg:h-screen overflow-hidden bg-zinc-900">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{ transition: "opacity 0.7s ease" }}
          className={`absolute inset-0 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image src={slide.src} alt={slide.title} fill className="object-cover object-center" priority={i === 0} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* TEXT */}
      <div className="relative z-20 h-full flex flex-col justify-center px-5 sm:px-10 lg:px-20">
        <span key={`tag-${current}`} className="text-orange-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2 sm:mb-3 animate-fadeInUp">
          ✦ {SLIDES[current].tag}
        </span>
        <h1 key={`h1-${current}`} className="text-2xl sm:text-5xl lg:text-7xl font-black text-white leading-tight max-w-2xl animate-fadeInUp drop-shadow-xl">
          {SLIDES[current].title}
        </h1>
        <p key={`p-${current}`} className="mt-2 sm:mt-4 text-xs sm:text-base text-white/70 max-w-sm sm:max-w-lg leading-relaxed animate-fadeInUp line-clamp-2 sm:line-clamp-none">
          {SLIDES[current].sub}
        </p>
        <div className="mt-4 sm:mt-8 flex gap-2 sm:gap-3 animate-fadeInUp">
          <Link href="/products" className="bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95">
            Explore Menu
          </Link>
          <Link href="/ourStory" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95">
            Our Story
          </Link>
        </div>
      </div>

      {/* ARROWS */}
      <button onClick={prev} aria-label="Previous" className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all active:scale-90">
        <FaChevronLeft size={12} />
      </button>
      <button onClick={next} aria-label="Next" className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all active:scale-90">
        <FaChevronRight size={12} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-1.5 bg-orange-500" : "w-1.5 h-1.5 bg-white/40"}`} />
        ))}
      </div>

      {/* COUNTER */}
      <div className="absolute top-20 right-4 z-30 text-white/40 text-[10px] font-mono tabular-nums hidden sm:block">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* STATS — desktop only */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hidden lg:block pb-8 px-8">
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4 flex items-center justify-around gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 text-white">
              <Icon className="text-orange-400 text-xl" />
              <div>
                <p className="font-black text-lg leading-none">{value}</p>
                <p className="text-xs text-white/60">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="group rounded-xl sm:rounded-2xl border border-zinc-100 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-aos="fade-up">
      <Link href={`/product/${p.slug}`} className="block overflow-hidden relative">
        <Image src={p.image} alt={p.name} width={400} height={280} className="w-full h-36 sm:h-48 lg:h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute top-2 left-2 bg-orange-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wide">
          {p.category}
        </span>
      </Link>

      <div className="p-2.5 sm:p-4 flex flex-col gap-2">
        <Link href={`/product/${p.slug}`} className="font-bold text-xs sm:text-sm text-zinc-900 hover:text-orange-600 transition-colors line-clamp-1">
          {p.name}
        </Link>

        {/* Qty */}
        <div className="flex items-center justify-between bg-zinc-50 rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 border border-zinc-100">
          <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Qty</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md bg-white border border-zinc-200 text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-all">
              <FaMinus size={7} />
            </button>
            <span className="font-black text-zinc-900 text-xs w-3 text-center">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md bg-white border border-zinc-200 text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-all">
              <FaPlus size={7} />
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base font-black text-zinc-900">
          Rs {(p.price * quantity).toLocaleString()}
        </p>

        <button onClick={() => addToCart(p, quantity)}
          className="w-full flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-orange-600 hover:bg-orange-700 text-white py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold transition-all active:scale-95 shadow-sm">
          <FaShoppingCart size={10} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <HeroSlider />

      {/* SECTION HEADER */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:pt-16 pb-3 flex items-end justify-between gap-3">
        <div data-aos="fade-right">
          <p className="text-orange-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1">— Our Kitchen</p>
          <h2 className="text-xl sm:text-3xl font-black text-zinc-900">Chef&apos;s Specials</h2>
        </div>
        <Link href="/products" data-aos="fade-left" className="text-xs sm:text-sm font-bold text-orange-600 border-b border-orange-300 hover:border-orange-600 transition-all whitespace-nowrap">
          View Full Menu →
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 mb-6">
        <div className="h-px bg-gradient-to-r from-orange-200 via-zinc-100 to-transparent" />
      </div>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 pb-6 sm:pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        <div className="mt-8 sm:mt-10 text-center" data-aos="fade-up">
          <Link href="/products" className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-7 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95">
            See All {products.length} Items →
          </Link>
        </div>
      </section>

      {/* BANNER */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 pb-10 sm:pb-16">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-40 sm:h-56 lg:h-64" data-aos="fade-up">
          <Image src="/assets/headerchef.png" alt="AB Restaurant kitchen" fill className="object-cover object-center" sizes="(max-width:1280px) 100vw, 1280px" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-10 lg:px-14">
            <p className="text-orange-400 text-[9px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">Dine With Us</p>
            <h3 className="text-base sm:text-2xl lg:text-4xl font-black text-white leading-tight max-w-xs sm:max-w-sm">
              Book Your Table Today
            </h3>
            <a href="https://wa.me/923276227156" target="_blank" rel="noopener noreferrer"
              className="mt-3 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-[10px] sm:text-sm w-fit transition-all active:scale-95 shadow-lg">
              Reserve via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
