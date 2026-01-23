"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShineEffectProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function ShineEffect({
  children,
  className = "",
  duration = 1.5,
  delay = 0
}: ShineEffectProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div className={cn("relative overflow-hidden group", className)}>
      {children}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", rotate: -45 }}
        whileHover={{ x: "200%" }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          width: "50%",
        }}
      />
    </div>
  );
}
