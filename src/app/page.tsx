"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  FaLeaf, FaAward, FaShieldAlt, FaHandHoldingHeart, FaSeedling, FaFlask,
  FaRecycle, FaTruck, FaArrowRight, FaPlus, FaMinus, FaShoppingCart,
  FaCheckCircle, FaWhatsapp, FaMapMarkerAlt, FaEnvelope,
  FaStar, FaQuoteLeft, FaChevronDown,
} from "react-icons/fa";
import { products } from "@/data/products";
import { brand } from "@/data/brand";
import { useCart } from "@/context/CartContext";
import ProductBottle from "@/components/ProductBottle";
import Leaf from "@/components/Leaf";
import OilDrop from "@/components/OilDrop";

const product = products[0];

/* ------------------------------ Section heading ----------------------------- */
function SectionHeading({ eyebrow, title, sub, light }: { eyebrow: string; title: ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
      <p className="section-eyebrow flex items-center justify-center gap-2 mb-3">
        <span className="h-px w-8 bg-gold inline-block" />{eyebrow}<span className="h-px w-8 bg-gold inline-block" />
      </p>
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-white" : "text-[#14241b]"}`}>
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
    <section className="relative overflow-hidden">
      {/* Nature background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef6ec] via-[#fbf8f1] to-[#fbf8f1]" />

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef6ec]/80 via-[#fbf8f1]/60 to-[#fbf8f1]" />

      <div className="absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute top-24 -left-40 w-[30rem] h-[30rem] rounded-full bg-amber-200/30 blur-3xl" />
      <Leaf variant="a" className="absolute top-32 left-[8%] w-16 h-16 text-emerald-700/30 -rotate-12 hidden lg:block" />
      <Leaf variant="b" className="absolute bottom-40 left-[14%] w-12 h-12 text-green-700/25 rotate-45 hidden lg:block" />
      <Leaf variant="c" className="absolute top-52 right-[6%] w-14 h-14 text-emerald-800/25 rotate-12 hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-emerald-200 px-4 py-1.5 shadow-sm mb-6 animate-fadeInUp" data-aos="fade-up">
            <FaLeaf className="text-emerald-700" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-800">
              100% Pure · Lab-Tested · Organic
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold leading-[1.05] text-[#0f3524]" data-aos="fade-up" data-aos-delay="100">
            Nature&apos;s Most Potent{" "}
            <span className="text-shimmer italic">Hair Oil</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto lg:mx-0" data-aos="fade-up" data-aos-delay="200">
            Hand-harvested black seed, cold-pressed within 24 hours and bottled in
            UV-protected glass — {brand.tagline.toLowerCase()} nourishes roots and
            revives shine without heat damage or harsh chemicals.
          </p>

          {/* Rating + price */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
              <span className="ml-2 text-sm font-bold text-[#14241b]">4.9/5</span>
              <span className="text-zinc-400 text-sm">· {product.reviews.toLocaleString()} reviews</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#1f5c3d]">{brand.currency} {product.price.toLocaleString()}</span>
              <span className="text-lg text-zinc-400 line-through mb-0.5">{brand.currency} {product.originalPrice.toLocaleString()}</span>
              <span className="mb-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5">{Math.round((1 - product.price / product.originalPrice) * 100)}% Off</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center gap-3 rounded-full bg-white border border-emerald-200 shadow-sm px-3 py-2">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-[#1f5c3d]/10 hover:bg-[#1f5c3d]/20 text-[#1f5c3d] flex items-center justify-center transition-all active:scale-90" aria-label="Decrease quantity">
                <FaMinus size={12} />
              </button>
              <span className="text-lg font-bold text-[#14241b] w-8 text-center tabular-nums">{qty}</span>
              <button onClick={() => setQty(q => Math.min(q + 1, 20))} className="w-9 h-9 rounded-full bg-[#1f5c3d]/10 hover:bg-[#1f5c3d]/20 text-[#1f5c3d] flex items-center justify-center transition-all active:scale-90" aria-label="Increase quantity">
                <FaPlus size={12} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white px-8 py-4 text-sm font-bold shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-0.5 transition-all active:scale-95 w-full sm:w-auto justify-center"
            >
              <FaShoppingCart className="text-base group-hover:rotate-12 transition-transform" />
              Add {qty} to Cart · {brand.currency} {(product.price * qty).toLocaleString()}
            </button>
          </div>

          <p className="mt-4 text-xs text-zinc-400 flex items-center justify-center lg:justify-start gap-1.5" data-aos="fade-up" data-aos-delay="450">
            <FaTruck className="text-emerald-600" /> Free nationwide delivery on every order · Ships within 24 hours
          </p>        </div>

        {/* Right — product */}
        <div className="relative flex justify-center lg:justify-end" data-aos="zoom-in" data-aos-delay="200">
          <ProductBottle className="w-[70%] max-w-md mx-auto lg:mr-8" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-y border-emerald-900/10 bg-white/60 backdrop-blur py-4 overflow-hidden">
        <div className="marquee-track gap-12 text-sm font-bold uppercase tracking-widest text-[#1f5c3d]/70">
          {[...Array(2)].map((_, n) => (
            <div key={n} className="flex items-center gap-12 shrink-0">
              <span className="flex items-center gap-2"><FaLeaf className="text-emerald-700" /> Cold-Pressed</span>
              <span className="flex items-center gap-2"><FaSeedling className="text-emerald-700" /> 100% Organic</span>
              <span className="flex items-center gap-2"><FaFlask className="text-emerald-700" /> Lab-Tested</span>
              <span className="flex items-center gap-2"><FaShieldAlt className="text-emerald-700" /> Cruelty-Free</span>
              <span className="flex items-center gap-2"><FaRecycle className="text-emerald-700" /> Eco Packaging</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-emerald-700" /> Non-GMO</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-emerald-700" /> Cold-Pressed</span>
              <span className="flex items-center gap-2"><FaSeedling className="text-emerald-700" /> 100% Organic</span>
              <span className="flex items-center gap-2"><FaFlask className="text-emerald-700" /> Lab-Tested</span>
              <span className="flex items-center gap-2"><FaShieldAlt className="text-emerald-700" /> Cruelty-Free</span>
              <span className="flex items-center gap-2"><FaRecycle className="text-emerald-700" /> Eco Packaging</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-emerald-700" /> Non-GMO</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- STATS --------------------------------- */
function Stats() {
  const stats = [
    { icon: FaLeaf, value: "30,000+", label: "Bottles Delivered" },
    { icon: FaStar, value: "4.9/5", label: "Verified Rating" },
    { icon: FaAward, value: "100%", label: "Pure & Natural" },
    { icon: FaHandHoldingHeart, value: "24hr", label: "Fresh-Pressed" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div key={s.label} data-aos="fade-up" data-aos-delay={i * 100}
            className="bg-white rounded-2xl border border-emerald-900/5 shadow-lg shadow-emerald-900/5 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-600/15 to-amber-500/15 flex items-center justify-center text-[#1f5c3d]">
              <s.icon className="text-xl" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#0f3524]">{s.value}</p>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- ABOUT --------------------------------- */
function About() {
  const points = [
    "Hand-selected Nigella sativa seeds from pesticide-free farms",
    "Cold-pressed below 40°C to preserve thymoquinone & nutrients",
    "Unrefined, unfiltered — nothing added, nothing taken away",
    "Bottled in amber glass within 24 hours of pressing",
  ];
  return (
    <section id="about" className="relative pt-24 lg:pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Visual */}
        <div className="relative order-2 lg:order-1" data-aos="fade-right">
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-emerald-100/60 blur-2xl" />
          <div className="relative mx-auto max-w-md">
            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1f5c3d] via-[#2e7d57] to-[#123e29] p-6 sm:p-8 flex items-center justify-center animate-blob shadow-2xl shadow-emerald-900/30">
              <ProductBottle className="w-[70%]" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-2 bg-white rounded-2xl shadow-xl border border-emerald-900/5 px-5 py-4 flex items-center gap-3 animate-float">
              <OilDrop className="w-8 h-10 text-amber-500" />
              <div>
                <p className="text-lg font-bold text-[#0f3524]">100%</p>
                <p className="text-xs text-zinc-500">Traceable Purity</p>
              </div>
            </div>
            <div className="absolute -top-4 -left-2 bg-white rounded-2xl shadow-xl border border-emerald-900/5 px-5 py-3 flex items-center gap-2 animate-float-delay">
              <FaAward className="text-gold text-xl" />
              <p className="text-xs font-bold text-[#14241b]">Third-Party<br />Lab Certified</p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />The Essence of Nature</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#14241b]" data-aos="fade-up">
            One Oil. A Thousand Years of <span className="text-shimmer">Natural Hair Wisdom.</span>
          </h2>
          <p className="mt-5 text-zinc-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            For centuries, black seed — the &quot;blessed seed&quot; of traditional beauty — has been
            treasured across civilisations for its remarkable ability to nourish hair and scalp.
            At ANSA Naturals, we honour that heritage with modern precision: every bottle is a
            commitment to purity, potency and ethical sourcing.
          </p>
          <ul className="mt-7 space-y-3.5" data-aos="fade-up" data-aos-delay="200">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700">
                <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="300">
            <Link href="#why-us" className="inline-flex items-center gap-2 rounded-full bg-[#14241b] text-white px-7 py-3.5 text-sm font-bold hover:bg-[#1f5c3d] transition-all shadow-lg active:scale-95">
              Why Choose Us <FaArrowRight />
            </Link>
            <Link href="#benefits" className="inline-flex items-center gap-2 rounded-full bg-white border border-emerald-200 text-[#1f5c3d] px-7 py-3.5 text-sm font-bold hover:bg-emerald-50 transition-all active:scale-95">
              See Benefits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- BENEFITS -------------------------------- */
function Benefits() {
  const benefits = [
    { icon: FaLeaf, title: "Hair Growth", desc: "Massaging into the scalp helps stimulate roots and supports thicker, fuller-looking hair over time." },
    { icon: FaHandHoldingHeart, title: "Root Strength", desc: "Rich in essential fatty acids that help reduce breakage, split ends and unwanted shedding." },
    { icon: FaShieldAlt, title: "Scalp Balance", desc: "Naturally soothing and clarifying, it helps calm a flaky, irritated scalp and unclog follicles." },
    { icon: FaFlask, title: "Glossy Shine", desc: "Seals the cuticle and restores mirror-like shine, softness and movement to dull strands." },
    { icon: FaSeedling, title: "Dandruff Care", desc: "Traditionally used to reduce flakiness, itching and dryness for a healthy, comfortable scalp." },
    { icon: FaRecycle, title: "Youthful Hair", desc: "Antioxidant-rich formula helps protect against heat, pollution and everyday styling damage." },
  ];
  return (
    <section id="benefits" className="relative py-20 lg:py-28 bg-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fbf8f1] to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Benefits"
          title={<>One Oil, <span className="text-shimmer">Endless Hair Vitality</span></>}
          sub="Nature's most concentrated hair oil, packed into every single golden drop."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={b.title} data-aos="fade-up" data-aos-delay={(i % 3) * 100}
              className="group relative overflow-hidden rounded-3xl border border-emerald-900/8 bg-gradient-to-b from-[#fbfcf8] to-white p-7 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-100/50 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1f5c3d] to-[#2e7d57] text-white flex items-center justify-center mb-5 shadow-lg shadow-emerald-900/20 group-hover:rotate-6 transition-transform">
                  <b.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#14241b] mb-2.5">{b.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
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
    { name: "Cold-Pressed Purity", note: "Nothing added, nothing removed", pct: "100" },
  ];
  return (
    <section id="ingredients" className="relative py-20 lg:py-28 overflow-hidden bg-[#0f3524]">
      <Leaf variant="b" className="absolute -left-10 bottom-10 w-40 h-40 text-emerald-700/20 rotate-12" />
      <Leaf variant="a" className="absolute -right-8 top-10 w-44 h-44 text-emerald-600/15 -rotate-12" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />What&apos;s Inside</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white" data-aos="fade-up">
            Power in <span className="text-[#e6c277]">Every Single Drop</span>
          </h2>
          <p className="mt-5 text-emerald-100/70 leading-relaxed max-w-lg" data-aos="fade-up" data-aos-delay="100">
            We refuse to compromise. Each bottle contains only what nature intended —
            nothing synthetic, nothing diluted, nothing lost to heat.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md" data-aos="fade-up" data-aos-delay="200">
            {[
              { v: "40°C", l: "Max press temp" },
              { v: "0", l: "Additives" },
              { v: "24hr", l: "Seed-to-bottle" },
              { v: "3×", l: "Lab tested" },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4">
                <p className="text-2xl font-bold text-[#e6c277]">{x.v}</p>
                <p className="text-xs text-emerald-100/60 mt-1">{x.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6" data-aos="fade-left">
          {rows.map((r, i) => (
            <div key={r.name}>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-white font-semibold text-sm sm:text-base">{r.name}</p>
                <p className="text-[#e6c277] text-sm font-bold">{r.pct}%</p>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#e6c277] transition-all duration-1000"
                  style={{ width: `${r.pct}%` }} data-aos="fade-right" data-aos-delay={i * 100} />
              </div>
              <p className="mt-1.5 text-xs text-emerald-100/50">{r.note}</p>
            </div>
          ))}
          <p className="text-xs text-emerald-100/40 italic pt-2">*Values indicate concentration within the pure cold-pressed oil. Independent lab reports available on request.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- HOW TO USE ----------------------------- */
function HowToUse() {
  const steps = [
    { n: "01", t: "Massage the Scalp", d: "Warm a few drops and gently massage into the scalp with fingertips for 3–5 minutes to awaken follicles." },
    { n: "02", t: "Work Through Strands", d: "Spread from roots to ends, focusing on dry, damaged areas. Leave in for 30 minutes to overnight." },
    { n: "03", t: "Stay Consistent", d: "Rinse with a gentle shampoo. For best results, use 3–4 times a week for 8–12 weeks." },
  ];
  return (
    <section className="relative py-20 lg:py-28 bg-[#fbf8f1]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How to Use"
          title={<>Your Daily <span className="text-shimmer">Hair Ritual</span></>}
          sub="Simple, three steps to welcome nature's most potent oil into your hair-care routine."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} data-aos="fade-up" data-aos-delay={i * 120}
              className="relative rounded-3xl bg-white border border-emerald-900/8 p-8 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold text-emerald-100 group-hover:text-emerald-200 transition-colors">{s.n}</span>
                <OilDrop className="w-7 h-9 text-amber-500/70" />
              </div>
              <h3 className="text-xl font-bold text-[#14241b] mb-3">{s.t}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WHY CHOOSE US ---------------------------- */
function WhyChooseUs() {
  const features = [
    { icon: FaAward, title: "Premium Grade", desc: "Only the top 5% of harvested seeds make it into our bottles." },
    { icon: FaFlask, title: "Lab Certified", desc: "Every batch is third-party tested for purity and potency." },
    { icon: FaRecycle, title: "Sustainable", desc: "Eco-friendly glass packaging and responsibly farmed seeds." },
    { icon: FaTruck, title: "Swift Delivery", desc: "Free nationwide shipping, beautifully packed, delivered fast." },
    { icon: FaShieldAlt, title: "No Compromise", desc: "No fillers, no carrier blends, no heat damage. Ever." },
    { icon: FaHandHoldingHeart, title: "Loved by 30k+", desc: "Thousands of glowing reviews from wellness-conscious families." },
  ];
  return (
    <section id="why-us" className="relative py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<>The ANSA <span className="text-shimmer">Difference</span></>}
          sub="We obsess over the details so you can trust every drop."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.title} data-aos="fade-up" data-aos-delay={(i % 3) * 100}
              className="flex gap-4 rounded-3xl border border-emerald-900/8 bg-[#fbfcf8] p-6 hover:border-emerald-600/30 hover:bg-emerald-50/50 transition-all duration-300 group">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-[#1f5c3d] to-[#2e7d57] text-white flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-110 transition-transform">
                <f.icon />
              </div>
              <div>
                <h3 className="font-bold text-[#14241b] mb-1.5">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-16 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="rounded-3xl border border-emerald-900/8 bg-[#fbfcf8] overflow-hidden shadow-lg shadow-emerald-900/5">
            <div className="grid grid-cols-3 text-center text-xs sm:text-sm font-bold py-4 bg-[#0f3524] text-white px-4">
              <span className="text-left">Quality</span>
              <span>ANSA Naturals</span>
              <span className="text-zinc-300">Other Oils</span>
            </div>
            {[
              ["Cold-Pressed Under 40°C", true, false],
              ["100% Pure, No Fillers", true, false],
              ["Lab Tested Purity", true, false],
              ["Within 24h of Harvest", true, false],
              ["Amber Glass Protection", true, false],
            ].map(([label, us, them], i) => (
              <div key={String(label)} className={`grid grid-cols-3 items-center text-center text-xs sm:text-sm py-4 px-4 ${i % 2 ? "bg-white" : "bg-[#f7faf6]"}`}>
                <span className="text-left font-semibold text-[#14241b]">{label}</span>
                <span className="flex justify-center">{us ? <FaCheckCircle className="text-emerald-600 text-lg" /> : <span className="text-zinc-300">—</span>}</span>
                <span className="flex justify-center">{them ? <FaCheckCircle className="text-emerald-600 text-lg" /> : <span className="text-zinc-300">✕</span>}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- REVIEWS -------------------------------- */
function Reviews() {
  const reviews = [
    { name: "Ayesha Khan", city: "Lahore", stars: 5, title: "My hair has never felt stronger", text: "Three months in and my hair fall has reduced dramatically. The shine is unreal — I've finally found my holy grail hair oil." },
    { name: "Daniyal R.", city: "Karachi", stars: 5, title: "Genuinely 100% pure", text: "You can tell the difference from the smell and texture alone. No carrier oil, no tricks. This is the real thing for my scalp." },
    { name: "Mariam S.", city: "Islamabad", stars: 5, title: "Part of my weekly ritual", text: "A scalp massage with this every few nights and my hair looks fuller and silkier. Beautiful packaging too." },
    { name: "Sana & Co.", city: "Faisalabad", stars: 5, title: "Glow-up in a bottle", text: "My dull, frizzy hair looks glossy and healthy again. The cold-pressed purity really shows. Ordering my second bottle now!" },
    { name: "Hassan A.", city: "Multan", stars: 4, title: "Premium quality, quick delivery", text: "Arrived in two days, beautifully packed with a glass dropper. My dandruff has calmed down a lot. Quality feels premium." },
    { name: "Fatima Z.", city: "Rawalpindi", stars: 5, title: "Trustworthy brand", text: "Love that every batch is lab tested and you can see the certificate. Rare to find this level of transparency in hair care." },
  ];
  return (
    <section id="reviews" className="relative py-20 lg:py-28 overflow-hidden bg-[#fbf8f1]">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer Reviews"
          title={<>Loved by <span className="text-shimmer">Thousands</span></>}
          sub="Real results from real people who made ANSA part of their hair-care routine."
        />
        <div className="mt-6 flex justify-center gap-1 text-amber-500" data-aos="fade-up">
          {[...Array(5)].map((_, i) => <FaStar key={i} className="text-lg" />)}
          <span className="ml-2 text-sm font-bold text-[#14241b]">4.9 · {product.reviews.toLocaleString()} verified reviews</span>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={r.name} data-aos="fade-up" data-aos-delay={(i % 3) * 100}
              className="relative rounded-3xl bg-white border border-emerald-900/8 p-7 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300">
              <FaQuoteLeft className="absolute top-6 right-6 text-emerald-100 text-4xl" />
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, s) => (
                  <FaStar key={s} className={`text-sm ${s < r.stars ? "" : "text-zinc-200"}`} />
                ))}
              </div>
              <h3 className="font-bold text-[#14241b] mb-2">{r.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">&quot;{r.text}&quot;</p>
              <div className="flex items-center gap-3 border-t border-emerald-900/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f5c3d] to-[#2e7d57] text-white flex items-center justify-center font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#14241b]">{r.name}</p>
                  <p className="text-xs text-zinc-400">{r.city} · Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ----------------------------------- */
function Faq() {
  const faqs = [
    { q: "Is the oil really 100% pure and natural?", a: "Yes. ANSA Naturals is single-origin, cold-pressed black seed hair oil with absolutely no fillers, carrier oils, preservatives or heat processing. Every batch ships with a third-party lab purity certificate." },
    { q: "How is cold-pressing different from regular extraction?", a: "Most hair oils are heat-extracted or blended with cheap carriers, which destroys delicate nutrients. We press seeds slowly below 40°C, preserving thymoquinone, omega fatty acids and vitamin E at their full potency." },
    { q: "How should I use it on my hair?", a: "Warm a few drops and massage into the scalp for 3–5 minutes, then work through strands from roots to ends. Leave in for 30 minutes to overnight, then rinse with a gentle shampoo. Repeat 3–4 times a week." },
    { q: "Are there any side effects or allergies?", a: "Our oil is generally safe for most hair and skin types. If you have known seed allergies or a sensitive scalp, do a patch test before use and discontinue if irritation occurs." },
    { q: "How long does one bottle last and how do I store it?", a: "One 100 ml bottle lasts roughly 6–8 weeks of regular hair use. Store in a cool, dry place away from direct sunlight — the amber glass bottle is designed to protect the oil." },
    { q: "What is your delivery and return policy?", a: "We offer free nationwide delivery with dispatch within 24 hours. If you're not completely satisfied, contact us within 14 days for a hassle-free replacement or refund." },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQs"
          title={<>Questions, <span className="text-shimmer">Answered</span></>}
          sub="Everything you need to know before welcoming ANSA into your hair-care routine."
        />
        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-aos="fade-up" data-aos-delay={i * 60}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "border-emerald-600/30 bg-emerald-50/40 shadow-lg shadow-emerald-900/5" : "border-emerald-900/8 bg-[#fbfcf8] hover:border-emerald-600/20"}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-semibold text-[#14241b] text-sm sm:text-base">{f.q}</span>
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#1f5c3d] text-white rotate-180" : "bg-white border border-emerald-200 text-[#1f5c3d]"}`}>
                    <FaChevronDown size={12} />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-zinc-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden bg-[#0f3524]">
      <Leaf variant="c" className="absolute -right-6 -top-6 w-40 h-40 text-emerald-700/20" />
      <Leaf variant="a" className="absolute -left-8 bottom-10 w-36 h-36 text-emerald-600/15 rotate-45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white" data-aos="fade-up">
            We&apos;d Love to <span className="text-[#e6c277]">Hear From You</span>
          </h2>
          <p className="mt-5 text-emerald-100/70 leading-relaxed max-w-lg" data-aos="fade-up" data-aos-delay="100">
            Questions about the oil, your order, or wholesale partnerships? Our hair-care team
            responds within a few hours, seven days a week.
          </p>
          <div className="mt-8 space-y-4" data-aos="fade-up" data-aos-delay="200">
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
                  <p className="text-xs uppercase tracking-widest text-emerald-100/50">{c.label}</p>
                  <p className="text-sm sm:text-base text-white font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] bg-white/95 backdrop-blur p-6 sm:p-9 shadow-2xl space-y-4" data-aos="fade-up">
          <h3 className="text-xl font-bold text-[#14241b] mb-2">Send a Message</h3>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Your Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent transition-all" placeholder="e.g. Ayesha Khan" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Your Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Phone / WhatsApp</label>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent transition-all" placeholder="03xx xxxxxxx" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Message</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent transition-all resize-none" placeholder="How can we help you?" />
          </div>
          <button type="submit" disabled={state === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white py-3.5 font-bold text-sm shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none">
            {state === "submitting" ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <FaEnvelope className="text-lg" />
            )}
            {state === "submitting" ? "Sending…" : "Send Message"}
          </button>
          {state === "success" && <p className="text-center text-sm font-semibold text-emerald-700 animate-pop">Message sent! We&apos;ll reply to your email shortly.</p>}
          {state === "error" && <p className="text-center text-sm font-semibold text-red-600 animate-pop">{error}</p>}
        </form>
      </div>
    </section>
  );
}

/* ------------------------------ FINAL PRODUCT ----------------------------- */
function FinalCta() {
  const { addToCart } = useCart();
  return (
    <section className="relative py-20 lg:py-24 bg-[#fbf8f1] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0f3524] to-transparent" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1f5c3d] via-[#2e7d57] to-[#123e29] p-8 sm:p-14 text-center shadow-2xl shadow-emerald-900/30" data-aos="zoom-in">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <Leaf variant="a" className="absolute -left-4 bottom-0 w-24 h-24 text-emerald-200/10 rotate-12" />
          <OilDrop className="absolute right-10 top-8 w-8 h-10 text-amber-300/30 animate-float" />
          <div className="relative">
            <p className="section-eyebrow flex items-center justify-center gap-2 mb-4"><span className="h-px w-8 bg-gold inline-block" />Limited Batch</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Begin Your Journey to <span className="text-[#e6c277] italic">Naturally Beautiful Hair</span>
            </h2>
            <p className="mt-5 text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
              Join 30,000+ customers who made the switch to pure, cold-pressed natural hair oil.
              Your hair will thank you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => addToCart(product, 1)}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1f5c3d] px-9 py-4 text-sm font-bold shadow-xl hover:bg-amber-50 hover:-translate-y-0.5 transition-all active:scale-95">
                <FaShoppingCart /> Order Now — {brand.currency} {product.price.toLocaleString()}
              </button>
              <Link href="#faq" className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-9 py-4 text-sm font-bold hover:bg-white/10 transition-all active:scale-95">
                Have Questions?
              </Link>
            </div>
            <p className="mt-6 text-xs text-emerald-100/50 flex items-center justify-center gap-2">
              <FaShieldAlt className="text-[#e6c277]" /> 14-day satisfaction guarantee · Free nationwide delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- PAGE ---------------------------------- */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf8f1] overflow-x-hidden">
      <Hero />
      <Stats />
      <About />
      <Benefits />
      <Ingredients />
      <HowToUse />
      <WhyChooseUs />
      <Reviews />
      <Faq />
      <Contact />
      <FinalCta />
    </main>
  );
}