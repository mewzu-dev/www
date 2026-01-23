import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(id|en)/:path*",
    // Skip Next.js internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
