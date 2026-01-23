# Mewzu Admin User Guide

**Welcome!** This guide will help you manage products and announcements on the Mewzu website without any technical knowledge.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Managing Products](#managing-products)
3. [Managing Announcements](#managing-announcements)
4. [Tips & Best Practices](#tips--best-practices)
5. [Common Questions](#common-questions)

---

## Getting Started

### Accessing the Admin Panel

1. Open your web browser
2. Go to your website URL followed by `/admin`
   - Development: `http://localhost:3000/admin`
   - Production: `https://your-website.com/admin`
3. Log in with your Sanity account credentials

### The Sanity Studio Interface

When you open the admin panel, you'll see:
- **Left Sidebar**: Shows all content types (Product, Announcement)
- **Center Area**: Your main workspace for creating/editing content
- **Right Panel**: Preview of your content (when available)
- **Bottom Right**: Publish button and status

---

## Managing Products

### Adding a New Product

1. **Click "Product"** in the left sidebar
2. **Click the "Create new" button** (looks like a plus icon)
3. **Fill in the product information:**

#### Required Fields (marked with *)

**Product Name**
- The name of your t-shirt design
- Example: "Coffee Shop Chronicles"

**Slug**
- The URL-friendly version of your product name
- Click the "Generate" button next to it
- It will automatically create a slug from your product name
- Example: "coffee-shop-chronicles"

**Tagline**
- A short catchy phrase (one line)
- Example: "Morning rituals and caffeine dreams"

**Description**
- A paragraph describing the design
- Appears on the product page
- Example: "Watch our beloved cat explore a cozy coffee shop..."

**Scene**
- The location/setting of the design
- Example: "Coffee Shop"

**Story**
- The story behind the design (2-3 paragraphs)
- Share the inspiration and meaning
- This helps customers connect with the design

**Base Color**
- The main color of the t-shirt
- Example: "Warm Brown" or "Charcoal Gray"

**Art Color**
- The primary color of the artwork/illustration
- Example: "Golden Yellow" or "Deep Brown"

**Available Sizes**
- Click to select which sizes you have in stock
- Check all that apply: XS, S, M, L, XL, XXL

**Product Images** ⭐ Important!
- Click "Upload" to add images
- You need at least one image
- For each image:
  - Upload the image file
  - Add "Alt Text" (description of the image)
  - Select "View Type":
    - **Front**: Front of the t-shirt
    - **Back**: Back of the t-shirt (main design)
    - **Detail**: Close-up of the artwork
    - **Lifestyle**: Person wearing the t-shirt
- Recommended: At least have Front and Back views

#### Optional Fields

**Featured Product**
- Toggle this ON if you want the product on the homepage
- Only feature your best/newest products
- Recommended: Feature 3-6 products at most

**External Marketplace Links**
- Add links to where customers can buy this product
- Click "Add item" to add a link
- For each link:
  - Select **Platform**: Shopee, TikTok Shop, or WhatsApp
  - Enter the **URL**: Copy-paste the product link
  - Toggle **Available**: ON if currently in stock, OFF if sold out

4. **Preview Your Product**
   - Look at the right panel to see a preview
   - Make sure everything looks correct

5. **Publish**
   - Click the "Publish" button in the bottom right corner
   - Your product is now live on the website!
   - It may take up to 60 seconds to appear

### Editing an Existing Product

1. **Click "Product"** in the left sidebar
2. **Find and click the product** you want to edit
3. **Make your changes**
4. **Click "Publish"** to save and update the website

### Deleting a Product

1. **Open the product** you want to delete
2. **Click the three dots menu** (⋯) in the top right
3. **Select "Delete"**
4. **Confirm** the deletion
5. The product will be removed from the website

### Changing Product Order

Products are automatically sorted by creation date (newest first). To change which products appear on the homepage, use the "Featured Product" toggle.

---

## Managing Announcements

Announcements allow you to communicate with website visitors. There are two types:

### Types of Announcements

**Banner**: Shows at the top of the website (above the menu)
- Best for: Sales, shipping updates, important notices
- Visibility: High - everyone sees it
- Can be dismissed by users

**Modal**: Popup that appears when users visit
- Best for: New collections, special events, major announcements
- Visibility: Very high - appears in center of screen
- Appears 1 second after page loads

### Creating an Announcement

1. **Click "Announcement"** in the left sidebar
2. **Click "Create new"**
3. **Fill in the information:**

#### Required Fields

**Title**
- Internal name for your reference only
- Not shown to customers
- Example: "Summer Sale 2024" or "New Collection Launch"

**Content**
- The actual message shown to customers
- Use the text editor:
  - Select text and click **Bold** or *Italic* to format
  - Click the link icon to add clickable links
  - Keep it short and clear

**Announcement Type**
- Choose: Banner or Modal
- See descriptions above

#### Optional Fields

**Start Date**
- When should this announcement start showing?
- Leave empty to show immediately
- Useful for scheduling announcements in advance

**End Date**
- When should this announcement stop showing?
- Leave empty to show indefinitely (until you disable it)
- Great for time-limited promotions

**Target Pages**
- Where should this announcement appear?
- Options:
  - **All Pages**: Shows everywhere (recommended for important news)
  - **Homepage**: Only on the home page
  - **Products Page**: Only on /products
  - **About Page**: Only on /about
  - **Contact Page**: Only on /contact
- Leave empty to show on all pages

**Priority**
- Number from 0-100
- Higher numbers show first
- Use when you have multiple active announcements
- Default: 0 (usually fine)

**Active**
- Toggle ON to enable the announcement
- Toggle OFF to disable without deleting
- Useful for reusing seasonal announcements

4. **Publish**
   - Click "Publish" in the bottom right
   - Your announcement is now live!

### Example Announcements

**Banner - Free Shipping:**
```
Content: "🎉 Free shipping on all orders this week! Use code: FREESHIP"
Type: Banner
Target Pages: All Pages
Active: ON
```

**Modal - New Collection:**
```
Title: "Spring 2024 Launch"
Content: "Check out our brand new Spring Collection! Three new designs featuring cats in gardens and parks. Shop now →"
Type: Modal
Target Pages: Homepage
Active: ON
```

**Banner - Holiday Schedule:**
```
Content: "⚠️ Holiday Notice: Orders placed Dec 24-26 will ship on Dec 27"
Type: Banner
Start Date: Dec 22, 2024
End Date: Dec 27, 2024
Active: ON
```

### Editing/Disabling Announcements

1. **Click "Announcement"** in the left sidebar
2. **Click the announcement** you want to change
3. **To disable**: Toggle "Active" to OFF and click Publish
4. **To edit**: Make changes and click Publish
5. **To delete**: Click the three dots menu (⋯) → Delete

---

## Tips & Best Practices

### For Products

✅ **DO:**
- Use high-quality, clear images (at least 1000x1000 pixels)
- Write descriptive, engaging product stories
- Add alt text to all images (helps with SEO and accessibility)
- Keep 3-6 products featured on the homepage
- Update external links when products sell out
- Use consistent photography style across products

❌ **DON'T:**
- Forget to click "Publish" after making changes
- Feature too many products (dilutes impact)
- Use blurry or low-resolution images
- Leave alt text empty
- Create duplicate slugs (must be unique)

### For Announcements

✅ **DO:**
- Keep messages short and clear
- Set end dates for time-limited promotions
- Use banners for important updates
- Use modals sparingly (they're intrusive)
- Test on your phone and computer

❌ **DON'T:**
- Have too many active announcements (max 2-3)
- Use ALL CAPS (seems like shouting)
- Forget to disable old announcements
- Make modal announcements too long

### General Tips

1. **Always Preview**: Look at the preview pane before publishing
2. **Check Your Work**: Visit the actual website to verify changes
3. **Be Patient**: Changes take up to 60 seconds to appear
4. **Mobile Check**: View your website on a phone after major changes
5. **Regular Updates**: Keep product availability and links current
6. **Backup Photos**: Keep original product photos in a safe place

---

## Common Questions

**Q: I made changes but don't see them on the website?**
- Wait 60 seconds and refresh the page
- Make sure you clicked "Publish" (not just save draft)
- Try clearing your browser cache (Ctrl+F5 or Cmd+Shift+R)

**Q: Can I undo a change?**
- Yes! Click the clock icon (⏱) to see version history
- Select a previous version to restore

**Q: How do I add a product video?**
- Currently, only images are supported
- You can add a YouTube link in the product description

**Q: Can I change a product's slug after publishing?**
- Yes, but it will break existing links and Google results
- Only do this if absolutely necessary

**Q: What image format should I use?**
- JPG or PNG are best
- Sanity will automatically optimize them

**Q: How many products can I have?**
- No limit! Add as many as you want

**Q: Can I schedule announcements in advance?**
- Yes! Set a Start Date in the future
- The announcement will automatically appear on that date

**Q: What happens if I delete a product by mistake?**
- Contact your developer - they may be able to restore it
- This is why it's good to think twice before deleting

**Q: Can I change the website design/layout?**
- No, that requires a developer
- You can only manage content (products and announcements)

**Q: How do I add a new page to the website?**
- That requires developer help
- Focus on managing existing products and announcements

**Q: Can customers buy directly from the website?**
- Currently no - they click links to external marketplaces
- This is by design (you sell on Shopee, TikTok, etc.)

---

## Need Help?

If you encounter any issues:

1. **Check this guide first** - Most questions are answered here
2. **Try refreshing the page** - Solves many temporary issues
3. **Contact your developer** - For technical problems
4. **Sanity Help Center** - https://www.sanity.io/help

---

## Quick Reference Card

Print or bookmark this for quick access:

### Adding a Product
1. Product → Create new
2. Fill required fields (*)
3. Upload images (front & back minimum)
4. Click "Generate" for slug
5. Publish

### Creating a Banner Announcement
1. Announcement → Create new
2. Title (your reference)
3. Content (the message)
4. Type: Banner
5. Active: ON
6. Publish

### Disabling an Announcement
1. Announcement → Select it
2. Active: Toggle OFF
3. Publish

### Common Buttons
- **Publish**: Save and make live
- **Generate**: Auto-create slug
- **Add item**: Add to a list
- **Upload**: Add image
- **⋯ (three dots)**: More options menu

---

**Version 1.0** - Created January 2026
*This guide will be updated as new features are added*
