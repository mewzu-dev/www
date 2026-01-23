"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Cat } from "lucide-react";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LayoutProvider } from "@/components/layout/layout-context";
import { PageContentWrapper } from "@/components/layout/page-content-wrapper";

export default function CatchAllNotFound() {
  const t = useTranslations("common.notFound");

  return (
    <LayoutProvider>
      <Header />
      <main className="flex-1">
        <PageContentWrapper>
          <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center relative overflow-hidden py-16 sm:py-20 md:py-24">
            {/* Morphing background */}
            <MorphingBackground
              colors={[
                "bg-brand-orange/10",
                "bg-brand-blue/10",
                "bg-brand-cream/20",
              ]}
            />

            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* 404 Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: 3,
                          repeatDelay: 2,
                        }}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-muted/50 flex items-center justify-center"
                      >
                        <Cat className="w-12 h-12 sm:w-16 sm:h-16 text-foreground/70" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-background font-bold text-sm"
                      >
                        !
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* 404 Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
                      <span className="text-xs sm:text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
                        {t("badge")}
                      </span>
                      <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
                    </div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter">
                      404
                    </h1>

                    <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-foreground/90">
                      {t("title")}
                    </p>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed px-4">
                      {t("description")}
                    </p>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="group w-full sm:w-auto"
                    >
                      <Link href="/">
                        <Home className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                        {t("actions.home")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group w-full sm:w-auto"
                    >
                      <button onClick={() => window.history.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        {t("actions.back")}
                      </button>
                    </Button>
                  </motion.div>

                  {/* Helpful links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="pt-8 space-y-3"
                  >
                    <p className="text-sm text-muted-foreground">
                      {t("suggestions.title")}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Link
                        href="/products"
                        className="text-sm px-4 py-2 rounded-full border border-foreground/10 hover:border-foreground/30 transition-colors"
                      >
                        {t("suggestions.products")}
                      </Link>
                      <Link
                        href="/about"
                        className="text-sm px-4 py-2 rounded-full border border-foreground/10 hover:border-foreground/30 transition-colors"
                      >
                        {t("suggestions.about")}
                      </Link>
                      <Link
                        href="/contact"
                        className="text-sm px-4 py-2 rounded-full border border-foreground/10 hover:border-foreground/30 transition-colors"
                      >
                        {t("suggestions.contact")}
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </PageContentWrapper>
      </main>
      <Footer />
    </LayoutProvider>
  );
}
