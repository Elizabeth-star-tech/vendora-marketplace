# Vendora — Multi-Vendor Marketplace

A fully client-side multi-vendor marketplace built during the SQrock internship as a student project deliverable. Six independent vendors sell through one storefront: customers browse, search, filter, compare across shops, and check out once.

No backend, no build step, no dependencies. Open `index.html` and it runs.

---

## What it does

| Requirement | Where it lives |
|---|---|
| Homepage with hero, featured products, top vendors, categories, offers, CTAs | `#/` |
| Vendor listing (logo, name, description, categories, ratings, product count) | `#/vendors` |
| Vendor store page (profile, store info, products, reviews, contact) | `#/vendor/v1` … `#/vendor/v6` |
| Product listing (image, vendor, category, price, stock, rating, Add to Cart) | `#/shop` |
| Product details (gallery, description, specs, vendor info, reviews, add to cart) | `#/product/p1` … `#/product/p20` |
| Shopping cart (add, remove, update qty, totals, clear) | `#/cart` |
| Search & filter (by name, vendor, category, price range, 5 sort modes) | `#/shop` |
| Checkout & order form with validation | `#/checkout` |
| Order confirmation | `#/confirm` |
| Responsive design (mobile / tablet / desktop) | CSS media queries at 1080px, 900px, 720px, 420px |

---

## Run it locally

Because the site uses hash-based routing (`#/shop`), it works even from `file://` — but a local server is cleaner. Pick whichever you have:

```bash
# Python 3 (almost always available)
python3 -m http.server 8000
# → http://localhost:8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then open the printed URL. Double-clicking `index.html` also works.

---

## Publish on GitHub Pages

### Option A — upload through the browser (no git needed)

1. Go to <https://github.com/new>.
2. **Repository name:** `vendora-marketplace` (any name works).
3. Set it to **Public** — GitHub Pages is free only for public repos on free accounts.
4. Leave "Add a README" **unchecked** (you already have one) and click **Create repository**.
5. On the empty repo page click **uploading an existing file**.
6. Drag in **the contents** of the `vendora-marketplace/` folder — `index.html`, `styles.css`, `app.js`, `data.js`, `README.md`, `LICENSE`, `.gitignore`, and the whole `images/` folder.
   > Drag the *files*, not the folder itself, so `index.html` sits at the repo root.
7. Commit message: `Initial commit`, then **Commit changes**.
8. Go to **Settings → Pages** (left sidebar).
9. Under **Build and deployment → Source**, choose **Deploy from a branch**.
10. **Branch:** `main`, **Folder:** `/ (root)` → **Save**.
11. Wait 1–2 minutes, refresh the page, and the banner shows your live URL:

```
https://<your-username>.github.io/vendora-marketplace/
```

### Option B — with git on the command line

```bash
cd vendora-marketplace
git init
git add .
git commit -m "Initial commit: Vendora multi-vendor marketplace"
git branch -M main
git remote add origin https://github.com/<your-username>/vendora-marketplace.git
git push -u origin main
```

Then follow steps 8–11 above to switch Pages on.

### Updating the site later

Edit files locally, then:

```bash
git add .
git commit -m "Update product data"
git push
```

GitHub Pages rebuilds automatically within about a minute. If you used the browser upload route, use **Add file → Upload files** to replace a file, or edit it directly in the GitHub web editor.

### Custom domain (optional)

1. In **Settings → Pages → Custom domain**, enter your domain and save. This creates a `CNAME` file in the repo.
2. At your DNS provider add:
   - `A` records for the apex domain pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a `CNAME` record for `www` pointing to `<your-username>.github.io`
3. Wait for DNS to propagate, then tick **Enforce HTTPS**.

---

## Project structure

```
vendora-marketplace/
├── index.html        # single HTML shell: nav, footer, 8 page containers
├── styles.css        # design system + responsive layout
├── app.js            # hash router, all rendering, cart, filters, checkout
├── data.js           # sample dataset: 6 vendors, 20 products, reviews
├── images/           # 16 product photos
├── README.md
├── LICENSE
└── .gitignore
```

### How the app is put together

- **`data.js`** holds `CATEGORIES`, `VENDORS`, `PRODUCTS` and `PROMOS` as plain JS objects. To change the catalogue, edit this one file — nothing else needs touching.
- **`app.js`** is a small hash router. Each route renders HTML into the matching `#page-*` container in `index.html`, then wires its events. There is no framework and no build step.
- **Cart state** lives in `localStorage` under the key `vendora-cart-v1`, so it survives a page reload. It revalidates against the product list on load, so stale entries cannot crash rendering.
- **Adding a product:** append an object to `PRODUCTS` with a unique `id`, a `vendorId` matching an entry in `VENDORS`, and an image in `images/`.

### Data model

```js
// Vendor
{ id, name, category, tagline, location, since, rating, reviewCount,
  color, initials, verified, shipsIn, responseTime, phone, email,
  address, description, reviews: [{ name, rating, date, text }] }

// Product
{ id, name, vendorId, category, price, oldPrice?, stock, rating,
  reviewCount, image, badge, short, description, specs: {…},
  reviews: [{ name, rating, date, text }] }
```

---

## Notes for submission

- All data is **fictional sample data** written for this project. Vendors, products, prices and reviews are invented; the vendor contact details are placeholders.
- Checkout is a **front-end demo**: it validates the form, computes totals, and shows a confirmation, but takes no payment and sends nothing anywhere. The cart is emptied locally on success.
- Delivery logic: free over **KES 5,000**, otherwise **KES 250**, charged once per order even when the cart spans multiple vendors.
- Stock is respected: out-of-stock items cannot be added and quantity is clamped to available stock.
- Images are stock photographs used as placeholders. Replace them with your own if this is being published publicly.

## Browser support

Modern evergreen browsers — Chrome, Edge, Firefox, Safari. Uses `localStorage`, CSS Grid, and template literals. No IE support.

## License

MIT — see `LICENSE`.
