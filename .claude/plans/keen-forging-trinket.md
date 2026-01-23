# Mewzu Website Development Plan

## Project Overview

Building a go-to-market website for Mewzu, a clothing brand featuring hand-drawn cat characters in different backgrounds. The site will serve as a brand showcase and product catalog, directing customers to external marketplaces (Shopee, TikTok Shop) for purchases.

**Brand Concept**: A hand-drawn cat character stays in the same position across all designs while the background/scene changes - inspired by travel videos where the subject stays centered as locations change.

**First Volume**: 4-6 t-shirt designs, neutral color bases, artwork on back, minimal front branding.

---

## Technical Foundation

**Current Setup**:
- Next.js 16 with App Router (TypeScript strict mode)
- Tailwind CSS v4 with CSS variables
- Path aliases configured (`@/*`)
- Basic placeholder homepage
- Empty `/src/components` and `/src/lib` directories

**Architecture Decision**: Build flexible catalog-first architecture that can easily migrate to full e-commerce later.

---

## Implementation Phases

### Phase 1: Foundation Setup (Week 1)

**1.1 Install Dependencies**

```bash
# Core utilities for component styling
npm install class-variance-authority clsx tailwind-merge

# Icons
npm install lucide-react

# shadcn/ui setup and components
npx shadcn@latest init
npx shadcn@latest add button card badge separator sheet tabs
```

**1.2 Create Type Definitions**

**File**: `/src/types/index.ts`

Define core types:
- `Product` (id, slug, name, tagline, description, scene, story, baseColor, artColor, sizes, images, featured, externalLinks)
- `ProductImage` (url, alt, view)
- `ExternalLink` (platform, url, available)
- `Size` type ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')
- `NavItem` (label, href, external?)
- `SiteConfig` (name, description, url, ogImage, links)
- `SizeMeasurement` (size, chest, length, shoulder, sleeve)

**1.3 Create Utility Functions**

**File**: `/src/lib/utils.ts`
- `cn()` function for merging Tailwind classes
- `getProductUrl()` for generating product URLs
- `formatPrice()` for future use

**1.4 Setup Data Files**

**File**: `/src/lib/data/products.ts`
- Sample product data array (2-3 placeholder products initially)
- Size measurements array for size guide
- Will be replaced with real data when product photos arrive

**File**: `/src/lib/data/navigation.ts`
- Navigation items array: Home, Products, About, Contact, Size Guide

**File**: `/src/lib/data/site-config.ts`
- Site configuration (name, description, social links)
- Update with actual Instagram/TikTok handles and email

**1.5 Enhance Tailwind Configuration**

**Modify**: `/src/app/globals.css`
- Add CSS variables for brand colors (neutral tones, accent colors)
- Keep existing v4 `@import "tailwindcss"` syntax

**Modify**: `/tailwind.config.ts`
- Extend theme with brand color variables
- Add accent colors (blue, orange, green for different scenes)

---

### Phase 2: Layout & Shared Components (Week 2)

**2.1 Layout Components**

**File**: `/src/components/layout/header.tsx` ⭐ CRITICAL
- Sticky header with logo
- Desktop navigation (hidden on mobile)
- Mobile menu trigger using Sheet component
- Server + Client Component hybrid

**File**: `/src/components/layout/footer.tsx`
- Four-column grid: Brand, Shop, About, Connect
- Social media links (Instagram, TikTok, Email)
- Copyright notice

**File**: `/src/components/layout/mobile-nav.tsx`
- Mobile navigation menu content
- Client Component with Sheet

**2.2 Product Components**

**File**: `/src/components/product/product-card.tsx`
- Card component displaying product image (back view), name, tagline
- Hover effects
- Badges for featured items, base color, scene
- Links to product detail page

**File**: `/src/components/product/product-grid.tsx`
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Maps over products array

**File**: `/src/components/product/external-links.tsx`
- Display "Buy Now" buttons for external marketplaces
- Shows availability status
- Platform icons and external link indicators

**2.3 Update Root Layout**

**Modify**: `/src/app/layout.tsx` ⭐ CRITICAL
- Import and add Header/Footer components
- Update metadata with comprehensive SEO tags
- Add Open Graph and Twitter card metadata
- Structured HTML (header, main, footer)

---

