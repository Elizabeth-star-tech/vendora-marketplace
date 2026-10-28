/* ============================================================
   Vendora Marketplace — application logic
   Hash router + rendering + cart + filters + checkout
   ============================================================ */

/* ---------- helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const money = n => "KES " + n.toLocaleString("en-KE");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const vendorOf = id => VENDORS.find(v => v.id === id);
const productOf = id => PRODUCTS.find(p => p.id === id);
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || id;

const ICONS = {
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  cart: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  verified: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8l2.6 2 3.3-.3 1 3.1 2.8 1.8-1.2 3.1 1.2 3.1-2.8 1.8-1 3.1-3.3-.3-2.6 2-2.6-2-3.3.3-1-3.1L2.3 15l1.2-3.1L2.3 8.8l2.8-1.8 1-3.1 3.3.3z"/><path d="M8.4 12.2l2.4 2.4 4.8-4.8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>',
  clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  truck: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h13v13H1z"/><path d="M14 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/></svg>',
  shield: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3.5v6c0 5-3.4 9.3-8 10.5-4.6-1.2-8-5.5-8-10.5v-6z"/><path d="M9 12l2 2 4-4"/></svg>',
  refresh: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
  arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  filter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M7 12h10M11 18h2"/></svg>',
  headphones: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17v-5a9 9 0 0 1 18 0v5"/><rect x="1.5" y="14" width="4.5" height="7" rx="2"/><rect x="18" y="14" width="4.5" height="7" rx="2"/></svg>',
  home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
  shirt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l4 3 4-3 5 3-2 5-2-1v12H7V9L5 10 3 5z"/></svg>',
  droplet: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/></svg>',
  activity: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-8 5 16 3-8h5"/></svg>',
  book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4z"/><path d="M20 4h-3a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20z"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/></svg>'
};

function stars(rating, count) {
  let out = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    out += `<span class="${i <= Math.round(rating) ? "" : "empty"}">${ICONS.star}</span>`;
  }
  out += "</span>";
  if (count !== undefined) out += `<span>${rating.toFixed(1)} (${count})</span>`;
  return out;
}

/* ---------- cart state ---------- */
const CART_KEY = "vendora-cart-v1";
let cart = [];

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    cart = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(cart)) cart = [];
    cart = cart.filter(i => productOf(i.id));
  } catch (e) { cart = []; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  syncCartUI();
}
function cartCount() { return cart.reduce((n, i) => n + i.qty, 0); }
function cartSubtotal() {
  return cart.reduce((n, i) => {
    const p = productOf(i.id);
    return n + (p ? p.price * i.qty : 0);
  }, 0);
}
const SHIP_FREE_OVER = 5000;
const SHIP_FEE = 250;
function shippingFee() {
  const s = cartSubtotal();
  if (s === 0) return 0;
  return s >= SHIP_FREE_OVER ? 0 : SHIP_FEE;
}
function cartTotal() { return cartSubtotal() + shippingFee(); }

function addToCart(id, qty = 1) {
  const p = productOf(id);
  if (!p) return;
  if (p.stock === 0) { toast("That item is out of stock"); return; }
  const line = cart.find(i => i.id === id);
  const max = p.stock;
  if (line) {
    line.qty = Math.min(line.qty + qty, max);
  } else {
    cart.push({ id, qty: Math.min(qty, max) });
  }
  saveCart();
  toast(`${p.name} added to cart`);
}
function setQty(id, qty) {
  const p = productOf(id);
  const line = cart.find(i => i.id === id);
  if (!line || !p) return;
  const q = Math.max(1, Math.min(parseInt(qty, 10) || 1, p.stock));
  line.qty = q;
  saveCart();
  if (location.hash.startsWith("#/cart")) renderCart();
  if (location.hash.startsWith("#/checkout")) renderCheckout();
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  toast("Item removed");
}
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  toast("Cart cleared");
}

function syncCartUI() {
  const n = cartCount();
  $$(".cart-count").forEach(el => {
    el.textContent = n;
    el.dataset.empty = n === 0 ? "true" : "false";
  });
}

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.innerHTML = ICONS.check + "<span>" + esc(msg) + "</span>";
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- product card ---------- */
function productCard(p) {
  const v = vendorOf(p.vendorId);
  const oos = p.stock === 0;
  const low = p.stock > 0 && p.stock <= 8;
  let badge = "";
  if (p.badge) {
    const cls = /save|%/i.test(p.badge) ? "rose" : (/best|bundle|staff|limited/i.test(p.badge) ? "amber" : "");
    badge = `<span class="pc-badge ${cls}">${esc(p.badge)}</span>`;
  }
  return `
  <article class="product-card">
    <div class="pc-media">
      <a href="#/product/${p.id}" aria-label="${esc(p.name)}">
        <img src="${p.image}" alt="${esc(p.name)}" loading="lazy" width="400" height="400">
      </a>
      ${badge}
      ${oos ? '<div class="pc-oos">Out of stock</div>' : ""}
    </div>
    <div class="pc-body">
      <a class="pc-vendor" href="#/vendor/${v.id}">${esc(v.name)}</a>
      <h3 class="pc-name"><a href="#/product/${p.id}">${esc(p.name)}</a></h3>
      <div class="pc-meta">${stars(p.rating)}<span>${p.rating.toFixed(1)}</span><span>·</span><span>${esc(catName(p.category))}</span></div>
      <div class="pc-price-row">
        <span class="pc-price">${money(p.price)}</span>
        ${p.oldPrice ? `<span class="pc-old">${money(p.oldPrice)}</span>` : ""}
      </div>
      <button class="btn btn-primary btn-sm btn-block pc-add" data-add="${p.id}" ${oos ? "disabled" : ""}>
        ${oos ? "Out of stock" : (low ? "Add to cart · low stock" : "Add to cart")}
      </button>
    </div>
  </article>`;
}

