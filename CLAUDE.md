# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation Structure

This project has organized documentation:

- **[README.md](./README.md)** - Project overview, quick start, and setup instructions (for developers)
- **[USER_GUIDE.md](./USER_GUIDE.md)** - Comprehensive guide for non-technical users managing content
- **[DEVELOPER.md](./DEVELOPER.md)** - Technical reference, architecture, troubleshooting, and advanced topics
- **CLAUDE.md** (this file) - Instructions for AI coding assistants

When users ask about:
- Setup, installation, environment → Direct to **README.md**
- Managing products/announcements → Direct to **USER_GUIDE.md**
- Architecture, schemas, performance → Direct to **DEVELOPER.md**

## Project Overview

Mewzu is a Next.js e-commerce application for custom cat-themed t-shirts with a self-built CMS backed by Supabase.

**Tech Stack:**
- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict mode)
- CMS: Custom admin panel at `/admin` (Supabase PostgreSQL + Storage + Auth)
- Styling: Tailwind CSS v4
- UI Components: shadcn/ui (preferred)
- Rich Text: TipTap (for announcement content)
- Icons: lucide-react
- Package Manager: npm

## Development Commands

### Essential Commands
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler checks without emitting files
```

### Development Workflow
- Run `npm run dev` to start the development server with hot reload
- Run `npm run type-check` before committing to catch type errors
- Run `npm run lint` to ensure code quality

## Project Structure

```
/src
  /app              # Next.js App Router - pages, layouts, and route handlers
    layout.tsx      # Root layout component
    page.tsx        # Home page
    globals.css     # Global styles with Tailwind directives
  /components       # React components
    /ui             # Reusable UI primitives (buttons, inputs, etc.)
  /lib              # Utility functions and shared logic
  /types            # TypeScript type definitions
/public             # Static assets (images, fonts, etc.)
```

## Architecture Guidelines

### App Router
- All routes are defined in the `/src/app` directory
- Use Server Components by default (no 'use client' directive)
- Add 'use client' only when you need interactivity, hooks, or browser APIs
- Route handlers go in `route.ts` files for API endpoints

### Component Organization
- Server Components: Place in `/src/components` (default)
- Client Components: Add 'use client' directive at the top
- UI primitives: Store in `/src/components/ui`
- Keep components focused and composable

### TypeScript
- Strict mode is enabled
- Define types in `/src/types` for shared types
- Use proper Next.js types (Metadata, NextPage, etc.)
- Leverage type inference where possible

### Styling with Tailwind
- Use Tailwind utility classes for styling
- Custom CSS only when Tailwind utilities are insufficient
- Theme customization goes in `tailwind.config.ts`
- CSS variables defined in `src/app/globals.css`
- **Note**: This project uses Tailwind CSS v4 syntax (`@import "tailwindcss"` instead of `@tailwind` directives)

### UI Components with shadcn/ui
- **Preferred component library**: Use shadcn/ui for UI components
- Components are added to `/src/components/ui` directory
- Install components using: `npx shadcn@latest add <component-name>`
- shadcn components are copied into the project (not installed as dependencies)
- Customize components directly in the codebase as needed
- **MCP Access**: Use the Context7 MCP server to look up shadcn/ui documentation when needed

### Icons
- **Use lucide-react** for all icons in this project
- Install: `npm install lucide-react`
- Import individual icons: `import { IconName } from 'lucide-react'`
- Example: `import { User, Settings, Menu } from 'lucide-react'`

## Import Aliases

Use `@/*` to import from the `src` directory:
```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Environment Variables

- Create `.env.local` for local development (copy from `.env.local.example`)
- Access in Server Components and Route Handlers using `process.env.VARIABLE_NAME`
- Prefix with `NEXT_PUBLIC_` to expose to the browser
- Never commit `.env.local` to version control

## Development Principles

### Code Quality
- TypeScript strict mode is enforced
- Avoid over-engineering - build only what's needed
- Security: Watch for XSS, SQL injection, and other OWASP vulnerabilities
- Performance: Optimize images, minimize client-side JavaScript

### Best Practices
- Use functional components and hooks
- Prefer composition over inheritance
- Keep components small and focused
- Use meaningful names for variables and functions
- Add comments only when logic isn't self-evident

### What NOT to Do
- Don't add unrequested features
- Don't refactor working code unnecessarily
- Don't add error handling for impossible scenarios
- Don't create abstractions for one-time operations
- Don't design for hypothetical future requirements
- Delete unused code completely - no commented-out code

## Next.js Specific

### Data Fetching
- Fetch data in Server Components using async/await
- Use `fetch` with Next.js automatic caching
- For client-side data fetching, consider TanStack Query

### Rendering Strategies
- **Server Components** (default): For static content, data fetching
- **Client Components**: For interactivity, hooks, browser APIs
- **Static Generation**: Default for pages without dynamic data
- **Dynamic Rendering**: Automatic when using dynamic functions (cookies, headers, searchParams)

### Performance
- Use Next.js `<Image>` component for automatic optimization
- Implement proper loading states with `loading.tsx`
- Use Suspense boundaries for streaming
- Optimize fonts with next/font

## Key Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration (v4 syntax)
- `postcss.config.mjs` - PostCSS configuration (uses `@tailwindcss/postcss`)
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration
- `.env.local` - Environment variables (never commit this)

## CMS Integration (Supabase)

### Content Types

1. **Product** - T-shirt products with images, colors, sizes, marketplace links
2. **Announcement** - Banners and modals for site-wide announcements (HTML content via TipTap)

### Key CMS Files

- `src/lib/supabase/server.ts` - Server-side Supabase client (uses cookies)
- `src/lib/supabase/client.ts` - Browser-side Supabase client
- `src/lib/supabase/static.ts` - Build-time Supabase client (no cookies, for generateStaticParams)
- `src/lib/supabase/middleware.ts` - Auth session refresh for admin routes
- `src/lib/supabase/storage.ts` - Image upload/delete to Supabase Storage
- `src/lib/db/products.ts` - Product data fetching functions
- `src/lib/db/announcements.ts` - Announcement data fetching functions

### Admin Panel

- Located at `src/app/admin/` (outside `[locale]` group, no i18n)
- Auth: Supabase Auth (email/password)
- Products CRUD: `src/app/admin/(dashboard)/products/`
- Announcements CRUD: `src/app/admin/(dashboard)/announcements/`
- Shared components: `src/components/admin/`

### Data Fetching Pattern

```typescript
// Server Component
import { getAllProducts } from '@/lib/db/products'

export const revalidate = 60 // ISR cache

export default async function ProductsPage() {
  const products = await getAllProducts()
  return <ProductGrid products={products} />
}
```

### Important Notes

- All content is managed via custom admin panel at `/admin`
- Business partner manages content (no developer needed)
- ISR caching: 60-second revalidation on public pages
- Never hardcode content - always fetch from Supabase
- Images served from Supabase Storage (public bucket: `product-images`)
- Announcement content stored as HTML (edited via TipTap rich text editor)

## Content Management

When working with products or announcements:
1. **Never hardcode content** - Always fetch from Supabase via `src/lib/db/`
2. **Use existing functions** - `getAllProducts`, `getFeaturedProducts`, `getProductBySlug`, `getAnnouncementsByPage`
3. **Follow ISR pattern** - Set `revalidate = 60` on pages
4. **Type safety** - Use types from `src/types/index.ts` (`Product`, `Announcement`)
