"use client";

import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SanityAnnouncement } from "@/sanity/lib";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementModalProps {
  announcements: SanityAnnouncement[];
}

export function AnnouncementModal({ announcements }: AnnouncementModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (announcements.length > 0) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500); // Slightly longer delay for better UX
      return () => clearTimeout(timer);
    }
  }, [announcements.length]);

  if (announcements.length === 0) {
    return null;
  }

  const currentAnnouncement = announcements[currentIndex];

  const handleNext = () => {
    if (currentIndex < announcements.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setOpen(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(0);
  };

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    }),
  };

  const reducedMotionVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const [direction, setDirection] = useState(0);

  const handleNextWithDirection = () => {
    setDirection(1);
    handleNext();
  };

  const handlePreviousWithDirection = () => {
    setDirection(-1);
    handlePrevious();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl overflow-hidden border-2">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            {currentAnnouncement.title}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={
              shouldReduceMotion ? reducedMotionVariants : contentVariants
            }
            initial="enter"
            animate="center"
            exit="exit"
            className="relative"
          >
            <div className="prose prose-sm max-w-none dark:prose-invert py-4">
              <PortableText
                value={currentAnnouncement.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 leading-relaxed">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mb-3">{children}</h2>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold text-foreground">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => <em>{children}</em>,
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2 font-medium group"
                        target={
                          value?.href?.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          value?.href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {children}
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    ),
                  },
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation footer */}
        {announcements.length > 1 && (
          <div className="flex items-center justify-between pt-6 border-t mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {currentIndex + 1} of {announcements.length}
              </span>

              {/* Progress dots */}
              <div className="flex gap-1.5 ml-2">
                {announcements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className="group relative"
                    aria-label={`Go to announcement ${idx + 1}`}
                  >
                    <motion.div
                      className={`h-2 w-2 rounded-full transition-colors ${
                        idx === currentIndex
                          ? "bg-primary"
                          : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                      }`}
                      animate={
                        idx === currentIndex
                          ? {
                              scale: [1, 1.2, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentIndex > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousWithDirection}
                  className="text-sm"
                >
                  Previous
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNextWithDirection}
                className="text-sm group"
              >
                {currentIndex < announcements.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </>
                ) : (
                  "Close"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
