"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { FaMoneyBillWave, FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "923276227156";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({ customerName: "", address: "", phone: "" });

  useEffect(() => { setIsClient(true); }, []);
  useEffect(() => { if (isClient && items.length === 0) router.push("/"); }, [isClient, items, router]);

  if (!isClient || items.length === 0) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderLines = items.map((i) => `• ${i.product.name} x${i.quantity} = Rs ${(i.product.price * i.quantity).toLocaleString()}`).join("\n");
    const message = [
      "🍽️ *New Order from AB Restaurant*", "",
      `👤 *Name:* ${formData.customerName}`,
      `📞 *Phone:* ${formData.phone}`,
      `📍 *Address:* ${formData.address}`, "",
      "*Order Details:*", orderLines, "",
      `💰 *Total: Rs ${getCartTotal().toLocaleString()}*`,
      `💵 *Payment:* Cash on Delivery`,
    ].join("\n");
    clearCart();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-6 sm:py-10 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-3xl font-bold text-zinc-900 mb-5 sm:mb-8 text-center">Checkout</h1>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Order Summary */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-100">
            <h2 className="text-sm sm:text-base font-bold text-zinc-900 mb-3 sm:mb-4">Order Summary</h2>
            <ul className="space-y-2 mb-4 max-h-48 sm:max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.product.id} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-zinc-600 truncate mr-2">
                    {item.product.name} <span className="text-zinc-400">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-zinc-900 whitespace-nowrap">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-100 pt-3 flex justify-between items-center">
              <span className="font-bold text-zinc-900 text-sm">Total</span>
              <span className="text-lg sm:text-xl font-black text-orange-600">
                Rs {getCartTotal().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1">Full Name</label>
              <input type="text" name="customerName" required
                className="w-full rounded-lg border border-zinc-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white text-zinc-900"
                placeholder="Your name" value={formData.customerName} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1">Phone Number</label>
              <input type="tel" name="phone" required
                className="w-full rounded-lg border border-zinc-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white text-zinc-900"
                placeholder="03xx xxxxxxx" value={formData.phone} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1">Delivery Address</label>
              <textarea name="address" required rows={3}
                className="w-full rounded-lg border border-zinc-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none bg-white text-zinc-900"
                placeholder="House #, Street, City" value={formData.address} onChange={handleChange} />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-orange-200 bg-orange-50">
              <FaMoneyBillWave className="text-orange-600 text-base sm:text-lg flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-orange-800">Cash on Delivery</span>
            </div>

            <button type="submit"
              className="w-full bg-green-600 text-white py-3 sm:py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 text-sm">
              <FaWhatsapp className="text-lg sm:text-xl" /> Place Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
