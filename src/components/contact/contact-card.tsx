"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking for glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

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
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Advanced glow effect following cursor - GPU accelerated */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(var(--foreground), 0.08), transparent 50%)`,
            willChange: "background",
          }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={false}
          animate={
            isHovered
              ? {
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }
              : {}
          }
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            background:
              "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%)",
            backgroundSize: "200% 100%",
          }}
        />

        <div className="relative p-8 sm:p-10 space-y-6">
          {/* Header with icon and arrow */}
          <div className="flex items-start justify-between">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center relative overflow-hidden"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: {
                  rotate: { duration: 0.5, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 400, damping: 17 },
                },
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={
                  isHovered
                    ? {
                        background: [
                          "linear-gradient(45deg, rgba(var(--foreground), 0.05), rgba(var(--foreground), 0.15))",
                          "linear-gradient(225deg, rgba(var(--foreground), 0.05), rgba(var(--foreground), 0.15))",
                          "linear-gradient(45deg, rgba(var(--foreground), 0.05), rgba(var(--foreground), 0.15))",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="relative z-10"
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <Icon className="w-8 h-8 text-foreground/70" />
              </motion.div>

              {/* Multiple pulse rings */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-foreground/20"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                      scale: 1.8,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-foreground/20"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                      scale: 1.8,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.5,
                      repeat: Infinity,
                    }}
                  />
                </>
              )}
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
