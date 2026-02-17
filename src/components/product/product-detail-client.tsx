"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ExternalLinks } from "@/components/product/external-links";
import { PageContentWrapper } from "@/components/layout/page-content-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ruler, Palette, Sparkles, BookOpen, Package, Shirt } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { throttle, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations("products.detail");
  const backImage = product.images.find((img) => img.view === "back");
  const frontImage = product.images.find((img) => img.view === "front");
  const [activeTab, setActiveTab] = useState("back");
  const shouldReduceMotion = useReducedMotion();

  // Optimized scroll-based parallax with useMotionValue
  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });
  const backgroundY = useTransform(smoothScrollY, [0, 500], [0, 100]);
  const backgroundScale = useTransform(smoothScrollY, [0, 500], [1, 1.05]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = throttle(() => {
      scrollY.set(window.scrollY);
    }, 16); // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY, shouldReduceMotion]);

  // Memoize animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    }),
    [],
  );

  const contentVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    }),
    [],
  );

  return (
    <PageContentWrapper className="min-h-screen pb-16 sm:pb-20 md:pb-24 relative overflow-hidden">
      {/* Optimized background decorations - disable parallax on reduced motion */}
      {!shouldReduceMotion ? (
        <>
          <motion.div
            className="absolute top-40 right-0 w-[600px] h-[600px] bg-brand-cream/20 rounded-full blur-3xl -z-10"
            style={{
              y: backgroundY,
              scale: backgroundScale,
            }}
          />
          <motion.div
            className="absolute top-[60%] left-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl -z-10"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </>
      ) : (
        <>
          <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-brand-cream/20 rounded-full blur-3xl -z-10" />
          <div className="absolute top-[60%] left-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl -z-10" />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Image Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-6 lg:sticky lg:top-0 lg:self-start"
          >
            <Tabs
              defaultValue="back"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2 gap-1 h-12 sm:h-14 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger
                  value="back"
                  className="font-mono-alt text-xs sm:text-sm relative overflow-hidden group"
                >
                  <span className="relative z-10">{t("tabs.backView")}</span>
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 bg-foreground/5"
                      initial={false}
                      animate={
                        activeTab === "back" ? { scale: 1 } : { scale: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="front"
                  className="font-mono-alt text-xs sm:text-sm relative overflow-hidden group"
                >
                  <span className="relative z-10">{t("tabs.frontView")}</span>
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 bg-foreground/5"
                      initial={false}
                      animate={
                        activeTab === "front" ? { scale: 1 } : { scale: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="back" className="mt-4 sm:mt-6">
                {backImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-5/6 overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-foreground/10 group"
                    whileHover={
                      !shouldReduceMotion
                        ? {
                            scale: 1.02,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            },
                          }
                        : undefined
                    }
                  >
                    <div className="relative z-10 w-full h-full">
                      <Image
                        src={backImage.url}
                        alt={backImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="front" className="mt-4 sm:mt-6">
                {frontImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-5/6 overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-foreground/10 group"
                    whileHover={
                      !shouldReduceMotion
                        ? {
                            scale: 1.02,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            },
                          }
                        : undefined
                    }
                  >
                    <div className="relative z-10 w-full h-full">
                      <Image
                        src={frontImage.url}
                        alt={frontImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Badges */}
            <motion.div
              className="flex gap-2 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {product.featured && (
                <motion.div
                  whileHover={!shouldReduceMotion ? { scale: 1.05 } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className="backdrop-blur-md bg-foreground/90 text-background border-0 shadow-lg shadow-foreground/20 text-xs cursor-default pl-2 pr-3 py-1.5 gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span className="font-semibold">
                      {t("badges.featured")}
                    </span>
                  </Badge>
                </motion.div>
              )}
              <motion.div
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <Badge
                  variant="outline"
                  className="font-mono-alt text-xs cursor-default border-foreground/15 hover:border-foreground/30 hover:bg-foreground/5 transition-all"
                >
                  {product.scene}
                </Badge>
              </motion.div>
            </motion.div>

            {/* Title & Price */}
            <motion.div
              className="space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-none">
                {product.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                {product.tagline}
              </p>
              {product.price > 0 && (
                <p className="text-2xl sm:text-3xl font-bold font-mono-alt tracking-tight">
                  {formatPrice(product.price)}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="origin-left"
            >
              <Separator className="bg-foreground/10" />
            </motion.div>

            {/* Description & Story */}
            <motion.div
              className="space-y-5 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-display text-base sm:text-lg font-semibold flex items-center gap-2 group">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-brand-cream transition-colors" />
                  <span>{t("sections.description")}</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-display text-base sm:text-lg font-semibold flex items-center gap-2 group">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-brand-cream transition-colors" />
                  <span>{t("sections.story")}</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {product.story}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="origin-left"
            >
              <Separator className="bg-foreground/10" />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={!shouldReduceMotion ? { y: -4 } : undefined}
            >
              <Card className="border-foreground/10 bg-muted/30 overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cream/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="pt-5 pb-5 sm:pt-6 sm:pb-6 relative">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-mono-alt text-xs tracking-wide uppercase flex items-center gap-1.5">
                        <Palette className="w-3 h-3" />
                        {t("details.baseColor")}
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {product.baseColor}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-mono-alt text-xs tracking-wide uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        {t("details.artColor")}
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {product.artColor}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-mono-alt text-xs tracking-wide uppercase flex items-center gap-1.5">
                        <Shirt className="w-3 h-3" />
                        {t("details.material")}
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {product.material}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-mono-alt text-xs tracking-wide uppercase flex items-center gap-1.5">
                        <Ruler className="w-3 h-3" />
                        {t("details.availableSizes")}
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {product.sizes.join(", ")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="origin-left"
            >
              <Separator className="bg-foreground/10" />
            </motion.div>

            {/* External Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h3 className="font-display text-lg font-semibold">
                {t("sections.getThisDesign")}
              </h3>
              <ExternalLinks links={product.externalLinks} />
            </motion.div>

            {/* Size Guide Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={!shouldReduceMotion ? { x: 4 } : undefined}
            >
              <Link
                href="/size-guide"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Ruler className="h-4 w-4" />
                <span className="underline underline-offset-4 decoration-muted-foreground/30 group-hover:decoration-foreground transition-colors">
                  {t("sizeGuide")}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageContentWrapper>
  );
}
