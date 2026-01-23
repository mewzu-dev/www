"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function RevealCard({
  children,
  className = "",
  glowColor = "rgba(var(--foreground), 0.1)",
}: RevealCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion === true;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    reduceMotion ? ["0deg", "0deg"] : ["5deg", "-5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    reduceMotion ? ["0deg", "0deg"] : ["-5deg", "5deg"],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || reduceMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXPos = e.clientX - rect.left;
      const mouseYPos = e.clientY - rect.top;

      const xPct = (mouseXPos / width - 0.5) * 2;
      const yPct = (mouseYPos / height - 0.5) * 2;

      mouseX.set(xPct);
      mouseY.set(yPct);
    },
    [reduceMotion, mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-foreground/10 bg-background transition-colors duration-300",
        isHovered && "border-foreground/20",
        className,
      )}
    >
      {/* Gradient glow effect - Optimized with transform instead of position */}
      {!reduceMotion && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute -inset-[50%] opacity-50"
            style={{
              background: `radial-gradient(circle at center, ${glowColor}, transparent 40%)`,
              x: mouseXSpring,
              y: mouseYSpring,
            }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
