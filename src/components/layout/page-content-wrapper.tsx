"use client";

import { useEffect, useState } from "react";

interface PageContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContentWrapper({
  children,
  className = "",
}: PageContentWrapperProps) {
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const updateTopOffset = () => {
      const banner = document.querySelector("[data-announcement-banner]");
      const header = document.querySelector("header");
      const bannerHeight = banner ? banner.clientHeight : 0;
      const headerHeight = header ? header.clientHeight : 0;
      setTopOffset(bannerHeight + headerHeight);
    };

    // Initial calculation
    updateTopOffset();

    // Watch for DOM changes (announcement dismiss, etc.)
    const observer = new MutationObserver(updateTopOffset);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also watch for resize
    window.addEventListener("resize", updateTopOffset);

    // Small delay to ensure everything is rendered
    const timeout = setTimeout(updateTopOffset, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTopOffset);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={className} style={{ paddingTop: `${topOffset}px` }}>
      {children}
    </div>
  );
}