function vendorCard(v) {
  const count = PRODUCTS.filter(p => p.vendorId === v.id).length;
  return `
  <article class="vendor-card">
    <div class="vc-top">
      <div class="vc-logo" style="background:${v.color}">${esc(v.initials)}</div>
      <div>
        <h3 class="vc-name">${esc(v.name)} ${v.verified ? `<span class="vc-verified" title="Verified vendor">${ICONS.verified}</span>` : ""}</h3>
        <div class="vc-loc">${esc(v.location)}</div>
      </div>
    </div>
    <p class="vc-desc">${esc(v.tagline)}</p>
    <div class="vc-foot">
      <span class="stat">${stars(v.rating)} <strong>${v.rating.toFixed(1)}</strong> (${v.reviewCount})</span>
      <span class="stat"><strong>${count}</strong> products</span>
    </div>
    <a class="btn btn-ghost btn-sm btn-block" style="margin-top:14px" href="#/vendor/${v.id}">Visit store ${ICONS.arrow}</a>
  </article>`;
}

/* ---------- HOME ---------- */
function renderHome() {
  const featured = ["p1", "p5", "p10", "p13", "p15", "p17", "p9", "p11"].map(productOf).filter(Boolean);
  const topVendors = [...VENDORS].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const heroImgs = ["images/headphones.jpg", "images/vase.jpg", "images/tshirt.jpg", "images/serum.jpg"];

  return `
  <section class="hero">
    <div class="wrap hero-inner">
      <div>
        <span class="eyebrow">Multi-vendor marketplace</span>
        <h1 class="h1">One cart.<br><em>Six</em> independent shops.</h1>
        <p class="lede">Vendora brings Nairobi's best small makers and specialist stores onto a single storefront. Browse by category, compare across vendors, and check out once — every seller ships their own order.</p>
        <div class="hero-cta">
          <a class="btn btn-amber" href="#/shop">Shop all products ${ICONS.arrow}</a>
          <a class="btn btn-ghost" style="border-color:rgba(255,255,255,.28);color:#fff" href="#/vendors">Browse vendors</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><strong>${VENDORS.length}</strong><span>VERIFIED VENDORS</span></div>
          <div class="hero-stat"><strong>${PRODUCTS.length}</strong><span>PRODUCTS LISTED</span></div>
          <div class="hero-stat"><strong>4.7</strong><span>AVERAGE RATING</span></div>
          <div class="hero-stat"><strong>1–4</strong><span>DAY DELIVERY</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-grid">
          ${heroImgs.map((src, i) => `<div class="hero-tile"><img src="${src}" alt="Featured product ${i + 1}" width="300" height="300"></div>`).join("")}
        </div>
        <div class="hero-float">
          <span class="dot"></span>
          <div><strong>Free delivery over ${money(SHIP_FREE_OVER)}</strong><span>Within Nairobi metro</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">Browse</span>
          <h2 class="h2" style="margin-top:8px">Shop by category</h2>
        </div>
        <a class="btn btn-ghost btn-sm" href="#/shop">All products ${ICONS.arrow}</a>
      </div>
      <div class="cat-grid">
        ${CATEGORIES.map(c => {
          const n = PRODUCTS.filter(p => p.category === c.id).length;
          return `<a class="cat-card" href="#/shop?cat=${c.id}">
            <div class="cat-icon">${ICONS[c.icon] || ICONS.book}</div>
            <h4>${esc(c.name)}</h4>
            <p>${n} product${n === 1 ? "" : "s"}</p>
          </a>`;
        }).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">Handpicked</span>
          <h2 class="h2" style="margin-top:8px">Featured products</h2>
          <p class="lede">The pieces our vendors sell most, across every category.</p>
        </div>
        <a class="btn btn-ghost btn-sm" href="#/shop">View all ${ICONS.arrow}</a>
      </div>
      <div class="product-grid">${featured.map(productCard).join("")}</div>
    </div>
  </section>

  <section class="section-tight" style="background:var(--paper);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">Sellers</span>
          <h2 class="h2" style="margin-top:8px">Top-rated vendors</h2>
          <p class="lede">Independent shops, each with their own catalogue and shipping.</p>
        </div>
        <a class="btn btn-ghost btn-sm" href="#/vendors">All vendors ${ICONS.arrow}</a>
      </div>
      <div class="vendor-grid">${topVendors.map(vendorCard).join("")}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">Offers</span>
          <h2 class="h2" style="margin-top:8px">Running this month</h2>
        </div>
      </div>
      <div class="promo-grid">
        ${PROMOS.map(p => `
          <div class="promo ${p.accent}">
            <div class="promo-deco"></div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.detail)}</p>
            <span class="promo-code">${esc(p.code)}</span>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section-tight" style="background:var(--ink);color:#fff">
    <div class="wrap" style="display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap">
      <div>
        <h2 class="h2" style="color:#fff">Ready to start shopping?</h2>
        <p style="color:rgba(255,255,255,.7);margin-top:10px;max-width:520px">${PRODUCTS.length} products from ${VENDORS.length} verified vendors, one checkout, one delivery fee.</p>
      </div>
      <a class="btn btn-amber" href="#/shop">Browse the marketplace ${ICONS.arrow}</a>
    </div>
  </section>`;
}

/* ---------- VENDORS ---------- */
function renderVendors() {
  return `
  <div class="page-head">
    <div class="wrap">
      <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span><span>Vendors</span></div>
      <h1>Our vendors</h1>
      <p class="lede">${VENDORS.length} independent shops, each vetted before listing. Every vendor manages their own stock, pricing and delivery.</p>
    </div>
  </div>
  <section class="section">
    <div class="wrap">
      <div class="vendor-grid">${VENDORS.map(vendorCard).join("")}</div>
    </div>
  </section>`;
}

/* ---------- VENDOR STORE ---------- */
function renderVendorStore(id) {
  const v = vendorOf(id);
  if (!v) return notFound("We could not find that vendor.");
  const items = PRODUCTS.filter(p => p.vendorId === v.id);
  const avg = items.reduce((n, p) => n + p.rating, 0) / (items.length || 1);

  return `
  <div class="store-hero">
    <div class="wrap">
      <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span><a href="#/vendors">Vendors</a><span class="sep">/</span><span>${esc(v.name)}</span></div>
      <div class="store-top">
        <div class="store-logo" style="background:${v.color}">${esc(v.initials)}</div>
        <div class="store-info">
          <h1>${esc(v.name)} ${v.verified ? `<span class="vc-verified">${ICONS.verified}</span>` : ""}</h1>
          <p class="store-tagline">${esc(v.tagline)}</p>
          <div class="store-meta">
            <div>${ICONS.pin} ${esc(v.location)}</div>
            <div>${ICONS.star} ${v.rating.toFixed(1)} · ${v.reviewCount} reviews</div>
            <div>${ICONS.truck} Ships in ${esc(v.shipsIn)}</div>
            <div>${ICONS.clock} Replies ${esc(v.responseTime)}</div>
          </div>
        </div>
      </div>
      <div class="store-stats">
        <div class="store-stat"><strong>${items.length}</strong><span>Products listed</span></div>
        <div class="store-stat"><strong>${v.rating.toFixed(1)}</strong><span>Store rating</span></div>
        <div class="store-stat"><strong>${v.since}</strong><span>Selling since</span></div>
        <div class="store-stat"><strong>${avg.toFixed(1)}</strong><span>Avg. product rating</span></div>
      </div>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <div class="store-tabs">
        <button class="store-tab active" data-tab="products">Products (${items.length})</button>
        <button class="store-tab" data-tab="about">About the store</button>
        <button class="store-tab" data-tab="reviews">Reviews (${v.reviews.length})</button>
        <button class="store-tab" data-tab="contact">Contact</button>
      </div>

      <div class="store-panel" data-panel="products">
        <div class="product-grid">${items.map(productCard).join("")}</div>
      </div>

      <div class="store-panel" data-panel="about" hidden>
        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:36px;align-items:start" class="about-split">
          <div>
            <h2 class="h3" style="margin-bottom:14px">About ${esc(v.name)}</h2>
            <p class="lede" style="margin-bottom:18px">${esc(v.description)}</p>
            <p class="lede">We have been selling on Vendora since ${v.since}. Orders are packed and dispatched by our own team, and we handle returns directly — no third-party depot in between.</p>
          </div>
          <div class="contact-card">
            <h3 style="font-size:1rem;margin-bottom:14px">Store details</h3>
            <div class="contact-row">${ICONS.pin}<div><div class="label">Address</div>${esc(v.address)}</div></div>
            <div class="contact-row">${ICONS.truck}<div><div class="label">Dispatch</div>Ships in ${esc(v.shipsIn)}</div></div>
            <div class="contact-row">${ICONS.clock}<div><div class="label">Response time</div>${esc(v.responseTime)}</div></div>
            <div class="contact-row">${ICONS.shield}<div><div class="label">Returns</div>14 days, unopened</div></div>
          </div>
        </div>
      </div>

      <div class="store-panel" data-panel="reviews" hidden>
        <div class="rating-summary">
          <div class="rating-big">
            <strong>${v.rating.toFixed(1)}</strong>
            ${stars(v.rating)}
            <span>${v.reviewCount} reviews</span>
          </div>
          <div class="rating-bars">
            ${[5, 4, 3, 2, 1].map(s => {
              const pct = s === 5 ? 78 : s === 4 ? 16 : s === 3 ? 4 : s === 2 ? 1 : 1;
              return `<div class="rating-bar"><span>${s}★</span><div class="track"><div class="fill" style="width:${pct}%"></div></div><span>${pct}%</span></div>`;
            }).join("")}
          </div>
        </div>
        <div class="review-list">
          ${v.reviews.map(r => `
            <div class="review">
              <div class="review-top">
                <div class="avatar">${esc(r.name.split(" ").map(x => x[0]).join(""))}</div>
                <div><div class="review-name">${esc(r.name)}</div><div class="review-date">${esc(r.date)}</div></div>
                <div style="margin-left:auto">${stars(r.rating)}</div>
              </div>
              <p>${esc(r.text)}</p>
            </div>`).join("")}
        </div>
      </div>

      <div class="store-panel" data-panel="contact" hidden>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px" class="about-split">
          <div class="contact-card">
            <h3 style="font-size:1rem;margin-bottom:14px">Get in touch</h3>
            <div class="contact-row">${ICONS.phone}<div><div class="label">Phone</div>${esc(v.phone)}</div></div>
            <div class="contact-row">${ICONS.mail}<div><div class="label">Email</div>${esc(v.email)}</div></div>
            <div class="contact-row">${ICONS.pin}<div><div class="label">Store address</div>${esc(v.address)}</div></div>
            <div class="contact-row">${ICONS.clock}<div><div class="label">Hours</div>Mon–Sat, 9:00 – 18:00</div></div>
          </div>
          <div class="contact-card">
            <h3 style="font-size:1rem;margin-bottom:14px">Send a message</h3>
            <form data-vendor-form>
              <div class="field" style="margin-bottom:12px"><label>Your name</label><input required placeholder="Full name"></div>
              <div class="field" style="margin-bottom:12px"><label>Email</label><input type="email" required placeholder="you@example.com"></div>
              <div class="field" style="margin-bottom:14px"><label>Message</label><textarea required placeholder="Ask about a product, sizing or delivery…"></textarea></div>
              <button class="btn btn-primary btn-block" type="submit">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- SHOP ---------- */
