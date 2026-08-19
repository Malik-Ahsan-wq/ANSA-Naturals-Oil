"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaLeaf, FaAward, FaShieldAlt, FaHandHoldingHeart, FaSeedling, FaFlask,
  FaRecycle, FaTruck, FaArrowRight, FaPlus, FaMinus, FaShoppingCart,
  FaCheckCircle, FaWhatsapp, FaMapMarkerAlt, FaEnvelope,
  FaStar, FaQuoteLeft, FaChevronDown, FaChevronLeft, FaChevronRight,
  FaExclamationTriangle, FaCheck,
} from "react-icons/fa";
import { products } from "@/data/products";
import { brand } from "@/data/brand";
import { useCart } from "@/context/CartContext";
import Leaf from "@/components/Leaf";

const product = products[0];

/* ----------------------------- Animated Counter ---------------------------- */
function useAnimatedCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) { setStarted(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

/* ----------------------------- Review Slider Hook ---------------------------- */
function useReviewSlider(totalSlides: number) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const [dragging, setDragging] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getMaxSlide = useCallback(() => {
    if (typeof window === "undefined") return 0;
    if (window.innerWidth < 640) return totalSlides - 1;
    if (window.innerWidth < 1024) return Math.ceil(totalSlides / 2) - 1;
    return Math.ceil(totalSlides / 3) - 1;
  }, [totalSlides]);

  const next = useCallback(() => {
    setCurrent(c => c >= getMaxSlide() ? 0 : c + 1);
  }, [getMaxSlide]);

  const prev = useCallback(() => {
    setCurrent(c => c <= 0 ? getMaxSlide() : c - 1);
  }, [getMaxSlide]);

  const goTo = useCallback((i: number) => setCurrent(i), []);

  useEffect(() => {
    if (!autoplay) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoplay, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setDragging(true);
    setAutoplay(false);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchDelta(e.touches[0].clientX - touchStart);
  };
  const handleTouchEnd = () => {
    setDragging(false);
    if (touchDelta < -50) next();
    else if (touchDelta > 50) prev();
    setTouchDelta(0);
    setTimeout(() => setAutoplay(true), 6000);
  };

  return {
    current, next, prev, goTo, dragging, touchDelta,
    handleTouchStart, handleTouchMove, handleTouchEnd,
    getMaxSlide,
  };
}

/* ------------------------------ Section heading ----------------------------- */
function SectionHeading({ eyebrow, title, sub, light }: { eyebrow: string; title: ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="section-eyebrow flex items-center justify-center gap-2 mb-3">
        <span className="h-px w-8 bg-gold inline-block" />{eyebrow}<span className="h-px w-8 bg-gold inline-block" />
      </p>
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-white" : "text-[#111111]"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-sm sm:text-base leading-relaxed ${light ? "text-white/70" : "text-zinc-500"}`}>{sub}</p>}
    </div>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function Hero() {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  return (
    <>
      {/* Banner Image */}
      <div className="relative w-full">
        <Image
          src="/assets/banner.png"
          alt="ANSA Naturals - Pure Organic Hair Oil"
          width={1920}
          height={600}
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="w-full h-auto object-cover"
        />
      </div>

      <section className="relative overflow-hidden">
      {/* Nature background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f5] via-[#fafafa] to-[#fafafa]" />

      {/* Brand film background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-[0.40] mix-blend-multiply"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/assets/ANSA_Naturals_Oil_commercial_202608031453.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f5]/80 via-[#fafafa]/60 to-[#fafafa]" />

      <div className="absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-zinc-200/40 blur-3xl" />
      <div className="absolute top-24 -left-40 w-[30rem] h-[30rem] rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-zinc-200 px-4 py-1.5 shadow-sm mb-6">
            <FaLeaf className="text-zinc-700" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-800">
              100% Pure · Organic
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold leading-[1.05] text-[#111111]">
            Nature&apos;s Most Potent{" "}
            <span className="text-shimmer italic">Hair Oil</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Crafted with organic ingredients and bottled in
          {brand.tagline.toLowerCase()} nourishes roots and
            revives shine without heat damage or harsh chemicals.
          </p>

          {/* Rating + price */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
              <span className="ml-2 text-sm font-bold text-[#111111]">4.9/5</span>
              <span className="text-zinc-400 text-sm">· {product.reviews.toLocaleString()} reviews</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#000000]">{brand.currency} {product.price.toLocaleString()}</span>
              <span className="text-lg text-zinc-400 line-through mb-0.5">{brand.currency} {product.originalPrice.toLocaleString()}</span>
              <span className="mb-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold px-2 py-0.5">{Math.round((1 - product.price / product.originalPrice) * 100)}% Off</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-3 rounded-full bg-white border border-zinc-200 shadow-sm px-3 py-2">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all active:scale-90" aria-label="Decrease quantity">
                <FaMinus size={12} />
              </button>
              <span className="text-lg font-bold text-[#111111] w-8 text-center tabular-nums">{qty}</span>
              <button onClick={() => setQty(q => Math.min(q + 1, 20))} className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all active:scale-90" aria-label="Increase quantity">
                <FaPlus size={12} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#111111] to-[#333333] text-white px-8 py-4 text-sm font-bold shadow-xl shadow-zinc-900/20 hover:shadow-zinc-900/40 hover:-translate-y-0.5 transition-all active:scale-95 w-full sm:w-auto justify-center animate-bounce-up"
            >
              <FaShoppingCart className="text-base group-hover:rotate-12 transition-transform" />
              Add {qty} to Cart · {brand.currency} {(product.price * qty).toLocaleString()}
            </button>
          </div>

          <p className="mt-4 text-xs text-zinc-400 flex items-center justify-center lg:justify-start gap-1.5">
            <FaTruck className="text-zinc-600" /> Free nationwide delivery on every order · Ships within 24 hours
          </p>        </div>

        {/* Right — product */}
        <div className="relative flex justify-center lg:justify-end">
          <Image
            src="/assets/WhatsApp Image 2026-08-17 at 11.13.19 PM.jpeg"
            alt="ANSA Naturals Pure Organic Hair Oil bottle"
            width={400}
            height={600}
            priority
            sizes="(max-width: 768px) 70vw, 35vw"
            quality={85}
            className="w-[70%] max-w-md mx-auto lg:mr-8 rounded-3xl object-contain"
          />
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-y border-zinc-200 bg-white/60 backdrop-blur py-4 overflow-hidden">
        <div className="marquee-track gap-12 text-sm font-bold uppercase tracking-widest text-zinc-500/70">
          {[...Array(2)].map((_, n) => (
            <div key={n} className="flex items-center gap-12 shrink-0">
              <span className="flex items-center gap-2"><FaLeaf className="text-zinc-600" /> Organic Oil</span>
              <span className="flex items-center gap-2"><FaSeedling className="text-zinc-600" /> 100% Organic</span>
              <span className="flex items-center gap-2"><FaShieldAlt className="text-zinc-600" /> Cruelty-Free</span>
              <span className="flex items-center gap-2"><FaRecycle className="text-zinc-600" /> Eco Packaging</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-zinc-600" /> Non-GMO</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-zinc-600" /> Organic-Oil</span>
              <span className="flex items-center gap-2"><FaSeedling className="text-zinc-600" /> 100% Organic</span>
              <span className="flex items-center gap-2"><FaShieldAlt className="text-zinc-600" /> Cruelty-Free</span>
              <span className="flex items-center gap-2"><FaRecycle className="text-zinc-600" /> Eco Packaging</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-zinc-600" /> Non-GMO</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

/* --------------------------------- STATS --------------------------------- */
function StatItem({ icon: Icon, value, label, numericTarget, format, delay }: {
  icon: React.ElementType; value: string; label: string; numericTarget?: number; format?: (n: number) => string; delay?: number;
}) {
  const { count, ref } = useAnimatedCounter(numericTarget ?? 0, 2200);
  return (
    <div ref={ref}
      className="bg-white mb-10 rounded-2xl border border-zinc-100 shadow-lg shadow-zinc-900/5 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left hover:-translate-y-0.5 transition-all duration-300"
      style={{ animationDelay: `${(delay ?? 0) * 100}ms` }}>
      <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-zinc-100 to-amber-500/15 flex items-center justify-center text-zinc-700">
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-bold text-[#111111]">
          {numericTarget !== undefined ? (format ? format(count) : count.toLocaleString()) : value}
        </p>
        <p className="text-xs sm:text-sm text-zinc-500 font-medium">{label}</p>
      </div>
    </div>
  );
}


/* --------------------------------- ABOUT --------------------------------- */
function About() {
  const points = [
    "Hand-selected Nigella sativa seeds from pesticide-free farms",
    "Unrefined, unfiltered — nothing added, nothing taken away",
   
  ];
  return (
    <section id="about" className="relative pt-24 lg:pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Visual */}
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <Image
              src="/assets/WhatsApp Image 2026-08-17 at 11.13.19 PM.jpeg"
              alt="ANSA Naturals Pure Organic Hair Oil bottle"
              width={400}
              height={600}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              className="w-full rounded-3xl object-contain"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />The Essence of Nature</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#111111]">
            One Oil. A Thousand Years of <span className="text-shimmer">Natural Hair Wisdom.</span>
          </h2>
          <p className="mt-5 text-zinc-600 leading-relaxed">
         Nature has always offered powerful ingredients for healthy, beautiful hair — from nourishing botanical oils to carefully selected herbs and plant extracts. At ANSA Naturals, we bring these natural elements together with modern care, creating a hair oil focused on nourishment, strength and scalp wellness. Every bottle reflects our commitment to quality, purity and thoughtfully sourced ingredients.

          </p>
          {/* <ul className="mt-7 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700">
                <FaCheckCircle className="text-zinc-600 mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul> */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#why-us" className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-7 py-3.5 text-sm font-bold hover:bg-[#333333] transition-all shadow-lg active:scale-95">
              Why Choose Us <FaArrowRight />
            </Link>
            <Link href="#benefits" className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200 text-zinc-700 px-7 py-3.5 text-sm font-bold hover:bg-zinc-50 transition-all active:scale-95">
              See Benefits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ HAIR FALL PROBLEM ----------------------------- */
function HairFallProblem() {
  const problems = [
    { icon: FaExclamationTriangle, text: "Excessive Hair Fall" },
    { icon: FaExclamationTriangle, text: "Thinning Hair" },
    { icon: FaExclamationTriangle, text: "Weak & Brittle Hair" },
    { icon: FaExclamationTriangle, text: "Receding Hairline" },
  ];

  const solutions = [
    "Stimulates dormant follicles for new growth",
    "Strengthens roots to reduce hair fall by 80%",
    "Restores natural thickness & volume",
    "Nourishes scalp with essential nutrients",
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#111111] via-[#1a1a1a] to-[#111111]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left — Hair Fall Image */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src="/assets/hair-fall-problem.jpg"
                alt="Hair fall problems - excessive hair fall, thinning hair, weak brittle hair, receding hairline"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Problem badges on image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2">
                  {problems.map((p) => (
                    <span key={p.text} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      <p.icon className="text-amber-400 text-[10px]" />
                      {p.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-white rounded-2xl shadow-2xl px-5 py-4 z-10 animate-float">
              <p className="text-2xl font-bold text-[#111111]">88%</p>
              <p className="text-xs text-zinc-500">of users saw reduced hair fall</p>
            </div>
          </div>

          {/* Right — Solution Copy */}
          <div>
            <p className="text-amber-500 font-bold text-xs uppercase tracking-[0.25em] mb-4">The Problem We Solve</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Tired of <span className="text-amber-400">Hair Fall?</span>
              <br />
              <span className="text-zinc-400">You&apos;re Not Alone.</span>
            </h2>
            <p className="mt-5 text-zinc-400 leading-relaxed max-w-lg">
              Millions suffer from excessive hair fall, thinning, and receding hairlines. 
              The cause? Heat-processed oils that destroy nutrients. The solution? 
              <span className="text-white font-semibold"> 100% organic</span> that 
              actually works.
            </p>

            {/* Problem → Solution */}
            <div className="mt-8 space-y-4">
              {solutions.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <FaCheck className="text-emerald-400 text-xs" />
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 text-sm font-bold shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
                <FaShoppingCart /> Solve It Now — {brand.currency} {product.price.toLocaleString()}
              </Link>
              <Link href="#benefits" className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-8 py-4 text-sm font-bold hover:bg-white/10 transition-all active:scale-95">
                See How It Works
              </Link>
            </div>

            {/* Trust */}
            <p className="mt-6 text-xs text-zinc-500 flex items-center gap-2">
              <FaShieldAlt className="text-amber-500" /> 100% Organic . Multiple Happy Customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ------------------------------- INGREDIENTS ----------------------------- */
function Ingredients() {
  const rows = [
    { name: "Nigella sativa Seeds", note: "Premium Kalonji, pesticide-free", pct: "100" },
    { name: "Thymoquinone", note: "The active compound for hair health", pct: "80" },
    { name: "Omega 3, 6, 9", note: "Essential fatty acids for the scalp", pct: "84" },
    { name: "Vitamin E & B-Complex", note: "Natural antioxidant support", pct: "70" },
  ];
  return (
    <section id="ingredients" className="relative py-20 lg:py-28 overflow-hidden bg-[#111111]">
      <Leaf variant="b" className="absolute -left-10 bottom-10 w-40 h-40 text-zinc-700/20 rotate-12" />
      <Leaf variant="a" className="absolute -right-8 top-10 w-44 h-44 text-zinc-600/15 -rotate-12" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />What&apos;s Inside</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Power in <span className="text-[#e6c277]">Every Single Drop</span>
          </h2>
          <p className="mt-5 text-zinc-100/70 leading-relaxed max-w-lg">
            We refuse to compromise. Each bottle contains only what nature intended —
            nothing synthetic, nothing diluted, nothing lost to heat.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            {[
              { v: "40°C", l: "Max press temp" },
              { v: "0", l: "Additives" },
              { v: "24hr", l: "Seed-to-bottle" },
              { v: "3×", l: "Lab tested" },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4">
                <p className="text-2xl font-bold text-[#e6c277]">{x.v}</p>
                <p className="text-xs text-zinc-100/60 mt-1">{x.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {rows.map((r, i) => (
            <div key={r.name}>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-white font-semibold text-sm sm:text-base">{r.name}</p>
                <p className="text-[#e6c277] text-sm font-bold">{r.pct}%</p>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#e6c277] transition-all duration-1000"
                  style={{ width: `${r.pct}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-zinc-100/50">{r.note}</p>
            </div>
          ))}
          <p className="text-xs text-zinc-100/40 italic pt-2">*Values indicate concentration within the pure organic oil. Independent lab reports available on request.</p>
        </div>
      </div>
    </section>
  );
}





/* -------------------------------- REVIEWS -------------------------------- */
function Reviews() {
  const reviews = [
    { name: "Ayesha Khan", city: "Lahore", stars: 5, title: "My hair has never felt stronger", text: "Three months in and my hair fall has reduced dramatically. The shine is unreal — I've finally found my holy grail hair oil.", image: "/assets/ChatGPT Image Aug 5, 2026, 11_16_48 AM.png" },
    { name: "Daniyal R.", city: "Karachi", stars: 5, title: "Genuinely 100% pure", text: "You can tell the difference from the smell and texture alone. No carrier oil, no tricks. This is the real thing for my scalp.", image: "/assets/ChatGPT Image Aug 5, 2026, 11_18_21 AM.png" },
    { name: "Mariam S.", city: "Islamabad", stars: 5, title: "Part of my weekly ritual", text: "A scalp massage with this every few nights and my hair looks fuller and silkier. Beautiful packaging too." },
  ];
  const slider = useReviewSlider(reviews.length);

  return (
    <section id="reviews" className="relative py-20 lg:py-28 overflow-hidden bg-[#fafafa]">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] rounded-full bg-zinc-100/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer Reviews"
          title={<>Loved by <span className="text-shimmer">Thousands</span></>}
          sub="Real results from real people who made ANSA part of their hair-care routine."
        />
        <div className="mt-6 flex justify-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => <FaStar key={i} className="text-lg" />)}
          <span className="ml-2 text-sm font-bold text-[#111111]">4.9 · {product.reviews.toLocaleString()} verified reviews</span>
        </div>

        {/* Slider container */}
        <div className="mt-14 relative"
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        >
          {/* Navigation arrows */}
          <button onClick={slider.prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-lg flex items-center justify-center text-zinc-700 hover:bg-zinc-50 hover:-translate-y-1/2 transition-all active:scale-90 hidden md:flex"
            aria-label="Previous reviews">
            <FaChevronLeft size={14} />
          </button>
          <button onClick={slider.next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-lg flex items-center justify-center text-zinc-700 hover:bg-zinc-50 hover:-translate-y-1/2 transition-all active:scale-90 hidden md:flex"
            aria-label="Next reviews">
            <FaChevronRight size={14} />
          </button>

          {/* Slider track */}
          <div className="overflow-hidden rounded-3xl mx-6 md:mx-0"
            onTouchStart={slider.handleTouchStart}
            onTouchMove={slider.handleTouchMove}
            onTouchEnd={slider.handleTouchEnd}>
            <div className={`reviews-slider ${slider.dragging ? "dragging" : ""}`}
              style={{
                transform: `translateX(calc(-${slider.current * 100}%${slider.dragging ? ` + ${slider.touchDelta}px` : ""}))`,
              }}>
              {reviews.map((r) => (
                <div key={r.name}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 py-1">
                  <div className="relative rounded-3xl bg-white border border-zinc-100 p-7 shadow-sm hover:shadow-2xl hover:shadow-zinc-900/10 hover:-translate-y-0.5 transition-all duration-300 h-full">
                    <FaQuoteLeft className="absolute top-6 right-6 text-zinc-100 text-4xl" />
                    {r.image && (
                      <div className="mb-4 rounded-2xl overflow-hidden border border-zinc-100">
                        <img src={r.image} alt={`${r.name} review`} className="w-full h-40 object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(5)].map((_, s) => (
                        <FaStar key={s} className={`text-sm ${s < r.stars ? "" : "text-zinc-200"}`} />
                      ))}
                    </div>
                    <h3 className="font-bold text-[#111111] mb-2">{r.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-6">&quot;{r.text}&quot;</p>
                    <div className="flex items-center gap-3 border-t border-zinc-100 pt-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#111111] to-[#333333] text-white flex items-center justify-center font-bold text-sm">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#111111]">{r.name}</p>
                        <p className="text-xs text-zinc-400">{r.city} · Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: slider.getMaxSlide() + 1 }).map((_, i) => (
              <button key={i} onClick={() => slider.goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  slider.current === i
                    ? "bg-zinc-800 w-7"
                    : "bg-zinc-200 hover:bg-zinc-300"
                }`}
                aria-label={`Go to review page ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* -------------------------------- CONTACT -------------------------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setState("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setState("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setState("idle"), 6000);
    } catch {
      setState("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden bg-[#111111]">
      <Leaf variant="c" className="absolute -right-6 -top-6 w-40 h-40 text-zinc-700/20" />
      <Leaf variant="a" className="absolute -left-8 bottom-10 w-36 h-36 text-zinc-600/15 rotate-45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            We&apos;d Love to <span className="text-[#e6c277]">Hear From You</span>
          </h2>
          <p className="mt-5 text-emerald-100/70 leading-relaxed max-w-lg">
            Questions about the oil, your order, or wholesale partnerships? Our hair-care team
            responds within a few hours, seven days a week.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: FaWhatsapp, label: "WhatsApp", value: brand.phone },
              { icon: FaEnvelope, label: "Email", value: brand.email },
              { icon: FaMapMarkerAlt, label: "Headquarters", value: "Lahore, Pakistan · Shipping nationwide" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#e6c277]">
                  <c.icon className="text-lg" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-100/50">{c.label}</p>
                  <p className="text-sm sm:text-base text-white font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] bg-white/95 backdrop-blur p-6 sm:p-9 shadow-2xl space-y-4">
          <h3 className="text-xl font-bold text-[#14241b] mb-2">Send a Message</h3>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Your Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all" placeholder="e.g. Ayesha Khan" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Your Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Phone / WhatsApp</label>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all" placeholder="03xx xxxxxxx" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Message</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all resize-none" placeholder="How can we help you?" />
          </div>
          <button type="submit" disabled={state === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#111111] to-[#333333] text-white py-3.5 font-bold text-sm shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/40 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none">
            {state === "submitting" ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <FaEnvelope className="text-lg" />
            )}
            {state === "submitting" ? "Sending…" : "Send Message"}
          </button>
          {state === "success" && <p className="text-center text-sm font-semibold text-zinc-700 animate-pop">Message sent! We&apos;ll reply to your email shortly.</p>}
          {state === "error" && <p className="text-center text-sm font-semibold text-red-600 animate-pop">{error}</p>}
        </form>
      </div>
    </section>
  );
}



/* ---------------------------------- PAGE ---------------------------------- */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] overflow-x-hidden">
      <Hero />
      <About />
      <HairFallProblem />
      {/* <Ingredients /> */}
      <Reviews />
      {/* <Contact /> */}
     
    </main>
  );
}