import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaSeedling, FaAward, FaHandHoldingHeart, FaHeart } from "react-icons/fa";
import { brand } from "@/data/brand";
import Leaf from "@/components/Leaf";
import OilDrop from "@/components/OilDrop";

const values = [
  {
    icon: <FaLeaf className="text-[#1f5c3d]" size={24} />,
    title: "Radical Purity",
    description: "One ingredient, nothing else. Our oil is single-origin black seed, pressed and bottled as nature intended."
  },
  {
    icon: <FaSeedling className="text-[#1f5c3d]" size={24} />,
    title: "Sustainable Sourcing",
    description: "We partner with ethical farmers who use regenerative, pesticide-free cultivation methods."
  },
  {
    icon: <FaAward className="text-[#1f5c3d]" size={24} />,
    title: "Uncompromising Quality",
    description: "Every batch is third-party lab tested, traceable and certified for purity and potency."
  },
  {
    icon: <FaHandHoldingHeart className="text-[#1f5c3d]" size={24} />,
    title: "Hair-Care First",
    description: "People, not profits. Your hair's health and your trust are the heart of everything we do."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbf8f1] overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#eef6ec] to-[#fbf8f1]">
        <Leaf variant="a" className="absolute top-28 left-[8%] w-20 h-20 text-emerald-700/20 rotate-12 hidden lg:block" />
        <Leaf variant="b" className="absolute bottom-8 right-[10%] w-16 h-16 text-green-700/20 -rotate-12 hidden lg:block" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-emerald-200 px-5 py-2 shadow-sm mb-6">
            <FaLeaf className="text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#0f3524] leading-tight">
            The <span className="text-shimmer italic">Blessed Seed</span>,<br />Reimagined
          </h1>
          <p className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            A journey rooted in nature&apos;s most time-honoured remedy, perfected by modern
            science to bring pure, potent hair nutrition to every home.
          </p>
          <div className="mt-8 flex justify-center">
            <Image src={brand.logo} alt={`${brand.name} logo`} width={0} height={0} sizes="320px" className="h-20 md:h-24 w-auto opacity-80" />
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1" >
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-emerald-100/70 rounded-full blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1f5c3d] via-[#2e7d57] to-[#123e29] flex items-center justify-center p-8 shadow-2xl shadow-emerald-900/30">
              <div className="text-center text-white">
                <OilDrop className="w-16 h-20 text-amber-300/80 mx-auto mb-4" />
                <p className="font-serif italic text-2xl">Since 2016</p>
                <p className="mt-2 text-emerald-100/70 max-w-[220px] mx-auto text-sm">A decade of perfecting the art of cold-pressed purity.</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl border border-emerald-900/5 px-6 py-4">
              <p className="text-2xl font-bold text-[#1f5c3d]">30,000+</p>
              <p className="text-xs text-zinc-500">Happy Homes</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#14241b] leading-tight">
              From Ancient Wisdom to<br /><span className="text-shimmer">Modern Excellence</span>
            </h2>
            <div className="mt-6 space-y-4 text-zinc-600 leading-relaxed">
              <p>
                Black seed has been celebrated for centuries across civilisations as a
                blessing of nature. Yet in a market flooded with heat-processed, diluted oils,
                its true power was being lost.
              </p>
              <p>
                ANSA Naturals was founded on a simple conviction: <strong className="text-[#1f5c3d]">purity should never be compromised.</strong>
                We built relationships with ethical seed farmers, engineered a cold-press process below
                40°C, and introduced lab-certified transparency where none existed.
              </p>
              <p>
                Today, our entire range is distilled into a single flagship oil we are proud to
                stand behind — because when you focus on one thing and do it perfectly, the
                results speak for themselves.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white px-8 py-3.5 font-bold text-sm shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 transition-all active:scale-95">
                Shop the Oil
              </Link>
              <Link href="/#benefits" className="inline-flex items-center gap-2 rounded-full bg-white border border-emerald-200 text-[#1f5c3d] px-8 py-3.5 font-bold text-sm hover:bg-emerald-50 transition-all active:scale-95">
                See the Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f7faf6] border-y border-emerald-900/5 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <p className="section-eyebrow flex items-center justify-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />What We Stand For<span className="h-px w-8 bg-gold inline-block" /></p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#14241b]">The Values That Shape Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-emerald-900/8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#1f5c3d] group-hover:to-[#2e7d57] group-hover:text-white transition-all">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-[#14241b] mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1f5c3d] via-[#2e7d57] to-[#123e29] p-10 sm:p-16 text-center shadow-2xl">
          <Leaf variant="a" className="absolute -left-4 -bottom-4 w-28 h-28 text-emerald-200/10 rotate-12" />
          <OilDrop className="absolute right-12 top-6 w-8 h-10 text-amber-300/20" />
          <div className="relative">
            <FaHeart className="text-[#e6c277] mx-auto mb-4 text-xl" />
            <h2 className="text-3xl sm:text-5xl font-bold text-white">Ready to Feel the Difference?</h2>
            <p className="mt-5 text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
              Choose the pure option. Order your first bottle of ANSA Naturals and experience
              what true, uncompromising quality feels like.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white text-[#1f5c3d] px-10 py-4 font-bold shadow-xl hover:bg-amber-50 transition-all active:scale-95">
                Order Now
              </Link>
              <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-10 py-4 font-bold hover:bg-white/10 transition-all active:scale-95">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}