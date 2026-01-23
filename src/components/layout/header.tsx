"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { navigationItems } from "@/lib/data/navigation";
import { MobileNav } from "./mobile-nav";
import { LanguageSwitcher } from "./language-switcher";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("common.nav");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo/logo-horizontal.jpg"
                alt="Mewzu"
                width={120}
                height={45}
                className="h-8 sm:h-10 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-foreground text-foreground/70 relative group"
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-foreground scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden"
          >
            <MobileNav />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
