"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { RevealCard } from "@/components/ui/reveal-card";
import { type LucideIcon } from "lucide-react";

interface InteractiveSectionProps {
  icon: LucideIcon;
  title: string;
  content: string[];
  index: number;
}

export function InteractiveSection({
  icon: Icon,
  title,
  content,
  index,
}: InteractiveSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <RevealCard className="group">
        <div className="p-8 sm:p-10 md:p-12 space-y-6">
          {/* Icon and title */}
          <div className="flex items-start gap-5">
            <motion.div
              className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-foreground/70" />

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-foreground/5"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5 text-muted-foreground">
            {content.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + idx * 0.1,
                }}
                className="text-base sm:text-lg md:text-xl leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Decorative line */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            style={{ originX: 0 }}
          />
        </div>
      </RevealCard>
    </motion.div>
  );
}
