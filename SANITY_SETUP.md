# Sanity CMS Setup Instructions

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up or log in
2. Click "Create project" in the dashboard
3. Choose a project name (e.g., "Mewzu")
4. Choose "Production" as the dataset name
5. Note down your **Project ID** (you'll see it in the project settings)

## Step 2: Get Your API Token

1. In your Sanity project dashboard, go to **API** section
2. Click **Tokens** tab
3. Click **Add API token**
4. Give it a name (e.g., "Mewzu Website")
5. Set permissions to **Editor** (allows read and write)
6. Click **Add token**
7. **IMPORTANT**: Copy the token immediately (you won't see it again!)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root with:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_TOKEN="your-api-token-here"
```

Replace:
- `your-project-id-here` with your actual Project ID
- `your-api-token-here` with the API token you copied

## Step 4: Deploy Sanity Studio

Run this command to initialize and deploy the studio:

```bash
npm run dev
```

Then visit: **http://localhost:3000/admin**

You should see the Sanity Studio interface!

## Step 5: Add Your First Product

1. Go to http://localhost:3000/admin
2. Click on **Product** in the left sidebar
3. Click **Create new**
4. Fill in the product details:
   - Name: "Test Product"
   - Click "Generate" next to Slug (it will auto-generate)
   - Tagline: "A test product"
   - Description, Scene, Story: Fill with any text
   - Colors: Enter color names
   - Sizes: Select available sizes
   - Images: Click **Upload** and add product images
     - For each image, select the View Type (front, back, detail, lifestyle)
     - Add alt text
   - Featured: Toggle if you want it on homepage
   - External Links: Add marketplace URLs if available
5. Click **Publish** in the bottom right

## Step 6: Test the Integration

Once you've added a product in Sanity Studio, visit:
- Homepage: http://localhost:3000 (if featured)
- Products page: http://localhost:3000/products

Your product should appear!

## Managing Announcements

1. In Sanity Studio (http://localhost:3000/admin)
2. Click **Announcement** in the sidebar
3. Click **Create new**
4. Fill in:
   - Title: Internal name (not shown to users)
   - Content: Your announcement message (supports formatting)
   - Type: Choose banner, modal, or section
   - Start/End Date: Optional scheduling
   - Target Pages: Where to show the announcement
   - Priority: Higher numbers show first
   - Active: Toggle to enable/disable
5. Click **Publish**

## Inviting Your Business Partner

1. Go to your Sanity project dashboard
2. Click **Project settings** → **Members**
3. Click **Invite members**
4. Enter their email address
5. Set role to **Editor** or **Administrator**
6. Click **Send invitation**

They'll receive an email to join and can access the studio at:
`http://your-website.com/admin` (or localhost:3000/admin for development)

## Troubleshooting

**Problem**: Studio shows "Invalid project ID"
- **Solution**: Double-check your `.env.local` file has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID`

**Problem**: Can't upload images
- **Solution**: Make sure your API token has **Editor** permissions

**Problem**: Changes not showing on website
- **Solution**: Wait 60 seconds (cache revalidation time) or restart the dev server

**Problem**: "Forbidden" error
- **Solution**: Check that `SANITY_API_TOKEN` is set correctly in `.env.local`

## Need Help?

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Studio Guide: https://www.sanity.io/docs/sanity-studio
- Contact developer for technical issues
