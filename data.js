/* ============================================================
   Vendora Marketplace — sample dataset
   All data is static JSON-style objects. No backend required.
   ============================================================ */

const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "headphones", blurb: "Audio, wearables & desk gear" },
  { id: "home",        name: "Home & Living", icon: "home",      blurb: "Ceramics, lighting & plants" },
  { id: "fashion",     name: "Fashion", icon: "shirt",           blurb: "Everyday wear & accessories" },
  { id: "beauty",      name: "Beauty", icon: "droplet",          blurb: "Skincare & self-care" },
  { id: "sports",      name: "Sports & Outdoors", icon: "activity", blurb: "Train, run & recover" },
  { id: "stationery",  name: "Stationery", icon: "book",         blurb: "Paper, pens & desk tools" }
];

const VENDORS = [
  {
    id: "v1",
    name: "Northwind Audio",
    category: "electronics",
    tagline: "Sound gear built for long listening sessions",
    location: "Westlands, Nairobi",
    since: 2019,
    rating: 4.8,
    reviewCount: 312,
    color: "#0E4F45",
    initials: "NA",
    verified: true,
    shipsIn: "1–2 days",
    responseTime: "under 2 hours",
    phone: "+254 711 204 880",
    email: "hello@northwindaudio.co.ke",
    address: "3rd Floor, Westlands Square, Ring Road, Nairobi",
    description:
      "Northwind Audio started as a two-person repair bench and grew into a full audio studio. We stock headphones, speakers and desk peripherals that we actually use ourselves, and every unit is bench-tested before it leaves the shop. If it does not survive our own listening room, we do not list it.",
    reviews: [
      { name: "Brian K.", rating: 5, date: "12 Oct 2026", text: "Ordered the Aria headphones on a Tuesday and had them Wednesday morning. Packaging was excellent and the sound is genuinely better than the pair I paid twice as much for." },
      { name: "Amina W.", rating: 5, date: "28 Sep 2026", text: "The team answered my question about warranty within the hour. Rare to get that from an online store." },
      { name: "Peter M.", rating: 4, date: "03 Sep 2026", text: "Great products and honest descriptions. Only note is that the keyboard I wanted was out of stock for a week." }
    ]
  },
  {
    id: "v2",
    name: "Lumen & Loom",
    category: "home",
    tagline: "Quiet objects for calmer rooms",
    location: "Karen, Nairobi",
    since: 2021,
    rating: 4.9,
    reviewCount: 208,
    color: "#8A5A2B",
    initials: "LL",
    verified: true,
    shipsIn: "2–4 days",
    responseTime: "same day",
    phone: "+254 722 918 340",
    email: "studio@lumenandloom.co.ke",
    address: "Karen Road, opposite The Hub, Nairobi",
    description:
      "A small homeware studio run by an interior designer and a ceramicist. We make and source pieces that age well — stoneware, linen, warm lighting and plants that survive real apartments. Everything is packed by hand in recycled materials.",
    reviews: [
      { name: "Grace N.", rating: 5, date: "19 Oct 2026", text: "The Terra vase is even better in person. It arrived wrapped like a gift, not a shipment." },
      { name: "Daniel O.", rating: 5, date: "07 Oct 2026", text: "Bought the desk lamp for my study. Warm light, no flicker, and the finish is beautiful." },
      { name: "Faith A.", rating: 5, date: "21 Sep 2026", text: "My third order from them. The candle is now a standing gift for friends." }
    ]
  },
  {
    id: "v3",
    name: "Kite Threads",
    category: "fashion",
    tagline: "Fewer, better everyday pieces",
    location: "Kilimani, Nairobi",
    since: 2018,
    rating: 4.6,
    reviewCount: 174,
    color: "#1F3A5F",
    initials: "KT",
    verified: true,
    shipsIn: "1–3 days",
    responseTime: "under 4 hours",
    phone: "+254 733 550 117",
    email: "orders@kitethreads.co.ke",
    address: "Wood Avenue, Kilimani, Nairobi",
    description:
      "Kite Threads makes a deliberately short catalogue: a tee, a bag, a pair of sunglasses. We work with two local workshops and keep runs small so quality stays consistent. Sizing charts are measured by hand, not copied from a supplier sheet.",
    reviews: [
      { name: "Mercy T.", rating: 5, date: "15 Oct 2026", text: "The pima tee is the softest cotton I own and it has survived a dozen washes without losing shape." },
      { name: "Sammy R.", rating: 4, date: "02 Oct 2026", text: "Backpack is excellent quality. Delivery took a day longer than the estimate but they let me know." },
      { name: "Lydia C.", rating: 5, date: "11 Sep 2026", text: "Sunglasses fit perfectly and the case is genuinely nice, not the usual flimsy pouch." }
    ]
  },
  {
    id: "v4",
    name: "Pure Botanica",
    category: "beauty",
    tagline: "Short ingredient lists, visible results",
    location: "Lavington, Nairobi",
    since: 2020,
    rating: 4.7,
    reviewCount: 256,
    color: "#5C6B3A",
    initials: "PB",
    verified: true,
    shipsIn: "1–2 days",
    responseTime: "under 3 hours",
    phone: "+254 700 442 619",
    email: "care@purebotanica.co.ke",
    address: "Lavington Mall, 1st Floor, Nairobi",
    description:
      "We formulate in small batches with a cosmetic chemist and publish every ingredient at full concentration on the label. No fragrance blends hiding behind a single word. If a batch fails stability testing, it does not ship.",
    reviews: [
      { name: "Njeri M.", rating: 5, date: "22 Oct 2026", text: "Six weeks on the vitamin C serum and the difference in my dark spots is real. No irritation at all." },
      { name: "Wanjiku K.", rating: 4, date: "09 Oct 2026", text: "Lovely texture and no scent, which I prefer. Wish the bottle were slightly larger for the price." },
      { name: "Aisha H.", rating: 5, date: "30 Sep 2026", text: "They sent a full ingredient breakdown when I asked. That level of transparency is rare." }
    ]
  },
  {
    id: "v5",
    name: "Trailhead Supply",
    category: "sports",
    tagline: "Kit that holds up past the first kilometre",
    location: "Ngong Road, Nairobi",
    since: 2017,
    rating: 4.5,
    reviewCount: 139,
    color: "#7A3B2E",
    initials: "TS",
    verified: true,
    shipsIn: "2–3 days",
    responseTime: "under 6 hours",
    phone: "+254 715 883 002",
    email: "run@trailhead.co.ke",
    address: "Ngong Road, next to Prestige Plaza, Nairobi",
    description:
      "Run by two trail runners who got tired of buying shoes online that did not match the description. We test every model on Nairobi's hills before listing it, and we will tell you honestly when a shoe is wrong for your gait.",
    reviews: [
      { name: "Kevin A.", rating: 5, date: "18 Oct 2026", text: "They talked me out of the shoe I wanted and into the right one. Two half-marathons later, no blisters." },
      { name: "Rose W.", rating: 4, date: "05 Oct 2026", text: "Yoga mat has great grip even when my hands are sweaty. Slightly heavier than expected." },
      { name: "Otieno J.", rating: 4, date: "14 Sep 2026", text: "Solid advice and fair prices. Stock rotates fast so check before you plan a purchase." }
    ]
  },
  {
    id: "v6",
    name: "Paper & Pine",
    category: "stationery",
    tagline: "Paper worth writing on",
    location: "CBD, Nairobi",
    since: 2022,
    rating: 4.8,
    reviewCount: 96,
    color: "#4A4E69",
    initials: "PP",
    verified: true,
    shipsIn: "1–2 days",
    responseTime: "same day",
    phone: "+254 701 336 774",
    email: "shop@paperandpine.co.ke",
    address: "Bazaar Plaza, Moi Avenue, Nairobi",
    description:
      "A stationery shop for people who still take notes by hand. We import Japanese paper goods in small quantities and test every notebook with fountain ink before it goes on the shelf. If it bleeds through, we do not sell it.",
    reviews: [
      { name: "Cynthia G.", rating: 5, date: "20 Oct 2026", text: "The Kokuyo paper handles my fountain pen with zero bleed. Finally a local source." },
      { name: "Mark D.", rating: 5, date: "01 Oct 2026", text: "Ordered the three-pack and it arrived next day, wrapped in paper not plastic. Small thing, appreciated." },
      { name: "Hellen V.", rating: 4, date: "12 Sep 2026", text: "Great selection. Would love more A4 options." }
    ]
  }
];

