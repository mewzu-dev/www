# Mewzu

A modern Next.js e-commerce website for custom cat-themed t-shirts with a headless CMS for easy content management.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io (headless CMS)
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Package Manager**: npm

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity CMS

#### Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up/log in
2. Click **"Create project"**
3. Project name: `Mewzu` (or your choice)
4. Dataset: Choose **"Production"**
5. Copy your **Project ID** (e.g., `abc12345`)

#### Get API Token

1. In your Sanity dashboard, go to **API** → **Tokens**
2. Click **"Add API token"**
3. Name: `Mewzu Website`
4. Permissions: **Editor**
5. Click **"Add token"**
6. **Copy the token immediately** (you won't see it again)

#### Configure Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_TOKEN="your-api-token"
```

Replace `your-project-id` and `your-api-token` with your actual values.

### 3. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Studio**: http://localhost:3000/admin

### 4. Add Your First Product

1. Go to http://localhost:3000/admin
2. Click **"Product"** → **"Create new"**
3. Fill in required fields (marked with *)
4. Click **"Generate"** next to Slug
5. Upload at least one product image
6. Click **"Publish"**

Your product will appear on the website within 60 seconds!

## Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks without emitting files
```

## Project Structure

```
/src
  /app              # Next.js App Router - pages, layouts, route handlers
    /admin          # Sanity Studio route
    /products       # Product pages
    layout.tsx      # Root layout
    page.tsx        # Homepage
    globals.css     # Global styles
  /components       # React components
    /announcement   # Announcement system (banners, modals)
    /home          # Homepage components
    /layout        # Header, footer, navigation
    /products      # Product display components
    /ui            # Reusable UI primitives (shadcn/ui)
  /lib             # Utility functions and data
    /data          # Site configuration
  /sanity          # Sanity CMS configuration
    /schemas       # Content schemas (Product, Announcement)
    client.ts      # Sanity client
    queries.ts     # GROQ queries
  /types           # TypeScript type definitions
/public
  /logo            # Brand assets (horizontal, icon, square, vertical)
  /products        # Product images (if using local images)
```

## Key Features

### Content Management System

- **Sanity Studio** embedded at `/admin` route
- Manage products and announcements without code
- Real-time preview and publishing
- Image upload and optimization
- Version history

### Product Management

- Rich product details (name, description, story, colors, sizes)
- Multiple image views (front, back, detail, lifestyle)
- Featured products on homepage
- External marketplace links (Shopee, TikTok Shop, WhatsApp)
- SEO-friendly slugs

### Announcement System

- **Banners**: Top-of-page announcements with dismiss functionality
- **Modals**: Popup announcements for important messages
- Rich text content with formatting
- Scheduling (start/end dates)
- Page targeting (show on specific pages)
- Priority ordering

## Documentation

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Comprehensive guide for non-technical users managing products and announcements
- **[DEVELOPER.md](./DEVELOPER.md)** - Technical reference, architecture, and advanced configuration
- **[CLAUDE.md](./CLAUDE.md)** - Instructions for AI coding assistants

## Inviting Team Members

To give your business partner access to the admin:

1. Go to your Sanity project dashboard
2. Navigate to **Project settings** → **Members**
3. Click **Invite members**
4. Enter their email address
5. Set role to **Editor** (can create and publish content)
6. Click **Send invitation**

They can then access the admin at `http://your-website.com/admin` (or `localhost:3000/admin` for development).

Share the **USER_GUIDE.md** with them for detailed instructions.

## Environment Variables

Required variables in `.env.local`:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | `abc12345` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date | `2024-01-01` |
| `SANITY_API_TOKEN` | API token with Editor permissions | `sk...` |

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel automatically optimizes Next.js applications.

### Other Platforms

1. Run `npm run build` to create production build
2. Run `npm run start` to start production server
3. Ensure environment variables are set
4. Configure platform to run Node.js server

## Troubleshooting

**Changes not showing on website?**
- Wait 60 seconds (ISR revalidation time)
- Ensure you clicked "Publish" not just "Save"
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

**Can't access /admin?**
- Check `.env.local` file exists with correct values
- Verify Sanity project is created
- Restart dev server: `npm run dev`

**Images not loading?**
- Verify images are uploaded in Sanity Studio
- Check `next.config.ts` has remote patterns configured
- Ensure images are published (not draft)

**Type errors when building?**
```bash
npm run type-check  # Identify type errors
npm run build       # Build for production
```

For more troubleshooting, see **[DEVELOPER.md](./DEVELOPER.md)**.

## Contributing

This is a private project. For development guidelines:

1. Follow TypeScript strict mode
2. Use Tailwind CSS for styling
3. Prefer shadcn/ui components
4. Use lucide-react for icons
5. Write meaningful commit messages
6. Run `npm run type-check` before committing

See **[CLAUDE.md](./CLAUDE.md)** for detailed development principles.

## Support

- **Sanity Documentation**: https://www.sanity.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

## License

Private project - All rights reserved.

---

**Version**: 1.0  
**Last Updated**: January 2026
