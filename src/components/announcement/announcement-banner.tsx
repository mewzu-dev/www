"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import DOMPurify from "dompurify";
import type { Announcement } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLayout } from "@/components/layout/layout-context";

const DISMISSED_KEY = "mewzu_dismissed_banners";

function getDismissedIds(): Set<string> {
  try {
    const stored = localStorage.getItem(DISMISSED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function persistDismissedIds(ids: Set<string>) {
  try {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable
  }
}

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { setAnnouncementHeight } = useLayout();
  const bannerRef = useRef<HTMLDivElement>(null);

  // Load persisted dismissed state on mount
  useEffect(() => {
    setDismissed(getDismissedIds());
    setIsVisible(true);
  }, []);

  const visibleAnnouncements = announcements.filter(
    (announcement) => !dismissed.has(announcement.id),
  );

  // Update layout context when banner height changes or when dismissed
  useEffect(() => {
    const updateHeight = () => {
      if (bannerRef.current && visibleAnnouncements.length > 0) {
        const height = bannerRef.current.clientHeight;
        setAnnouncementHeight(height);
      } else {
        setAnnouncementHeight(0);
      }
    };

    updateHeight();
    const timeout1 = setTimeout(updateHeight, 50);
    const timeout2 = setTimeout(updateHeight, 200);
    const timeout3 = setTimeout(updateHeight, 400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [visibleAnnouncements.length, setAnnouncementHeight, isVisible]);

  // Auto-rotate announcements if multiple
  useEffect(() => {
    if (visibleAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [visibleAnnouncements.length]);

  if (visibleAnnouncements.length === 0 || !isVisible) {
    return null;
  }

  const currentAnnouncement = visibleAnnouncements[currentIndex];

  const handleDismiss = (id: string) => {
    const updated = new Set([...dismissed, id]);
    setDismissed(updated);
    persistDismissedIds(updated);
    if (currentIndex >= visibleAnnouncements.length - 1) {
      setCurrentIndex(0);
    }
  };

  const bannerVariants = {
    hidden: { y: -100, opacity: 0, scale: 0.95 },
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
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    enter: { x: 20, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { x: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

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
        ref={bannerRef}
        key="announcement-banner-wrapper"
        variants={shouldReduceMotion ? reducedMotionVariants : bannerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 left-0 right-0 z-[60]"
        data-announcement-banner
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary">
          {!shouldReduceMotion && (
            <div className="absolute inset-0 shimmer-effect" />
          )}

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentAnnouncement.id}
                variants={
                  shouldReduceMotion ? reducedContentVariants : contentVariants
                }
                initial="enter"
                animate="center"
                exit="exit"
                className="py-3 px-4 text-center text-sm"
              >
                <div className="container mx-auto flex items-center justify-between gap-4">
                  {visibleAnnouncements.length > 1 && (
                    <div className="hidden sm:flex items-center gap-1.5 min-w-[80px]">
                      {visibleAnnouncements.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className="group relative h-1.5 flex-1 rounded-full bg-primary-foreground/20 overflow-hidden"
                          aria-label={`Go to announcement ${idx + 1}`}
                        >
                          {idx === currentIndex && !shouldReduceMotion && (
                            <motion.div
                              className="absolute inset-0 bg-primary-foreground rounded-full"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 6, ease: "linear" }}
                              style={{ transformOrigin: "left" }}
                            />
                          )}
                          {idx === currentIndex && shouldReduceMotion && (
                            <div className="absolute inset-0 bg-primary-foreground rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="sm:hidden min-w-[20px]" />

                  <div className="flex-1 flex justify-center items-center gap-2 text-primary-foreground">
                    <div
                      className="announcement-banner-content [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 [&_a]:underline [&_a]:decoration-primary-foreground/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-primary-foreground [&_a]:transition-colors [&_p]:inline [&_h1]:font-bold [&_h1]:text-base [&_h1]:inline [&_h2]:font-semibold [&_h2]:inline"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(currentAnnouncement.content),
                      }}
                    />
                  </div>

                  <motion.button
                    onClick={() => handleDismiss(currentAnnouncement.id)}
                    className="group relative flex-shrink-0 hover:bg-primary-foreground/20 rounded-md p-1.5 transition-colors"
                    aria-label="Dismiss announcement"
                    whileHover={
                      !shouldReduceMotion ? { scale: 1.1 } : undefined
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-4 w-4 text-primary-foreground transition-transform group-hover:rotate-90" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}
