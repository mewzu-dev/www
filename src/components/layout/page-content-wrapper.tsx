"use client";

import { useLayout } from "./layout-context";

interface PageContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContentWrapper({
  children,
  className = "",
}: PageContentWrapperProps) {
  const { announcementHeight, headerHeight } = useLayout();
  // Add breathing room (2rem = 32px) for visual spacing
  const totalOffset = announcementHeight + headerHeight + 32;

  return (
    <div className={className} style={{ paddingTop: `${totalOffset}px` }}>
      {children}
    </div>
  );
}
