"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { FaTimes, FaTrash, FaPlus, FaMinus, FaLeaf, FaWhatsapp } from "react-icons/fa";
import { brand } from "@/data/brand";
import OilDrop from "./OilDrop";

export default function CartSidebar() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const placeOrder = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => `🌿 ${i.product.name} × ${i.quantity} = ${brand.currency} ${(i.product.price * i.quantity).toLocaleString()}`).join("\n");
    const msg = `*New Order — ANSA Naturals*\n\n*Items:*\n${lines}\n\n*Total: ${brand.currency} ${getCartTotal().toLocaleString()}*\n*Payment:* Cash on Delivery`;
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <div onClick={closeCart}
        className={`fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

      <aside className={`fixed top-0 right-0 z-[201] h-full w-full sm:max-w-[400px] bg-[#fbf8f1] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-900/10 bg-white">
          <div className="flex items-center gap-2">
            <OilDrop className="w-6 h-7 text-[#c08a2e]" />
            <h2 className="font-bold text-[#14241b] text-lg">Your Cart</h2>
            {getCartCount() > 0 && (
              <span className="bg-[#1f5c3d] text-white text-xs font-bold px-2 py-0.5 rounded-full">{getCartCount()}</span>
            )}
          </div>
          <button onClick={closeCart} className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-[#1f5c3d] transition-colors">
            <FaTimes size={13} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                <FaLeaf className="text-3xl text-emerald-300" />
              </div>
              <p className="font-bold text-[#14241b] text-base">Your cart is empty</p>
              <p className="text-sm text-zinc-400 max-w-[200px]">Add our pure black seed oil to begin your wellness journey</p>
              <Link href="/products" onClick={closeCart} className="mt-1 bg-gradient-to-r from-[#1f5c3d] to-[#2e7d57] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                Shop the Oil
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-white rounded-2xl p-3 border border-emerald-900/5 shadow-sm">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#f0f7ef] flex items-center justify-center">
                  <Image src={item.product.image} alt={item.product.name} width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#14241b] line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{brand.currency} {item.product.price.toLocaleString()} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1f5c3d] hover:bg-emerald-100 transition-colors">
                      <FaMinus size={7} />
                    </button>
                    <span className="text-sm font-bold text-[#14241b] w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1f5c3d] hover:bg-emerald-100 transition-colors">
                      <FaPlus size={7} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Remove">
                    <FaTrash size={11} />
                  </button>
                  <p className="text-sm font-bold text-[#1f5c3d] whitespace-nowrap">
                    {brand.currency} {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-emerald-900/10 px-5 py-4 space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-medium text-sm">Subtotal</span>
              <span className="text-xl font-bold text-[#14241b]">{brand.currency} {getCartTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-emerald-700 flex items-center gap-1.5"><FaLeaf/> Free nationwide delivery applied at checkout</p>
            <button onClick={placeOrder}
              className="w-full bg-gradient-to-r from-[#0f3524] to-[#1f5c3d] hover:shadow-lg text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md">
              <FaWhatsapp className="text-lg" /> Place Order via WhatsApp
            </button>
            <Link href="/cart" onClick={closeCart}
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#1f5c3d] py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all">
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}