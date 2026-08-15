export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  category: string;
  isVeg: boolean;
  available: boolean;
  sizes: string;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    id: "oil-01",
    name: "Pure Organic Oil with Organic Ingredients",
    slug: "pure-black-seed-oil",
    price: 3000,
    originalPrice: 4500,
    image: "/assets/ansa-logo.png",
    description:
      "The flagship of ANSA Naturals — 100% pure, organic hair oil crafted with organic ingredients. A carefully blended formula of nourishing botanical oils and plant extracts, bottled in UV-protected glass to preserve natural potency for visibly stronger, shinier, more resilient hair.",
    category: "Premium Natural Hair Oil",
    isVeg: true,
    available: true,
    sizes: "100 ml · Glass Dropper Bottle",
    rating: 4.9,
    reviews: 3128,
  },
];