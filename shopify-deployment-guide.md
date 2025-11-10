# Kubox Order Flow - Shopify Deployment Guide

## Option 1: Deploy as a Custom Page (Easiest)

### Step 1: Upload Assets
1. Go to Shopify Admin → Online Store → Themes → Actions → Edit code
2. Upload the logo: `assets/kubox-logo.png`
3. Upload the rating SVG: `assets/average-rating.svg`
4. Upload any other images from the `assets/` folder

### Step 2: Create a New Page Template
1. In the theme editor, go to `Templates` folder
2. Click "Add a new template" → Select "page"
3. Name it: `page.order-flow.liquid`
4. Copy the entire content from `index.html` into this template
5. Replace the Shopify API calls to use Liquid variables:
   - Replace `kubox-7291.myshopify.com` with `{{ shop.permanent_domain }}`
   - Use Shopify's built-in product fetching instead of API calls

### Step 3: Create the Page
1. Go to Shopify Admin → Online Store → Pages
2. Click "Add page"
3. Title: "Order Your Storage"
4. In the template selector (right sidebar), choose "order-flow"
5. Save and publish

### Step 4: Update Navigation
1. Go to Navigation → Main menu
2. Add a link to your new page

---

## Option 2: Deploy as a Shopify App (Advanced)

This requires creating a Shopify app with embedded checkout.

---

## Option 3: Use Shopify's Custom Storefront (Headless)

Deploy the `index.html` as a separate website and use Shopify's Storefront API.

### Steps:
1. **Deploy to Netlify/Vercel:**
   - Push your code to GitHub
   - Connect to Netlify or Vercel
   - Deploy

2. **Update CORS Settings:**
   - In Shopify Admin → Apps → Develop apps
   - Configure Storefront API access
   - Add your deployment URL to allowed origins

3. **Link from Shopify:**
   - Add a link in your Shopify navigation to the deployed URL

---

## Recommended Approach for You:

Since you want to publish directly to your Shopify URL, I recommend **Option 1** with a modification:

### Quick Deploy Steps:

1. **Copy the HTML content** from `index.html`
2. **Create a new page** in Shopify Admin
3. **Use the HTML editor** (click "Show HTML" in the page editor)
4. **Paste the content**
5. **Update asset URLs** to point to Shopify CDN

Would you like me to create a ready-to-paste version for Shopify's page editor?
