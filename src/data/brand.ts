export const brand = {
  name: "ANSA Naturals",
  shortName: "ANSA",
  tagline: "Pure Organic Oil With Organic Seeds",
  logo: "/assets/ChatGPT Image Aug 17, 2026, 12_01_25 PM.png",
  description:
    "ANSA Naturals crafts 100% pure, Organic natural hair oil from hand-selected Nigella sativa seeds — bottled in small batches to nourish stronger, shinier, healthier-looking hair with nature's most powerful nutrients.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923218719472",
  phone: "+92 321 8719472",
  email: "ahsanmalikking57@gmail.com",
  address: "ANSA Naturals, Faisalbad, Pakistan",
  currency: "Rs",
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
  stats: [
    { value: "30,000+", label: "Happy Customers" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "100%", label: "Natural & Pure" },
    { value: "4.6★", label: "Organic-Oil" },
  ],
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
