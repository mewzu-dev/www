# Migration Guide: Moving Existing Products to Sanity

This guide will help you migrate your existing 3 products from the hardcoded data to Sanity CMS.

## Prerequisites

1. You've completed the Sanity setup (see SANITY_SETUP.md)
2. You have your `.env.local` file configured with Sanity credentials
3. You can access the Sanity Studio at http://localhost:3000/admin

## Current Products to Migrate

Your existing products are in `src/lib/data/products.ts`:
1. **Bathroom Blues**
2. **Kitchen Tales**
3. **Garden Dreams**

## Migration Steps

### Option 1: Manual Migration (Recommended for Learning)

This is the best option if you want your business partner to get familiar with the Sanity Studio interface.

#### For Each Product:

1. **Open Sanity Studio**
   - Go to http://localhost:3000/admin
   - Click on "Product" in the left sidebar
   - Click "Create new" button

2. **Fill in Product Details**

   **For "Bathroom Blues":**
   - Name: `Bathroom Blues`
   - Slug: Click "Generate" (will create `bathroom-blues`)
   - Tagline: `A feline's contemplative morning routine`
   - Description: `Our signature cat finds serenity in an unexpected place – a pristine white bathroom. Through gentle blue linework, watch as this thoughtful feline ponders life's mysteries during their morning ritual. A humorous yet peaceful design that celebrates those quiet moments of reflection.`
   - Scene: `Bathroom`
   - Story: `Even cats need their morning meditation time. This design captures those universal moments of bathroom contemplation that every living being experiences. The bathroom becomes a sanctuary, a place of peace and introspection. The gentle blue tones create a serene, calming atmosphere that contrasts beautifully with the white space.`
   - Base Color: `Natural Cream`
   - Art Color: `Sky Blue`
   - Available Sizes: Check `S`, `M`, `L`, `XL`, `XXL`
   - Featured Product: Toggle ON (✓)
   - Images: 
     - Upload front and back images (currently placeholder, you'll need real images)
     - For each image, set View Type: "front" or "back"
     - Add Alt Text: e.g., "Bathroom Blues t-shirt - back view"
   - External Links: (Add if available)
     - Platform: Shopee/TikTok/WhatsApp
     - URL: Your marketplace URL
     - Available: Toggle ON

   **For "Kitchen Tales":**
   - Name: `Kitchen Tales`
   - Slug: Click "Generate" (will create `kitchen-tales`)
   - Tagline: `Culinary adventures from a curious perspective`
   - Description: `Join our beloved cat as they explore the heart of the home – the kitchen. Rendered in warm orange tones on a soft beige canvas, this design celebrates curiosity, cooking, and those precious moments spent preparing meals. Perfect for food lovers and cat enthusiasts alike.`
   - Scene: `Kitchen`
   - Story: `The kitchen is where magic happens – where ingredients transform into meals, where families gather, where cats inevitably investigate every counter and cabinet. This design captures that playful curiosity and warmth that fills a kitchen when cooking. The orange linework adds energy and appetite to the composition.`
   - Base Color: `Soft Beige`
   - Art Color: `Warm Orange`
   - Available Sizes: Check `S`, `M`, `L`, `XL`, `XXL`
   - Featured Product: Toggle ON (✓)
   - Images: Upload and configure as above
   - External Links: (Add if available)

   **For "Garden Dreams":**
   - Name: `Garden Dreams`
   - Slug: Click "Generate" (will create `garden-dreams`)
   - Tagline: `Nature's paradise through feline eyes`
   - Description: `Step into a verdant garden paradise where our cat discovers the joys of nature. Illustrated with fresh green lines on pristine white, this design captures the wonder of outdoor exploration, from investigating flower beds to basking in the sun. A tribute to the simple pleasures of a garden adventure.`
   - Scene: `Garden`
   - Story: `Gardens are playgrounds of endless discovery – each plant a mystery to investigate, each butterfly a new friend to chase, each sunny spot perfect for a nap. This design celebrates the connection between cats and nature, that instinctual love for the outdoors even in the most domestic of felines. The green artwork evokes growth, freshness, and natural tranquility.`
   - Base Color: `Pure White`
   - Art Color: `Forest Green`
   - Available Sizes: Check `S`, `M`, `L`, `XL`, `XXL`
   - Featured Product: Toggle ON (✓)
   - Images: Upload and configure as above
   - External Links: (Add if available)

3. **Publish Each Product**
   - After filling in all fields, click the "Publish" button in the bottom right
   - You should see a success message

4. **Verify on Website**
   - Visit http://localhost:3000
   - Your product should appear on the homepage (if featured)
   - Visit http://localhost:3000/products
   - Your product should appear in the products grid
   - Click on the product to see the detail page

### Option 2: Programmatic Migration (Advanced)

If you have many products or want to automate this, you can use the Sanity CLI:

1. **Create a migration script** (example in `scripts/migrate-products.js`):

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
      // Note: Images need to be uploaded separately as assets
      externalLinks: product.externalLinks,
    }

    try {
      const result = await client.create(doc)
      console.log(`Migrated product: ${product.name}`)
    } catch (error) {
      console.error(`Error migrating ${product.name}:`, error)
    }
  }
}

migrateProducts()
```

2. **Run the script**:
```bash
node scripts/migrate-products.js
```

**Note**: This script doesn't handle images. You'll still need to upload images manually through the Studio.

## After Migration

Once all products are in Sanity:

1. **Verify Everything Works**
   - Check homepage shows featured products
   - Check /products page shows all products
   - Check individual product pages work
   - Verify images load correctly

2. **You Can Now Delete or Archive the Old Data File**
   - The file `src/lib/data/products.ts` is no longer used
   - You can keep it for reference or delete it

3. **Train Your Business Partner**
   - Show them how to add a new product
   - Show them how to edit existing products
   - Show them how to toggle featured status
   - Show them how to upload/replace images

## Tips for Your Business Partner

1. **Always click "Publish" after making changes** - Changes are not visible until published
2. **Use the "Generate" button for slugs** - This ensures URL-friendly slugs
3. **Fill in all required fields** - Fields marked with * are mandatory
4. **Add descriptive alt text to images** - Important for SEO and accessibility
5. **Use the preview pane** - Sanity shows a preview on the right side while editing
6. **Don't worry about mistakes** - You can always edit or delete products later

## Troubleshooting

**Q: Products not showing on the website?**
- Wait 60 seconds (cache revalidation time)
- Check that products are "Published" not "Draft"
- Restart the dev server: `npm run dev`

**Q: Images not displaying?**
- Make sure images are uploaded as "image" type, not "file"
- Check image URLs in Sanity Studio
- Verify `next.config.ts` has remote patterns configured

**Q: Slug already exists error?**
- Slugs must be unique
- Use the "Generate" button or modify manually
- Check if a product with that slug already exists

## Need Help?

- Sanity Documentation: https://www.sanity.io/docs
- Contact your developer for technical assistance