const shopState = { q: "", cats: [], min: "", max: "", sort: "popular" };

function renderShop() {
  return `
  <div class="page-head">
    <div class="wrap">
      <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span><span>Shop</span></div>
      <h1>All products</h1>
      <p class="lede">${PRODUCTS.length} products across ${CATEGORIES.length} categories, from ${VENDORS.length} independent vendors.</p>
    </div>
  </div>
  <section class="section">
    <div class="wrap">
      <div class="shop-layout">
        <aside class="filters" id="filters">
          <div class="filter-block">
            <div class="filter-title">Search</div>
            <div class="nav-search" style="width:100%;display:flex">
              ${ICONS.search}
              <input type="search" id="shopSearch" placeholder="Product or vendor…" value="${esc(shopState.q)}">
            </div>
          </div>
          <div class="filter-block">
            <div class="filter-title">Category</div>
            ${CATEGORIES.map(c => {
              const n = PRODUCTS.filter(p => p.category === c.id).length;
              return `<label class="filter-opt">
                <input type="checkbox" data-cat="${c.id}" ${shopState.cats.includes(c.id) ? "checked" : ""}>
                <span>${esc(c.name)}</span><span class="count">${n}</span>
              </label>`;
            }).join("")}
          </div>
          <div class="filter-block">
            <div class="filter-title">Price range (KES)</div>
            <div class="price-inputs">
              <input type="number" id="minPrice" placeholder="Min" min="0" value="${esc(shopState.min)}">
              <span>–</span>
              <input type="number" id="maxPrice" placeholder="Max" min="0" value="${esc(shopState.max)}">
            </div>
          </div>
          <div class="filter-block">
            <div class="filter-title">Availability</div>
            <label class="filter-opt"><input type="checkbox" id="inStockOnly" ${shopState.inStock ? "checked" : ""}><span>In stock only</span></label>
          </div>
          <button class="btn btn-ghost btn-sm btn-block" id="resetFilters">Reset all filters</button>
        </aside>

        <div>
          <div class="shop-toolbar">
            <div class="result-count" id="resultCount"></div>
            <div style="display:flex;gap:10px;align-items:center">
              <button class="btn btn-ghost btn-sm" id="toggleFilters" style="display:none">${ICONS.filter} Filters</button>
              <select class="sort-select" id="sortSelect">
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>
          <div class="chip-row" id="chipRow"></div>
          <div id="shopResults"></div>
        </div>
      </div>
    </div>
  </section>`;
}

