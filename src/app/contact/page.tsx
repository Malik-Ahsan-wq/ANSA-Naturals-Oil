"use client";

import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { brand } from "@/data/brand";
import Leaf from "@/components/Leaf";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setState("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setState("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setState("idle"), 6000);
    } catch {
      setState("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden bg-[#111111] min-h-screen">
      <Leaf variant="c" className="absolute -right-6 -top-6 w-40 h-40 text-zinc-700/20" />
      <Leaf variant="a" className="absolute -left-8 bottom-10 w-36 h-36 text-zinc-600/15 rotate-45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="section-eyebrow flex items-center gap-2 mb-3"><span className="h-px w-8 bg-gold inline-block" />Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            We&apos;d Love to <span className="text-[#e6c277]">Hear From You</span>
          </h2>
          <p className="mt-5 text-emerald-100/70 leading-relaxed max-w-lg">
            Questions about the oil, your order, or wholesale partnerships? Our hair-care team
            responds within a few hours, seven days a week.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: FaWhatsapp, label: "WhatsApp", value: brand.phone },
              { icon: FaEnvelope, label: "Email", value: brand.email },
              { icon: FaMapMarkerAlt, label: "Headquarters", value: "Faisalabad, Pakistan · Shipping nationwide" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#e6c277]">
                  <c.icon className="text-lg" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-100/50">{c.label}</p>
                  <p className="text-sm sm:text-base text-white font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] bg-white/95 backdrop-blur p-6 sm:p-9 shadow-2xl space-y-4">
          <h3 className="text-xl font-bold text-[#14241b] mb-2">Send a Message</h3>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Your Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all" placeholder="e.g. Ayesha Khan" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Your Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Phone / WhatsApp</label>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all" placeholder="03xx xxxxxxx" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Message</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all resize-none" placeholder="How can we help you?" />
          </div>
          <button type="submit" disabled={state === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#111111] to-[#333333] text-white py-3.5 font-bold text-sm shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/40 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none">
            {state === "submitting" ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <FaEnvelope className="text-lg" />
            )}
            {state === "submitting" ? "Sending…" : "Send Message"}
          </button>
          {state === "success" && <p className="text-center text-sm font-semibold text-zinc-700 animate-pop">Message sent! We&apos;ll reply to your email shortly.</p>}
          {state === "error" && <p className="text-center text-sm font-semibold text-red-600 animate-pop">{error}</p>}
        </form>
      </div>
    </section>
  );
}
