"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Announcement } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SEEN_KEY = "mewzu_seen_modals";

function getSeenIds(): Set<string> {
  try {
    const stored = sessionStorage.getItem(SEEN_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function markAsSeen(ids: string[]) {
  try {
    const current = getSeenIds();
    ids.forEach((id) => current.add(id));
    sessionStorage.setItem(SEEN_KEY, JSON.stringify([...current]));
  } catch {
    // sessionStorage unavailable
  }
}

interface AnnouncementModalProps {
  announcements: Announcement[];
}

export function AnnouncementModal({ announcements }: AnnouncementModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [unseenAnnouncements, setUnseenAnnouncements] = useState<Announcement[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (announcements.length === 0) return;

    const seen = getSeenIds();
    const unseen = announcements.filter((a) => !seen.has(a.id));
    if (unseen.length === 0) return;

    setUnseenAnnouncements(unseen);
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [announcements]);

  if (unseenAnnouncements.length === 0) {
    return null;
  }

  const currentAnnouncement = unseenAnnouncements[currentIndex];

  const handleNext = () => {
    if (currentIndex < unseenAnnouncements.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    // Mark all as seen so they don't reappear this session
    markAsSeen(unseenAnnouncements.map((a) => a.id));
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
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-2xl overflow-hidden border-2">
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
            <div
              className="prose prose-sm max-w-none dark:prose-invert py-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 [&_a]:text-primary [&_a]:font-medium hover:[&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{
                __html: currentAnnouncement.content,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {unseenAnnouncements.length > 1 && (
          <div className="flex items-center justify-between pt-6 border-t mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {currentIndex + 1} of {unseenAnnouncements.length}
              </span>

              <div className="flex gap-1.5 ml-2">
                {unseenAnnouncements.map((_, idx) => (
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
                {currentIndex < unseenAnnouncements.length - 1 ? (
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
