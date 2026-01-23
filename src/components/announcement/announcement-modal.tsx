'use client'

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SanityAnnouncement } from '@/sanity/lib'

interface AnnouncementModalProps {
  announcements: SanityAnnouncement[]
}

export function AnnouncementModal({ announcements }: AnnouncementModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (announcements.length > 0) {
      const timer = setTimeout(() => {
        setOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [announcements.length])

  if (announcements.length === 0) {
    return null
  }

  const currentAnnouncement = announcements[currentIndex]

  const handleNext = () => {
    if (currentIndex < announcements.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setOpen(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentIndex(0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{currentAnnouncement.title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <PortableText
            value={currentAnnouncement.content}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-4">{children}</p>,
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mb-3">{children}</h2>
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
                    className="text-primary hover:underline"
                    target={value?.href?.startsWith('http') ? '_blank' : undefined}
                    rel={
                      value?.href?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
        {announcements.length > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {announcements.length}
            </span>
            <button
              onClick={handleNext}
              className="text-sm font-medium text-primary hover:underline"
            >
              {currentIndex < announcements.length - 1 ? 'Next' : 'Close'}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
