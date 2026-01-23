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
  // Start with a reasonable default (typical header height)
  const [topOffset, setTopOffset] = useState(80);

  useEffect(() => {
    const updateTopOffset = () => {
      const banner = document.querySelector("[data-announcement-banner]");
      const header = document.querySelector("header");
      const bannerHeight = banner ? banner.clientHeight : 0;
      const headerHeight = header ? header.clientHeight : 0;
      const totalOffset = bannerHeight + headerHeight;

      // Add some breathing room (2rem = 32px)
      setTopOffset(totalOffset + 32);
    };

    // Multiple attempts to ensure we catch the correct height
    updateTopOffset();

    const timeout1 = setTimeout(updateTopOffset, 50);
    const timeout2 = setTimeout(updateTopOffset, 200);
    const timeout3 = setTimeout(updateTopOffset, 500);

    // Watch for DOM changes (announcement dismiss, etc.)
    const observer = new MutationObserver(updateTopOffset);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also watch for resize
    window.addEventListener("resize", updateTopOffset);
    window.addEventListener("scroll", updateTopOffset, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTopOffset);
      window.removeEventListener("scroll", updateTopOffset);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className={className} style={{ paddingTop: `${topOffset}px` }}>
      {children}
    </div>
  );
}