const PRODUCTS = [
  {
    id: "p1", name: "Aria Studio Wireless Headphones", vendorId: "v1", category: "electronics",
    price: 8900, oldPrice: 11500, stock: 24, rating: 4.8, reviewCount: 128,
    image: "images/headphones.jpg", badge: "Best seller",
    short: "Over-ear ANC headphones with 40-hour battery and a genuinely flat response.",
    description:
      "The Aria Studio is our reference pair: closed-back over-ear drivers tuned flat rather than bass-heavy, so mixes translate and long calls do not fatigue your ears. Active noise cancelling handles open-plan offices and matatu noise alike, and the memory-foam pads are replaceable rather than glued on.",
    specs: { "Driver": "40 mm dynamic, closed-back", "Battery": "40 hours (ANC on: 32 h)", "Connectivity": "Bluetooth 5.3 + 3.5 mm cable", "Weight": "268 g", "Warranty": "24 months" },
    reviews: [
      { name: "Brian K.", rating: 5, date: "12 Oct 2026", text: "Sound is genuinely better than the pair I paid twice as much for. The flat tuning is a relief." },
      { name: "Amina W.", rating: 5, date: "28 Sep 2026", text: "Wore them on a six-hour flight and forgot they were on. Battery still had charge." },
      { name: "Peter M.", rating: 4, date: "03 Sep 2026", text: "Excellent build. The case is a little bulky for a small bag." }
    ]
  },
  {
    id: "p2", name: "Pulse Mini Bluetooth Speaker", vendorId: "v1", category: "electronics",
    price: 4200, stock: 41, rating: 4.6, reviewCount: 91,
    image: "images/speaker.jpg", badge: null,
    short: "Pocket-sized, IPX7 waterproof, and loud enough for a small room.",
    description:
      "A palm-sized speaker that punches well above its size. IPX7 means it survives a pool edge or a kitchen counter spill, and the passive radiator gives it real low end without the plastic rattle you get from cheaper units. Pairs two units for stereo.",
    specs: { "Output": "12 W RMS", "Battery": "14 hours at 60% volume", "Water rating": "IPX7", "Connectivity": "Bluetooth 5.2, USB-C", "Weight": "410 g" },
    reviews: [
      { name: "Titus N.", rating: 5, date: "08 Oct 2026", text: "Took it camping for a weekend. Loud, clear, and the battery lasted both nights." },
      { name: "Sharon L.", rating: 4, date: "24 Sep 2026", text: "Great for its size. Bass is present but not room-shaking, which is fair at this price." }
    ]
  },
  {
    id: "p3", name: "Vertex TKL Mechanical Keyboard", vendorId: "v1", category: "electronics",
    price: 11500, stock: 12, rating: 4.9, reviewCount: 77,
    image: "images/keyboard.jpg", badge: "Staff pick",
    short: "Tenkeyless, hot-swappable, gasket-mounted with a satisfying thock.",
    description:
      "A tenkeyless board with a gasket mount and two layers of foam, which is why it sounds deeper than most pre-builts. Switches are hot-swappable, so you can change feel without a soldering iron, and the keycaps are double-shot PBT that will not shine up in six months.",
    specs: { "Layout": "TKL (87 keys)", "Switches": "Hot-swappable, 5-pin", "Keycaps": "Double-shot PBT", "Connection": "USB-C wired + 2.4 GHz", "Weight": "980 g" },
    reviews: [
      { name: "Ian M.", rating: 5, date: "16 Oct 2026", text: "Best typing feel I have had out of the box. The foam layers make a real difference." },
      { name: "Naomi K.", rating: 5, date: "29 Sep 2026", text: "Swapped in tactile switches in ten minutes. No soldering, no drama." }
    ]
  },
  {
    id: "p4", name: "Orbit Smartwatch Series 4", vendorId: "v1", category: "electronics",
    price: 15900, oldPrice: 18900, stock: 8, rating: 4.5, reviewCount: 143,
    image: "images/watch.jpg", badge: "Save 16%",
    short: "AMOLED display, 10-day battery, and accurate sleep tracking.",
    description:
      "The Series 4 trades app-store breadth for battery life you do not have to think about. Ten days on a charge with heart-rate and sleep tracking running continuously, plus a 1.4-inch AMOLED panel that stays readable in direct sun. Works with both Android and iOS.",
    specs: { "Display": "1.4\" AMOLED, 450 nits", "Battery": "10 days typical use", "Sensors": "HR, SpO2, accelerometer", "Water rating": "5 ATM", "Compatibility": "Android 8+ / iOS 13+" },
    reviews: [
      { name: "Dennis W.", rating: 5, date: "11 Oct 2026", text: "Ten days is not marketing. I charge it on Sunday and forget about it." },
      { name: "Claire O.", rating: 4, date: "27 Sep 2026", text: "Sleep tracking is good, GPS is a bit slow to lock on. Everything else is solid." }
    ]
  },
  {
    id: "p5", name: "Terra Ceramic Vase — Large", vendorId: "v2", category: "home",
    price: 3400, stock: 18, rating: 4.9, reviewCount: 58,
    image: "images/vase.jpg", badge: "Best seller",
    short: "Hand-thrown stoneware with a matte sand glaze. 32 cm tall.",
    description:
      "Thrown by hand in a small studio, so no two are identical. The matte sand glaze is food-safe and watertight, which means it works as a vase or as a standalone sculptural piece on a shelf. Felt pads on the base protect wooden surfaces.",
    specs: { "Material": "Hand-thrown stoneware", "Height": "32 cm", "Diameter": "14 cm", "Finish": "Matte sand glaze", "Care": "Wipe clean, not dishwasher safe" },
    reviews: [
      { name: "Grace N.", rating: 5, date: "19 Oct 2026", text: "Even better in person. It arrived wrapped like a gift, not a shipment." },
      { name: "Daniel O.", rating: 5, date: "07 Oct 2026", text: "Heavy in the good way. Sits flat, no wobble." }
    ]
  },
  {
    id: "p6", name: "Halo Desk Lamp — Matte Black", vendorId: "v2", category: "home",
    price: 5600, stock: 15, rating: 4.7, reviewCount: 44,
    image: "images/lamp.jpg", badge: null,
    short: "Warm 2700K light, stepless dimming, no flicker at low brightness.",
    description:
      "A small task lamp with a proper driver, which is why it does not flicker when dimmed to 5%. The 2700K colour temperature is warm enough for evening reading without the blue cast of a standard LED bulb. Powder-coated steel body with a weighted base.",
    specs: { "Colour temp": "2700K warm white", "Dimming": "Stepless touch", "Bulb": "Integrated LED, 8 W", "Material": "Powder-coated steel", "Cable": "1.8 m braided" },
    reviews: [
      { name: "Faith A.", rating: 5, date: "21 Sep 2026", text: "Warm light, no flicker, and the finish is beautiful. Exactly what I wanted for a study." },
      { name: "Joseph K.", rating: 4, date: "06 Sep 2026", text: "Lovely lamp. The touch control takes a little getting used to." }
    ]
  },
  {
    id: "p7", name: "Stoneware Mug Set of 2", vendorId: "v2", category: "home",
    price: 2100, stock: 36, rating: 4.8, reviewCount: 86,
    image: "images/mug.jpg", badge: null,
    short: "350 ml stoneware mugs with a reactive glaze. Dishwasher safe.",
    description:
      "Two 350 ml mugs with a thick wall that holds heat far longer than thin porcelain. The reactive glaze means each pair has its own pattern, and the handle is sized for a full hand rather than two fingers. Dishwasher and microwave safe.",
    specs: { "Capacity": "350 ml each", "Material": "Stoneware", "Glaze": "Reactive, food-safe", "Care": "Dishwasher & microwave safe", "Set": "2 mugs" },
    reviews: [
      { name: "Mercy T.", rating: 5, date: "13 Oct 2026", text: "Keeps coffee hot for ages. The glaze pattern on mine is gorgeous." },
      { name: "Alex R.", rating: 5, date: "25 Sep 2026", text: "Bought as a gift and ended up ordering a second set for myself." }
    ]
  },
  {
    id: "p8", name: "Fiddle Leaf Fig — Potted", vendorId: "v2", category: "home",
    price: 4800, stock: 9, rating: 4.6, reviewCount: 39,
    image: "images/plant.jpg", badge: null,
    short: "A 90 cm fiddle leaf fig in a matte ceramic pot, ready to place.",
    description:
      "Delivered already potted in a matte ceramic planter with drainage and a saucer, so there is nothing to repot on arrival. Roughly 90 cm tall with a single straight trunk. Comes with a one-page care card — bright indirect light, water when the top two centimetres are dry.",
    specs: { "Height": "approx. 90 cm", "Pot": "22 cm matte ceramic, drainage + saucer", "Light": "Bright indirect", "Watering": "Weekly, when topsoil is dry", "Pet safety": "Toxic to cats and dogs if ingested" },
    reviews: [
      { name: "Wanjiku K.", rating: 5, date: "17 Oct 2026", text: "Arrived healthy with no bruised leaves. Three weeks in and it has pushed out two new ones." },
      { name: "Ben S.", rating: 4, date: "02 Sep 2026", text: "Beautiful plant. Delivery is understandably limited to certain areas." }
    ]
  },
  {
    id: "p9", name: "Cedar & Balsam Candle", vendorId: "v2", category: "home",
    price: 1850, stock: 52, rating: 4.9, reviewCount: 112,
    image: "images/candle.jpg", badge: "Best seller",
    short: "Coconut-soy wax, cotton wick, 45-hour burn. Cedar, balsam, dry moss.",
    description:
      "Poured in small batches with a coconut-soy blend that burns clean and evenly to the edge of the jar. The scent is woody rather than sweet — cedar and balsam over dry moss — and it throws well in a medium room without becoming cloying. Cotton wick, no paraffin.",
    specs: { "Wax": "Coconut-soy blend", "Wick": "Cotton, lead-free", "Burn time": "approx. 45 hours", "Weight": "220 g", "Notes": "Cedar, balsam fir, dry moss" },
    reviews: [
      { name: "Faith A.", rating: 5, date: "21 Sep 2026", text: "My third order. This is now a standing gift for friends." },
      { name: "Njeri M.", rating: 5, date: "09 Oct 2026", text: "Burns evenly all the way down, which almost never happens with candles at this price." }
    ]
  },
  {
    id: "p10", name: "Everyday Pima Cotton Tee", vendorId: "v3", category: "fashion",
    price: 1600, stock: 64, rating: 4.6, reviewCount: 203,
    image: "images/tshirt.jpg", badge: "Best seller",
    short: "180 gsm Peruvian pima cotton, pre-shrunk, with a proper collar.",
    description:
      "A plain tee done properly: 180 gsm pima cotton that is heavy enough to hang well but still breathable, pre-shrunk so it does not shorten after the first wash, and a ribbed collar that keeps its shape. Cut straight through the body with a slightly dropped shoulder.",
    specs: { "Fabric": "100% Peruvian pima cotton, 180 gsm", "Fit": "Regular, dropped shoulder", "Sizes": "XS–XXL", "Care": "Machine wash cold, tumble low", "Origin": "Made in Kenya" },
    reviews: [
      { name: "Mercy T.", rating: 5, date: "15 Oct 2026", text: "Softest cotton I own and it has survived a dozen washes without losing shape." },
      { name: "Sammy R.", rating: 4, date: "02 Oct 2026", text: "Great tee. Runs slightly large, so size down if you are between sizes." }
    ]
  },
  {
    id: "p11", name: "Voyager Leather Backpack", vendorId: "v3", category: "fashion",
    price: 12400, oldPrice: 14900, stock: 7, rating: 4.8, reviewCount: 67,
    image: "images/backpack.jpg", badge: "Save 17%",
    short: "Full-grain leather, 18 L, padded 15-inch laptop sleeve.",
    description:
      "An 18-litre daypack in full-grain leather that will darken and soften with use rather than crack. The laptop sleeve is padded and suspended off the base, so a drop does not land on your machine. Solid brass hardware and a cotton canvas lining.",
    specs: { "Material": "Full-grain leather", "Capacity": "18 L", "Laptop": "Fits up to 15\"", "Hardware": "Solid brass", "Warranty": "5 years on stitching" },
    reviews: [
      { name: "Lydia C.", rating: 5, date: "11 Sep 2026", text: "Six months of daily commuting and it looks better than the day it arrived." },
      { name: "Sammy R.", rating: 4, date: "02 Oct 2026", text: "Excellent quality. Delivery took a day longer than estimated but they let me know." }
    ]
  },
  {
    id: "p12", name: "Meridian Sunglasses — Tortoise", vendorId: "v3", category: "fashion",
    price: 3900, stock: 22, rating: 4.4, reviewCount: 52,
    image: "images/sunglasses.jpg", badge: null,
    short: "Acetate frames, polarised CR-39 lenses, UV400. Hard case included.",
    description:
      "Hand-polished acetate frames with polarised CR-39 lenses that cut glare off tarmac and water without the colour shift you get from cheap tints. UV400 rated. Comes with a hard shell case and a microfibre cloth, not a flimsy pouch.",
    specs: { "Frame": "Hand-polished acetate", "Lens": "Polarised CR-39, UV400", "Lens width": "52 mm", "Includes": "Hard case + microfibre cloth", "Gender": "Unisex" },
    reviews: [
      { name: "Lydia C.", rating: 5, date: "11 Sep 2026", text: "Fit perfectly and the case is genuinely nice, not the usual flimsy pouch." },
      { name: "Tom M.", rating: 4, date: "19 Sep 2026", text: "Good polarisation for driving. Frames are a touch wide for narrow faces." }
    ]
  },
  {
    id: "p13", name: "Radiance Vitamin C Serum", vendorId: "v4", category: "beauty",
    price: 2750, stock: 48, rating: 4.7, reviewCount: 189,
    image: "images/serum.jpg", badge: "Best seller",
    short: "15% L-ascorbic acid with ferulic acid, in an opaque airless pump.",
    description:
      "A 15% L-ascorbic acid serum stabilised with ferulic acid and vitamin E, packaged in an opaque airless pump because vitamin C degrades in light and air. Targets uneven tone and dark spots over six to eight weeks of daily morning use. Fragrance-free.",
    specs: { "Active": "15% L-ascorbic acid", "Supporting": "Ferulic acid, vitamin E", "Volume": "30 ml", "Packaging": "Opaque airless pump", "Skin type": "All, patch test first" },
    reviews: [
      { name: "Njeri M.", rating: 5, date: "22 Oct 2026", text: "Six weeks in and the difference in my dark spots is real. No irritation at all." },
      { name: "Aisha H.", rating: 5, date: "30 Sep 2026", text: "They sent a full ingredient breakdown when I asked. That transparency is rare." }
    ]
  },
  {
    id: "p14", name: "Hydra Calm Night Serum", vendorId: "v4", category: "beauty",
    price: 3100, stock: 0, rating: 4.6, reviewCount: 74,
    image: "images/serum.jpg", badge: null,
    short: "Niacinamide and ceramide night serum for a compromised barrier.",
    description:
      "Built for skin that reacts to everything: 5% niacinamide with a ceramide complex and panthenol, no acids and no fragrance. Meant to be the boring, reliable step in a routine that has been over-complicated. Lightweight enough to layer under a moisturiser.",
    specs: { "Active": "5% niacinamide", "Supporting": "Ceramide NP, panthenol", "Volume": "30 ml", "Texture": "Lightweight gel-cream", "Fragrance": "None" },
    reviews: [
      { name: "Wanjiku K.", rating: 4, date: "09 Oct 2026", text: "Lovely texture and no scent, which I prefer. Wish the bottle were slightly larger for the price." },
      { name: "Hellen V.", rating: 5, date: "28 Sep 2026", text: "Calmed my redness in about two weeks. I have repurchased twice." }
    ]
  },
  {
    id: "p15", name: "Cloudstride Running Shoes", vendorId: "v5", category: "sports",
    price: 9800, oldPrice: 12000, stock: 19, rating: 4.7, reviewCount: 156,
    image: "images/shoes.jpg", badge: "Save 18%",
    short: "Daily trainer with a 6 mm drop and a rockered, cushioned ride.",
    description:
      "A daily trainer for road and light trail, with a 6 mm drop that suits most runners and a rockered sole that keeps the transition smooth when you are tired. The upper is a breathable engineered mesh with a reinforced heel counter. True to size.",
    specs: { "Drop": "6 mm", "Stack": "32 mm heel / 26 mm forefoot", "Weight": "248 g (UK 8)", "Use": "Daily road & light trail", "Sizing": "True to size" },
    reviews: [
      { name: "Kevin A.", rating: 5, date: "18 Oct 2026", text: "They talked me out of the shoe I wanted and into the right one. Two half-marathons, no blisters." },
      { name: "Rose W.", rating: 4, date: "05 Oct 2026", text: "Comfortable from the first run. The outsole is wearing a little faster than I hoped." }
    ]
  },
  {
    id: "p16", name: "Grip Pro Yoga Mat 6 mm", vendorId: "v5", category: "sports",
    price: 3200, stock: 27, rating: 4.5, reviewCount: 98,
    image: "images/yogamat.jpg", badge: null,
    short: "6 mm natural rubber with a moisture-wicking top layer.",
    description:
      "A 6 mm natural rubber mat that stays put on a hard floor and keeps grip when your hands get sweaty, thanks to a moisture-wicking top layer rather than a smooth PVC surface. Comes with a carry strap. Heavier than a travel mat, which is the trade-off for the cushioning.",
    specs: { "Thickness": "6 mm", "Material": "Natural rubber + PU top", "Size": "183 × 66 cm", "Weight": "2.4 kg", "Includes": "Carry strap" },
    reviews: [
      { name: "Rose W.", rating: 4, date: "05 Oct 2026", text: "Great grip even when my hands are sweaty. Slightly heavier than expected." },
      { name: "Otieno J.", rating: 5, date: "14 Sep 2026", text: "No slipping on tile at all. The strap is a nice touch." }
    ]
  },
  {
    id: "p17", name: "Kokuyo Soft Ring Notebook A5", vendorId: "v6", category: "stationery",
    price: 850, stock: 120, rating: 4.8, reviewCount: 61,
    image: "images/notebook.jpg", badge: "Best seller",
    short: "80 sheets of fountain-pen-friendly paper with a soft, silent ring binding.",
    description:
      "The soft ring binding is the point: it flexes flat without the metal spine digging into your wrist, and it does not click when you turn a page in a meeting. The paper is 70 gsm and handles fountain ink without feathering or bleed-through. A5, 80 sheets, 5 mm grid.",
    specs: { "Size": "A5 (148 × 210 mm)", "Sheets": "80", "Paper": "70 gsm, fountain-pen friendly", "Ruling": "5 mm grid", "Binding": "Soft ring" },
    reviews: [
      { name: "Cynthia G.", rating: 5, date: "20 Oct 2026", text: "Handles my fountain pen with zero bleed. Finally a local source." },
      { name: "Mark D.", rating: 5, date: "01 Oct 2026", text: "The soft ring is a small thing that makes a big difference in meetings." }
    ]
  },
  {
    id: "p18", name: "Kokuyo Notebook — 3 Pack", vendorId: "v6", category: "stationery",
    price: 2300, stock: 45, rating: 4.9, reviewCount: 34,
    image: "images/notebook.jpg", badge: "Bundle",
    short: "Three A5 soft-ring notebooks — grid, ruled and blank.",
    description:
      "The same soft-ring notebook in a three-pack covering the three rulings people actually use: 5 mm grid for diagrams, 7 mm ruled for notes, and blank for sketching. Works out cheaper per book than buying them separately.",
    specs: { "Size": "A5 (148 × 210 mm)", "Sheets": "80 per book", "Ruling": "Grid, ruled, blank", "Paper": "70 gsm", "Set": "3 notebooks" },
    reviews: [
      { name: "Mark D.", rating: 5, date: "01 Oct 2026", text: "Ordered the three-pack and it arrived next day, wrapped in paper not plastic." },
      { name: "Cynthia G.", rating: 5, date: "20 Oct 2026", text: "Good value. The blank one is now my sketchbook." }
    ]
  },
  {
    id: "p19", name: "Terra Ceramic Vase — Small", vendorId: "v2", category: "home",
    price: 2400, stock: 21, rating: 4.8, reviewCount: 31,
    image: "images/vase.jpg", badge: null,
    short: "The 20 cm version of our hand-thrown stoneware vase.",
    description:
      "The same hand-thrown stoneware and matte sand glaze as the large Terra, at 20 cm — sized for a bedside table or a narrow shelf. Watertight, so it takes a small stem or stands on its own.",
    specs: { "Material": "Hand-thrown stoneware", "Height": "20 cm", "Diameter": "10 cm", "Finish": "Matte sand glaze", "Care": "Wipe clean" },
    reviews: [
      { name: "Grace N.", rating: 5, date: "19 Oct 2026", text: "Bought this and the large one together. They look like a set without matching exactly." },
      { name: "Joseph K.", rating: 5, date: "06 Sep 2026", text: "Perfect size for a small shelf. Beautiful glaze." }
    ]
  },
  {
    id: "p20", name: "Aria Studio Headphones — Sand", vendorId: "v1", category: "electronics",
    price: 9400, stock: 6, rating: 4.7, reviewCount: 64,
    image: "images/headphones.jpg", badge: "Limited",
    short: "The Aria Studio in a sand-and-cream colourway, limited run.",
    description:
      "Identical acoustics and internals to the standard Aria Studio, in a sand-and-cream colourway produced in a single limited run. Same 40-hour battery, same replaceable memory-foam pads, same 24-month warranty.",
    specs: { "Driver": "40 mm dynamic, closed-back", "Battery": "40 hours (ANC on: 32 h)", "Connectivity": "Bluetooth 5.3 + 3.5 mm cable", "Weight": "268 g", "Warranty": "24 months" },
    reviews: [
      { name: "Amina W.", rating: 5, date: "28 Sep 2026", text: "The colourway is lovely in person — warmer than the photos suggest." },
      { name: "Ian M.", rating: 4, date: "16 Oct 2026", text: "Same great sound. Only complaint is that the limited run sells out fast." }
    ]
  }
];

const PROMOS = [
  { code: "WELCOME10", title: "10% off your first order", detail: "New customers only. Applies to a single order up to KES 20,000.", accent: "amber" },
  { code: "FREESHIP", title: "Free delivery over KES 5,000", detail: "Automatically applied at checkout within Nairobi metro.", accent: "teal" }
];
