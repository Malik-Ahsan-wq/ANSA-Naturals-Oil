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
    name: "Pure Cold-Pressed Black Seed Hair Oil",
    slug: "pure-black-seed-oil",
    price: 3000,
    originalPrice: 4500,
    image: "/assets/ansa-logo.png",
    description:
      "The flagship of ANSA Naturals — 100% pure, organic, first-press cold-extracted black seed hair oil. Hand-harvested Nigella sativa seeds, cold-pressed within 24 hours, and bottled in UV-protected glass to lock in thymoquinone, omega fatty acids and vitamin E for visibly stronger, shinier, more resilient hair.",
    category: "Premium Natural Hair Oil",
    isVeg: true,
    available: true,
    sizes: "100 ml · Glass Dropper Bottle",
    rating: 4.9,
    reviews: 3128,
  },
];