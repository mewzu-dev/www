"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { debounce } from "@/lib/utils";

interface LayoutContextType {
  announcementHeight: number;
  headerHeight: number;
  setAnnouncementHeight: (height: number) => void;
  setHeaderHeight: (height: number) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [announcementHeight, setAnnouncementHeightState] = useState(0);
  const [headerHeight, setHeaderHeightState] = useState(80); // Better default
  const initialMeasurementDone = useRef(false);

  const setAnnouncementHeight = useCallback((height: number) => {
    setAnnouncementHeightState(height);
  }, []);

  const setHeaderHeight = useCallback((height: number) => {
    setHeaderHeightState(height);
  }, []);

  // Initial measurement after mount
  useEffect(() => {
    const measureInitial = () => {
      const banner = document.querySelector("[data-announcement-banner]");
      const header = document.querySelector("header");

      if (banner) {
        setAnnouncementHeightState(banner.clientHeight);
      }
      if (header) {
        setHeaderHeightState(header.clientHeight);
      }

      initialMeasurementDone.current = true;
    };

    // Multiple attempts to catch the correct height after render
    measureInitial();
    const timeout1 = setTimeout(measureInitial, 50);
    const timeout2 = setTimeout(measureInitial, 100);
    const timeout3 = setTimeout(measureInitial, 200);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  // Handle resize with debounce
  useEffect(() => {
    const handleResize = debounce(() => {
      const banner = document.querySelector("[data-announcement-banner]");
      const header = document.querySelector("header");
      if (banner) setAnnouncementHeightState(banner.clientHeight);
      if (header) setHeaderHeightState(header.clientHeight);
    }, 150);

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        announcementHeight,
        headerHeight,
        setAnnouncementHeight,
        setHeaderHeight,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