function applyShopFilters() {
  let list = PRODUCTS.slice();
  const q = shopState.q.trim().toLowerCase();

  if (q) {
    list = list.filter(p => {
      const v = vendorOf(p.vendorId);
      return p.name.toLowerCase().includes(q) ||
             (v && v.name.toLowerCase().includes(q)) ||
             catName(p.category).toLowerCase().includes(q);
    });
  }
  if (shopState.cats.length) list = list.filter(p => shopState.cats.includes(p.category));
  if (shopState.min !== "") list = list.filter(p => p.price >= Number(shopState.min));
  if (shopState.max !== "") list = list.filter(p => p.price <= Number(shopState.max));
  if (shopState.inStock) list = list.filter(p => p.stock > 0);

  switch (shopState.sort) {
    case "rating":     list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount); break;
    case "price-asc":  list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "name":       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default:           list.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return list;
}

function paintShop() {
  const list = applyShopFilters();
  const res = $("#shopResults");
  const cnt = $("#resultCount");
  if (!res) return;

  cnt.innerHTML = `<strong>${list.length}</strong> product${list.length === 1 ? "" : "s"} found`;

  res.innerHTML = list.length
    ? `<div class="product-grid">${list.map(productCard).join("")}</div>`
    : `<div class="empty-state">
         <h3>No products match those filters</h3>
         <p>Try widening the price range or clearing a category.</p>
         <button class="btn btn-primary" id="emptyReset">Clear filters</button>
       </div>`;

  // chips
  const chips = [];
  if (shopState.q) chips.push({ label: `“${shopState.q}”`, type: "q" });
  shopState.cats.forEach(c => chips.push({ label: catName(c), type: "cat", val: c }));
  if (shopState.min !== "") chips.push({ label: `Min ${money(Number(shopState.min))}`, type: "min" });
  if (shopState.max !== "") chips.push({ label: `Max ${money(Number(shopState.max))}`, type: "max" });
  if (shopState.inStock) chips.push({ label: "In stock", type: "stock" });

  $("#chipRow").innerHTML = chips.map(c =>
    `<span class="chip">${esc(c.label)}<button data-chip="${c.type}" data-val="${esc(c.val || "")}" aria-label="Remove filter">${ICONS.close}</button></span>`
  ).join("");

  const er = $("#emptyReset");
  if (er) er.onclick = resetShop;
}

function resetShop() {
  shopState.q = ""; shopState.cats = []; shopState.min = ""; shopState.max = ""; shopState.inStock = false;
  const s = $("#shopSearch"); if (s) s.value = "";
  $$("[data-cat]").forEach(cb => cb.checked = false);
  const mn = $("#minPrice"), mx = $("#maxPrice"), st = $("#inStockOnly");
  if (mn) mn.value = ""; if (mx) mx.value = ""; if (st) st.checked = false;
  paintShop();
}

