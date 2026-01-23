"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const t = useTranslations("home.featured");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cream/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-12 md:mb-16 gap-6 sm:gap-8">
          {/* Title section with animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3 sm:space-y-4 max-w-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
              <span className="text-xs sm:text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
                {t("label")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tighter leading-none">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-auto"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base group w-full lg:w-auto"
            >
              <Link href="/products">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Product Grid with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ProductGrid products={products} />
        </motion.div>
      </div>
    </section>
  );
}
