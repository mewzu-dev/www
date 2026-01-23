# Quick Start Guide - Mewzu Admin CMS

Get your admin system up and running in minutes!

## Step 1: Create Sanity Project (5 minutes)

1. Go to **https://sanity.io** and sign up/log in
2. Click **"Create project"**
3. Project name: `Mewzu` (or your choice)
4. Dataset: Choose **"Production"**
5. Copy your **Project ID** (looks like: `abc12345`)

## Step 2: Get API Token (2 minutes)

1. In Sanity dashboard, go to **API** tab
2. Click **"Tokens"** → **"Add API token"**
3. Name: `Mewzu Website`
4. Permissions: **Editor**
5. Click **"Add token"**
6. **Copy the token immediately** (you won't see it again!)

## Step 3: Configure Environment (1 minute)

Create a file named `.env.local` in your project root:

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_TOKEN="your-token-here"
```

Replace:
- `your-project-id-here` with your Project ID from Step 1
- `your-token-here` with your API token from Step 2

## Step 4: Start the App (1 minute)

```bash
npm run dev
```

Visit:
- **Admin Studio**: http://localhost:3000/admin
- **Website**: http://localhost:3000

## Step 5: Add Your First Product (5 minutes)

1. Go to http://localhost:3000/admin
2. Click **"Product"** in sidebar
3. Click **"Create new"** button
4. Fill in the form:
   - Name: `Test Product`
   - Click **"Generate"** next to Slug
   - Fill in Tagline, Description, Scene, Story
   - Enter Base Color and Art Color
   - Select Available Sizes
   - Upload at least one image (set View Type)
   - Toggle **Featured** if you want it on homepage
5. Click **"Publish"** (bottom right)

## Step 6: See It Live!

Visit http://localhost:3000 - your product should appear!

## Step 7: Create an Announcement (3 minutes)

1. Go to http://localhost:3000/admin
2. Click **"Announcement"** in sidebar
3. Click **"Create new"**
4. Fill in:
   - Title: `Welcome!` (internal name)
   - Content: `🎉 Welcome to our new website!`
   - Type: **Banner**
   - Active: **ON**
5. Click **"Publish"**

Refresh your website - you'll see a banner at the top!

## Next Steps

✅ You're all set! Now:

1. **Migrate existing products** - See `MIGRATION_GUIDE.md`
2. **Share with business partner** - Give them `USER_GUIDE.md`
3. **Invite team members** - In Sanity dashboard → Members
4. **Explore features** - Try editing, deleting, scheduling

## Need Help?

- **User Guide**: Full instructions in `USER_GUIDE.md`
- **Setup Issues**: Check `SANITY_SETUP.md`
- **Complete Overview**: See `ADMIN_SETUP_COMPLETE.md`

## Troubleshooting

**Can't access /admin?**
- Check `.env.local` file exists
- Verify Project ID and Token are correct
- Restart: `npm run dev`

**Changes not showing?**
- Wait 60 seconds
- Make sure you clicked "Publish"
- Refresh browser (Ctrl+F5)

**Still stuck?**
- Read `ADMIN_SETUP_COMPLETE.md` → Troubleshooting section

---

**Total setup time**: ~15 minutes  
**You're ready to manage your store without code!** 🚀
