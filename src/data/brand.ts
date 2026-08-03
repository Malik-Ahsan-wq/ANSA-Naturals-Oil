export const brand = {
  name: "ANSA Naturals",
  shortName: "ANSA",
  tagline: "Pure Cold-Pressed Natural Hair Oil",
  logo: "/assets/ansa-logo.png",
  description:
    "ANSA Naturals crafts 100% pure, cold-pressed natural hair oil from hand-selected Nigella sativa seeds — bottled in small batches to nourish stronger, shinier, healthier-looking hair with nature's most powerful nutrients.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923276227156",
  phone: "+92 327 6227156",
  email: "care@ansanaturals.com",
  address: "ANSA Naturals, Lahore, Pakistan",
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
    { value: "4.6★", label: "Cold-Pressed" },
  ],
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
