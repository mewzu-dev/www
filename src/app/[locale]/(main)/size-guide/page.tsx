"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Ruler, Shirt, AlertCircle } from "lucide-react";
import { AnimatedTable } from "@/components/size-guide/animated-table";
import { MeasurementGuideCard } from "@/components/size-guide/measurement-guide-card";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { RevealCard } from "@/components/ui/reveal-card";
import { PageContentWrapper } from "@/components/layout/page-content-wrapper";
import { useTranslations } from "next-intl";

export default function SizeGuidePage() {
  const t = useTranslations("sizeGuide");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const measurementGuides = [
    {
      icon: Shirt,
      title: t("howToMeasure.guides.chest.title"),
      description: t("howToMeasure.guides.chest.description"),
    },
    {
      icon: Ruler,
      title: t("howToMeasure.guides.length.title"),
      description: t("howToMeasure.guides.length.description"),
    },
    {
      icon: Ruler,
      title: t("howToMeasure.guides.shoulder.title"),
      description: t("howToMeasure.guides.shoulder.description"),
    },
    {
      icon: Shirt,
      title: t("howToMeasure.guides.sleeve.title"),
      description: t("howToMeasure.guides.sleeve.description"),
    },
  ];

  const fitTips = [
    {
      title: t("fitGuide.tips.regularFit.title"),
      description: t("fitGuide.tips.regularFit.description"),
    },
    {
      title: t("fitGuide.tips.choosingSize.title"),
      description: t("fitGuide.tips.choosingSize.description"),
    },
    {
      title: t("fitGuide.tips.material.title"),
      description: t("fitGuide.tips.material.description"),
    },
    {
      title: t("fitGuide.tips.unsure.title"),
      description: t("fitGuide.tips.unsure.description"),
    },
  ];

  return (
    <PageContentWrapper className="min-h-screen pb-24 relative overflow-hidden">
      {/* Morphing background */}
      <MorphingBackground
        colors={["bg-brand-green/10", "bg-brand-cream/20", "bg-brand-blue/10"]}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-foreground" />
              <span className="text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
                {t("header.badge")}
              </span>
              <div className="h-[1px] w-12 bg-foreground" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-none">
              {t("header.title")}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t("header.subtitle")}
            </p>
          </motion.div>

          {/* Size Table */}
          <AnimatedTable />

          {/* How to Measure */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display font-bold text-center"
            >
              {t("howToMeasure.title")}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {measurementGuides.map((guide, index) => (
                <MeasurementGuideCard
                  key={guide.title}
                  icon={guide.icon}
                  title={guide.title}
                  description={guide.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Fit Guide */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display font-bold text-center"
            >
              {t("fitGuide.title")}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {fitTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <RevealCard className="h-full bg-background/80 backdrop-blur-sm">
                    <div className="pt-8 pb-8 px-8 space-y-4">
                      <h4 className="font-display font-bold text-xl">
                        {tip.title}
                      </h4>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </RevealCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <RevealCard className="bg-muted/30">
              <div className="pt-8 pb-8 px-8">
                <div className="flex items-start gap-5">
                  <AlertCircle className="w-6 h-6 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t("note")}
                  </p>
                </div>
              </div>
            </RevealCard>
          </motion.div>
        </div>
      </div>
    </PageContentWrapper>
  );
}
