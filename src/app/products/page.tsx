"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { brand } from "@/data/brand";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart, FaPlus, FaMinus, FaLeaf, FaStar, FaTruck, FaShieldAlt, FaRecycle } from "react-icons/fa";
import ProductBottle from "@/components/ProductBottle";
import Leaf from "@/components/Leaf";

const product = products[0];

export default function ShopPage() {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const perks = [
    { icon: FaLeaf, label: "100% Pure" },
    { icon: FaTruck, label: "Free Delivery" },
    { icon: FaShieldAlt, label: "Lab Certified" },
    { icon: FaRecycle, label: "Eco Packaging" },
  ];

  return (
    <main className="min-h-screen bg-[#fbf8f1] overflow-x-hidden">
      {/* Hero banner */}
      <section className="relative pt-24 lg:pt-28 pb-10 overflow-hidden bg-gradient-to-b from-[#eef6ec] to-[#fbf8f1]">
        <Leaf variant="a" className="absolute top-24 right-[10%] w-20 h-20 text-emerald-700/20 rotate-12 hidden lg:block" />
        <Leaf variant="b" className="absolute bottom-6 left-[6%] w-16 h-16 text-green-700/20 -rotate-12 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow flex items-center justify-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />The Flagship Product<span className="h-px w-8 bg-gold inline-block" /></p>
          <h1 className="text-3xl sm:text-5xl font-bold text-center text-[#0f3524]">One Oil. One Promise. <span className="text-shimmer italic">Purity.</span></h1>
          <p className="mt-4 text-center text-zinc-500 max-w-xl mx-auto">Our single, uncompromising flagship — bottled to perfection.</p>
        </div>
      </section>

      {/* Product card */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-white rounded-[2rem] border border-emerald-900/5 shadow-xl shadow-emerald-900/5 overflow-hidden">
          {/* Visual */}
          <div className="relative bg-gradient-to-b from-[#eef6ec] to-[#fbf8f1] p-8 sm:p-12 flex items-center justify-center">
            <ProductBottle className="w-[70%] max-w-sm" />
            <div className="absolute top-6 left-6 rounded-full bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white text-xs font-bold px-4 py-1.5 shadow-lg">
              Best Seller
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
              </div>
              <span className="text-sm font-bold text-[#14241b]">{product.rating}</span>
              <span className="text-sm text-zinc-400">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#14241b] leading-tight">{product.name}</h1>
            <p className="mt-2 text-sm text-emerald-700 font-semibold">{product.sizes}</p>
            <p className="mt-5 text-zinc-600 leading-relaxed">{product.description}</p>

            <div className="flex items-end gap-3 mt-6">
              <span className="text-4xl font-bold text-[#1f5c3d]">{brand.currency} {product.price.toLocaleString()}</span>
              <span className="text-lg text-zinc-400 line-through mb-1">{brand.currency} {product.originalPrice.toLocaleString()}</span>
              <span className="mb-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1">{Math.round((1 - product.price / product.originalPrice) * 100)}% Off</span>
            </div>

            {/* Qty + add */}
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 w-fit">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-white text-[#1f5c3d] flex items-center justify-center hover:bg-emerald-100 transition-all active:scale-90 shadow-sm" aria-label="Decrease">
                  <FaMinus size={11} />
                </button>
                <span className="text-lg font-bold text-[#14241b] w-7 text-center tabular-nums">{qty}</span>
                <button onClick={() => setQty(q => Math.min(q + 1, 20))} className="w-9 h-9 rounded-full bg-white text-[#1f5c3d] flex items-center justify-center hover:bg-emerald-100 transition-all active:scale-90 shadow-sm" aria-label="Increase">
                  <FaPlus size={11} />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white px-8 py-4 text-sm font-bold shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-0.5 transition-all active:scale-95">
                <FaShoppingCart /> Add to Cart · {brand.currency} {(product.price * qty).toLocaleString()}
              </button>
            </div>

            {/* Perks */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {perks.map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 rounded-2xl border border-emerald-900/8 bg-[#fbfcf8] px-4 py-3">
                  <p.icon className="text-[#1f5c3d] text-lg" />
                  <span className="text-sm font-semibold text-[#14241b]">{p.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400">
              <FaLeaf className="text-emerald-600" /> Ships within 24 hours · Cash on delivery available nationwide
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}