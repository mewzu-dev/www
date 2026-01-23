"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticHover } from "@/components/ui/magnetic-hover";
import { useLayout } from "@/components/layout/layout-context";
import { useMounted } from "@/hooks/use-mounted";

export function Hero() {
  const t = useTranslations("home.hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { announcementHeight, headerHeight } = useLayout();
  const mounted = useMounted();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const showAnimations = mounted && !shouldReduceMotion;

  const words = [t("title1"), t("title2"), t("title3")];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] overflow-hidden bg-background"
    >
      {/* Animated background elements - optimized */}
      {showAnimations ? (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
          initial={false}
        >
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"
            initial={false}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"
            initial={false}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl"
            initial={false}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />
        </div>
      )}

      <div
        className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-[100vh] text-center"
        style={{
          paddingTop: `${announcementHeight + headerHeight}px`,
        }}
      >
        {/* Volume badge with magnetic effect */}
        <div className="mb-6 md:mb-8">
          <MagneticHover strength={0.2}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 cursor-default">
              {showAnimations ? (
                <motion.div
                  initial={false}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.div>
              ) : (
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              <span className="text-xs sm:text-sm font-mono-alt tracking-wide">
                {t("badge")}
              </span>
            </div>
          </MagneticHover>
        </div>

        {/* Main heading with text reveal animation */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-10 max-w-6xl px-4">
          {words.map((word, index) => (
            <div key={index}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tighter leading-none">
                {word}
              </h1>
            </div>
          ))}
        </div>

        {/* Description with text reveal */}
        <div className="max-w-2xl mb-6 sm:mb-8 md:mb-10 px-6 sm:px-4">
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("description")}
            <span className="text-foreground font-medium">
              {t("descriptionHighlight")}
            </span>
            {t("descriptionEnd")}
          </p>
        </div>

        {/* CTA Buttons with magnetic hover */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 px-6 sm:px-4 w-full sm:w-auto">
          <MagneticHover strength={0.15}>
            <Button
              asChild
              size="lg"
              className="text-sm sm:text-base px-6 py-5 sm:px-8 sm:py-6 rounded-full group w-full sm:w-auto transition-all hover:scale-105 hover:shadow-lg"
            >
              <Link href="/products">
                <span>{t("shopCollection")}</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </MagneticHover>

          <MagneticHover strength={0.15}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-sm sm:text-base px-6 py-5 sm:px-8 sm:py-6 rounded-full w-full sm:w-auto transition-all hover:scale-105"
            >
              <Link href="/about">{t("learnMore")}</Link>
            </Button>
          </MagneticHover>
        </div>

        {/* Scroll indicator - Enhanced with glow */}
        {showAnimations && (
          <div className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 flex">
            <div className="flex flex-col items-center gap-2 sm:gap-3 relative">
              {showAnimations ? (
                <motion.span
                  className="text-xs font-mono-alt tracking-widest uppercase text-foreground/70 drop-shadow-lg"
                  initial={false}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  {t("scroll")}
                </motion.span>
              ) : (
                <span className="text-xs font-mono-alt tracking-widest uppercase text-foreground/70 drop-shadow-lg">
                  {t("scroll")}
                </span>
              )}

              <div className="relative h-12 w-6 rounded-full border-2 border-foreground/30 bg-background/50 backdrop-blur-sm flex items-start justify-center p-1.5 overflow-hidden shadow-lg">
                {/* Animated dot */}
                {showAnimations ? (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-foreground relative z-10"
                    initial={false}
                    animate={{
                      y: [0, 28, 0],
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground relative z-10" />
                )}

                {/* Glow trail effect */}
                {showAnimations && (
                  <motion.div
                    className="absolute top-1.5 w-1.5 h-6 bg-gradient-to-b from-foreground/50 to-transparent rounded-full blur-sm"
                    initial={false}
                    animate={{
                      y: [0, 28, 0],
                      opacity: [0.5, 0.1, 0.5],
                    }}
                    transition={{
                      duration: 1.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                )}

                {/* Border glow */}
                {showAnimations && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(var(--foreground), 0)",
                        "0 0 15px rgba(var(--foreground), 0.3)",
                        "0 0 0px rgba(var(--foreground), 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
