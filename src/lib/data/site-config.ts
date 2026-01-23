import { SiteConfig } from "@/types";

/**
 * Centralized site configuration
 * Update this file to change site-wide information, social links, and footer links
 */
export const siteConfig: SiteConfig = {
  name: "Mewzu",
  description:
    "Hand-drawn cat adventures on quality apparel. Same cat, different adventures - explore our unique collection of illustrated t-shirts.",
  url: "https://mewzu.com",
  ogImage: "https://mewzu.com/logo/logo-square.jpg",

  // Social media links
  links: {
    instagram: "https://instagram.com/mewzu.id",
    tiktok: "https://tiktok.com/@mewzu.id",
    email: "hello@mewzu.com",
    whatsapp: "https://wa.me/62812345678",
  },

  // Site information
  info: {
    tagline: "Hand-drawn cat adventures on quality apparel",
    location: "Bandung, Indonesia",
    foundedYear: 2024,
  },

  // Footer navigation links
  footerLinks: {
    shop: [
      { key: "allProducts", href: "/products" },
      { key: "sizeGuide", href: "/size-guide" },
      { key: "shippingInfo", href: "/shipping" },
    ],
    about: [
      { key: "ourStory", href: "/about" },
      { key: "contactUs", href: "/contact" },
    ],
  },
};