/* ---------- PRODUCT DETAIL ---------- */
function renderProduct(id) {
  const p = productOf(id);
  if (!p) return notFound("We could not find that product.");
  const v = vendorOf(p.vendorId);
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const gallery = [p.image, p.image, p.image, p.image];
  const oos = p.stock === 0;
  const low = p.stock > 0 && p.stock <= 8;
  const save = p.oldPrice ? p.oldPrice - p.price : 0;

  return `
  <div class="page-head" style="padding:22px 0">
    <div class="wrap">
      <div class="crumbs">
        <a href="#/">Home</a><span class="sep">/</span>
        <a href="#/shop">Shop</a><span class="sep">/</span>
        <a href="#/shop?cat=${p.category}">${esc(catName(p.category))}</a><span class="sep">/</span>
        <span>${esc(p.name)}</span>
      </div>
    </div>
  </div>

  <section class="section" style="padding-top:36px">
    <div class="wrap">
      <div class="pd-layout">
        <div class="pd-gallery">
          <div class="pd-main"><img id="pdMainImg" src="${p.image}" alt="${esc(p.name)}" width="600" height="600"></div>
          <div class="pd-thumbs">
            ${gallery.map((g, i) => `<button class="pd-thumb ${i === 0 ? "active" : ""}" data-thumb="${g}"><img src="${g}" alt="View ${i + 1}" loading="lazy"></button>`).join("")}
          </div>
        </div>

        <div>
          <a class="pd-vendor-link" href="#/vendor/${v.id}">${esc(v.name)} ${ICONS.verified}</a>
          <h1 class="pd-title">${esc(p.name)}</h1>
          <div class="pd-rating">${stars(p.rating)}<span>${p.rating.toFixed(1)} · ${p.reviewCount} reviews</span><span>·</span><span>${esc(catName(p.category))}</span></div>

          <div class="pd-price-row">
            <span class="pd-price">${money(p.price)}</span>
            ${p.oldPrice ? `<span class="pd-old">${money(p.oldPrice)}</span><span class="pd-save">Save ${money(save)}</span>` : ""}
          </div>
          <div class="pd-stock ${oos ? "out" : low ? "low" : "in"}">
            <span class="dot"></span>
            ${oos ? "Out of stock" : low ? `Only ${p.stock} left in stock` : `In stock — ${p.stock} available`}
          </div>

          <p class="pd-desc">${esc(p.short)}</p>

          <div class="qty-row">
            <div class="qty">
              <button data-qty-minus aria-label="Decrease quantity">−</button>
              <input type="number" id="pdQty" value="1" min="1" max="${p.stock || 1}" aria-label="Quantity">
              <button data-qty-plus aria-label="Increase quantity">+</button>
            </div>
            <span class="small muted">${oos ? "Restocking soon" : `Max ${p.stock} per order`}</span>
          </div>

          <div class="pd-actions">
            <button class="btn btn-primary" id="pdAdd" ${oos ? "disabled" : ""}>${ICONS.cart} ${oos ? "Out of stock" : "Add to cart"}</button>
            <button class="btn btn-amber" id="pdBuy" ${oos ? "disabled" : ""}>Buy now</button>
          </div>

          <div class="pd-trust">
            <div>${ICONS.truck} Ships in ${esc(v.shipsIn)}</div>
            <div>${ICONS.shield} 14-day returns</div>
            <div>${ICONS.refresh} Secure checkout</div>
          </div>

          <h3 class="h3" style="font-size:1.1rem;margin-bottom:14px">Specifications</h3>
          <table class="spec-table">
            ${Object.entries(p.specs).map(([k, val]) => `<tr><th>${esc(k)}</th><td>${esc(val)}</td></tr>`).join("")}
          </table>

          <h3 class="h3" style="font-size:1.1rem;margin:30px 0 14px">Sold by</h3>
          <div class="vendor-box">
            <div class="vc-logo" style="background:${v.color}">${esc(v.initials)}</div>
            <div style="flex:1">
              <div class="vc-name">${esc(v.name)} ${ICONS.verified}</div>
              <div class="vc-loc" style="margin-bottom:8px">${esc(v.location)} · since ${v.since}</div>
              <p class="small muted" style="line-height:1.6">${esc(v.tagline)}</p>
              <a class="btn btn-ghost btn-sm" style="margin-top:12px" href="#/vendor/${v.id}">Visit store ${ICONS.arrow}</a>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:64px">
        <h2 class="h2" style="margin-bottom:8px">Customer reviews</h2>
        <p class="lede" style="margin-bottom:26px">Verified purchases from this listing.</p>
        <div class="rating-summary">
          <div class="rating-big">
            <strong>${p.rating.toFixed(1)}</strong>
            ${stars(p.rating)}
            <span>${p.reviewCount} reviews</span>
          </div>
          <div class="rating-bars">
            ${[5, 4, 3, 2, 1].map(s => {
              const pct = s === 5 ? 72 : s === 4 ? 20 : s === 3 ? 5 : s === 2 ? 2 : 1;
              return `<div class="rating-bar"><span>${s}★</span><div class="track"><div class="fill" style="width:${pct}%"></div></div><span>${pct}%</span></div>`;
            }).join("")}
          </div>
        </div>
        <div class="review-list">
          ${p.reviews.map(r => `
            <div class="review">
              <div class="review-top">
                <div class="avatar">${esc(r.name.split(" ").map(x => x[0]).join(""))}</div>
                <div><div class="review-name">${esc(r.name)}</div><div class="review-date">${esc(r.date)}</div></div>
                <div style="margin-left:auto">${stars(r.rating)}</div>
              </div>
              <p>${esc(r.text)}</p>
            </div>`).join("")}
        </div>
      </div>

      ${related.length ? `
      <div style="margin-top:64px">
        <div class="section-head">
          <div><span class="eyebrow">More in ${esc(catName(p.category))}</span><h2 class="h2" style="margin-top:8px">You may also like</h2></div>
          <a class="btn btn-ghost btn-sm" href="#/shop?cat=${p.category}">See all ${ICONS.arrow}</a>
        </div>
        <div class="product-grid">${related.map(productCard).join("")}</div>
      </div>` : ""}
    </div>
  </section>`;
}

/* ---------- CART ---------- */
function renderCart() {
  const wrap = $("#cartBody");
  if (!wrap) return;

  if (!cart.length) {
    wrap.innerHTML = `
      <div class="empty-state" style="background:var(--paper);border:1px solid var(--line);border-radius:var(--r-md)">
        <h3>Your cart is empty</h3>
        <p>Browse the marketplace and add something you like.</p>
        <a class="btn btn-primary" href="#/shop">Start shopping ${ICONS.arrow}</a>
      </div>`;
    return;
  }

  const sub = cartSubtotal();
  const ship = shippingFee();
  const total = cartTotal();
  const remaining = Math.max(0, SHIP_FREE_OVER - sub);

  wrap.innerHTML = `
    <div class="cart-layout">
      <div>
        <div class="cart-list">
          ${cart.map(line => {
            const p = productOf(line.id);
            const v = vendorOf(p.vendorId);
            return `
            <div class="cart-item">
              <img src="${p.image}" alt="${esc(p.name)}" width="92" height="92">
              <div>
                <a class="ci-name" href="#/product/${p.id}">${esc(p.name)}</a>
                <div class="ci-vendor">${esc(v.name)}</div>
                <div class="ci-price">${money(p.price)} each</div>
              </div>
              <div class="ci-right">
                <div class="qty">
                  <button data-cart-minus="${p.id}" aria-label="Decrease">−</button>
                  <input type="number" value="${line.qty}" min="1" max="${p.stock}" data-cart-qty="${p.id}" aria-label="Quantity for ${esc(p.name)}">
                  <button data-cart-plus="${p.id}" aria-label="Increase">+</button>
                </div>
                <div class="ci-total">${money(p.price * line.qty)}</div>
                <button class="ci-remove" data-cart-remove="${p.id}">Remove</button>
              </div>
            </div>`;
          }).join("")}
        </div>
        <div style="display:flex;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap">
          <a class="btn btn-ghost btn-sm" href="#/shop">← Continue shopping</a>
          <button class="btn btn-ghost btn-sm" id="clearCart">${ICONS.trash} Clear cart</button>
        </div>
      </div>

      <aside class="summary">
        <h3>Order summary</h3>
        <div class="sum-row"><span>Subtotal (${cartCount()} item${cartCount() === 1 ? "" : "s"})</span><span>${money(sub)}</span></div>
        <div class="sum-row"><span>Delivery</span><span class="${ship === 0 ? "free" : ""}">${ship === 0 ? "Free" : money(ship)}</span></div>
        ${remaining > 0 ? `<div class="sum-row" style="font-size:.8rem;color:var(--ink-mute)"><span>Add ${money(remaining)} for free delivery</span></div>` : ""}
        <div class="sum-row total"><span>Total</span><span>${money(total)}</span></div>
        <a class="btn btn-primary btn-block" href="#/checkout">Proceed to checkout ${ICONS.arrow}</a>
        <p class="summary-note">Items ship separately from each vendor. Delivery is charged once per order.</p>
      </aside>
    </div>`;
}

