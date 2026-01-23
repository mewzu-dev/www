import { groq } from 'next-sanity'

// Product queries
export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    tagline,
    description,
    scene,
    story,
    baseColor,
    artColor,
    sizes,
    featured,
    images[] {
      "url": image.asset->url,
      alt,
      view
    },
    externalLinks[] {
      platform,
      url,
      available
    }
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    tagline,
    description,
    scene,
    story,
    baseColor,
    artColor,
    sizes,
    featured,
    images[] {
      "url": image.asset->url,
      alt,
      view
    },
    externalLinks[] {
      platform,
      url,
      available
    }
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    tagline,
    description,
    scene,
    story,
    baseColor,
    artColor,
    sizes,
    featured,
    images[] {
      "url": image.asset->url,
      alt,
      view
    },
    externalLinks[] {
      platform,
      url,
      available
    }
  }
`

export const productSlugsQuery = groq`
  *[_type == "product"] {
    "slug": slug.current
  }
`

// Announcement queries
export const activeAnnouncementsQuery = groq`
  *[_type == "announcement"
    && isActive == true
    && (startDate == null || startDate <= now())
    && (endDate == null || endDate >= now())
  ] | order(priority desc) {
    _id,
    title,
    content,
    type,
    startDate,
    endDate,
    targetPages,
    priority,
    isActive
  }
`

export const announcementsByPageQuery = groq`
  *[_type == "announcement"
    && isActive == true
    && (startDate == null || startDate <= now())
    && (endDate == null || endDate >= now())
    && ($page in targetPages || "all" in targetPages || count(targetPages) == 0)
  ] | order(priority desc) {
    _id,
    title,
    content,
    type,
    startDate,
    endDate,
    targetPages,
    priority,
    isActive
  }
`
