"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MagneticCard } from "@/components/ui/magnetic-card";
import { type LucideIcon } from "lucide-react";

interface MeasurementGuideCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function MeasurementGuideCard({
  icon: Icon,
  title,
  description,
  index,
}: MeasurementGuideCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <MagneticCard
        className="h-full rounded-3xl border border-foreground/10 bg-background/80 backdrop-blur-sm overflow-hidden group"
        intensity={0.2}
        scale={1.03}
      >
        <div className="p-8 space-y-5 relative">
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />

          {/* Icon container */}
          <motion.div
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center group/icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon className="w-7 h-7 text-foreground/70 relative z-10" />

            {/* Single pulse on hover only */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-foreground/10 opacity-0 group-hover/icon:opacity-100"
              whileHover={{
                scale: [1, 1.3],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative space-y-3">
            <h4 className="font-display font-bold text-xl">{title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="h-1 bg-gradient-to-r from-foreground/20 to-transparent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            style={{ originX: 0 }}
          />
        </div>
      </MagneticCard>
    </motion.div>
  );
}
