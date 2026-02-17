import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes: handle Supabase auth, skip i18n
  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  // All other routes: handle i18n
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(id|en)/:path*",
    "/admin/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
