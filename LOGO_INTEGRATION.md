# Logo Integration Guide

## Logo Files Location

All logo files are located in `/public/logo/` with standardized naming:

- **logo-horizontal.jpg** (1600x606px) - Horizontal brand logo for header navigation
- **logo-icon.jpg** (1600x1600px) - Square icon/mascot for footer and app icons
- **logo-square.jpg** (1600x1600px) - Square brand logo for social media previews
- **logo-vertical.jpg** (632x1600px) - Vertical brand logo (available for future use)

## Current Implementation

### Header (Desktop & Mobile)
- Location: `/src/components/layout/header.tsx`
- Logo: `logo-horizontal.jpg`
- Dimensions: 120x45px display size (h-10 class)
- Features: Priority loading for LCP optimization

### Footer
- Location: `/src/components/layout/footer.tsx`
- Logo: `logo-icon.jpg`
- Dimensions: 80x80px with rounded corners
- Features: Clickable, links back to homepage

### Favicon & App Icons
- **favicon.ico** - Browser tab icon (uses logo-icon.jpg)
- **apple-touch-icon.png** - iOS home screen icon (uses logo-icon.jpg)

### Social Media / SEO
- Location: `/src/lib/data/site-config.ts`
- OG Image: `logo-square.jpg`
- Used for social media sharing previews (Facebook, Twitter, LinkedIn, etc.)

## Logo Specifications

### Header Logo
- Format: JPG
- Original: 1600x606px
- Display: ~120x45px (responsive)
- Background: Should work on light backgrounds

### Footer Logo
- Format: JPG
- Original: 1600x1600px (square)
- Display: 80x80px
- Style: Rounded corners (rounded-lg)

### Favicon
- Format: JPG (will be converted by browser)
- Original: 1600x1600px
- Note: For better quality, consider converting to ICO/PNG format

## Future Improvements

Consider creating optimized versions:

1. **WebP/AVIF formats** for better compression
2. **SVG version** for crisp display at any size
3. **ICO format** for favicon (with multiple sizes: 16x16, 32x32, 48x48)
4. **PNG versions** with transparent backgrounds if needed
5. **Dark mode variants** if the logo needs to adapt to dark theme

## Optimization Tips

Current setup uses Next.js Image component which provides:
- Automatic lazy loading (except priority images)
- Responsive images
- Format optimization (WebP/AVIF when supported)
- Proper sizing to prevent layout shift

No additional optimization needed unless you want to:
- Reduce file sizes further
- Support transparent backgrounds
- Create vector versions (SVG)