### Phase 3: Core Pages (Week 3)

**3.1 Homepage Components**

**File**: `/src/components/home/hero.tsx`
- Large hero section with brand tagline
- "Same Cat, Different Adventures" headline
- CTA buttons to Products and About pages
- Gradient background

**File**: `/src/components/home/featured-products.tsx`
- Section displaying featured products
- Uses ProductGrid component
- "View All" link to full catalog

**File**: `/src/components/home/concept-video.tsx`
- Video showcase section (placeholder initially)
- Explains the framing concept
- Can be updated with actual campaign video later

**Modify**: `/src/app/page.tsx`
- Compose homepage from Hero, FeaturedProducts, ConceptVideo
- Server Component fetching featured products

**3.2 Product Catalog Page**

**File**: `/src/app/products/page.tsx`
- Page title and description
- Full product grid showing all products
- Server Component
- Static generation for optimal performance

**3.3 Individual Product Page**

**File**: `/src/app/products/[slug]/page.tsx` ⭐ CRITICAL
- Dynamic route using product slug
- Image tabs (back view, front view)
- Product information (name, tagline, description, scene story)
- Size selector (read-only display)
- External purchase links
- Size guide link
- generateStaticParams for all products
- generateMetadata for SEO

---

### Phase 4: Content Pages (Week 4)

**4.1 About Page**

**File**: `/src/app/about/page.tsx`
- Brand story and concept explanation
- Design philosophy section
- Volume 1 information
- "Why Mewzu?" section
- Clean prose layout with cards

**4.2 Contact Page**

**File**: `/src/app/contact/page.tsx`
- Contact information cards (Email, Instagram, TikTok)
- Business inquiries section
- Social media links with icons
- No form needed for MVP (can add later)

**4.3 Size Guide Page**

**File**: `/src/app/size-guide/page.tsx`
- Size measurements table (responsive)
- How to measure instructions
- Fit guide recommendations
- Uses SIZE_MEASUREMENTS from products.ts

**4.4 Shipping Info Page**

**File**: `/src/app/shipping/page.tsx`
- Shipping information (processing time, delivery time, costs)
- Returns & exchanges policy
- Feature cards (Fast Shipping, Secure Packaging, Easy Returns)
- FAQ-style layout

---

### Phase 5: SEO & Optimization (Week 5)

**5.1 SEO Files**

**File**: `/src/app/robots.ts`
- Configure crawler access
- Sitemap reference

**File**: `/src/app/sitemap.ts`
- Dynamic sitemap generation
- Include all static pages
- Include all product pages from products array

**5.2 Next.js Configuration**

**Modify**: `/next.config.ts`
- Configure image domains for external images
- Enable image optimization formats (AVIF, WebP)
- Enable React strict mode

**5.3 Performance Optimization**

- Use Next.js Image component everywhere
- Add `priority` prop to above-the-fold images
- Lazy load below-the-fold content
- Minimize client-side JavaScript (use Server Components by default)
- Test with Lighthouse

**5.4 Responsive Design Testing**

Breakpoints:
- Mobile: < 640px (1 col grid, stacked layouts)
- Tablet: 640px - 1024px (2 col grid)
- Desktop: > 1024px (3 col grid, side-by-side layouts)

Test areas:
- Navigation (mobile menu)
- Product grids
- Product page layout
- Typography scaling
- Footer layout

---

## Critical Files (Priority Order)

1. **`/src/types/index.ts`** - Type definitions for entire app
2. **`/src/lib/data/products.ts`** - Product data structure and sample data
3. **`/src/components/layout/header.tsx`** - Primary navigation
4. **`/src/app/products/[slug]/page.tsx`** - Most complex page, showcases product
5. **`/src/app/layout.tsx`** - Root layout with Header/Footer and SEO

---

## Data Structure Example

```typescript
// Product structure
{
  id: '1',
  slug: 'bathroom-blues',
  name: 'Bathroom Blues',
  tagline: 'A moment of reflection',
  description: '...',
  scene: 'Bathroom',
  story: 'In this design, our cat...',
  baseColor: 'white',
  artColor: 'Blue tones',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  images: [
    { url: '/images/products/bathroom-blues-back.jpg', alt: '...', view: 'back' },
    { url: '/images/products/bathroom-blues-front.jpg', alt: '...', view: 'front' }
  ],
  featured: true,
  externalLinks: [
    { platform: 'shopee', url: 'https://...', available: true },
    { platform: 'tiktok', url: 'https://...', available: false }
  ]
}
```

