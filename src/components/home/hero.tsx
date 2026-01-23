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

export function Hero() {
  const t = useTranslations("home.hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const words = [t("title1"), t("title2"), t("title3")];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] overflow-hidden bg-background"
    >
      {/* Animated background elements - optimized */}
      {!shouldReduceMotion ? (
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"
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
          <div className="absolute top-20 right-20 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />
        </div>
      )}

      <motion.div
        className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-[100vh] text-center"
        style={{ opacity: shouldReduceMotion ? 1 : opacity }}
      >
        {/* Volume badge with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <MagneticHover strength={0.2}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 cursor-default">
              <motion.div
                animate={
                  !shouldReduceMotion
                    ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.div>
              <span className="text-xs sm:text-sm font-mono-alt tracking-wide">
                {t("badge")}
              </span>
            </div>
          </MagneticHover>
        </motion.div>

        {/* Main heading with text reveal animation */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-8 sm:mb-10 md:mb-12 max-w-6xl px-4">
          {words.map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.8,
                delay: shouldReduceMotion ? 0 : 0.3 + index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tighter leading-none">
                {word}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Description with text reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            delay: shouldReduceMotion ? 0 : 1.1,
          }}
          className="max-w-2xl mb-8 sm:mb-10 md:mb-12 px-6 sm:px-4"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            {t("description")}
            <span className="text-foreground font-medium">
              {t("descriptionHighlight")}
            </span>
            {t("descriptionEnd")}
          </p>
        </motion.div>

        {/* CTA Buttons with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            delay: shouldReduceMotion ? 0 : 1.3,
          }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 px-6 sm:px-4 w-full sm:w-auto"
        >
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
        </motion.div>

        {/* Scroll indicator - Enhanced with glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: shouldReduceMotion ? 0 : 1.8 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex"
        >
          <div className="flex flex-col items-center gap-3 relative">
            <motion.span
              className="text-xs font-mono-alt tracking-widest uppercase"
              animate={
                !shouldReduceMotion
                  ? {
                      opacity: [0.5, 1, 0.5],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {t("scroll")}
            </motion.span>

            <div className="relative h-12 w-6 rounded-full border border-foreground/20 flex items-start justify-center p-1.5 overflow-hidden">
              {/* Animated dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-foreground relative z-10"
                animate={
                  !shouldReduceMotion
                    ? {
                        y: [0, 28, 0],
                        opacity: [1, 0.3, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />

              {/* Glow trail effect */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute top-1.5 w-1.5 h-6 bg-gradient-to-b from-foreground/50 to-transparent rounded-full blur-sm"
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
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={
                  !shouldReduceMotion
                    ? {
                        boxShadow: [
                          "0 0 0px rgba(var(--foreground), 0)",
                          "0 0 15px rgba(var(--foreground), 0.3)",
                          "0 0 0px rgba(var(--foreground), 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
