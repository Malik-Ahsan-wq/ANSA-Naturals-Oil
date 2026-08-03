"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaArrowRight, FaShoppingBag, FaPlus, FaMinus } from "react-icons/fa";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="bg-white p-5 rounded-full shadow-sm inline-flex">
            <FaShoppingBag className="text-5xl text-zinc-200" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Your cart is empty</h2>
          <p className="text-zinc-500 text-sm">Add something delicious to get started.</p>
          <Link href="/products" className="inline-block bg-orange-600 text-white px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors text-sm">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-6 sm:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-zinc-900">Shopping Cart</h1>
          <button onClick={clearCart} className="text-xs sm:text-sm text-red-500 font-semibold hover:text-red-600 transition-colors">
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <ul className="divide-y divide-zinc-100">
            {items.map((item) => (
              <li key={item.product.id} className="p-3 sm:p-5 flex items-center gap-3 sm:gap-5">
                {/* Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                  <Image src={item.product.image} alt={item.product.name} width={80} height={80} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-base font-bold text-zinc-900 line-clamp-1">{item.product.name}</h3>
                  <p className="text-[10px] sm:text-sm text-zinc-400 mt-0.5">Rs {item.product.price.toLocaleString()} each</p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-all">
                      <FaMinus size={8} />
                    </button>
                    <span className="text-sm font-black text-zinc-900 w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:border-orange-400 hover:text-orange-600 transition-all">
                      <FaPlus size={8} />
                    </button>
                  </div>
                </div>

                {/* Price + remove */}
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm sm:text-base font-black text-orange-600 whitespace-nowrap">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Remove">
                    <FaTrash size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="bg-zinc-50 p-4 sm:p-6 flex items-center justify-between gap-4 border-t border-zinc-100">
            <div>
              <span className="block text-[10px] sm:text-xs text-zinc-400 uppercase font-semibold tracking-wider">Total</span>
              <span className="text-xl sm:text-2xl font-black text-zinc-900">
                Rs {getCartTotal().toLocaleString()}
              </span>
            </div>
            <Link href="/checkout"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-md">
              Checkout <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
