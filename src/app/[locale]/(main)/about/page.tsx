"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Heart, Sparkles, Target } from "lucide-react";
import { InteractiveSection } from "@/components/about/interactive-section";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { RevealCard } from "@/components/ui/reveal-card";
import { PageContentWrapper } from "@/components/layout/page-content-wrapper";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const sections = [
    {
      icon: Heart,
      title: t("sections.story.title"),
      content: [
        t("sections.story.content.0"),
        t("sections.story.content.1"),
        t("sections.story.content.2"),
      ],
    },
    {
      icon: Target,
      title: t("sections.concept.title"),
      content: [
        t("sections.concept.content.0"),
        t("sections.concept.content.1"),
        t("sections.concept.content.2"),
      ],
    },
    {
      icon: Palette,
      title: t("sections.philosophy.title"),
      content: [
        t("sections.philosophy.content.0"),
        t("sections.philosophy.content.1"),
        t("sections.philosophy.content.2"),
        t("sections.philosophy.content.3"),
      ],
    },
    {
      icon: Sparkles,
      title: t("sections.volume1.title"),
      content: [
        t("sections.volume1.content.0"),
        t("sections.volume1.content.1"),
        t("sections.volume1.content.2"),
      ],
    },
  ];

  return (
    <PageContentWrapper className="min-h-screen pb-16 sm:pb-20 md:pb-24 relative overflow-hidden">
      {/* Morphing background */}
      <MorphingBackground
        colors={["bg-brand-orange/10", "bg-brand-blue/10", "bg-brand-cream/20"]}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 mb-12 sm:mb-16 md:mb-20 text-center"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
              <span className="text-xs sm:text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
                {t("header.badge")}
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-foreground" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tighter leading-none">
              {t("header.title")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
              {t("header.subtitle")}
            </p>
          </motion.div>

          {/* Content sections */}
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section, index) => (
              <InteractiveSection
                key={section.title}
                icon={section.icon}
                title={section.title}
                content={section.content}
                index={index}
              />
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 sm:mt-16 md:mt-20 text-center"
          >
            <RevealCard className="bg-gradient-to-br from-muted/50 to-muted/20">
              <div className="pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 space-y-4 sm:space-y-5 md:space-y-6 px-6 sm:px-8 md:px-12">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold leading-relaxed">
                  {t("closing.title")}
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t("closing.subtitle")}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground italic">
                  {t("closing.cta")}
                </p>
              </div>
            </RevealCard>
          </motion.div>
        </div>
      </div>
    </PageContentWrapper>
  );
}
