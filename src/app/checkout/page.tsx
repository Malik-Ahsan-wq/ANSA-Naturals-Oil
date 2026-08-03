"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaMoneyBillWave, FaWhatsapp, FaLeaf } from "react-icons/fa";
import { brand } from "@/data/brand";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const [formData, setFormData] = useState({ customerName: "", address: "", phone: "", note: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = items.map((i) => `🌿 ${i.product.name} × ${i.quantity} = ${brand.currency} ${(i.product.price * i.quantity).toLocaleString()}`).join("\n");
    const message = [
      "*New Order — ANSA Naturals*", "",
      `👤 *Name:* ${formData.customerName}`,
      `📞 *Phone:* ${formData.phone}`,
      `📍 *Address:* ${formData.address}`,
      formData.note ? `📝 *Note:* ${formData.note}` : "", "",
      "*Order Details:*", lines, "",
      `💰 *Total: ${brand.currency} ${getCartTotal().toLocaleString()}*`,
      "💵 Payment: Cash on Delivery",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbf8f1] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-full shadow-sm border border-emerald-900/5 inline-flex">
            <FaLeaf className="text-5xl text-emerald-200" />
          </div>
          <h2 className="text-2xl font-bold text-[#14241b]">Your cart is empty</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8f1] py-24 lg:py-28 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="section-eyebrow mb-1">Almost There</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#14241b] mb-2">Checkout</h1>
        <p className="text-sm text-zinc-500 mb-8">Complete your details — your order goes straight to our WhatsApp.</p>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
          {/* Summary */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg shadow-emerald-900/5 border border-emerald-900/5 h-fit">
            <h2 className="text-base font-bold text-[#14241b] mb-4">Order Summary</h2>
            <ul className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-zinc-600 truncate mr-2">
                    {item.product.name} <span className="text-zinc-400">×{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-[#14241b] whitespace-nowrap">{brand.currency} {(item.product.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-emerald-900/5 pt-3 flex justify-between items-center">
              <span className="font-bold text-[#14241b] text-sm">Total</span>
              <span className="text-xl font-bold text-[#1f5c3d]">{brand.currency} {getCartTotal().toLocaleString()}</span>
            </div>
            <p className="mt-3 text-xs text-emerald-700 flex items-center gap-1.5"><FaLeaf /> Free nationwide delivery included.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg shadow-emerald-900/5 border border-emerald-900/5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Full Name</label>
              <input type="text" name="customerName" required
                className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent outline-none transition-all"
                placeholder="Your name" value={formData.customerName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Phone Number</label>
              <input type="tel" name="phone" required
                className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent outline-none transition-all"
                placeholder="03xx xxxxxxx" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Delivery Address</label>
              <textarea name="address" required rows={3}
                className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent outline-none transition-all resize-none"
                placeholder="House #, Street, City" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Order Note (optional)</label>
              <input type="text" name="note"
                className="w-full rounded-xl border border-emerald-900/10 bg-[#fbfcf8] px-4 py-3 text-sm focus:ring-2 focus:ring-[#1f5c3d] focus:border-transparent outline-none transition-all"
                placeholder="Any instructions" value={formData.note} onChange={handleChange} />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50">
              <FaMoneyBillWave className="text-[#1f5c3d] text-lg flex-shrink-0" />
              <span className="font-semibold text-sm text-emerald-800">Cash on Delivery</span>
            </div>

            <button type="submit"
              className="w-full bg-gradient-to-r from-[#0f3524] to-[#1f5c3d] hover:shadow-lg text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 text-sm">
              <FaWhatsapp className="text-lg" /> Place Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}