/* ---------- CHECKOUT ---------- */
function renderCheckout() {
  const wrap = $("#checkoutBody");
  if (!wrap) return;

  if (!cart.length) {
    wrap.innerHTML = `
      <div class="empty-state" style="background:var(--paper);border:1px solid var(--line);border-radius:var(--r-md)">
        <h3>Nothing to check out</h3>
        <p>Your cart is empty, so there is no order to place yet.</p>
        <a class="btn btn-primary" href="#/shop">Browse products ${ICONS.arrow}</a>
      </div>`;
    return;
  }

  const sub = cartSubtotal(), ship = shippingFee(), total = cartTotal();

  wrap.innerHTML = `
    <div class="checkout-layout">
      <form id="checkoutForm" novalidate>
        <div class="form-card">
          <h3>Contact details</h3>
          <p class="hint">We will send the order confirmation here.</p>
          <div class="form-grid">
            <div class="field">
              <label for="fName">First name <span class="req">*</span></label>
              <input id="fName" name="firstName" autocomplete="given-name" placeholder="Amina">
              <span class="err">Please enter your first name.</span>
            </div>
            <div class="field">
              <label for="lName">Last name <span class="req">*</span></label>
              <input id="lName" name="lastName" autocomplete="family-name" placeholder="Wanjiru">
              <span class="err">Please enter your last name.</span>
            </div>
            <div class="field">
              <label for="fEmail">Email <span class="req">*</span></label>
              <input id="fEmail" name="email" type="email" autocomplete="email" placeholder="you@example.com">
              <span class="err">Enter a valid email address.</span>
            </div>
            <div class="field">
              <label for="fPhone">Phone <span class="req">*</span></label>
              <input id="fPhone" name="phone" type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX">
              <span class="err">Enter a valid phone number (at least 9 digits).</span>
            </div>
          </div>
        </div>

        <div class="form-card">
          <h3>Delivery address</h3>
          <p class="hint">We deliver within Nairobi metro; other counties take 3–5 days.</p>
          <div class="form-grid">
            <div class="field full">
              <label for="fStreet">Street address <span class="req">*</span></label>
              <input id="fStreet" name="street" autocomplete="street-address" placeholder="Apartment, building, street">
              <span class="err">Please enter your street address.</span>
            </div>
            <div class="field">
              <label for="fCity">City / Town <span class="req">*</span></label>
              <input id="fCity" name="city" autocomplete="address-level2" placeholder="Nairobi">
              <span class="err">Please enter your city or town.</span>
            </div>
            <div class="field">
              <label for="fCounty">County / Region</label>
              <select id="fCounty" name="county">
                <option value="">Select county</option>
                <option>Nairobi</option><option>Kiambu</option><option>Machakos</option>
                <option>Kajiado</option><option>Nakuru</option><option>Mombasa</option>
                <option>Kisumu</option><option>Other</option>
              </select>
            </div>
            <div class="field">
              <label for="fPostal">Postal code</label>
              <input id="fPostal" name="postal" autocomplete="postal-code" placeholder="00100">
            </div>
            <div class="field">
              <label for="fNotes">Delivery notes</label>
              <input id="fNotes" name="notes" placeholder="Gate code, landmark…">
            </div>
          </div>
        </div>

        <div class="form-card">
          <h3>Payment method</h3>
          <p class="hint">This is a student demo — no real payment is processed.</p>
          <label class="pay-opt selected">
            <input type="radio" name="payment" value="M-Pesa" checked>
            <div><div class="pay-name">M-Pesa</div><div class="pay-desc">Pay on delivery via STK push</div></div>
          </label>
          <label class="pay-opt">
            <input type="radio" name="payment" value="Card">
            <div><div class="pay-name">Card</div><div class="pay-desc">Visa or Mastercard</div></div>
          </label>
          <label class="pay-opt">
            <input type="radio" name="payment" value="Cash on delivery">
            <div><div class="pay-name">Cash on delivery</div><div class="pay-desc">Pay the rider in cash</div></div>
          </label>
        </div>

        <button class="btn btn-primary btn-block" type="submit" style="padding:16px">Confirm order · ${money(total)}</button>
        <p class="summary-note" style="margin-top:14px">By placing this order you agree to the demo terms. No payment will be taken.</p>
      </form>

      <aside class="summary">
        <h3>Order summary</h3>
        <div class="order-mini">
          ${cart.map(line => {
            const p = productOf(line.id);
            return `<div class="om-item">
              <img src="${p.image}" alt="" width="46" height="46">
              <div><div class="om-name">${esc(p.name)}</div><div class="om-qty">Qty ${line.qty}</div></div>
              <div class="om-price">${money(p.price * line.qty)}</div>
            </div>`;
          }).join("")}
        </div>
        <div class="sum-row"><span>Subtotal</span><span>${money(sub)}</span></div>
        <div class="sum-row"><span>Delivery</span><span class="${ship === 0 ? "free" : ""}">${ship === 0 ? "Free" : money(ship)}</span></div>
        <div class="sum-row total"><span>Total</span><span>${money(total)}</span></div>
        <a class="btn btn-ghost btn-block" href="#/cart" style="margin-top:12px">Edit cart</a>
      </aside>
    </div>`;
}

