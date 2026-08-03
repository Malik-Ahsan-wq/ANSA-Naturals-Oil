import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import QuantitySelector from "@/components/QuantitySelector";
import { brand } from "@/data/brand";
import { FaLeaf, FaTruck, FaShieldAlt, FaRecycle, FaStar } from "react-icons/fa";
import ProductBottle from "@/components/ProductBottle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} — ${brand.name}` : brand.name,
    description: product?.description ?? brand.description,
  };
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const details = [
    { icon: FaLeaf, title: "100% Pure", desc: "Single-origin, unrefined, cold-pressed black seed oil." },
    { icon: FaShieldAlt, title: "Lab Tested", desc: "Third-party verified for thymoquinone purity." },
    { icon: FaTruck, title: "Free Shipping", desc: "Nationwide delivery, dispatched within 24 hours." },
    { icon: FaRecycle, title: "Eco-Friendly", desc: "Amber glass bottle, fully recyclable packaging." },
  ];

  return (
    <main className="min-h-screen bg-[#fbf8f1] overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-10">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-[#1f5c3d] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1f5c3d] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#14241b] font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Visual */}
          <div className="relative rounded-[2rem] bg-gradient-to-b from-[#eef6ec] to-[#fbf8f1] border border-emerald-900/5 p-8 sm:p-12 flex items-center justify-center shadow-inner">
            <ProductBottle className="w-[80%] max-w-md" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">{product.category}</span>
              <span className="flex items-center gap-1 text-amber-500 text-sm">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-xs" />)}
                <span className="ml-1 font-bold text-[#14241b]">{product.rating}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14241b] leading-tight">{product.name}</h1>
            <p className="text-sm text-emerald-700 font-semibold">{product.sizes}</p>
            <p className="text-zinc-600 leading-relaxed">{product.description}</p>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-[#1f5c3d]">{brand.currency} {product.price.toLocaleString()}</span>
              <span className="text-lg text-zinc-400 line-through mb-1">{brand.currency} {product.originalPrice.toLocaleString()}</span>
              <span className="mb-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
            </div>

            <QuantitySelector product={product} />

            <div className="grid grid-cols-2 gap-4">
              {details.map((d) => (
                <div key={d.title} className="flex items-start gap-3 rounded-2xl border border-emerald-900/8 bg-white p-4">
                  <d.icon className="text-[#1f5c3d] text-xl mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#14241b]">{d.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <FaLeaf className="text-emerald-600" /> Cash on delivery available nationwide · 14-day satisfaction guarantee
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";