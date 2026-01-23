# Developer Reference

Technical documentation for developers working on the Mewzu project.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Data Flow](#data-flow)
4. [Logo & Brand Assets](#logo--brand-assets)
5. [Sanity CMS Deep Dive](#sanity-cms-deep-dive)
6. [Migration Guide](#migration-guide)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Configuration](#advanced-configuration)

---

## Architecture Overview

### Tech Stack

```
Frontend:     Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
CMS:          Sanity.io (Headless CMS)
UI Library:   shadcn/ui (copy-paste components)
Icons:        lucide-react
Deployment:   Vercel (recommended) or any Node.js host
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User Request                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js App (src/app)                           │
│  • Server Components (default)                               │
│  • Client Components (use client)                            │
│  • ISR Caching (60 seconds)                                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│         Sanity Client (src/sanity/lib.ts)                    │
│  • GROQ Queries                                              │
│  • Image URL Builder                                         │
│  • Type-safe data fetching                                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Sanity API (Cloud)                              │
│  • Content Storage                                           │
│  • Image CDN                                                 │
│  • Version History                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│        Sanity Studio (/admin route)                          │
│  • Embedded in Next.js app                                   │
│  • Requires authentication                                   │
│  • Real-time preview                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

### Directory Layout

```
/src
  /app
    /admin
      /[[...index]]
        layout.tsx      # Studio-specific layout
        page.tsx        # Sanity Studio embed
    /products
      /[slug]
        page.tsx        # Dynamic product detail page
      page.tsx          # Products listing page
    layout.tsx          # Root layout (with announcements)
    page.tsx            # Homepage (featured products)
    globals.css         # Tailwind v4 imports + CSS variables
    
  /components
    /announcement       # Announcement system
      announcements.tsx         # Main wrapper component
      announcement-banner.tsx   # Banner component
      announcement-modal.tsx    # Modal component
    /home
      featured-products.tsx     # Homepage featured products
      hero.tsx                  # Hero section
    /layout
      footer.tsx        # Site footer with logo
      header.tsx        # Site header with navigation
    /products
      product-card.tsx  # Product card component
      product-grid.tsx  # Product grid layout
    /ui                 # shadcn/ui components
      button.tsx
      card.tsx
      dialog.tsx
      ...
      
  /lib
    /data
      site-config.ts    # Site metadata and config
    utils.ts            # Utility functions (cn, etc.)
    
  /sanity
    /schemas
      announcement.ts   # Announcement schema
      index.ts          # Schema exports
      product.ts        # Product schema
    client.ts           # Sanity client config
    image.ts            # Image URL builder
    lib.ts              # Data fetching functions
    queries.ts          # GROQ queries
    
  /types
    index.ts            # Shared TypeScript types
    
/public
  /logo
    logo-horizontal.jpg  (1600x606px)  # Header navigation
    logo-icon.jpg        (1600x1600px) # Footer, favicon
    logo-square.jpg      (1600x1600px) # Social media OG
    logo-vertical.jpg    (632x1600px)  # Available for future use
  favicon.ico
  apple-touch-icon.png
```

---

## Data Flow

### Content Creation Flow

```
1. Business User → Sanity Studio (/admin)
   - Creates/edits product
   - Uploads images
   - Clicks "Publish"
   
2. Sanity API (Cloud)
   - Stores content in dataset
   - Optimizes and stores images on CDN
   - Maintains version history
   
3. Next.js ISR
   - Fetches data via Sanity client
   - Regenerates page every 60 seconds
   - Serves cached version to users
   
4. User Views Website
   - Sees updated content (within 60s)
   - Images served from Sanity CDN
   - Optimized by Next.js Image component
```

### Caching Strategy

**Incremental Static Regeneration (ISR)**:
- Pages statically generated at build time
- Revalidated every 60 seconds when accessed
- Balance between performance and freshness

```typescript
// In page components
export const revalidate = 60 // seconds
```

**Why 60 seconds?**
- Fast enough for content updates
- Reduces API calls (cost savings)
- Good balance for e-commerce site

---

## Logo & Brand Assets

### Logo File Specifications

| File | Dimensions | Usage | Location |
|------|------------|-------|----------|
| `logo-horizontal.jpg` | 1600x606px | Header navigation | `/public/logo/` |
| `logo-icon.jpg` | 1600x1600px | Footer, favicon, app icon | `/public/logo/` |
| `logo-square.jpg` | 1600x1600px | Social media OG image | `/public/logo/` |
| `logo-vertical.jpg` | 632x1600px | Available for future use | `/public/logo/` |

### Implementation

#### Header Logo
**Location**: `src/components/layout/header.tsx`

```typescript
<Image
  src="/logo/logo-horizontal.jpg"
  alt="Mewzu"
  width={120}
  height={45}
  priority // Optimizes LCP
  className="h-10 w-auto"
/>
```

#### Footer Logo
**Location**: `src/components/layout/footer.tsx`

```typescript
<Image
  src="/logo/logo-icon.jpg"
  alt="Mewzu"
  width={80}
  height={80}
  className="rounded-lg"
/>
```

#### Favicon & App Icons
- `favicon.ico` - Browser tab icon (uses logo-icon)
- `apple-touch-icon.png` - iOS home screen icon

#### Social Media / SEO
**Location**: `src/lib/data/site-config.ts`

```typescript
export const siteConfig = {
  // ...
  ogImage: '/logo/logo-square.jpg',
}
```

### Logo Optimization Recommendations

Current format is JPG. Consider creating:

1. **WebP/AVIF** versions for better compression
2. **SVG** version for crisp display at any size
3. **ICO** format for favicon (16x16, 32x32, 48x48)
4. **PNG** versions with transparent backgrounds
5. **Dark mode variants** if needed

---

## Sanity CMS Deep Dive

### Schemas

#### Product Schema
**Location**: `src/sanity/schemas/product.ts`

```typescript
export const product = defineType({
  name: 'product',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', required },
    { name: 'slug', type: 'slug', required },
    { name: 'tagline', type: 'string', required },
    { name: 'description', type: 'text', required },
    { name: 'scene', type: 'string', required },
    { name: 'story', type: 'text', required },
    { name: 'baseColor', type: 'string', required },
    { name: 'artColor', type: 'string', required },
    { name: 'sizes', type: 'array', of: [{ type: 'string' }] },
    { name: 'images', type: 'array', of: [productImage] },
    { name: 'featured', type: 'boolean', default: false },
    { name: 'externalLinks', type: 'array', of: [externalLink] },
  ],
})
```

#### Announcement Schema
**Location**: `src/sanity/schemas/announcement.ts`

```typescript
export const announcement = defineType({
  name: 'announcement',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required },
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
    { name: 'type', type: 'string', options: ['banner', 'modal'] },
    { name: 'startDate', type: 'datetime' },
    { name: 'endDate', type: 'datetime' },
    { name: 'targetPages', type: 'array', of: [{ type: 'string' }] },
    { name: 'priority', type: 'number', default: 0 },
    { name: 'active', type: 'boolean', default: true },
  ],
})
```

### GROQ Queries

**Location**: `src/sanity/queries.ts`

```typescript
// Featured products for homepage
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(_createdAt desc) {
    _id, name, slug, tagline, baseColor, artColor,
    "image": images[0].image.asset->url
  }
`

// All products
export const PRODUCTS_QUERY = `
  *[_type == "product"] | order(_createdAt desc) {
    _id, name, slug, tagline, baseColor, artColor,
    "image": images[0].image.asset->url
  }
`

// Single product by slug
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id, name, slug, tagline, description, scene, story,
    baseColor, artColor, sizes, featured,
    images[] { image, altText, viewType },
    externalLinks[] { platform, url, available }
  }
`

// Active announcements
export const ANNOUNCEMENTS_QUERY = `
  *[_type == "announcement" && active == true &&
    (!defined(startDate) || startDate <= now()) &&
    (!defined(endDate) || endDate >= now())] | order(priority desc) {
    _id, title, content, type, targetPages, priority
  }
`
```

### Data Fetching

**Location**: `src/sanity/lib.ts`

```typescript
import { client } from './client'
import { FEATURED_PRODUCTS_QUERY } from './queries'

export async function getFeaturedProducts() {
  return client.fetch(FEATURED_PRODUCTS_QUERY, {}, {
    next: { revalidate: 60 } // ISR
  })
}
```

### Image Handling

**Location**: `src/sanity/image.ts`

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in components
<Image
  src={urlFor(product.image).width(800).height(800).url()}
  alt={product.name}
/>
```

---

## Migration Guide

### Migrating Existing Products to Sanity

If you have hardcoded products (e.g., in `src/lib/data/products.ts`), follow these steps:

#### Manual Migration (Recommended)

For each existing product:

1. Open Sanity Studio at `/admin`
2. Click **Product** → **Create new**
3. Transfer data field by field:
   - Copy name, tagline, description
   - Generate slug from name
   - Enter colors and sizes
   - Upload product images
   - Set featured status
4. Click **Publish**

#### Programmatic Migration

Create `scripts/migrate-products.js`:

```javascript
const { createClient } = require('@sanity/client')
const products = require('../src/lib/data/products')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

async function migrateProducts() {
  for (const product of products.products) {
    const doc = {
      _type: 'product',
      name: product.name,
      slug: { _type: 'slug', current: product.slug },
      tagline: product.tagline,
      description: product.description,
      scene: product.scene,
      story: product.story,
      baseColor: product.baseColor,
      artColor: product.artColor,
      sizes: product.sizes,
      featured: product.featured,
      externalLinks: product.externalLinks || [],
    }

    try {
      await client.create(doc)
      console.log(`✓ Migrated: ${product.name}`)
    } catch (error) {
      console.error(`✗ Error migrating ${product.name}:`, error)
    }
  }
}

migrateProducts()
```

Run with: `node scripts/migrate-products.js`

**Note**: Images must be uploaded manually through the Studio.

#### After Migration

1. Verify all products appear on the website
2. Check image loading and links
3. Test product detail pages
4. Delete or archive old hardcoded data files

---

## Performance Optimization

### Current Optimizations

1. **ISR (Incremental Static Regeneration)**
   - 60-second revalidation
   - Static generation at build time
   - Reduces server load

2. **Next.js Image Component**
   - Automatic lazy loading
   - WebP/AVIF format conversion
   - Responsive images
   - Blur placeholder

3. **Sanity CDN**
   - Global image delivery
   - Automatic optimization
   - Transform images on-the-fly

4. **Priority Loading**
   - Hero images loaded with `priority` prop
   - Header logo loaded immediately (LCP)

### Lighthouse Scores Target

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Further Optimizations

Consider implementing:

1. **Font Optimization**
   ```typescript
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'] })
   ```

2. **Code Splitting**
   ```typescript
   const Modal = dynamic(() => import('@/components/modal'))
   ```

3. **Prefetching**
   ```typescript
   <Link href="/products" prefetch>Products</Link>
   ```

4. **Bundle Analysis**
   ```bash
   npm install @next/bundle-analyzer
   ```

---

## Troubleshooting

### Common Issues

#### 1. Changes Not Showing on Website

**Symptoms**: Published changes in Studio don't appear on site

**Solutions**:
- Wait 60 seconds (ISR revalidation)
- Clear browser cache (Ctrl+F5 / Cmd+Shift+R)
- Restart dev server: `npm run dev`
- Check if content is "Published" not "Draft"
- Verify environment variables are correct

#### 2. Can't Access /admin

**Symptoms**: 404 or blank page at `/admin`

**Solutions**:
- Verify `.env.local` exists with correct values
- Check Sanity project is created
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

#### 3. Images Not Loading

**Symptoms**: Broken image icons or 404s

**Solutions**:
- Check `next.config.ts` has Sanity domain:
  ```typescript
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  }
  ```
- Verify images are published in Studio
- Check image URLs in Sanity
- Clear Next.js cache

#### 4. Type Errors

**Symptoms**: TypeScript errors during build

**Solutions**:
```bash
npm run type-check           # Identify errors
npm run build --debug        # Verbose build output
```

Common fixes:
- Ensure types in `src/types/index.ts` match Sanity schema
- Regenerate types if schema changed
- Check for missing nullable fields

#### 5. Sanity API Errors

**Symptoms**: Forbidden, Unauthorized errors

**Solutions**:
- Verify `SANITY_API_TOKEN` has Editor permissions
- Regenerate token if compromised
- Check dataset name matches (`production` vs `development`)
- Ensure token is not expired

#### 6. Build Fails in Production

**Symptoms**: `npm run build` fails

**Solutions**:
- Run `npm run type-check` locally first
- Check all environment variables are set
- Verify Sanity project is accessible
- Review build logs for specific errors
- Try clean build: `rm -rf .next && npm run build`

### Debug Mode

Enable verbose logging:

```bash
# Next.js debug
DEBUG=* npm run dev

# Sanity client debug
SANITY_DEBUG=true npm run dev
```

---

## Advanced Configuration

### Custom Domain for Sanity Studio

Deploy Studio separately:

```bash
npm install -g @sanity/cli
sanity deploy
```

Access at: `https://your-project.sanity.studio`

### Environment-Specific Datasets

Use different datasets for staging/production:

```bash
# .env.production
NEXT_PUBLIC_SANITY_DATASET="production"

# .env.staging
NEXT_PUBLIC_SANITY_DATASET="staging"
```

### CORS Configuration

In Sanity dashboard, configure CORS:
- Add allowed origins: `https://your-website.com`
- Allow credentials if needed

### Webhooks

Set up webhooks to trigger deployments on content changes:

1. Sanity Dashboard → API → Webhooks
2. Add webhook URL (e.g., Vercel deploy hook)
3. Select trigger: On create/update/delete

### Custom Sanity Plugins

Add plugins in `sanity.config.ts`:

```typescript
import { media } from 'sanity-plugin-media'

export default defineConfig({
  // ...
  plugins: [
    structureTool(),
    visionTool(),
    media(), // Asset management
  ],
})
```

### Preview Mode (Draft Content)

Implement preview for unpublished content:

```typescript
// src/app/api/preview/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }
  
  // Enable draft mode
  draftMode().enable()
  return redirect('/')
}
```

### Internationalization (i18n)

Add multi-language support:

1. Install plugin: `npm install @sanity/language-filter`
2. Update schemas with language fields
3. Configure Next.js i18n in `next.config.ts`

---

## Maintenance Checklist

### Daily
- [ ] Monitor error logs
- [ ] Check website performance

### Weekly
- [ ] Review analytics
- [ ] Update product availability
- [ ] Check for broken links

### Monthly
- [ ] Update dependencies
- [ ] Review security advisories
- [ ] Backup Sanity data
- [ ] Optimize images

### Quarterly
- [ ] Performance audit (Lighthouse)
- [ ] SEO review
- [ ] Security audit
- [ ] Update documentation

---

## Resources

### Documentation
- **Next.js**: https://nextjs.org/docs
- **Sanity**: https://www.sanity.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs

### Tools
- **GROQ Arcade**: https://groq.dev (test queries)
- **Sanity Vision**: Built into Studio (query tool)
- **Next.js Bundle Analyzer**: Analyze bundle size
- **Lighthouse**: Performance auditing

### Community
- **Next.js Discord**: https://nextjs.org/discord
- **Sanity Slack**: https://slack.sanity.io

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Maintainer**: Development Team
