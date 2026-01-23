"use client";

import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { X, ChevronRight } from "lucide-react";
import { SanityAnnouncement } from "@/sanity/lib";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface AnnouncementBannerProps {
  announcements: SanityAnnouncement[];
}

export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const visibleAnnouncements = announcements.filter(
    (announcement) => !dismissed.has(announcement._id),
  );

  // Show banner after mount (prevents hydration mismatch)
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate announcements if multiple
  useEffect(() => {
    if (visibleAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
    }, 6000); // 6 seconds per announcement

    return () => clearInterval(interval);
  }, [visibleAnnouncements.length]);

  if (visibleAnnouncements.length === 0 || !isVisible) {
    return null;
  }

  const currentAnnouncement = visibleAnnouncements[currentIndex];

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
    // Reset index if needed
    if (currentIndex >= visibleAnnouncements.length - 1) {
      setCurrentIndex(0);
    }
  };

  const bannerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        duration: 0.6,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    enter: {
      x: 20,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Simplified animations for reduced motion preference
  const reducedMotionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const reducedContentVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="announcement-banner-wrapper"
        variants={shouldReduceMotion ? reducedMotionVariants : bannerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 left-0 right-0 z-[60] will-change-transform"
        data-announcement-banner
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary">
          {/* Animated gradient overlay for shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />

          {/* Content */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentAnnouncement._id}
                variants={
                  shouldReduceMotion ? reducedContentVariants : contentVariants
                }
                initial="enter"
                animate="center"
                exit="exit"
                className="py-3 px-4 text-center text-sm"
              >
                <div className="container mx-auto flex items-center justify-between gap-4">
                  {/* Progress indicators (if multiple announcements) */}
                  {visibleAnnouncements.length > 1 && (
                    <div className="hidden sm:flex items-center gap-1.5 min-w-[80px]">
                      {visibleAnnouncements.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className="group relative h-1.5 flex-1 rounded-full bg-primary-foreground/20 overflow-hidden"
                          aria-label={`Go to announcement ${idx + 1}`}
                        >
                          {idx === currentIndex && (
                            <motion.div
                              className="absolute inset-0 bg-primary-foreground rounded-full"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 6, ease: "linear" }}
                              style={{
                                transformOrigin: "left",
                                willChange: "transform",
                              }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Spacer for mobile */}
                  <div className="sm:hidden min-w-[20px]" />

                  {/* Announcement content */}
                  <div className="flex-1 flex justify-center items-center gap-2 text-primary-foreground">
                    <div className="portable-text-inline">
                      <PortableText
                        value={currentAnnouncement.content}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <span className="inline-block">{children}</span>
                            ),
                            h1: ({ children }) => (
                              <span className="font-bold text-base inline-block">
                                {children}
                              </span>
                            ),
                            h2: ({ children }) => (
                              <span className="font-semibold inline-block">
                                {children}
                              </span>
                            ),
                          },
                          marks: {
                            strong: ({ children }) => (
                              <strong className="font-bold">{children}</strong>
                            ),
                            em: ({ children }) => <em>{children}</em>,
                            link: ({ value, children }) => (
                              <a
                                href={value?.href}
                                className="inline-flex items-center gap-1 underline decoration-primary-foreground/40 underline-offset-2 hover:decoration-primary-foreground transition-colors group/link"
                                target={
                                  value?.href?.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  value?.href?.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {children}
                                <ChevronRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                              </a>
                            ),
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Dismiss button */}
                  <motion.button
                    onClick={() => handleDismiss(currentAnnouncement._id)}
                    className="group relative flex-shrink-0 hover:bg-primary-foreground/20 rounded-md p-1.5 transition-colors"
                    aria-label="Dismiss announcement"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-4 w-4 text-primary-foreground transition-transform group-hover:rotate-90" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom shine effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}
