"use client";

import { useState } from "react";
import { FaShoppingCart, FaPlus, FaMinus, FaLeaf } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function QuantitySelector({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl border border-zinc-200 p-5 flex flex-col gap-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-10 h-10 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-all shadow-sm"
          aria-label="Decrease quantity"
        >
          <FaMinus size={12} />
        </button>
        <span className="text-2xl font-bold text-[#111111] w-10 text-center tabular-nums">{qty}</span>
        <button
          onClick={() => setQty(q => Math.min(q + 1, 20))}
          className="w-10 h-10 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-all shadow-sm"
          aria-label="Increase quantity"
        >
          <FaPlus size={12} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500 font-medium">Total</span>
        <span className="text-xl font-bold text-zinc-700">{product.price * qty >= 0 ? `Rs ${(product.price * qty).toLocaleString()}` : ""}</span>
      </div>

      <button
        onClick={() => addToCart(product, qty)}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#111111] to-[#333333] hover:shadow-lg hover:shadow-zinc-900/20 text-white py-4 rounded-xl font-bold text-sm transition-all active:scale-95"
      >
        <FaShoppingCart size={14} /> Add to Cart
      </button>
      <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
        <FaLeaf className="text-zinc-600" /> Free nationwide delivery
      </p>
    </div>
  );
}