"use client";

import { useState } from "react";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function QuantitySelector({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="rounded-xl sm:rounded-2xl border border-zinc-100 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 bg-zinc-50">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-10 h-10 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-all shadow-sm"
        >
          <FaMinus size={12} />
        </button>
        <span className="text-2xl font-black text-zinc-900 w-10 text-center">{qty}</span>
        <button
          onClick={() => setQty(q => Math.min(q + 1, 20))}
          className="w-10 h-10 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-all shadow-sm"
        >
          <FaPlus size={12} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500 font-medium">Total</span>
        <span className="text-xl font-black text-zinc-900">Rs {(product.price * qty).toLocaleString()}</span>
      </div>

      <button
        onClick={() => addToCart(product, qty)}
        className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md"
      >
        <FaShoppingCart size={14} /> Add to Cart
      </button>
    </div>
  );
}
