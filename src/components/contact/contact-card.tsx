"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  handle: string;
  link: string;
  external: boolean;
  index: number;
}

export function ContactCard({
  icon: Icon,
  title,
  description,
  handle,
  link,
  external,
  index,
}: ContactCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full rounded-3xl border border-foreground/10 bg-background/80 backdrop-blur-sm overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--foreground), 0.06), transparent 40%)",
          }}
        />

        <div className="relative p-8 sm:p-10 space-y-6">
          {/* Header with icon and arrow */}
          <div className="flex items-start justify-between">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center relative"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className="w-8 h-8 text-foreground/70 relative z-10" />

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-foreground/10"
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.div
              animate={{
                x: isHovered ? 5 : 0,
                y: isHovered ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-display font-bold">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full group-hover:bg-foreground/5 group-hover:border-foreground/20 transition-all duration-300"
            size="lg"
          >
            <a
              href={link}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <span className="font-medium">{handle}</span>
            </a>
          </Button>

          {/* Decorative gradient line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            style={{ originX: 0 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
