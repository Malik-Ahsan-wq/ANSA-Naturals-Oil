"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingBag, FaWhatsapp } from "react-icons/fa";

export default function CartSidebar() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <>
      {/* BACKDROP */}
      <div onClick={closeCart}
        className={`fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

      {/* SIDEBAR */}
      <aside className={`fixed top-0 right-0 z-[201] h-full w-full sm:max-w-[390px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-orange-600 text-base sm:text-lg" />
            <h2 className="font-black text-zinc-900 text-base sm:text-lg">Your Cart</h2>
            {getCartCount() > 0 && (
              <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{getCartCount()}</span>
            )}
          </div>
          <button onClick={closeCart} className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors">
            <FaTimes size={13} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-100 rounded-full flex items-center justify-center">
                <FaShoppingBag className="text-2xl sm:text-3xl text-zinc-300" />
              </div>
              <p className="font-bold text-zinc-800 text-sm sm:text-base">Your cart is empty</p>
              <p className="text-xs sm:text-sm text-zinc-400">Add items from our menu to get started</p>
              <button onClick={closeCart} className="mt-1 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors">
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-2.5 sm:gap-3 bg-zinc-50 rounded-xl p-2.5 sm:p-3 border border-zinc-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-200">
                  <Image src={item.product.image} alt={item.product.name} width={64} height={64} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs sm:text-sm text-zinc-900 line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">Rs {item.product.price.toLocaleString()} each</p>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-colors">
                      <FaMinus size={7} />
                    </button>
                    <span className="text-xs sm:text-sm font-bold text-zinc-800 w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-colors">
                      <FaPlus size={7} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-300 hover:text-red-500 transition-colors">
                    <FaTrash size={11} />
                  </button>
                  <p className="text-xs sm:text-sm font-black text-orange-600 whitespace-nowrap">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-4 sm:px-5 py-3.5 sm:py-4 space-y-2.5 sm:space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-medium text-xs sm:text-sm">Subtotal</span>
              <span className="text-lg sm:text-xl font-black text-zinc-900">Rs {getCartTotal().toLocaleString()}</span>
            </div>
            <Link href="/checkout" onClick={closeCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md">
              <FaWhatsapp className="text-base sm:text-lg" /> Place Order via WhatsApp
            </Link>
            <Link href="/cart" onClick={closeCart}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center transition-all">
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