function validateCheckout(form) {
  let ok = true;
  const setErr = (el, bad) => {
    const field = el.closest(".field");
    if (!field) return;
    field.classList.toggle("invalid", bad);
    if (bad) ok = false;
  };

  const fn = $("#fName"), ln = $("#lName"), em = $("#fEmail"), ph = $("#fPhone"),
        st = $("#fStreet"), ct = $("#fCity");

  setErr(fn, fn.value.trim().length < 2);
  setErr(ln, ln.value.trim().length < 2);
  setErr(em, !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(em.value.trim()));
  setErr(ph, ph.value.replace(/\D/g, "").length < 9);
  setErr(st, st.value.trim().length < 5);
  setErr(ct, ct.value.trim().length < 2);

  if (!ok) {
    const first = form.querySelector(".field.invalid input, .field.invalid select");
    if (first) { first.focus(); first.scrollIntoView({ block: "center", behavior: "smooth" }); }
  }
  return ok;
}

/* ---------- CONFIRMATION ---------- */
function renderConfirm(order) {
  const wrap = $("#confirmBody");
  if (!wrap) return;
  if (!order) {
    wrap.innerHTML = `<div class="confirm-wrap"><h1>No order found</h1><p class="lede">Place an order to see a confirmation here.</p><a class="btn btn-primary" href="#/shop">Browse products</a></div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="confirm-wrap">
      <div class="confirm-icon">${ICONS.check}</div>
      <h1>Order confirmed</h1>
      <p class="lede">Thank you, ${esc(order.firstName)}. We have sent a confirmation to <strong>${esc(order.email)}</strong>. Your vendors are preparing the items now.</p>
      <div class="order-box">
        <div class="row"><span>Order number</span><span>${esc(order.id)}</span></div>
        <div class="row"><span>Items</span><span>${order.count} item${order.count === 1 ? "" : "s"}</span></div>
        <div class="row"><span>Subtotal</span><span>${money(order.subtotal)}</span></div>
        <div class="row"><span>Delivery</span><span>${order.shipping === 0 ? "Free" : money(order.shipping)}</span></div>
        <div class="row"><span>Payment</span><span>${esc(order.payment)}</span></div>
        <div class="row"><span>Total paid</span><span>${money(order.total)}</span></div>
        <div class="row"><span>Delivering to</span><span>${esc(order.street)}, ${esc(order.city)}</span></div>
        <div class="row"><span>Estimated arrival</span><span>${esc(order.eta)}</span></div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a class="btn btn-primary" href="#/shop">Continue shopping</a>
        <a class="btn btn-ghost" href="#/">Back to home</a>
      </div>
    </div>`;
}

function notFound(msg) {
  return `<div class="confirm-wrap">
    <h1>Page not found</h1>
    <p class="lede">${esc(msg || "That page does not exist.")}</p>
    <a class="btn btn-primary" href="#/shop">Browse products</a>
  </div>`;
}

/* ---------- ROUTER ---------- */
let lastOrder = null;

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [pathPart, queryPart] = raw.split("?");
  const segs = pathPart.split("/").filter(Boolean);
  const params = new URLSearchParams(queryPart || "");
  return { segs, params };
}

function route() {
  const { segs, params } = parseHash();
  const page = segs[0] || "home";
  const id = segs[1];

  $$(".page").forEach(p => p.classList.remove("active"));
  $$(".nav-link").forEach(a => a.classList.remove("active"));
  $("#mobileMenu").classList.remove("open");

  const show = name => {
    const el = $("#page-" + name);
    if (el) el.classList.add("active");
  };

  switch (page) {
    case "home":
      $("#page-home").innerHTML = renderHome();
      show("home");
      setActiveNav("home");
      break;

    case "vendors":
      $("#page-vendors").innerHTML = renderVendors();
      show("vendors");
      setActiveNav("vendors");
      break;

    case "vendor": {
      $("#page-vendor").innerHTML = renderVendorStore(id);
      show("vendor");
      setActiveNav("vendors");
      break;
    }

    case "shop": {
      const cat = params.get("cat");
      if (cat && CATEGORIES.some(c => c.id === cat)) {
        shopState.cats = [cat];
      }
      const q = params.get("q");
      if (q) shopState.q = q;
      $("#page-shop").innerHTML = renderShop();
      show("shop");
      setActiveNav("shop");
      wireShop();
      paintShop();
      break;
    }

    case "product":
      $("#page-product").innerHTML = renderProduct(id);
      show("product");
      setActiveNav("shop");
      wireProduct(id);
      break;

    case "cart":
      $("#page-cart").innerHTML = cartShell();
      show("cart");
      renderCart();
      break;

    case "checkout":
      $("#page-checkout").innerHTML = checkoutShell();
      show("checkout");
      renderCheckout();
      wireCheckout();
      break;

    case "confirm":
      $("#page-confirm").innerHTML = '<div id="confirmBody"></div>';
      show("confirm");
      renderConfirm(lastOrder);
      break;

    default:
      $("#page-home").innerHTML = notFound();
      show("home");
  }

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  syncCartUI();
}

function setActiveNav(name) {
  $$(".nav-link").forEach(a => {
    if (a.dataset.nav === name) a.classList.add("active");
  });
}

function cartShell() {
  return `
  <div class="page-head">
    <div class="wrap">
      <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span><span>Cart</span></div>
      <h1>Your cart</h1>
      <p class="lede">Review your items before checkout. Each vendor ships their own products.</p>
    </div>
  </div>
  <section class="section"><div class="wrap"><div id="cartBody"></div></div></section>`;
}

function checkoutShell() {
  return `
  <div class="page-head">
    <div class="wrap">
      <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span><a href="#/cart">Cart</a><span class="sep">/</span><span>Checkout</span></div>
      <h1>Checkout</h1>
      <p class="lede">Enter your details to complete the order. This is a demo — no payment is taken.</p>
    </div>
  </div>
  <section class="section"><div class="wrap"><div id="checkoutBody"></div></div></section>`;
}

