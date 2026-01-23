"use client";

import {
  Instagram,
  Send,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ContactCard } from "@/components/contact/contact-card";
import { MorphingBackground } from "@/components/ui/morphing-background";
import { RevealCard } from "@/components/ui/reveal-card";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const contactMethods = [
    {
      icon: Instagram,
      title: t("methods.instagram.title"),
      description: t("methods.instagram.description"),
      handle: "@mewzu.id",
      link: siteConfig.links.instagram || "",
      external: true,
    },
    {
      icon: Send,
      title: t("methods.tiktok.title"),
      description: t("methods.tiktok.description"),
      handle: "@mewzu.id",
      link: siteConfig.links.tiktok || "",
      external: true,
    },
    {
      icon: Mail,
      title: t("methods.email.title"),
      description: t("methods.email.description"),
      handle: siteConfig.links.email || "",
      link: `mailto:${siteConfig.links.email || ""}`,
      external: false,
    },
    {
      icon: MessageCircle,
      title: t("methods.whatsapp.title"),
      description: t("methods.whatsapp.description"),
      handle: t("methods.whatsapp.handle"),
      link: siteConfig.links.whatsapp || "",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 relative overflow-hidden">
      {/* Morphing background */}
      <MorphingBackground
        colors={["bg-brand-cream/30", "bg-brand-blue/10", "bg-brand-orange/10"]}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center"
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

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {contactMethods.map((method, index) => (
              <ContactCard
                key={method.title}
                icon={method.icon}
                title={method.title}
                description={method.description}
                handle={method.handle}
                link={method.link}
                external={method.external}
                index={index}
              />
            ))}
          </div>

          {/* Business Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <RevealCard className="bg-gradient-to-br from-muted/50 to-muted/20">
              <div className="p-8 sm:p-10 md:p-12 space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">
                  {t("business.title")}
                </h3>
                <div className="space-y-5">
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                    {t("business.description")}
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    {t("business.emailPrompt")}{" "}
                    <a
                      href={`mailto:${siteConfig.links.email}`}
                      className="text-foreground font-medium underline hover:no-underline transition-all inline-flex items-center gap-1 group"
                    >
                      {siteConfig.links.email}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>{" "}
                    {t("business.emailSuffix")}
                  </p>
                </div>
              </div>
            </RevealCard>
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs sm:text-sm font-mono-alt text-muted-foreground tracking-wide px-4">
              {t("responseTime")}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
