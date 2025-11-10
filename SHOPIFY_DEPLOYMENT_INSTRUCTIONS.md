# Kubox Order Flow - Shopify Deployment Instructions

## Quick Deploy to Shopify (Easiest Method)

Since the full HTML file is too large to paste directly into a Shopify page, here's the recommended approach:

### Option 1: Deploy as a Custom Theme Section (RECOMMENDED)

1. **Upload Assets First:**
   - Go to Shopify Admin → Online Store → Themes → Actions → Edit code
   - Navigate to `Assets` folder
   - Upload these files:
     - `assets/kubox-logo.png`
     - `assets/average-rating.svg`
     - All images from `assets/` folder

2. **Create a New Page Template:**
   - In theme editor, go to `Templates` → Add new template → page
   - Name it: `page.order-flow`
   - Copy the ENTIRE content from `index.html`
   - Save

3. **Create the Page:**
   - Go to Shopify Admin → Online Store → Pages
   - Click "Add page"
   - Title: "Order Your Storage"
   - In template dropdown (right sidebar), select "page.order-flow"
   - Save

4. **Update the Shopify API Endpoint:**
   - Since you're now on Shopify's domain, you need to update the API calls
   - The current code uses `/api/shopify/products` which requires the Node.js server
   - For Shopify pages, you'll need to use Shopify's Liquid to fetch products OR use the Storefront API directly

### Option 2: Use Shopify CLI (Professional Approach)

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Navigate to your project
cd /Users/ats/Downloads/shopify_theme_starter

# Login to Shopify
shopify auth login

# Push theme to Shopify
shopify theme push

# Or develop locally with live preview
shopify theme dev
```

### Option 3: Embed as an iFrame (Quick & Easy)

1. **Deploy your current site to Netlify/Vercel:**
   - Push code to GitHub
   - Connect to Netlify (free)
   - Deploy

2. **Embed in Shopify Page:**
   - Create a new page in Shopify
   - Use HTML editor
   - Add iframe:
   ```html
   <iframe src="YOUR_NETLIFY_URL" width="100%" height="2000px" frameborder="0"></iframe>
   ```

## What I Recommend for You:

Since you want it published on your Shopify URL quickly, I recommend **Option 3 (iFrame method)** because:

1. ✅ No code changes needed
2. ✅ Works immediately
3. ✅ Easy to update (just update the deployed site)
4. ✅ Checkout still works with Shopify

### Quick Steps for iFrame Method:

1. Deploy to Netlify (5 minutes)
2. Get the URL
3. Create Shopify page with iframe
4. Done!

Would you like me to:
- Help you deploy to Netlify?
- Create a Shopify-native version (requires more work)?
- Set up Shopify CLI deployment?
