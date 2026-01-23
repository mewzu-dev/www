"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MorphingBackgroundProps {
  colors?: string[];
  className?: string;
}

export function MorphingBackground({
  colors = ["bg-brand-blue/10", "bg-brand-orange/10", "bg-brand-green/10"],
  className = "",
}: MorphingBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion === true;

  // If reduced motion is preferred, use static blobs
  if (reduceMotion) {
    return (
      <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
        <div
          className={`absolute w-[500px] h-[500px] ${colors[0]} rounded-full blur-3xl`}
          style={{ left: "20%", top: "10%" }}
        />
        <div
          className={`absolute w-[600px] h-[600px] ${colors[1]} rounded-full blur-3xl`}
          style={{ left: "70%", top: "60%" }}
        />
        <div
          className={`absolute w-[400px] h-[400px] ${colors[2]} rounded-full blur-3xl`}
          style={{ left: "50%", top: "80%" }}
        />
      </div>
    );
  }

  // Optimized animation: fewer keyframes, longer duration, GPU-accelerated transforms only
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Blob 1 - Simplified animation */}
      <motion.div
        className={`absolute w-[500px] h-[500px] ${colors[0]} rounded-full blur-3xl`}
        style={{
          left: "20%",
          top: "10%",
        }}
        animate={{
          x: ["0%", "60%", "0%"],
          y: ["0%", "60%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
      />

      {/* Blob 2 - Simplified animation with delay */}
      <motion.div
        className={`absolute w-[600px] h-[600px] ${colors[1]} rounded-full blur-3xl`}
        style={{
          left: "70%",
          top: "60%",
        }}
        animate={{
          x: ["0%", "-60%", "0%"],
          y: ["0%", "-40%", "0%"],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
          repeatType: "loop",
        }}
      />

      {/* Blob 3 - Simplified animation with different delay */}
      <motion.div
        className={`absolute w-[400px] h-[400px] ${colors[2]} rounded-full blur-3xl`}
        style={{
          left: "50%",
          top: "80%",
        }}
        animate={{
          x: ["0%", "-20%", "0%"],
          y: ["0%", "-70%", "0%"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
          repeatType: "loop",
        }}
      />
    </div>
  );
}
