'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { X } from 'lucide-react'
import { SanityAnnouncement } from '@/sanity/lib'

interface AnnouncementBannerProps {
  announcements: SanityAnnouncement[]
}

export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visibleAnnouncements = announcements.filter(
    (announcement) => !dismissed.has(announcement._id)
  )

  if (visibleAnnouncements.length === 0) {
    return null
  }

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]))
  }

  return (
    <div className="relative">
      {visibleAnnouncements.map((announcement) => (
        <div
          key={announcement._id}
          className="bg-primary text-primary-foreground py-3 px-4 text-center text-sm relative"
        >
          <div className="container mx-auto flex items-center justify-center gap-4">
            <div className="flex-1 flex justify-center">
              <div className="portable-text-inline">
                <PortableText
                  value={announcement.content}
                  components={{
                    block: {
                      normal: ({ children }) => <span>{children}</span>,
                      h1: ({ children }) => (
                        <span className="font-bold text-base">{children}</span>
                      ),
                      h2: ({ children }) => (
                        <span className="font-semibold">{children}</span>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                      em: ({ children }) => <em>{children}</em>,
                      link: ({ value, children }) => (
                        <a
                          href={value?.href}
                          className="underline hover:no-underline"
                          target={value?.href?.startsWith('http') ? '_blank' : undefined}
                          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => handleDismiss(announcement._id)}
              className="hover:bg-primary-foreground/20 rounded p-1 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
