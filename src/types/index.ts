// Core product types
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductImageView = "back" | "front" | "detail" | "lifestyle";

export interface ProductImage {
  url: string;
  alt: string;
  view: ProductImageView;
}

export type MarketplacePlatform = "shopee" | "tiktok" | "whatsapp";

export interface ExternalLink {
  platform: MarketplacePlatform;
  url: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  scene: string;
  story: string;
  baseColor: string;
  artColor: string;
  sizes: Size[];
  images: ProductImage[];
  featured: boolean;
  externalLinks: ExternalLink[];
}

// Size measurements for size guide
export interface SizeMeasurement {
  size: Size;
  chest: string;
  length: string;
  shoulder: string;
  sleeve: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkItem {
  key: string;
  href: string;
}

export interface FooterLinks {
  shop: FooterLinkItem[];
  about: FooterLinkItem[];
}

// Site configuration
export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  email?: string;
  whatsapp?: string;
}

export interface SiteInfo {
  tagline: string;
  location: string;
  foundedYear: number;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: SocialLinks;
  info: SiteInfo;
  footerLinks: FooterLinks;
}
