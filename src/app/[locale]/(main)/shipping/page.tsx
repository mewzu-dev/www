"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Truck, RotateCcw, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageContentWrapper } from "@/components/layout/page-content-wrapper";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ShippingPage() {
  const t = useTranslations("shipping");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const highlights = [
    {
      icon: Truck,
      title: t("highlights.fastShipping.title"),
      description: t("highlights.fastShipping.description"),
    },
    {
      icon: Package,
      title: t("highlights.securePackaging.title"),
      description: t("highlights.securePackaging.description"),
    },
    {
      icon: RotateCcw,
      title: t("highlights.easyReturns.title"),
      description: t("highlights.easyReturns.description"),
    },
  ];

  return (
    <PageContentWrapper className="min-h-screen pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-16">
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

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center border-foreground/10 hover:border-foreground/20 transition-all group h-full">
                  <CardHeader className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-foreground/5 group-hover:bg-foreground/10 flex items-center justify-center transition-colors">
                      <highlight.icon className="h-8 w-8 text-foreground/70" />
                    </div>
                    <CardTitle className="text-xl font-display">
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">
                    {t("processing.title")}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t("processing.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("processing.content")}{" "}
                    <span className="text-foreground font-semibold">
                      {t("processing.timeframe")}
                    </span>{" "}
                    {t("processing.after")}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("processing.tracking")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">
                    {t("delivery.title")}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t("delivery.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-lg">
                      {t("delivery.standard.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("delivery.standard.description")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("delivery.standard.cost")}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-lg">
                      {t("delivery.express.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("delivery.express.description")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("delivery.express.cost")}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-foreground/10">
                    {t("delivery.note")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">
                    {t("returns.title")}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t("returns.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("returns.intro")}{" "}
                    <span className="text-foreground font-semibold">
                      {t("returns.timeframe")}
                    </span>{" "}
                    {t("returns.introEnd")}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-lg">
                      {t("returns.conditions.title")}
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {(t.raw("returns.conditions.items") as string[]).map(
                        (item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-foreground mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-lg">
                      {t("returns.howTo.title")}
                    </h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {(t.raw("returns.howTo.steps") as string[]).map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="font-mono-alt text-foreground font-semibold min-w-[20px]">
                              {idx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ),
                      )}
                    </ol>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-foreground/10">
                    <span className="text-foreground font-semibold">
                      {t("returns.noteLabel")}
                    </span>{" "}
                    {t("returns.note")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-display flex items-center gap-3">
                    <Shield className="h-6 w-6" />
                    {t("issues.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("issues.intro")}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-lg">
                      {t("issues.resolve.title")}
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {(t.raw("issues.resolve.items") as string[]).map(
                        (item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-foreground mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-foreground/10">
                    {t("issues.note")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-muted/30 border-foreground/10">
              <CardContent className="pt-8 pb-8 text-center">
                <p className="text-base text-muted-foreground">
                  {t("cta.question")}{" "}
                  <Link
                    href="/contact"
                    className="text-foreground font-medium underline hover:no-underline transition-all"
                  >
                    {t("cta.link")}
                  </Link>{" "}
                  {t("cta.suffix")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageContentWrapper>
  );
}
