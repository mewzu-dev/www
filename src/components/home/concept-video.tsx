"use client";

import { Card, CardContent } from "@/components/ui/card";
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
      className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-foreground" />
              <span className="text-sm font-mono-alt tracking-widest uppercase text-muted-foreground">
                {t("label")}
              </span>
              <div className="h-[1px] w-12 bg-foreground" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* Video card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-foreground/10 shadow-2xl overflow-hidden">
              <CardContent className="p-8 md:p-16">
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                        backgroundSize: "30px 30px",
                      }}
                    />
                  </div>

                  <div className="text-center space-y-4 relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-20 h-20 mx-auto rounded-full border-2 border-foreground/20 flex items-center justify-center"
                    >
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-foreground/40 border-b-8 border-b-transparent ml-1" />
                    </motion.div>
                    <p className="text-muted-foreground font-mono-alt text-sm tracking-wide">
                      {t("videoPlaceholder")}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                      {t("videoDescription")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features grid */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center space-y-4 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-foreground/70 group-hover:text-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-semibold">
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