---

## Image Strategy

**During Development (Before Product Photos)**:
- Create placeholder images in `/public/images/placeholders/`
- Use consistent 1:1 aspect ratio (square images)
- Simple colored backgrounds matching scene themes

**When Product Photos Arrive**:
1. Optimize images (WebP format, appropriate sizes)
2. Place in `/public/images/products/`
3. Update product data with actual image paths
4. Recommended sizes:
   - Product cards: 600x600px
   - Product detail: 1200x1200px

---

## External Marketplace Integration

**Current Approach**:
- Display "Buy Now" buttons linking to Shopee, TikTok Shop
- Show availability status per platform
- Track clicks for analytics (future enhancement)

**Platform Links Format**:
- Shopee: `https://shopee.co.id/product-name`
- TikTok Shop: `https://shop.tiktok.com/product-name`
- Can add WhatsApp for direct inquiries

---

## Future E-Commerce Migration Path

**Current Implementation Supports**:
- Product data structure already includes all fields (just add `price`)
- Type definitions extensible to include cart/checkout types
- External links can be replaced with "Add to Cart" button
- Server Components optimized for database fetching

**Migration Steps** (when ready):
1. Setup database (PostgreSQL via Vercel/Supabase)
2. Migrate products from TypeScript to database
3. Add payment gateway (Midtrans/Xendit for Indonesia)
4. Create cart functionality (Zustand/Context for state)
5. Add checkout flow
6. Implement order management

**Files to Modify**:
- `/src/types/index.ts` - Add cart, order, payment types
- `/src/components/product/external-links.tsx` - Replace with AddToCart
- Add new routes: `/cart`, `/checkout`, `/orders`

---

## Implementation Timeline

**Week 1**: Foundation
- Install dependencies, setup types, create data files
- Configure Tailwind with brand colors

**Week 2**: Layout & Components
- Build Header, Footer, Mobile Nav
- Create ProductCard, ProductGrid components
- Update root layout

**Week 3**: Core Pages
- Homepage with Hero, Featured Products, Concept Video
- Product catalog page
- Dynamic product detail page

**Week 4**: Content Pages
- About, Contact, Size Guide, Shipping pages

**Week 5**: Polish & Launch
- SEO setup (robots, sitemap)
- Performance optimization
- Responsive design testing
- Update with real product data when available
- Deploy to production

---

## Verification & Testing

**After Implementation**:

1. **Development Testing**:
   ```bash
   npm run dev
   # Test all pages and navigation
   # Check mobile responsiveness
   ```

2. **Type Checking**:
   ```bash
   npm run type-check
   # Ensure no TypeScript errors
   ```

3. **Build Testing**:
   ```bash
   npm run build
   # Verify successful production build
   npm run start
   # Test production build locally
   ```

4. **Performance Audits**:
   - Run Lighthouse in Chrome DevTools
   - Target: 90+ scores on all metrics
   - Check Core Web Vitals

5. **Cross-Browser Testing**:
   - Chrome, Safari, Firefox
   - iOS Safari, Android Chrome
   - Test all interactive elements

6. **Content Verification**:
   - All links work correctly
   - External marketplace links open in new tabs
   - All images load with proper alt text
   - Navigation flows logically

---

## Key Design Principles

- **Neutral Base**: Keep overall design clean and minimal, let product artwork be the focus
- **Mobile-First**: Design and test mobile layouts first
- **Hand-Drawn Aesthetic**: Maintain consistency with hand-drawn brand style
- **Performance**: Server Components by default, optimize images aggressively
- **Simplicity**: No over-engineering, build only what's needed for GTM phase
- **Flexibility**: Architecture supports easy e-commerce migration later

---

## Notes

- Product photos arriving in a few days - use placeholders until then
- Social media handles need to be updated in site-config.ts
- Email address needs to be confirmed
- Campaign video can be added to ConceptVideo component when ready
- Focus on mobile experience (primary shopping platform in Indonesia)
- Consider adding WhatsApp link for direct customer inquiries
