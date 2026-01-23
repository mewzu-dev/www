'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: 'en' | 'id') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 border border-foreground/10 rounded-full p-1">
      <button
        onClick={() => handleLocaleChange('id')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          locale === 'id'
            ? 'bg-foreground text-background'
            : 'text-foreground/70 hover:text-foreground'
        }`}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>
      <button
        onClick={() => handleLocaleChange('en')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          locale === 'en'
            ? 'bg-foreground text-background'
            : 'text-foreground/70 hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
