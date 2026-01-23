"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const backImage =
    product.images.find((img) => img.view === "back") || product.images[0];
  const frontImage = product.images.find((img) => img.view === "front");
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: reduceMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl bg-muted/30 backdrop-blur-sm border border-foreground/5 transition-all duration-700 group-hover:border-foreground/15 group-hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18)]">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-muted/80 to-muted/40">
              {/* Back image (default) */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={backImage.url}
                  alt={backImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>

              {/* Front image (on hover) */}
              {frontImage && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={frontImage.url}
                    alt={frontImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
              )}

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0"
                initial={{ x: "-100%", y: "-100%" }}
                whileHover={{ x: "100%", y: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Featured badge */}
              {product.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <div className="backdrop-blur-xl bg-background/95 text-foreground border border-foreground/10 rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold tracking-wide">
                      Featured
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Hover arrow indicator */}
              <motion.div
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="h-5 w-5 text-foreground" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-3">
              {/* Title */}
              <div className="space-y-1.5">
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight group-hover:text-foreground/70 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {product.tagline}
                </p>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap pt-1">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/70 border border-foreground/10">
                  {product.scene}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/70 border border-foreground/10">
                  {product.baseColor}
                </span>
              </div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
