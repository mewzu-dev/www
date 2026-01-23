import { client } from './client'
import {
  productsQuery,
  featuredProductsQuery,
  productBySlugQuery,
  productSlugsQuery,
  activeAnnouncementsQuery,
  announcementsByPageQuery,
} from './queries'
import { Product } from '@/types'

// Sanity types
export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  description: string
  scene: string
  story: string
  baseColor: string
  artColor: string
  sizes: string[]
  featured: boolean
  images: Array<{
    url: string
    alt: string
    view: string
  }>
  externalLinks: Array<{
    platform: string
    url: string
    available: boolean
  }>
}

export interface SanityAnnouncement {
  _id: string
  title: string
  content: any[] // Portable Text
  type: 'banner' | 'modal' | 'section'
  startDate?: string
  endDate?: string
  targetPages?: string[]
  priority: number
  isActive: boolean
}

// Transform Sanity product to app Product type
function transformProduct(sanityProduct: SanityProduct): Product {
  return {
    id: sanityProduct._id,
    slug: typeof sanityProduct.slug === 'string' ? sanityProduct.slug : sanityProduct.slug.current,
    name: sanityProduct.name,
    tagline: sanityProduct.tagline,
    description: sanityProduct.description,
    scene: sanityProduct.scene,
    story: sanityProduct.story,
    baseColor: sanityProduct.baseColor,
    artColor: sanityProduct.artColor,
    sizes: sanityProduct.sizes as any[],
    featured: sanityProduct.featured,
    images: sanityProduct.images.map(img => ({
      url: img.url,
      alt: img.alt,
      view: img.view as any,
    })),
    externalLinks: sanityProduct.externalLinks.map(link => ({
      platform: link.platform as any,
      url: link.url,
      available: link.available,
    })),
  }
}

// Product fetch functions
export async function getAllProducts(): Promise<Product[]> {
  const products = await client.fetch<SanityProduct[]>(productsQuery, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  return products.map(transformProduct)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await client.fetch<SanityProduct[]>(featuredProductsQuery, {}, {
    next: { revalidate: 60 }
  })
  return products.map(transformProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await client.fetch<SanityProduct | null>(
    productBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  )
  return product ? transformProduct(product) : null
}

export async function getAllProductSlugs(): Promise<string[]> {
  const slugs = await client.fetch<Array<{ slug: string }>>(productSlugsQuery)
  return slugs.map(item => item.slug)
}

// Announcement fetch functions
export async function getActiveAnnouncements(): Promise<SanityAnnouncement[]> {
  return client.fetch<SanityAnnouncement[]>(activeAnnouncementsQuery, {}, {
    next: { revalidate: 60 }
  })
}

export async function getAnnouncementsByPage(page: string): Promise<SanityAnnouncement[]> {
  return client.fetch<SanityAnnouncement[]>(
    announcementsByPageQuery,
    { page },
    { next: { revalidate: 60 } }
  )
}