/* ---------- wiring ---------- */
function wireShop() {
  const s = $("#shopSearch");
  if (s) {
    s.addEventListener("input", e => {
      shopState.q = e.target.value;
      paintShop();
    });
  }
  $$("[data-cat]").forEach(cb => {
    cb.addEventListener("change", () => {
      const c = cb.dataset.cat;
      if (cb.checked) { if (!shopState.cats.includes(c)) shopState.cats.push(c); }
      else shopState.cats = shopState.cats.filter(x => x !== c);
      paintShop();
    });
  });
  const mn = $("#minPrice"), mx = $("#maxPrice");
  if (mn) mn.addEventListener("input", e => { shopState.min = e.target.value; paintShop(); });
  if (mx) mx.addEventListener("input", e => { shopState.max = e.target.value; paintShop(); });
  const st = $("#inStockOnly");
  if (st) st.addEventListener("change", e => { shopState.inStock = e.target.checked; paintShop(); });
  const sort = $("#sortSelect");
  if (sort) {
    sort.value = shopState.sort;
    sort.addEventListener("change", e => { shopState.sort = e.target.value; paintShop(); });
  }
  const reset = $("#resetFilters");
  if (reset) reset.onclick = resetShop;

  const tf = $("#toggleFilters");
  if (tf) {
    tf.style.display = window.innerWidth <= 900 ? "inline-flex" : "none";
    tf.onclick = () => $("#filters").classList.toggle("open");
  }

  $("#chipRow").addEventListener("click", e => {
    const b = e.target.closest("[data-chip]");
    if (!b) return;
    const t = b.dataset.chip, v = b.dataset.val;
    if (t === "q") { shopState.q = ""; const el = $("#shopSearch"); if (el) el.value = ""; }
    if (t === "cat") {
      shopState.cats = shopState.cats.filter(x => x !== v);
      const cb = $(`[data-cat="${v}"]`); if (cb) cb.checked = false;
    }
    if (t === "min") { shopState.min = ""; const el = $("#minPrice"); if (el) el.value = ""; }
    if (t === "max") { shopState.max = ""; const el = $("#maxPrice"); if (el) el.value = ""; }
    if (t === "stock") { shopState.inStock = false; const el = $("#inStockOnly"); if (el) el.checked = false; }
    paintShop();
  });
}

function wireProduct(id) {
  const p = productOf(id);
  if (!p) return;

  $$("[data-thumb]").forEach(t => {
    t.addEventListener("click", () => {
      $$("[data-thumb]").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      const main = $("#pdMainImg");
      if (main) main.src = t.dataset.thumb;
    });
  });

  const qty = $("#pdQty");
  const minus = $("[data-qty-minus]"), plus = $("[data-qty-plus]");
  if (minus) minus.onclick = () => { qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) - 1); };
  if (plus) plus.onclick = () => { qty.value = Math.min(p.stock || 1, (parseInt(qty.value, 10) || 1) + 1); };

  const add = $("#pdAdd");
  if (add) add.onclick = () => addToCart(p.id, parseInt(qty.value, 10) || 1);

  const buy = $("#pdBuy");
  if (buy) buy.onclick = () => {
    addToCart(p.id, parseInt(qty.value, 10) || 1);
    location.hash = "#/checkout";
  };
}

function wireCheckout() {
  const form = $("#checkoutForm");
  if (!form) return;

  $$(".pay-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      $$(".pay-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      const r = opt.querySelector("input");
      if (r) r.checked = true;
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateCheckout(form)) { toast("Please fix the highlighted fields"); return; }

    const fd = new FormData(form);
    const sub = cartSubtotal(), ship = shippingFee();
    const eta = new Date(Date.now() + 3 * 864e5).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

    lastOrder = {
      id: "VND-" + Math.random().toString(36).slice(2, 7).toUpperCase() + "-" + new Date().getFullYear(),
      firstName: fd.get("firstName"),
      email: fd.get("email"),
      street: fd.get("street"),
      city: fd.get("city"),
      payment: fd.get("payment"),
      count: cartCount(),
      subtotal: sub,
      shipping: ship,
      total: sub + ship,
      eta
    };

    cart = [];
    saveCart();
    location.hash = "#/confirm";
  });

  // live clear of error state
  form.addEventListener("input", e => {
    const f = e.target.closest(".field");
    if (f) f.classList.remove("invalid");
  });
}

/* ---------- global delegation ---------- */
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(add.dataset.add, 1); return; }

  const minus = e.target.closest("[data-cart-minus]");
  if (minus) {
    const line = cart.find(i => i.id === minus.dataset.cartMinus);
    if (line) setQty(line.id, line.qty - 1);
    return;
  }
  const plus = e.target.closest("[data-cart-plus]");
  if (plus) {
    const line = cart.find(i => i.id === plus.dataset.cartPlus);
    if (line) setQty(line.id, line.qty + 1);
    return;
  }
  const rm = e.target.closest("[data-cart-remove]");
  if (rm) { removeFromCart(rm.dataset.cartRemove); return; }

  const clr = e.target.closest("#clearCart");
  if (clr) { clearCart(); return; }

  const tab = e.target.closest(".store-tab");
  if (tab) {
    $$(".store-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    $$(".store-panel").forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
    return;
  }

  const burger = e.target.closest("#burger");
  if (burger) { $("#mobileMenu").classList.toggle("open"); return; }
});

document.addEventListener("change", e => {
  const q = e.target.closest("[data-cart-qty]");
  if (q) setQty(q.dataset.cartQty, q.value);
});

document.addEventListener("submit", e => {
  const vf = e.target.closest("[data-vendor-form]");
  if (vf) {
    e.preventDefault();
    vf.reset();
    toast("Message sent to the vendor");
  }
});

/* ---------- boot ---------- */
window.addEventListener("hashchange", route);
window.addEventListener("resize", () => {
  const tf = $("#toggleFilters");
  if (tf) tf.style.display = window.innerWidth <= 900 ? "inline-flex" : "none";
});

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  syncCartUI();
  if (!location.hash) location.hash = "#/";
  route();
});
