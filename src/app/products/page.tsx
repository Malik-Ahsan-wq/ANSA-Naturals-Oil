"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

function ProductCard({ p }: { p: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="group rounded-xl sm:rounded-2xl border border-zinc-100 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-aos="fade-up">
      <div className="relative overflow-hidden">
        <Link href={`/product/${p.slug}`} className="block">
          <Image src={p.image} alt={p.name} width={400} height={280} className="w-full h-36 sm:h-48 lg:h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <span className="absolute top-2 left-2 bg-orange-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wide">
          {p.category}
        </span>
      </div>

      <div className="p-2.5 sm:p-4 flex flex-col gap-2">
        <Link href={`/product/${p.slug}`} className="font-bold text-xs sm:text-sm text-zinc-900 hover:text-orange-600 transition-colors line-clamp-1">
          {p.name}
        </Link>

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
          className="w-full flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-orange-600 hover:bg-orange-700 text-white py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold transition-all active:scale-95">
          <FaShoppingCart size={10} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 py-8 sm:py-12">

        <div className="flex items-end justify-between mb-6 sm:mb-10 gap-3">
          <div data-aos="fade-right">
            <p className="text-orange-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1">— Explore</p>
            <h1 className="text-2xl sm:text-4xl font-black text-zinc-900">
              Our Full <span className="text-orange-600">Menu</span>
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-md">
              Crafted with the finest ingredients and culinary passion.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap" data-aos="fade-left">
            {products.length} Items
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-orange-200 via-zinc-100 to-transparent mb-6 sm:mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </main>
  );
}
