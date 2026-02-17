import { Product, SizeMeasurement } from '@/types'

// Sample product data (to be replaced with actual products when photos arrive)
export const products: Product[] = [
  {
    id: '1',
    slug: 'bathroom-blues',
    name: 'Bathroom Blues',
    tagline: 'A moment of reflection',
    description: 'Our signature cat takes a contemplative moment in a serene bathroom setting. The hand-drawn art captures the quiet solitude we all need sometimes, with calming blue tones and intricate tile details.',
    scene: 'Bathroom',
    story: 'In this design, our cat finds peace in the most unexpected place - a cozy bathroom. It\'s about finding your zen wherever you are, even in the smallest moments of daily life.',
    baseColor: 'White',
    artColor: 'Blue tones',
    price: 149000,
    material: 'Cotton Combed 30s, 200gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      {
        url: '/images/placeholders/bathroom-blues-back.jpg',
        alt: 'Bathroom Blues - Back view with cat artwork',
        view: 'back'
      },
      {
        url: '/images/placeholders/bathroom-blues-front.jpg',
        alt: 'Bathroom Blues - Front view with minimal branding',
        view: 'front'
      }
    ],
    featured: true,
    externalLinks: [
      {
        platform: 'shopee',
        url: 'https://shopee.co.id/',
        available: false
      },
      {
        platform: 'tiktok',
        url: 'https://shop.tiktok.com/',
        available: false
      }
    ]
  },
  {
    id: '2',
    slug: 'kitchen-tales',
    name: 'Kitchen Tales',
    tagline: 'Where memories are made',
    description: 'Watch our cat explore a bustling kitchen scene filled with warmth and nostalgia. Hand-drawn with love, this design celebrates the heart of every home with warm orange and red tones.',
    scene: 'Kitchen',
    story: 'The kitchen is where magic happens - not just cooking, but conversations, laughter, and memories. Our cat witnesses it all from the same centered position, observing the beautiful chaos of daily life.',
    baseColor: 'Cream',
    artColor: 'Warm orange and red',
    price: 149000,
    material: 'Cotton Combed 30s, 200gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      {
        url: '/images/placeholders/kitchen-tales-back.jpg',
        alt: 'Kitchen Tales - Back view with cat artwork',
        view: 'back'
      },
      {
        url: '/images/placeholders/kitchen-tales-front.jpg',
        alt: 'Kitchen Tales - Front view with minimal branding',
        view: 'front'
      }
    ],
    featured: true,
    externalLinks: [
      {
        platform: 'shopee',
        url: 'https://shopee.co.id/',
        available: false
      },
      {
        platform: 'tiktok',
        url: 'https://shop.tiktok.com/',
        available: false
      }
    ]
  },
  {
    id: '3',
    slug: 'garden-dreams',
    name: 'Garden Dreams',
    tagline: 'Nature\'s peaceful embrace',
    description: 'Experience tranquility as our cat sits centered in a lush garden paradise. Hand-drawn foliage and vibrant green tones create a peaceful escape you can wear.',
    scene: 'Garden',
    story: 'In a world of concrete and screens, we all need a reminder of nature\'s beauty. Our cat stays perfectly still while the garden blooms around it - a meditation on finding stillness in growth.',
    baseColor: 'Natural',
    artColor: 'Vibrant greens',
    price: 149000,
    material: 'Cotton Combed 30s, 200gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      {
        url: '/images/placeholders/garden-dreams-back.jpg',
        alt: 'Garden Dreams - Back view with cat artwork',
        view: 'back'
      },
      {
        url: '/images/placeholders/garden-dreams-front.jpg',
        alt: 'Garden Dreams - Front view with minimal branding',
        view: 'front'
      }
    ],
    featured: false,
    externalLinks: [
      {
        platform: 'shopee',
        url: 'https://shopee.co.id/',
        available: false
      },
      {
        platform: 'tiktok',
        url: 'https://shop.tiktok.com/',
        available: false
      }
    ]
  }
]

// Size measurements for size guide
export const SIZE_MEASUREMENTS: SizeMeasurement[] = [
  {
    size: 'S',
    chest: '96 cm',
    length: '68 cm',
    shoulder: '46 cm',
    sleeve: '20 cm'
  },
  {
    size: 'M',
    chest: '100 cm',
    length: '70 cm',
    shoulder: '48 cm',
    sleeve: '21 cm'
  },
  {
    size: 'L',
    chest: '104 cm',
    length: '72 cm',
    shoulder: '50 cm',
    sleeve: '22 cm'
  },
  {
    size: 'XL',
    chest: '108 cm',
    length: '74 cm',
    shoulder: '52 cm',
    sleeve: '23 cm'
  },
  {
    size: 'XXL',
    chest: '112 cm',
    length: '76 cm',
    shoulder: '54 cm',
    sleeve: '24 cm'
  }
]

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug)
}
