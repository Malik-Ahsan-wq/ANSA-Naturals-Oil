"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaArrowRight, FaLeaf, FaPlus, FaMinus, FaWhatsapp } from "react-icons/fa";
import { brand } from "@/data/brand";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbf8f1] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-full shadow-sm border border-emerald-900/5 inline-flex">
            <FaLeaf className="text-5xl text-emerald-200" />
          </div>
          <h2 className="text-2xl font-bold text-[#14241b]">Your cart is empty</h2>
          <p className="text-zinc-500 text-sm">Add our pure black seed oil to begin your wellness journey.</p>
          <Link href="/products" className="inline-block bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-900/20 transition-all active:scale-95 text-sm">
            Shop the Oil
          </Link>
        </div>
      </div>
    );
  }

  const orderMsg = () => {
    const lines = items.map((i) => `🌿 ${i.product.name} × ${i.quantity} = ${brand.currency} ${(i.product.price * i.quantity).toLocaleString()}`).join("\n");
    return `*New Order — ANSA Naturals*\n\n*Items:*\n${lines}\n\n*Total: ${brand.currency} ${getCartTotal().toLocaleString()}*\n*Payment:* Cash on Delivery`;
  };

  return (
    <div className="min-h-screen bg-[#fbf8f1] py-24 lg:py-28 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-eyebrow mb-1">Your Selection</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#14241b]">Shopping Cart</h1>
          </div>
          <button onClick={clearCart} className="text-sm text-red-500 font-semibold hover:text-red-600 transition-colors">
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-emerald-900/5 border border-emerald-900/5 overflow-hidden">
          <ul className="divide-y divide-emerald-900/5">
            {items.map((item) => (
              <li key={item.product.id} className="p-4 sm:p-5 flex items-center gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#f0f7ef] flex items-center justify-center">
                  <Image src={item.product.image} alt={item.product.name} width={80} height={80} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-[#14241b] line-clamp-1">{item.product.name}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{brand.currency} {item.product.price.toLocaleString()} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1f5c3d] hover:bg-emerald-100 transition-all" aria-label="Decrease">
                      <FaMinus size={8} />
                    </button>
                    <span className="text-sm font-bold text-[#14241b] w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1f5c3d] hover:bg-emerald-100 transition-all" aria-label="Increase">
                      <FaPlus size={8} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm sm:text-base font-bold text-[#1f5c3d] whitespace-nowrap">
                    {brand.currency} {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Remove">
                    <FaTrash size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-[#f7faf6] p-4 sm:p-6 border-t border-emerald-900/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-700 flex items-center gap-1.5"><FaLeaf /> Free nationwide delivery</span>
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Total</span>
                <span className="text-xl sm:text-2xl font-bold text-[#14241b]">{brand.currency} {getCartTotal().toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(orderMsg())}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0f3524] to-[#1f5c3d] hover:shadow-lg text-white px-6 py-4 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md">
                <FaWhatsapp className="text-lg" /> Order via WhatsApp
              </a>
              <Link href="/checkout"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white px-6 py-4 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md">
                Checkout <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}