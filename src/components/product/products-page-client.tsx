"use client";

import { ProductGrid } from "@/components/product/product-grid";
import { PageContentWrapper } from "@/components/layout/page-content-wrapper";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Product } from "@/types";

interface ProductsPageClientProps {
  products: Product[];
}

export function ProductsPageClient({ products }: ProductsPageClientProps) {
  const t = useTranslations("products.listing");

  return (
    <PageContentWrapper className="min-h-screen pb-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 mb-16 max-w-4xl"
        >
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-12 bg-foreground" />
            <span className="text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-none">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProductGrid products={products} />
        </motion.div>
      </div>
    </PageContentWrapper>
  );
}
