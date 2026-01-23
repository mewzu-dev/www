import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate product URL from slug
export function getProductUrl(slug: string): string {
  return `/products/${slug}`;
}

// Format price (for future use when adding e-commerce)
export function formatPrice(price: number, currency: string = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
}
