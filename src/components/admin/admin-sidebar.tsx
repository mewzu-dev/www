"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Package, Megaphone, LogOut, Menu, Loader2 } from "lucide-react";

const navItems = [
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const signOutButton = (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start"
      onClick={handleSignOut}
      disabled={signingOut}
    >
      {signingOut ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {signingOut ? "Signing out..." : "Sign out"}
    </Button>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b bg-card p-3 md:hidden">
        <Link href="/admin" className="text-lg font-bold">
          Mewzu Admin
        </Link>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="text-left text-lg font-bold">
                Mewzu Admin
              </SheetTitle>
            </SheetHeader>
            <nav className="flex-1 p-3 space-y-1">
              <NavLinks
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </nav>
            <div className="border-t p-3 space-y-2">
              {email && (
                <p className="truncate px-3 text-xs text-muted-foreground">
                  {email}
                </p>
              )}
              {signOutButton}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-col border-r bg-card">
        <div className="border-b p-4">
          <Link href="/admin" className="text-lg font-bold">
            Mewzu Admin
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <NavLinks pathname={pathname} />
        </nav>
        <div className="border-t p-3 space-y-2">
          {email && (
            <p className="truncate px-3 text-xs text-muted-foreground">
              {email}
            </p>
          )}
          {signOutButton}
        </div>
      </aside>
    </>
  );
}
