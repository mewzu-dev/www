"use client";

import { useLayout } from "./layout-context";
import { useEffect, useState } from "react";

interface PageContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContentWrapper({
  children,
  className = "",
}: PageContentWrapperProps) {
  const { announcementHeight, headerHeight } = useLayout();
  const [isReady, setIsReady] = useState(false);

  // Wait a bit for layout to settle before showing content
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate total offset with breathing room
  // Add extra space for mobile to ensure no overlap
  const baseOffset = announcementHeight + headerHeight;
  const breathingRoom = 32; // 2rem
  const topOffset = baseOffset + breathingRoom;

  return (
    <div
      className={className}
      style={{
        paddingTop: `${topOffset}px`,
        minHeight: isReady ? "auto" : "100vh", // Prevent flash
      }}
    >
      {children}
    </div>
  );
}
