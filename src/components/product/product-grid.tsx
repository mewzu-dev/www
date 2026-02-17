"use client";

import { ProductCard } from "./product-card";
import { Instagram, ShoppingBag, Send } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";
import { useTranslations } from "next-intl";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations("products.empty");

  if (products.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 space-y-6">
        <p className="text-lg sm:text-xl text-muted-foreground">
          {t("title")}
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {siteConfig.links.instagram && (
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/10 text-sm font-medium hover:bg-foreground/5 hover:border-foreground/20 transition-all"
            >
              <Instagram className="w-4 h-4" />
              {t("instagram")}
            </a>
          )}
          {siteConfig.links.tiktok && (
            <a
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/10 text-sm font-medium hover:bg-foreground/5 hover:border-foreground/20 transition-all"
            >
              <Send className="w-4 h-4" />
              {t("tiktok")}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          priority={index < 3} // Prioritize first 3 images for LCP
        />
      ))}
    </div>
  );
}
