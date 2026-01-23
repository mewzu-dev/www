import { ExternalLink as ExternalLinkIcon, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ExternalLink } from '@/types'

interface ExternalLinksProps {
  links: ExternalLink[]
}

const platformNames: Record<string, string> = {
  shopee: 'Shopee',
  tiktok: 'TikTok Shop',
  whatsapp: 'WhatsApp',
}

export function ExternalLinks({ links }: ExternalLinksProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Buy Now</h3>
      <div className="grid gap-3">
        {links.map((link) => (
          <div key={link.platform} className="flex items-center gap-3">
            <Button
              asChild
              disabled={!link.available}
              className="flex-1"
              variant={link.available ? 'default' : 'secondary'}
            >
              <a
                href={link.available ? link.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                {platformNames[link.platform] || link.platform}
                {link.available && <ExternalLinkIcon className="h-3 w-3" />}
              </a>
            </Button>
            {!link.available && (
              <Badge variant="outline" className="text-xs">
                Coming Soon
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
