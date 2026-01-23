"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Instagram, Send, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const footerLinks = {
  shop: [
    { key: "allProducts", href: "/products" },
    { key: "sizeGuide", href: "/size-guide" },
    { key: "shippingInfo", href: "/shipping" },
  ],
  about: [
    { key: "ourStory", href: "/about" },
    { key: "contactUs", href: "/contact" },
  ],
};

export function Footer() {
  const t = useTranslations("common.footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-natural/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 space-y-4 sm:space-y-6"
          >
            <Link href="/" className="inline-block group">
              <Image
                src="/logo/logo-icon.jpg"
                alt="Mewzu"
                width={80}
                height={80}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-sm">
              {t("tagline")}
            </p>

            {/* Social links */}
            <div className="flex gap-3 sm:gap-4">
              {siteConfig.links.instagram && (
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all hover:scale-110"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">{t("socialLabels.instagram")}</span>
                </a>
              )}
              {siteConfig.links.tiktok && (
                <a
                  href={siteConfig.links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all hover:scale-110"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">{t("socialLabels.tiktok")}</span>
                </a>
              )}
              {siteConfig.links.email && (
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all hover:scale-110"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">{t("socialLabels.email")}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Links sections */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Shop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h4 className="font-display text-base sm:text-lg font-semibold">
                {t("shop.title")}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {t(`shop.${link.key}`)}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <h4 className="font-display text-base sm:text-lg font-semibold">
                {t("about.title")}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {t(`about.${link.key}`)}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter (optional future addition) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 sm:space-y-4 col-span-2 md:col-span-1"
            >
              <h4 className="font-display text-base sm:text-lg font-semibold">
                {t("stayUpdated.title")}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("stayUpdated.description")}
              </p>
            </motion.div>
          </div>
        </div>

        <Separator className="bg-foreground/10" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground font-mono-alt">
            &copy; {currentYear} {t("copyright")}
          </p>
          <p className="text-xs text-muted-foreground">{t("location")}</p>
        </motion.div>
      </div>
    </footer>
  );
}
