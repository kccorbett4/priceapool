# PriceAPool.com — Pool Cost Calculator

Free 2026 pool cost calculator with state-by-state pricing, soil adjustments, and 50 SEO landing pages.

---

## 🚀 Deploy in 15 Minutes (Step by Step)

### Step 1: Install Node.js (if you don't have it)

**Mac:**
```bash
# If you have Homebrew:
brew install node

# Or download from https://nodejs.org (LTS version)
```

**Windows:**
Download from https://nodejs.org (LTS version), run the installer.

Verify it works:
```bash
node --version    # should show v18+ or v20+
npm --version     # should show 9+ or 10+
```

---

### Step 2: Create a GitHub Account & Repository

1. Go to https://github.com → Sign up (free)
2. Click the green **"New"** button (top left)
3. Repository name: `priceapool`
4. Keep it **Public**
5. Click **Create repository**
6. Don't add any files yet — leave it empty

---

### Step 3: Download This Project & Push to GitHub

```bash
# Clone or download this folder, then cd into it:
cd priceapool

# Install dependencies
npm install

# Test it locally
npm run dev
# → Opens at http://localhost:5173 — make sure it works!

# Now push to GitHub:
git init
git add .
git commit -m "initial pool cost calculator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/priceapool.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 4: Deploy on Vercel (Free)

1. Go to https://vercel.com → **Sign up with GitHub**
2. Click **"Add New Project"**
3. It shows your GitHub repos → Click **Import** next to `priceapool`
4. Framework Preset: **Vite** (should auto-detect)
5. Click **Deploy**
6. Wait ~60 seconds → You're live at `priceapool.vercel.app`!

---

### Step 5: Buy Your Domain

1. Go to https://domains.cloudflare.com
2. Search for `priceapool.com` → Register it (~$10-12/yr)
3. (Optional) Also register `

---

### Step 6: Connect Domain to Vercel

1. In Vercel dashboard → Your project → **Settings** → **Domains**
2. Type `priceapool.com` → Click **Add**
3. Vercel shows you DNS records (usually a CNAME or A record)
4. Go to Cloudflare dashboard → DNS → Add the records Vercel gave you
5. Wait 5-10 minutes for DNS propagation
6. SSL is automatic — your site is live at https://priceapool.com!

---

### Step 7: Submit to Google Search Console (Free)

1. Go to https://search.google.com/search-console
2. Add property → Enter `https://priceapool.com`
3. Verify ownership (Vercel/Cloudflare DNS verification is easiest)
4. Go to **Sitemaps** → Submit: `https://priceapool.com/sitemap.xml`
5. Google will start crawling your 51 pages (home + 50 states)

---

## ✏️ How to Make Changes

### The easy way (no terminal):
1. Go to your repo on GitHub.com
2. Navigate to `src/App.jsx`
3. Click the pencil icon to edit
4. Paste in updated code
5. Click **Commit changes**
6. Vercel auto-deploys in ~30 seconds

### The terminal way:
```bash
cd priceapool
# Make your changes to src/App.jsx
git add .
git commit -m "description of change"
git push
# Vercel auto-deploys
```

### Getting help from Claude:
1. Tell Claude what you want changed
2. Claude gives you the updated file
3. Replace `src/App.jsx` using either method above
4. Done — live in 30 seconds

---

## 📁 Project Structure

```
priceapool/
├── index.html          ← SEO meta tags, OG tags, structured data (FAQ schema)
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
├── vercel.json         ← SPA routing + security headers
├── public/
│   ├── favicon.svg     ← Browser tab icon
│   ├── robots.txt      ← Tells Google to crawl everything
│   └── sitemap.xml     ← All 51 pages listed for Google
└── src/
    ├── main.jsx        ← Entry point + React Router
    ├── App.jsx         ← The pool cost calculator (main file)
    └── StatePage.jsx   ← Wrapper for /state-name URLs (sets SEO meta)
```

---

## 🔍 SEO Features Included

- **51 indexable pages**: Homepage + 50 state-specific landing pages
- **Unique titles & meta descriptions** per state page
- **FAQ structured data** (JSON-LD) → Rich snippets in Google
- **WebApplication schema** → Tool markup for Google
- **Open Graph + Twitter Cards** → Looks great when shared
- **Sitemap.xml** → Pre-built with all pages
- **Canonical URLs** → Prevents duplicate content
- **Fast Core Web Vitals** → Static React on Vercel CDN

---

## 💰 Total Cost

| Item | Cost |
|------|------|
| priceapool.com domain | ~$10-12/yr |
| Vercel hosting | $0 (free tier) |
| GitHub | $0 (free) |
| SSL certificate | $0 (automatic) |
| **Total** | **~$10-12/year** |
