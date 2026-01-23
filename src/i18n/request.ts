import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "id")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      common: (await import(`./locales/${locale}/common.ts`)).default,
      home: (await import(`./locales/${locale}/home.ts`)).default,
      products: (await import(`./locales/${locale}/products.ts`)).default,
      about: (await import(`./locales/${locale}/about.ts`)).default,
      contact: (await import(`./locales/${locale}/contact.ts`)).default,
      sizeGuide: (await import(`./locales/${locale}/size-guide.ts`)).default,
      shipping: (await import(`./locales/${locale}/shipping.ts`)).default,
    },
  };
});
