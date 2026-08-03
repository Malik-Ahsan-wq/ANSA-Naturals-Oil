import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import QuantitySelector from "@/components/QuantitySelector";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-3 sm:px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">

        {/* Image */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
          <Image src={product.image} alt={product.name} width={600} height={500} className="w-full h-56 sm:h-80 md:h-auto object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-wrap gap-2">
            <span className="bg-orange-100 text-orange-700 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full ${product.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {product.isVeg ? "Vegetarian" : "Non-Veg"}
            </span>
            <span className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full ${product.available ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>
              {product.available ? "In Stock" : "Unavailable"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900">{product.name}</h1>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">{product.description}</p>
          <p className="text-xl sm:text-2xl font-black text-orange-600">Rs {product.price.toLocaleString()}</p>

          <QuantitySelector product={product} />
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
