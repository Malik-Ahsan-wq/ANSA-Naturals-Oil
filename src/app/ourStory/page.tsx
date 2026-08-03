"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUtensils, FaLeaf, FaAward, FaHeart } from "react-icons/fa";

const values = [
  {
    icon: <FaLeaf className="text-orange-600" size={24} />,
    title: "Fresh Ingredients",
    description: "We source daily from local farms to ensure every dish serves the peak of seasonal flavor."
  },
  {
    icon: <FaUtensils className="text-orange-600" size={24} />,
    title: "Culinary Craft",
    description: "Our chefs combine traditional techniques with modern innovation for a unique plate."
  },
  {
    icon: <FaAward className="text-orange-600" size={24} />,
    title: "Quality First",
    description: "From the kitchen to your table, we maintain the highest standards of food excellence."
  },
  {
    icon: <FaHeart className="text-orange-600" size={24} />,
    title: "Guest Passion",
    description: "At AB Restaurant, you aren't just a customer; you are a guest in our home."
  }
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative -mt-16 h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/interior2.jpg" // Replace with your interior image
          alt="AB Restaurant Interior"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center px-4" data-aos="zoom-in">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase">
            Our <span className="text-orange-500">Story</span>
          </h1>
          <p className="mt-4 text-zinc-200 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            A journey of flavors, tradition, and the pursuit of culinary perfection since 2010.
          </p>
        </div>
      </section>

      {/* --- THE JOURNEY SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full -z-10" />
            <Image
              src="/assets/kithchenchef.jpg" // Replace with a chef/kitchen image
              alt="Our Chef at work"
              width={600}
              height={700}
              className="rounded-3xl shadow-2xl object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block border border-zinc-100">
              <p className="text-4xl font-black text-orange-600">14+</p>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Years of Excellence</p>
            </div>
          </div>

          <div className="space-y-8" data-aos="fade-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest">
              Established 2010
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight">
              Started from a passion for <br />
              <span className="text-orange-600">authentic taste.</span>
            </h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed text-lg">
              <p>
                AB Restaurant began with a simple vision: to create a space where food is treated as art and guests are treated as family. What started as a small kitchen has grown into a destination for food enthusiasts.
              </p>
              <p>
                We believe that the secret to great food lies in the details. From the precise temperature of our grills to the hand-picked herbs in our sauces, we never compromise on quality.
              </p>
            </div>
            <div className="pt-4">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 text-white px-10 py-4 text-sm font-bold transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-95"
              >
                Experience the Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES GRID --- */}
      <section className="bg-zinc-50 py-24 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900">What We Stand For</h2>
            <p className="mt-4 text-zinc-500">The pillars of our culinary philosophy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:-translate-y-2 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE MASTERMIND SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="w-full lg:w-1/2" data-aos="fade-left">
             <Image
              src="/assets/headerchef.png" // Replace with a chef portrait
              alt="Head Chef"
              width={600}
              height={600}
              className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-right">
            <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm">The Mastermind</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900">Chef Arsalan Bashir</h2>
            <p className="text-xl text-zinc-500 italic">&quot;Cooking is a language that speaks to the soul.&quot;</p>
            <p className="text-zinc-600 leading-relaxed text-lg">
              With over two decades of experience in Michelin-starred kitchens across the globe, Chef Arsalan brings a world of expertise back to AB Restaurant. His philosophy is simple: respect the ingredient, and the dish will respect you.
            </p>
            <div className="flex gap-4 pt-4">
               {/* Decorative Chef Signature Placeholder */}
               <div className="w-32 h-16 bg-zinc-100 rounded opacity-50 flex items-center justify-center italic font-serif text-zinc-400">
                 Signature
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="bg-orange-600 rounded-[3rem] p-12 md:p-20 text-center text-white overflow-hidden relative" data-aos="zoom-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to Taste the Story?</h2>
          <p className="text-orange-100 mb-10 text-lg max-w-xl mx-auto">
            Book your table today or order online to experience why we are the city&apos;s favorite culinary destination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-zinc-100 transition-all active:scale-95">
              Order Now
            </Link>
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="bg-zinc-900 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-black transition-all active:scale-95"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
