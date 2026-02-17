"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Shirt, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

export function ConceptVideo() {
  const t = useTranslations("home.concept");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Palette,
      title: t("features.handDrawn.title"),
      description: t("features.handDrawn.description"),
    },
    {
      icon: Shirt,
      title: t("features.quality.title"),
      description: t("features.quality.description"),
    },
    {
      icon: BookOpen,
      title: t("features.storytelling.title"),
      description: t("features.storytelling.description"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Title section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
              <span className="text-xs sm:text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
                {t("label")}
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {t("description")}
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center space-y-3 sm:space-y-4 group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground/70 group-hover:text-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
