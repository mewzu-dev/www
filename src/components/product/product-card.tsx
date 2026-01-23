"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const backImage =
    product.images.find((img) => img.view === "back") || product.images[0];
  const frontImage = product.images.find((img) => img.view === "front");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/products/${product.slug}`} className="group block h-full">
        <Card className="overflow-hidden border border-foreground/5 hover:border-foreground/15 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1 h-full flex flex-col">
          <CardHeader className="p-0">
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
              {/* Back image (default) */}
              <Image
                src={backImage.url}
                alt={backImage.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-[1.08]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Front image (on hover) */}
              {frontImage && (
                <Image
                  src={frontImage.url}
                  alt={frontImage.alt}
                  fill
                  className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              {/* Enhanced overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {product.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10"
                >
                  <Badge className="backdrop-blur-md bg-foreground/90 text-background border-0 shadow-lg shadow-foreground/20 hover:bg-foreground transition-colors pl-2 pr-3 py-1.5 gap-1.5">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">
                      Featured
                    </span>
                  </Badge>
                </motion.div>
              )}

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex-grow">
            <div className="space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight group-hover:text-foreground/80 transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {product.tagline}
              </p>
            </div>

            <div className="flex gap-1.5 sm:gap-2 flex-wrap pt-1">
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs font-mono-alt tracking-wide border-foreground/15 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 px-2.5 py-0.5"
              >
                {product.scene}
              </Badge>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs font-mono-alt tracking-wide border-foreground/15 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 px-2.5 py-0.5"
              >
                {product.baseColor}
              </Badge>
            </div>
          </CardContent>

          {/* Bottom indicator - subtle visual cue */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-foreground/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </Card>
      </Link>
    </motion.div>
  );
}
