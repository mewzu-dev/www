"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MorphingBackgroundProps {
  colors?: string[];
  className?: string;
}

export function MorphingBackground({
  colors = ["bg-brand-blue/10", "bg-brand-orange/10", "bg-brand-green/10"],
  className = "",
}: MorphingBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Blob 1 */}
      <motion.div
        className={`absolute w-[500px] h-[500px] ${colors[0]} rounded-full blur-3xl`}
        initial={{ x: "20%", y: "10%" }}
        animate={{
          x: ["20%", "80%", "20%"],
          y: ["10%", "70%", "10%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className={`absolute w-[600px] h-[600px] ${colors[1]} rounded-full blur-3xl`}
        initial={{ x: "70%", y: "60%" }}
        animate={{
          x: ["70%", "10%", "70%"],
          y: ["60%", "20%", "60%"],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className={`absolute w-[400px] h-[400px] ${colors[2]} rounded-full blur-3xl`}
        initial={{ x: "50%", y: "80%" }}
        animate={{
          x: ["50%", "30%", "50%"],
          y: ["80%", "10%", "80%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
