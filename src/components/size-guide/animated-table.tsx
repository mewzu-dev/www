"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SIZE_MEASUREMENTS } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function AnimatedTable() {
  const t = useTranslations("sizeGuide.table");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/50 backdrop-blur-sm"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="px-6 py-8 border-b border-foreground/10 bg-gradient-to-br from-muted/30 to-muted/10"
      >
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
          {t("title")}
        </h3>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <motion.tr
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-b border-foreground/10"
            >
              {[
                t("headers.size"),
                t("headers.chest"),
                t("headers.length"),
                t("headers.shoulder"),
                t("headers.sleeve"),
              ].map((header, idx) => (
                <th
                  key={header}
                  className="text-left py-5 px-6 font-display font-semibold text-base first:pl-8 last:pr-8"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                  >
                    {header}
                  </motion.div>
                </th>
              ))}
            </motion.tr>
          </thead>
          <tbody>
            {SIZE_MEASUREMENTS.map((measurement, index) => (
              <motion.tr
                key={measurement.size}
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "border-b border-foreground/5 transition-colors duration-300",
                  "hover:bg-gradient-to-r hover:from-foreground/5 hover:to-transparent",
                )}
              >
                <td className="py-5 px-6 first:pl-8">
                  <span className="font-mono-alt font-bold text-base">
                    {measurement.size}
                  </span>
                </td>
                <td className="py-5 px-6 text-muted-foreground">
                  {measurement.chest}
                </td>
                <td className="py-5 px-6 text-muted-foreground">
                  {measurement.length}
                </td>
                <td className="py-5 px-6 text-muted-foreground">
                  {measurement.shoulder}
                </td>
                <td className="py-5 px-6 last:pr-8 text-muted-foreground">
                  {measurement.sleeve}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--foreground), 0.05), transparent)",
        }}
      />
    </div>
  );
}
