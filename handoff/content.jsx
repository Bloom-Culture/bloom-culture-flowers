/* content.jsx — Bloom Culture DIY Flower Command Center
   All module content, mapped from the PDF guide. Exposed on window.BC. */

const MODULES = [
  /* ───────────────────────── 1. NEEDS & BUDGET ───────────────────────── */
  {
    id: "needs", num: "01", label: "Needs & Budget", nav: "Needs & Budget",
    kicker: "Let's turn your flower vision into a flower plan",
    intro: "Whether you're 'simple is best' or 'all the flowers,' it starts with three things: what you want, what you'll spend, and the colors that make you go ooooh. We'll help with all three — and yes, you're allowed to dream a little here.",
    quick: [
      "Make your wish list of every floral piece you'd love (bouquets, centerpieces, ceremony, details).",
      "Set a budget you're comfy with — use the price ranges below as a gut-check.",
      "Start a Pinterest board or phone folder for colors you love. Don't worry about flower varieties yet — that's our job."
    ],
    full: [
      { h: "Take inventory", p: "Start a wish list of every floral piece you'd love. Not sure where to begin? Brainstorm on the printable Flower Needs Worksheet at the bottom of this module, then drop your quantities into the Budget Estimator below to see a real price range. Pieces to consider: bridal bouquet, bridesmaid bouquets, bouts & corsages, ceremony arrangements, arch/arbor, centerpieces (S/M/L), table garland, bud vases." },
      { h: "Set your budget", p: "Use our Budget Estimator right here to price out your whole wish list in a few clicks — choose your arrangements, enter quantities, and get a real range based on current wholesale pricing. It's an estimate, not a formal quote. (Want the quick ballpark per piece? It's tucked just under the estimator.)",
        embed: "estimator",
        ranges: [
          "Bridal bouquet ~ $115–$230",
          "Bridesmaid bouquet ~ $29–$46",
          "Bouts & corsages ~ $3.50–$9",
          "Ceremony arrangement ~ $75–$150 (depending on scale)",
          "Arch / arbor / pergola ~ $100–$250 per grouping (depending on scale)",
          "Centerpiece — small $17–$29 · medium $29–$58 · large $58–$86",
          "Table garland (pre-made) ~ $25 - $35 / linear ft",
          "Hand-placed greenery to mimic garland ~ $8–$17",
          "Bud vases (single stems) ~ $6"
        ]
      },
      { h: "Choose colors", p: "The fun part. Collect palettes you love — wedding flowers, sure, but also bridesmaid dresses, art, gardens, anything that sparks joy. Or start from one of our Color Collections below — tap the one that makes you go ooooh to save it as your color direction. Bring it to your consult and we'll translate it into actual flower varieties for you.",
        palettes: [
          { name: "Autumnal", mood: "Warm fall tones", colors: ["#b5462f","#d99a3a","#c9a657","#7c2a2a","#6e7250"] },
          { name: "Blush & Ivory", mood: "Soft & timeless", colors: ["#e7c4c0","#f5efe2","#dba9a3","#efe3d2","#cbb8a4"] },
          { name: "Boho", mood: "Earthy & free-spirited", colors: ["#c97a55","#b08597","#d3a39b","#9aa886","#efe3d0"] },
          { name: "Bright", mood: "Bold & cheerful", colors: ["#e0568a","#e8843a","#e8c53a","#c43a78","#6faa6e"] },
          { name: "Burgundy & Blush", mood: "Rich meets soft", colors: ["#6e1f33","#e3b6b1","#c98b94","#883048","#efe2d6"] },
          { name: "Country Home", mood: "Garden cottage", colors: ["#ecd58a","#a9c0d1","#f7f3ea","#9aa886","#e3c0bb"] },
          { name: "Dusty Blush", mood: "Muted & romantic", colors: ["#d6a8a4","#b58f96","#c4b2a6","#e3c4c0","#efe4d8"] },
          { name: "Green & White", mood: "Fresh & classic", colors: ["#f7f4ec","#ede6d6","#c4d0b4","#8a9a7b","#4f6147"] },
          { name: "Greenery", mood: "All the foliage", colors: ["#9caa8e","#7e8d6e","#6b7350","#3f5238","#c0cdb0"] },
          { name: "Lavender", mood: "Calm & pretty", colors: ["#b9a7d6","#cdbbe0","#8a6fb0","#9aa886","#f3eef6"] },
          { name: "Light Blue & White", mood: "Airy & serene", colors: ["#aecadb","#f7f4ec","#8aa9bf","#eae3d4","#d4e0e8"] },
          { name: "Mauve", mood: "Moody & soft", colors: ["#b58aa0","#9a7388","#cba3b2","#c4b2ac","#ece1d8"] },
          { name: "Orange", mood: "Sunny & vibrant", colors: ["#df7a33","#e89a6a","#f0c2a0","#c2552c","#d9a23a"] },
          { name: "Pink", mood: "Playful & sweet", colors: ["#e7bcc4","#df85a0","#c95f80","#d44c84","#f0d2da"] },
          { name: "Red & Pink", mood: "Romantic pop", colors: ["#c0263a","#df7a9a","#b03a5c","#e6b3bd","#8c1f2e"] },
          { name: "Red", mood: "Bold & passionate", colors: ["#c0223a","#8c1a28","#d4382f","#a32f2a","#6e1f2c"] },
          { name: "Rust", mood: "Warm & earthy", colors: ["#b5532f","#c47a52","#a85a36","#c2622f","#9c5238"] },
          { name: "Strawberry Champagne", mood: "Sweet & golden", colors: ["#d96a7a","#ead9b8","#f3ead7","#e6bcbb","#cda868"] },
          { name: "Terracotta & Blush", mood: "Sunset warmth", colors: ["#c4744f","#e3b6ad","#eebfa0","#ab5a38","#efe2d4"] },
          { name: "Terracotta", mood: "Desert clay", colors: ["#bf6f4a","#a85436","#c98a64","#edc1a2","#8c4a2f"] },
          { name: "Wildflower", mood: "Picked-from-the-field", colors: ["#e6c44e","#df7a9a","#8aa9bf","#9a7bb0","#8a9a6e"] },
          { name: "Wine Tone", mood: "Deep & luxe", colors: ["#6e1f33","#832d44","#5a2a40","#a9788c","#cba0aa"] },
          { name: "Yellow", mood: "Bright & joyful", colors: ["#e8c53a","#d9a83a","#f0dd9a","#f3ead0","#ecd472"] },
          { name: "Blush, Ivory & Blue", mood: "Soft with a cool touch", colors: ["#e6bdb9","#f5efe2","#9fb9cc","#ece2d2","#bcd0dd"] }
        ],
        image: null,
        moodboard: {
          count: 8,
          heading: "Build your inspiration board",
          sub: "Drag in anything that makes your heart flutter — bridesmaid dresses, a tablescape, a paint chip, that sunset from your engagement shoot. Pin a few and your whole wedding's mood lives in one glance. They save right here in your workspace."
        } }
    ],
    checklist: [
      "Created my wish list of floral items",
      "Set a floral budget I'm comfortable with",
      "Started a color / inspiration board",
      "(Kind of) decided on a color scheme I love"
    ],
    worksheet: "needs",
    links: [
      { label: "Bloom Culture Color Collections", note: "Start here if colors feel overwhelming" },
      { label: "Supplies & Tools", note: "What you'll need to make it all", module: "supplies" },
      { label: "Vase Guide", note: "Vessel sizes shape what you need", module: "vases" },
      { label: "Tutorials & Recipes", note: "See what each piece involves", module: "design" }
    ],
    images: []
  },

  /* ───────────────────────── 2. WEDDING WEEK TIMELINE ───────────────────────── */
  {
    id: "timeline", num: "02", label: "Wedding Week Timeline", nav: "Wedding Week Timeline",
    kicker: "Exactly what to do, and when",
    intro: "The size of your wedding directly affects how long flowers take — so we built you a countdown. Nothing here is a hard rule; it's a calm, do-this-next map from a few months out all the way to 'I do.' Be prepaaaared (in a Type-A way, not an ominous Scar way).",
    scale: {
      heading: "How much time will this take?",
      sub: "A realistic look at the hands-on time needed based on the size of your wedding.",
      tiers: [
        { name: "Small", level: 1, detail: "Bridal party flowers + a handful of centerpieces", time: "A focused afternoon", helpers: "1–2 helpers" },
        { name: "Medium", level: 2, detail: "Up to ~15 centerpieces plus ceremony pieces", time: "Spread across 2 days", helpers: "2–3 helpers" },
        { name: "Large", level: 3, detail: "Arch / install + 20+ centerpieces & feature pieces", time: "Plan for 2–3 days + a setup crew", helpers: "4–6 helpers" }
      ]
    },
    quick: [
      "4–6 months out: take inventory, estimate budget, gather colors, book your consult, recruit helpers, start watching tutorials.",
      "2–3 months out: collect vases & buckets, buy supplies, lock your arranging location, assign helper tasks.",
      "3–4 weeks out: print recipes, share jobs with helpers, prep the room, finalize the timeline.",
      "Wedding week (Wed→Sat): flowers arrive & hydrate → bouquets → centerpieces → detail items → transport & set up."
    ],
    full: [
      { h: "4–6 months before", phase: "p1", range: { type: "months", from: 6, to: 4 }, checkable: true, list: [
        "Take inventory of flower needs",
        "Estimate your DIY flower budget",
        "Gather color palette ideas (blogs, Pinterest, Bloom Culture)",
        "Schedule your Bloom Culture DIY consultation",
        "Order from our Flower Collections (we do this for you after a consult!)",
        "Start recruiting your flower helpers",
        "Start watching the DIY tutorials"
      ]},
      { h: "2–3 months before", phase: "p2", range: { type: "months", from: 3, to: 2 }, checkable: true, list: [
        "Collect vases, decor, and buckets",
        "Purchase all supplies (see Supplies & Tools)",
        "Decide where you'll arrange — and where finished pieces will be stored (a cool room is ideal)",
        "Assign helpers their tasks",
        "Pay your package or floral proposal"
      ]},
      { h: "3–4 weeks before", checkable: true, list: [
        "Print all your floral recipes and share with helpers",
        "Prep the room you'll arrange in",
        "Double-check buckets, vases, decor, supplies",
        "Finalize timeline details and tell your helpers",
        "Fill out worksheets and hand them out",
        "Procure snacks + make a playlist for good vibes 🌿"
      ]},
      { h: "Wedding week — day by day", note: "This rhythm assumes a Saturday wedding. If yours falls on a different day, just shift each step back from your date — the order stays the same. Your flowers ship to arrive about 3 days ahead so they have time to hydrate and open.", days: [
        { day: "Wednesday", theme: "Flowers arrive · process · hydrate", items: [
          { t: "Get ready for your flowers to arrive", d: "Ideally 3–4 days before your wedding or event. Follow the \u201cGetting Started\u201d tutorial and the Flower Care section." },
          { t: "Make sure someone's home to receive the delivery", d: "Flowers must be signed for — they can't be left at the door." },
          { t: "Unbox and process all your flowers", d: "Clean and snip stems, then get everything into clean water right away (see Flower Arrival Day)." },
          { t: "Let everything hydrate", d: "Overnight is ideal — at least 4–6 hours if you're on a time crunch. They'll perk up and open beautifully." },
          { t: "Pull your bouquet recipes & pre-hydrate them", d: "Optional but a real time-saver: once processed, place each bouquet's flowers right in its vase to hydrate overnight, so they're ready to assemble tomorrow." }
        ], tips: [
          "Set the recipes for big work — like the arbor or ceremony arrangements — aside now, so you're not tempted to use those stems for bouquets or centerpieces.",
          "Pulling (or setting aside) recipes helps you keep track of your florals so you don't over-use. Stick to the recipes!"
        ]},
        { day: "Thursday", theme: "Bouquets · centerpieces · bud vases", items: [
          { t: "Design the bridal bouquet first", d: "Set aside ~2 hours. Pull your recipe first — doing the bridal first lets you pick the prettiest blooms and sets the tone for the whole wedding. Your first piece takes longest; you'll pick up speed." },
          { t: "Make the bridesmaid bouquets", d: "About 20 minutes each after the first. Bouquets can take most of the morning depending on how many you need and how many helpers you have — keep finished ones in a cool, dark place." },
          { t: "Start on centerpieces", d: "Once the bouquets are done. Pull each recipe as you go (or all at once like the bouquets) — just keep the flowers in water." },
          { t: "Then do your bud vases", d: "If they're in your design. Doing these after bouquets & centerpieces means you can use all the pretty little off-shoots you saved." }
        ], tips: [
          "Pull your recipes first: take each flower listed out of the hydration bucket and set it in a vase or container, one per arrangement. Assembly runs so much smoother and faster.",
          "ALWAYS save the little extras you pull off greenery and flowers — they're perfect later for bud vases, boutonnieres, and corsages. Keep a small cup of water beside you to hold them.",
          "At the end of the day, check water levels on bouquets, centerpieces, and bud vases and top them up. Stems in clean water, greenery in water."
        ]},
        { day: "Friday", theme: "Finish up & detail items", items: [
          { t: "Finish any low or remaining centerpieces", d: "Wrap up whatever's left from yesterday." },
          { t: "Design your tall centerpieces", d: "If you have them and haven't started. The first takes longest, then you'll fly — more helpers, faster going." },
          { t: "Make & tie your aisle markers / aisle flowers", d: "Make them and keep them in water until it's time to set them out." },
          { t: "Make your boutonnieres", d: "Use our Bout Hack on the blog to keep them fresh — you can even make these two days ahead with the hack." },
          { t: "Wrap the boutonnieres", d: "Wrap with 5/8\u2033 ribbon and give each one two pins." },
          { t: "Make your corsages", d: "" },
          { t: "Make any other detail items", d: "Flower crowns, flower-girl pieces, etc. To fridge them, keep them away from produce and bump the temp up a tad so they don't freeze." },
          { t: "Wrap the bouquets with ribbon & pin them", d: "Use 1/2\u2033 or 1\u2033 ribbon to cover the zip tie or tape, and pin it in place. Aim to have these done before your ceremony rehearsal (if you're having one)." },
          { t: "Prep your arbor / arch recipes", d: "Pull those recipes into one or two buckets so they're ready to go on the wedding day — to do yourself or hand off." }
        ], tips: [
          "Working in this order keeps the delicate detail items fresh and gets the big, time-consuming pieces off your plate first."
        ]},
        { day: "Saturday", theme: "Transport · set up · installations", items: [
          { t: "Check all pieces for freshness & run the checklist", d: "Have a friend or family member double-check so nothing gets skipped over." },
          { t: "Transport all flowers to the venue", d: "Follow our transportation guidelines and delegate this to a Type-A Aunt Tammy or trusted friends/family. Make sure you give them the checklist!" },
          { t: "Set it all up", d: "Use the venue diagram you made to keep set-up running smooth." },
          { t: "Handle any installations (arch / arbor)", d: "Allow 30–45 min to prep & load in, and 1–2 hrs to execute — give no less than 1.5 hrs, and finish at least 2 hours before the ceremony. Factor in photo timing and the outdoor temperature. Feel free to farm this out to your most trusted associates." }
        ], tips: [
          "Feel free to adjust this timeline to fit your wedding — it's a suggested rhythm to keep you on track, not a hard rule."
        ]}
      ]}
    ],
    checklist: [
      "Booked my consult, ordered flowers & started recruiting helpers — 4–6 months",
      "Bought supplies, collected vases & locked my arranging spot — 2–3 months",
      "Printed recipes, assigned jobs & prepped the room — 3–4 weeks",
      "Flowers hydrated, designed & delivered — wedding week"
    ],
    checklistNote: "The big-picture milestones — tick each phase off as you finish it. (The detailed tasks live in the dropdowns above.)",
    links: [
      { label: "DIY Flower Tutorials", note: "Watch before week-of", module: "design" },
      { label: "Flower Arrival Day", note: "The Wednesday hydration routine", module: "arrival" },
      { label: "Supplies & Tools", note: "Shop the kit before week 2–3", module: "supplies" },
      { label: "Helper Organization", note: "Recruit & assign your crew", module: "helpers" }
    ],
    images: []
  },

  /* ───────────────────────── 3. SUPPLIES & TOOLS ───────────────────────── */
  {
    id: "supplies", num: "03", label: "Supplies & Tools", nav: "Supplies & Tools",
    kicker: "The right tools make this SO much easier",
    intro: "Having the right gear on hand is half the battle — we promise. Here's everything we always keep nearby, plus what each thing actually does so nothing's a mystery.",
    collapsibleFull: true,
    quick: [
      "Floral snips (NOT scissors — scissors crush stems).",
      "Wet floral tape + stem wrap.",
      "Floral glue (not hot glue — it burns stems).",
      "Ribbon in a few widths.",
      "Buckets, vases, zip ties, paddle wire, pins, flower food."
    ],
    full: [
      { h: "Floral snips", p: "Do NOT use scissors — they squash the stem so the flower can't drink water (and then, R.I.P. flower). No bueno. Scissors are only for cutting ribbon. For stems, reach for a floral pruner or shear — something with a curved blade — which gives a clean cut so your flowers keep drinking happily." },
      { h: "Floral tape", p: "Two different tapes, two different jobs. Wet floral tape is water-resistant — it keeps its grip even when wet, so it's what you'll use on vases (our tutorials show exactly how). Stem wrap is a lightweight adhesive tape that wraps around your bouquets and boutonnieres to keep all those delicate stems bound together before you cover them with ribbon." },
      { h: "Floral glue (not hot glue)", p: "There's a real difference between floral adhesive and hot glue — in how they dry and how they treat your flowers. Hot glue can burn stems and make them wilt faster, and if it goes in the fridge the stems contract and pull away from it, so your hair combs and flower crowns fall apart. Floral adhesive works more like rubber cement: flexible, forgiving, and it sticks to itself. Pop it in a cooler and it moves with the flowers as they contract instead of separating. Always reach for floral glue." },
      { h: "Flower food", p: "Not required for your wedding flowers to thrive, but it can help extend the life of cut flowers. It's mainly a retail-florist trick for making arrangements last on a shelf — totally optional for you as a DIY client. If you'd like to use it, just follow the instructions on whatever you buy." },
      { h: "Floral foam", p: "If your design uses floral foam, soak it well — but don't rush it. Do NOT press it down into the water, or it'll trap air bubbles and end up wet on the outside yet bone-dry in the middle! Instead, gently set the foam on top of a bucket of water and let it drink on its own. Once it sinks to the bottom, it's fully soaked and ready to go. (There's a visual at the start of the foam tutorial.)" },
      { h: "Ribbon widths", p: "You'll want a few different widths of ribbon for different purposes:", list: [
        "⅝\u2033 — for corsages & boutonnieres",
        "½\u2033–1\u2033 — for bridesmaid bouquets",
        "1\u2033 — for the bridal bouquet (or a pretty mix of ribbons and sizes)"
      ]},
      { h: "Miscellaneous must-haves", p: "The supplies we always keep within reach — we promise you'll use them:", list: [
        "Zip ties — 8\u2033 for bouquets · 11–14\u2033 for installations · 4\u2033 for DIY garlands & securing smaller items (see the backdrop tutorial)",
        "Paddle wire",
        "Pins — for securing ribbon and attaching boutonnieres & corsages to jackets, etc.",
        "Cuffs",
        "Lomey bowls — clear plastic bowls that hold floral foam",
        "Flocked wire — for flower crowns"
      ]}
    ],
    shop: {
      heading: "Our fave supplies",
      sub: "Every tool below is BCF-approved and budget-friendly. Tap any one to shop it — these are the exact pieces we reach for. (We may earn a small commission, at no cost to you.)",
      groups: [
        { h: "The essentials", items: [
          { label: "Floral Snips", href: "https://www.amazon.com/shop/bloomcultureflowers/list/3IQCSF2FEFH7V?ref_=cm_sw_r_cp_ud_aipsflist_aipsfbloomcultureflowers_311ZP02S73QPPV2QTX5D&ccs_id=a9c40d38-0718-4a44-8e55-7c0d72b9b45b" },
          { label: "Floral Tape", href: "https://www.amazon.com/shop/bloomcultureflowers/list/3948OJQLMFKGW?ref_=aip_sf_list_spv_ons_mixed_d&ccs_id=ff3dc14b-76ab-47fc-a50c-dbb34a96d17a" },
          { label: "Floral Glue", href: "https://www.amazon.com/shop/bloomcultureflowers/list/N5LMGLCEBYJA?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_mixed_d&ccs_id=88528c7e-7a9b-49b3-b4e8-19ed703a01f2" },
          { label: "Floral Foam", href: "https://www.amazon.com/shop/bloomcultureflowers/list/2QC8A0PMZ7U4?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_mixed_d&ccs_id=b1b244ff-e25b-4d5e-bfc4-cc5467e08d93" },
          { label: "Ribbon", href: "https://www.amazon.com/shop/bloomcultureflowers/list/1RTTC2OLB3RC?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=936fd527-92a5-4624-b509-d9e8eb5c8455" },
          { label: "Flower Food", href: "https://www.amazon.com/shop/bloomcultureflowers/list/3SJ89RJ0F79VK?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=79f930de-dfd9-490c-a6c5-20574cb4e2f6" }
        ]},
        { h: "Vessels & big pieces", items: [
          { label: "Buckets", href: "https://www.amazon.com/shop/bloomcultureflowers/list/2H5E92KPOYHDF?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=9a89ed9f-6f0b-48f7-b364-765ea62df802" },
          { label: "Vases", href: "https://www.amazon.com/shop/bloomcultureflowers/list/1MQVFHG4S2S3P?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=30d7a0a3-ef7f-4323-9708-f47e940f3594" },
          { label: "Ceremony Arches", href: "https://www.amazon.com/shop/bloomcultureflowers/list/1GRG90SQ62D1?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=d5508b4e-268f-473a-8196-9ac04855ee69" },
          { label: "Floral Tint / Spray", href: "https://www.amazon.com/shop/bloomcultureflowers/list/3S2PGKXTO2WQ6?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=1d170cfd-010b-4720-83f9-7195c8b76c0a" },
          { label: "Metal Stands", href: "https://www.amazon.com/shop/bloomcultureflowers/list/2X337WPBLA5YH?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=27d30b57-3f50-4d97-911a-9ceb3296d1e3" },
          { label: "Miscellaneous", href: "https://www.amazon.com/shop/bloomcultureflowers/list/1M547YOJ1EHZ9?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=3b139da6-4d0f-4260-8d89-af707da0fbd6" }
        ]}
      ]
    },
    checklist: [
      "Floral snips / pruners",
      "Wet floral tape + stem wrap",
      "Floral glue (not hot glue)",
      "Ribbon in needed widths",
      "Buckets & vases (cleaned)",
      "Zip ties, paddle wire, pins",
      "Flower food (optional)",
      "Made a shopping list from my recipe supply notes"
    ],
    worksheet: "supplies",
    links: [
      { label: "Shop sustainable options", note: "Eco-friendly picks", href: "https://www.amazon.com/shop/bloomcultureflowers/list/LTSHZAX3BKR?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d" },
      { label: "Arranging Flowers", note: "Put your kit to work", module: "design" },
      { label: "Flower Arrival Day", note: "Have everything ready before delivery", module: "arrival" }
    ],
    images: []
  },

  /* ───────────────────────── 4. FLOWER ARRIVAL DAY ───────────────────────── */
  {
    id: "arrival", num: "04", label: "Flower Arrival Day", nav: "Flower Arrival Day",
    kicker: "Hydration changes everything",
    intro: "Heads up: when your flowers are delivered they'll look a little weak and sleepy. DO NOT PANIC — this is absolutely normal and we promise they're not dead. They're just really thirsty (dying for a drink of water!). Follow the flower-prep steps below and your blooms will be back to their perky best in a couple of hours.",
    collapsibleFull: true,
    quick: [
      "Be home to sign for the delivery (it can't be left at the door).",
      "Unbox immediately and unpackage everything.",
      "Clean → snip at 45° → into clean water (no leaves below the waterline).",
      "Hydrate in a cool, dark spot — overnight is ideal, 2–4 hrs minimum.",
      "Report any issues in writing within 24 hours."
    ],
    flowSteps: {
      heading: "Simple flower prep steps",
      sub: "Your make-your-flowers-prancy game plan for the moment they arrive. Tap a step to check it off as you go.",
      steps: [
        { t: "Unpackage & organize", d: "Have buckets & vases cleaned and filled with 4–5\u2033 of water before the flowers arrive. Unbox right away, group like-with-like, and check everything against your order. Snip off rubber bands and remove sleeves.", tip: "Leave cardboard sleeves on roses until they've hydrated — they need the extra support." },
        { t: "Clean stems", d: "One variety at a time, strip the unwanted lower leaves and foliage. Watch out for thorns on roses! Bruised outer \u2018guard petals\u2019 are normal — pluck them after hydrating." },
        { t: "Snip stems", d: "Give each a clean cut at a 45° angle. Longer stems (like roses): trim ¼\u2033–½\u2033. Shorter stems (ranunculus, tulips): about ⅛\u2033.", tip: "Do NOT use scissors — they crush the stem so the flower can't drink." },
        { t: "Place in bucket", d: "Into water immediately so the fresh cut doesn't dry out. Keep all blooms and leaves above the waterline (below it grows bacteria), and don't overcrowd — flowers need room to bloom.", tip: "Label buckets with masking tape as you go, so helpers can find each variety fast." },
        { t: "Hydrate", d: "Set everything in a cool, dry spot out of the sun. Overnight is ideal; 2–4 hours minimum if you're on a crunch. They'll open up and look even more beautiful — which is why we ship ~3 days early." },
        { t: "Prep your workspace", d: "While the flowers rest, take inventory of all the supplies and vases you'll need (enough for every helper!). Lay down a tarp, shower curtain, or towels to catch all those flying stems." }
      ]
    },
    beforeAfter: {
      heading: "Sleepy → prancy",
      sub: "Snap a before-and-after of your blooms so you can see the hydration magic for yourself.",
      before: { label: "Just arrived (sleepy)", id: "arrival-before" },
      after: { label: "After hydrating (prancy!)", id: "arrival-after" }
    },
    full: [
      { h: "Bucket sizes — what holds what", p: "One bucket or vase per variety is the rule of thumb — some varieties are temperamental and don't play well with others. Rough capacities to plan around:", list: [
        "Large 5-gal bucket — 25–50 roses (50 max)",
        "Large bucket — 25–50 carnations (50 max)",
        "Large bucket — 4–5 bunches of greenery",
        "Large / tall bucket — snapdragon, delphinium, larkspur (~40 stems max)",
        "Medium 2.5-gal bucket — 10–40 spray roses (40 max)",
        "Small bucket or vase — delicate short stems like ranunculus, anemone & tulip (~20 max)"
      ] },
      { h: "Guard petals are totally normal", p: "It's common to see bruised, brown-looking petals on the outer edges of your blooms — these are guard petals, there to protect the flower in transit. Pluck them off after hydrating or as you arrange. It does NOT mean the flower is bad!" },
      { h: "Will they need a cooler?", p: "One word — nope! Keep them in a cool, dry place out of the sun. The only exception is when you want blooms to open up more: set them near a window or outside, as long as it's not above 80°F." },
      { h: "Keep your shipping boxes!", p: "Don't toss them — they're perfect later for transporting all your flowers to the ceremony and reception venues." },
      { h: "What if my flowers aren't in great shape?", p: "Rare, but it happens — and we have hacks to perk them back up and feeling sassy again. A loss of 1–3 stems per bunch is normal (we account for this in your quantities).\n\nIf something seems truly unsalvageable, contact us in writing within 24 hours of delivery for a full or partial refund. We can't refund flowers that weren't properly hydrated or given time to recover." }
    ],
    checklist: [
      "Buckets & vases cleaned + filled before arrival",
      "Someone home to sign for delivery",
      "Unboxed & unpackaged everything immediately",
      "Cleaned, snipped at 45°, into water",
      "Flowers hydrating in a cool, dark spot",
      "Workspace prepped with tarp",
      "Checked order against packing list (report issues in 24 hrs)"
    ],
    links: [
      { label: "\u201cGetting Started\u201d tutorial", note: "Watch before you unbox", href: "https://youtu.be/TJcue3iFRmw?si=jNjuWzunUv03jITQ" },
      { label: "Supplies & Tools", note: "Have your kit ready first", module: "supplies" },
      { label: "Arranging Flowers", note: "Up next, once they're hydrated", module: "design" },
      { label: "Flower quality / refund policy", note: "The 24-hour window", href: "https://bloomcultureflowers.com/policies/refund-policy" }
    ],
    images: []
  },

  /* ───────────────────────── 5. DESIGN DAY ───────────────────────── */
  {
    id: "design", num: "05", label: "Arranging Flowers", nav: "Arranging Flowers",
    kicker: "Floral Design 101 — you've got this",
    intro: "Okay, deep breath — this is the fun part, and you are so much more capable than you think. Work in order (bouquets first, then centerpieces, then the little details), follow your recipes like a trusty cookbook, and watch your flowers come to life. Your very first piece will feel slow and a little chaotic — totally normal! — and then you'll hit your groove and start feeling like the floral wizard you were always meant to be.",
    quick: [
      "Order of operations: bridal bouquet → bridesmaids → centerpieces → bud vases → detail items.",
      "Pull each recipe before you start that piece so you don't over-use flowers.",
      "Save every off-cut bud & sprig — they're gold for bouts, corsages & bud vases.",
      "First piece is slow (~20 min/bouquet after that). Keep finished pieces in a cool, dark place.",
      "Top up water at the end of every day."
    ],
    collapsibleFull: true,
    orderOfOps: {
      heading: "Order of operations",
      sub: "Work in this order on design day — it keeps your delicate detail pieces fresh and gets the big, time-consuming jobs off your plate first.",
      steps: ["Bridal bouquet", "Bridesmaid bouquets", "Centerpieces", "Bud vases", "Detail items"]
    },
    families: {
      heading: "Flower terminology",
      sub: "Your recipes use six flower \u2018families\u2019 so you always know what each ingredient does. (Examples include but aren't limited to those listed.)",
      items: [
        { name: "Focal", id: "family-focal", desc: "One central, large bloom", examples: "Roses · Peonies · Hydrangea · Dahlia · Protea" },
        { name: "Linear", id: "family-linear", desc: "Multiple blooms along the stem", examples: "Stock · Snapdragon · Delphinium · Larkspur · Foxglove" },
        { name: "Spray", id: "family-spray", desc: "One stem, multiple single blooms", examples: "Spray Roses · Mini Carnations · Lisianthus · Astrantia · Thistle" },
        { name: "Detail", id: "family-detail", desc: "Delicate specialty blooms", examples: "Butterfly Ranunculus · Ranunculus · Anemone · Poppy · Scabiosa" },
        { name: "Filler", id: "family-filler", desc: "Many small blooms per stem", examples: "Wax Flower · Baby's Breath · Statice · Solidago" },
        { name: "Greenery", id: "family-greenery", desc: "Foliage with no bloom", examples: "Salal / Lemon Leaf · Eucalyptus · Italian Ruscus · Leather Leaf · Queen Anne's Lace" }
      ]
    },
    tutorials: {
      heading: "Design tutorials",
      sub: "Our step-by-step videos teach you how to make everything. Tap a category and watch before you start — soon they'll ask \u201cwho did the lovely flowers?!\u201d and you'll say \u201cwe did.\u201d",
      items: [
        { label: "Bouquets", id: "tut-bouquets", href: "https://bloomcultureflowers.com/blogs/tutorials/tagged/bouquets" },
        { label: "Boutonnières", id: "tut-bouts", href: "https://bloomcultureflowers.com/blogs/tutorials/tagged/boutonnieres" },
        { label: "Corsages", id: "tut-corsages", href: "https://bloomcultureflowers.com/blogs/tutorials/tagged/corsages" },
        { label: "Crowns / Hair", id: "tut-crowns", href: "https://bloomcultureflowers.com/blogs/tutorials/tagged/crowns" },
        { label: "Ceremony", id: "tut-ceremony", href: "https://bloomcultureflowers.com/blogs/tutorials/tagged/ceremony" },
        { label: "Reception", id: "tut-reception", href: "https://bloomcultureflowers.com/blogs/tutorials/tagged/reception" }
      ]
    },
    full: [
      { h: "Front-load your ceremony pieces (the \u201creverse mullet\u201d)", p: "We put the majority of the flowers in the front of large ceremony arrangements, because that's the side everyone sees. Since ceremony pieces usually face one direction and the back is barely visible, put your money where people will see it. The back isn't bare — just not as full as the front. Think of it as a reverse mullet." },
      { h: "Use more greenery to save money", p: "Greenery is less expensive by volume than flowers — even the affordable ones — so you get a lot of bang for your buck. Want grander arrangements on a tighter budget? Use more greenery (and imagine us making it rain with your savings!)." },
      { h: "Re-use your ceremony items!", p: "Delegate someone to move your ceremony arrangements over to the reception. They're statement pieces — don't pay for and build them just to use for 30 minutes! Flank a sweetheart table, set them at the entry or photo booth, wherever — just promise you'll re-use them." },
      { h: "Re-purpose the bridesmaid bouquets", p: "So many gorgeous bouquets end up forgotten on tables. Have vases ready to go on your reception tables and give your head bridesmaid (or Aunt Karen) the job of rounding them up and setting them out." }
    ],
    recipe: {
      heading: "Flower recipes",
      intro: "We give you a recipe for every bouquet, centerpiece, and arrangement you need. Think of it like a cooking recipe — it lists every ingredient and the exact quantities, so all you do is follow along and voilà (magic appears, no calories). We even calculate the stem count to generate your whole flower order — one-stop shop, zero guesswork on your end.",
      cardTitle: "Example bridal bouquet",
      imgId: "recipe-bouquet-img",
      vessel: "4\u2033 Holly Chapple Egg",
      greenery: ["Salal / Lemon Leaf", "Gunni Eucalyptus"],
      flowers: [
        { q: "2-3", n: "Spray Roses" },
        { q: "3–4", n: "Butterfly Ranunculus" },
        { q: "3-4", n: "Stock" },
        { q: "4-6", n: "Quicksand Roses" },
        { q: "3-4", n: "Toffee Roses" },
        { q: "2-3", n: "Mini Carnations" },
        { q: "2-3", n: "Ranunculus" }
      ]
    },
    checklist: [
      "Pulled recipes before starting each piece",
      "Bridal bouquet done (gave it extra time)",
      "Bridesmaid bouquets done",
      "Centerpieces done",
      "Bud vases done (using saved off-cuts)",
      "Detail items: bouts, corsages, crowns",
      "Bouquets wrapped in ribbon + pinned",
      "Topped up all water levels"
    ],
    links: [
      { label: "Browse all our flowers", note: "Meet every variety, by type", href: "https://bloomcultureflowers.com/pages/all-flowers" },
      { label: "Flower Collections & Kits", note: "Curated by color & style", href: "https://bloomcultureflowers.com/collections/diy-collections" },
      { label: "Bloom Culture on YouTube", note: "Every tutorial, all in one place", href: "https://www.youtube.com/channel/UCj-DYu4CfnmFrgLXSqAyq4A" },
      { label: "Helper Organization", note: "Rally your design crew", module: "helpers" },
      { label: "Transport & Setup", note: "Once everything's made", module: "transport" }
    ],
    images: []
  },

  /* ───────────────────────── 6. HELPER ORGANIZATION ───────────────────────── */
  {
    id: "helpers", num: "06", label: "Helper Organization", nav: "Helper Organization",
    kicker: "Prep your peeps",
    intro: "Here's a happy truth: people WANT to help with the flowers — it's genuinely the fun job, and literally anyone can do it (no gifted-and-talented certificate required). The only catch is you gotta prep your peeps. Nobody likes walking into a job they weren't ready for, so give everyone a clear role ahead of time and hand them a filled-out worksheet. But first — let's figure out how many people you need to buy pizza for.",
    quick: [
      "Use the chart to figure out how many helpers you need.",
      "Split them into 3 jobs: Receive & Process · Design · Transport & Set-up.",
      "Send the tutorial page + their role in advance so no one's caught off guard.",
      "Fill out a Helper Assignment Sheet for each person and hand it out with their recipes."
    ],
    photo: { id: "helpers-crew", caption: "Your dream team in action — flowers are more fun with your favorite people. 🌸" },
    helperChart: {
      heading: "How many helpers will I need?",
      sub: "One size does not fit all — use this as a starting point, then pick what feels comfortable. If you only need bridal-party flowers and a couple of centerpieces, no need to call in the cavalry!",
      cols: ["Bridal party", "Centerpieces", "Ceremony items", "Helpers"],
      rows: [
        { c: ["Bouquets + personal flowers", "—", "—", "1–2"] },
        { c: ["Bouquets + personal flowers", "Up to 5", "—", "1–2"] },
        { c: ["Bouquets + personal flowers", "5–15", "—", "2–3"] },
        { c: ["Bouquets + personal flowers", "15+", "Floral arch", "3–5"] },
        { c: ["Bouquets + personal flowers", "20+", "Arch / install + feature pieces", "4–6"] }
      ]
    },
    jobs: {
      heading: "Jobs for your helpers",
      sub: "Based on how many helpers you land on, here's how we'd divvy up the work. Helpful tip: have all the supplies ready for them — buckets, vases, snips, the works — so they can dive right in.",
      items: [
        { n: "1", title: "Receive & process flowers", team: "", steps: [
          "Be at the delivery location on time to receive the flowers.",
          "Prep & fill buckets/vases and have them ready.",
          "Have all tools & supplies on hand.",
          "Lay a tarp on the floor or counter for easy cleanup.",
          "Organize flowers into buckets by recipe — e.g. all the stems for each bridesmaid bouquet in its own vase — so no one over-uses product.",
          "Sip coffee or rosé, depending on the time of day."
        ], homework: "Have these helpers read the Flower Arrival Day section BEFORE delivery day.", fun: "Opening a box of flowers is like Christmas — but with flowers!" },
        { n: "2", title: "Designing flowers", team: "Can be 2–3 teams — Bridal Party / Bouquets · Centerpieces · Ceremony", steps: [
          "Review the flower recipes and watch the Bloom Culture tutorials BEFORE the big day.",
          "Arrange via the suggested timeline + tutorials — watching together helps, especially for the first piece.",
          "The first piece takes longest; everyone picks up speed fast (promise!).",
          "Have your craftiest helper make a \u2018prototype\u2019 piece others can copy — so when someone asks \u201cwhat are we going for here?\u201d you can point & smile."
        ], homework: "Watch the tutorials, make a mock-up if you can, and have all supplies & tools ready for helpers before they arrive.", fun: "You get to arrange beautiful flowers with your besties!" },
        { n: "3", title: "Transport & set-up", team: "Can be the same teams or separate — see Transport & Setup for timelines", steps: [
          "Ceremony set-up: place arrangements in their spots with fresh, clean water, following the diagram. Setting up your own arch? Do that first, then clean up.",
          "Set out pre-made arrangements in time for photos — roughly 1.5 hrs before start (weather depending).",
          "Reception set-up: fluff & quality-check after transport, top up clean water, set centerpieces & decor on the right tables.",
          "Work backwards from your ceremony time, and confirm when your venue allows access."
        ], homework: "Walk helpers through how you'd like everything set up — a diagram is gold so no one has to keep asking for directions.", fun: "" }
      ]
    },
    checklist: [
      "Decided how many helpers I need",
      "Assigned everyone to a team / job",
      "Shared the tutorial page with helpers",
      "Filled out a Helper Assignment Sheet per person",
      "Gave each helper their recipes",
      "Confirmed snacks & a playlist (morale matters!)"
    ],
    worksheet: "helper",
    links: [
      { label: "Flower Arrival Day", note: "Job 1's homework", module: "arrival" },
      { label: "Arranging Flowers", note: "Job 2's tutorials & recipes", module: "design" },
      { label: "Transport & Setup", note: "Job 3's timeline & diagram", module: "transport" }
    ],
    images: []
  },

  /* ───────────────────────── 7. TRANSPORT & SETUP ───────────────────────── */
  {
    id: "transport", num: "07", label: "Transport & Setup", nav: "Transport & Setup",
    kicker: "Get them there in one piece",
    intro: "You'd think moving flowers is simple — but anyone who's done it will tell you it can be the stressful part. Don't worry, these tricks keep heads on stems and water off your upholstery, and we've got worksheets to keep your drivers organized.",
    collapsibleFull: true,
    quick: [
      "Use boxes to stabilize — keep the shipping ones! Pad between vases with towels.",
      "Don't overcrowd; everyone needs space on a road trip.",
      "Cut boxes down to vase height so blooms don't get smashed.",
      "Tarp/towels in the car. Drive slow, take turns gently.",
      "Transport tall vases LOW — take the bowl off the stand."
    ],
    full: [
      { h: "Boxes & packing", p: "Boxes stabilize your flowers on the road and keep them from tipping. A few box rules:", list: [
        "Keep the boxes your flowers shipped in — they're perfect for transport.",
        "Pad between arrangements & vases with towels or newspaper.",
        "Don't overcrowd — crowding snaps heads and stems. Everyone needs a little space on a road trip!",
        "Ask local liquor stores for boxes — wine boxes are especially handy for bud vases.",
        "Cut boxes down to the same height as your vases so blooms don't get smashed (laundry baskets work too).",
        "Make sure boxes are sturdy — vases full of flowers & water get HEAVY. Reinforce any fold-out bottoms big time, and only use those in the vehicle, never for carrying into the venue (we've had many collapse — not good).",
        "Pack boxes snug; out of boxes, nestle pieces close so they support each other — just keep blooms from touching."
      ] },
      { h: "Your vehicle", p: "", list: [
        "Use your own car, but lay a tarp or towels down to protect it from water & spillage.",
        "For larger weddings, size up the vehicle to cut down on trips — you can even rent a U-Haul van (cheap — around $19.99 + mileage)."
      ] },
      { h: "On the road & on arrival", p: "", list: [
        "Transport tall vases LOW — take the dish or lomey bowl off the tall stand and reattach on site.",
        "Take your time: drive slow and take turns gently so the flowers shift as little as possible (less spillage!).",
        "On arrival, fluff & quality-check, top up clean water, then set each piece in its spot using your venue diagram."
      ] }
    ],
    venueDiagram: {
      heading: "Make a venue diagram",
      sub: "A placement diagram makes set-up smooth — your crew knows exactly where every arrangement goes, no constant \u201cwhere does this one go?\u201d Even if you'll be there, make one so helpers can work without you.",
      steps: [
        "Get a copy of your venue layout, or sketch a quick one — it doesn't have to be perfect!",
        "Assign each arrangement a letter or number.",
        "Make a quick legend describing which arrangement goes with each letter or number.",
        "Mark each spot on your diagram — as elaborate or as simple as you need."
      ],
      imgId: "venue-diagram",
      caption: "Drop your venue diagram here (a phone photo of a sketch is perfect).",
      legend: [
        { k: "A", v: "Centerpiece 1 — low" },
        { k: "B", v: "Centerpiece 2 — tall" },
        { k: "C", v: "Centerpiece 3 — 3 bud vases" },
        { k: "D", v: "Arrangement 1" },
        { k: "E", v: "Bridesmaid bouquet (repurposed)" },
        { k: "F", v: "Ceremony backdrop (repurposed)" }
      ]
    },
    checklist: [
      "Saved sturdy boxes, cut to vase height",
      "Padding (towels/newspaper) between pieces",
      "Tarp/towels down in the vehicle",
      "Tall vases broken down to transport low",
      "Venue diagram made & shared with the set-up crew",
      "Transportation Checklist filled out per driver"
    ],
    worksheet: "transport",
    links: [
      { label: "Helper Organization", note: "Assign your transport crew", module: "helpers" },
      { label: "Flower Arrival Day", note: "Where the shipping boxes come from", module: "arrival" }
    ],
    images: []
  },

  /* ───────────────────────── 8. VASE GUIDE ───────────────────────── */
  {
    id: "vases", num: "08", label: "Vase Guide", nav: "Vase Guide",
    kicker: "Right vessel, right scale",
    intro: "Not every vase will fit these exact specs — this is a starting point for figuring out the scale of each piece. Every recipe flexes to fit your vase, your budget, and your vision.",
    vessels: {
      heading: "Vase sizes",
      sub: "A quick guide to the vases you'll need and what each is for.",
      items: [
        { name: "Bouquet vases", spec: "3–4\u2033 opening · 6–9\u2033 tall", note: "Keep bouquets hydrated until the moment you walk down the aisle.", id: "vase-bouquet" },
        { name: "Ceremony (urn or modern)", spec: "8\u2033+ opening · height your choice", note: "Statement vessels for arch, altar & entry arrangements.", id: "vase-ceremony" },
        { name: "Small centerpiece", spec: "3–4\u2033 opening · 3–5\u2033 tall", note: "About the size of a mason jar.", id: "vase-small" },
        { name: "Medium centerpiece", spec: "4–5\u2033 opening · 3–5\u2033 tall", note: "The crowd-pleaser for most guest tables.", id: "vase-medium" },
        { name: "Large centerpiece", spec: "5–7\u2033 opening · 6\u2033+ tall", note: "Lush, show-stopping table moments.", id: "vase-large" },
        { name: "Bud vases", spec: "opening under 1\u2033 · various heights", note: "Single stems in little bottles or vases.", id: "vase-bud" }
      ]
    },
    cpChart: {
      heading: "Centerpiece size & recipe",
      sub: "Not every vase or arrangement fits this exactly — it's a starting point for picking the scale of centerpiece you want. Adjust to your needs, budget, and vase size.",
      note: "Stems of greenery and flowers can be broken down from one large stem to stretch your product!",
      glossaryNote: "New to focal / linear / spray / detail / filler? Meet the flower families in the glossary.",
      sizeCue: [
        { label: "Small", h: 46, w: 38, sub: "mason-jar size" },
        { label: "Medium", h: 64, w: 50, sub: "guest-table go-to" },
        { label: "Large", h: 92, w: 66, sub: "lush statement" }
      ],
      rows: ["Focal flowers", "Linear flowers", "Sprays", "Detail flowers", "Filler flowers", "Greenery"],
      sizes: [
        { label: "Small", vals: ["2–3", "1", "1–2", "—", "3–4", "3–4"] },
        { label: "Medium", vals: ["4–6", "2", "2–3", "2–3", "4–7", "4–8"] },
        { label: "Large", vals: ["6–8", "2–4", "3–4", "3–4", "6–9", "6–10"] }
      ]
    },
    vaseTally: {
      heading: "How many vases do I need?",
      sub: "Tally up your vessels here — it saves as you go, so you know exactly what to source or shop. (A good starting point: one centerpiece per guest table.)",
      rows: ["Bridal & bridesmaid bouquet vases", "Small centerpieces", "Medium centerpieces", "Large centerpieces", "Bud vases", "Ceremony urns / stands"],
      shopLabel: "Shop our fave vases & vessels",
      shopHref: "https://www.amazon.com/shop/bloomcultureflowers/list/1MQVFHG4S2S3P?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=30d7a0a3-ef7f-4323-9708-f47e940f3594"
    },
    checklist: [
      "Counted bouquet vases needed",
      "Chose centerpiece vessels (S/M/L)",
      "Sourced bud vases (<1\u2033 opening)",
      "Picked ceremony urns/stands"
    ],
    checklistPhoto: { id: "vase-lineup", fit: "cover", ratio: "16 / 9", placeholder: "Drop a photo of your vessel line-up", caption: "Your vessel line-up — small to large, all in a row. 🌸" },
    links: [
      { label: "Shop vases & vessels", note: "BCF-approved picks", href: "https://www.amazon.com/shop/bloomcultureflowers/list/1MQVFHG4S2S3P?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=30d7a0a3-ef7f-4323-9708-f47e940f3594" },
      { label: "Arranging Flowers", note: "Recipes & Tutorials", module: "design" }
    ],
    images: []
  },

  /* ───────────────────────── 9. ETIQUETTE ───────────────────────── */
  {
    id: "etiquette", num: "09", label: "Etiquette", nav: "Etiquette",
    kicker: "Be a gracious DIYer",
    intro: "A little courtesy goes a loooong way. People are WAY more willing to help you, open up their venues early, and bend over backwards for you when you're kind, communicative, and tidy. Here's how to be the couple (and crew) every venue loves.",
    collapsibleFull: true,
    quick: [
      "Don't assume your planner/coordinator handles flowers — ask what's actually in their contract.",
      "Ask your venue the earliest time you can get in with flowers.",
      "Don't assume you can use the venue's kitchen, cooler, or sink — always ask.",
      "Never dump flower water in planters or prominent spots; clean up & leave no trace.",
      "Over-communicate with your whole team — helpers, coordinators, venue owners."
    ],
    full: [
      { h: "Don't assume — ask", p: "Don't assume your wedding planner or coordinator (or anyone, really) will do your arrangements, transportation, or clean-up. If that's something you're expecting from them, communicate it clearly and ask whether it's part of their contract with you." },
      { h: "Ask about venue access", p: "Always ask your venue(s) the earliest time you can gain access with your flowers. Most of the time, the people setting up are allowed to arrive earlier than the bridal party — but you have to ask." },
      { h: "Don't assume kitchen or cooler use", p: "Do not assume you can use your venue's kitchen or cooler. Most of the time they don't allow it — they have to keep high sanitation standards in their kitchens. Ask which sink they'd prefer you and your helpers use, if you need one." },
      { h: "Be kind to their landscaping", p: "Do NOT dump buckets of water out in prominent places or planters. Look for inconspicuous areas so you don't flood their landscapes." },
      { h: "Clean up after yourself", p: "Goes without saying, but leave no trace after your floral installation or any on-site work. Don't fill the venue's trash cans with flower trash — those are emptied for YOUR guests to use, and you don't want them overflowing at your ceremony or reception. This is exactly why we suggest a tarp: catch all your trash on it, roll it up, toss it in the back of the truck, and dispose of it later in a dumpster. (The trash, not the tarp!)" },
      { h: "Communicate with your whole team", p: "Helpers, coordinators, venue owners — everyone. People are WAY more willing to work with you, help you, and open up venues for you if you let them know what you're planning." },
      { h: "Say thank you 🌸", p: "Your helpers are giving you their time and energy — that's a real gift. Feed them well, keep snacks and drinks flowing on design day, and a heartfelt handwritten thank-you note afterward goes a loooong way (and costs nothing but a few sweet minutes). Don't forget to thank your venue staff and coordinator too — kindness is free, and it's the kind of thing people remember." }
    ],
    venueQuestions: {
      heading: "Questions to ask your venue",
      sub: "Bring this to your venue walkthrough or send it in an email — it saves so much day-of scrambling. Check them off as you get answers.",
      items: [
        "What's the earliest time we can get in with our flowers?",
        "When do we need to be fully cleared out?",
        "Which sink can my helpers and I use?",
        "Is there a cooler or fridge we're allowed to use? (Don't assume!)",
        "Where should we dispose of bucket water so we don't flood the landscaping?",
        "Where do we put floral trash so it's not in the guest cans?",
        "Can the set-up crew arrive before the bridal party?",
        "Are there any decor or installation restrictions we should know about?"
      ]
    },
    contacts: {
      heading: "Day-of contact list",
      sub: "Fill in your key people so everyone can reach everyone. Saves as you type — print one for each helper.",
      rows: ["Coordinator / planner", "Venue manager", "Lead flower helper", "Transport / set-up lead", "Day-of point person"]
    },
    checklist: [
      "Confirmed who's responsible for flowers, transport & cleanup (in writing)",
      "Asked the venue my earliest access time",
      "Asked about sink use (and confirmed no kitchen/cooler)",
      "Have a plan for water disposal & trash (tarp!)",
      "Looped in helpers, coordinators & venue owners"
    ],
    links: [
      { label: "Helper Organization", note: "Loop in your crew", module: "helpers" },
      { label: "Transport & Setup", note: "Tarp & cleanup tips", module: "transport" }
    ],
    images: []
  },

  /* ───────────────────────── 10. EMERGENCY HELP ───────────────────────── */
  {
    id: "emergency", num: "10", label: "Troubleshooting", nav: "Troubleshooting",
    kicker: "You're the human, it's the flower",
    intro: "Standard natural hierarchy here, people. Most 'emergencies' are just thirsty flowers — if yours still need help after following the prep guide and hydrating, they are NOT goners. We'll just give them the floral version of avocado toast to de-grump. Here's how, plus when to actually e-mail us.",
    introLink: { text: "e-mail us", href: "mailto:hello@bloomcultureflowers.com" },
    collapsibleFull: true,
    banner: "99% of flower \u201cemergencies\u201d are just thirst. Breathe — you've got this.",
    quick: [
      "Wilting? Re-snip an inch higher, lukewarm water, add flower food.",
      "Hydrangea down? Submerge the whole head ~30 min, shake, recut, rehydrate.",
      "Brown/bruised petals? Pluck them off ASAP to stop the spread.",
      "Shipment delayed? They're not dead — hydration usually revives them.",
      "Truly unsalvageable? E-mail us in writing within 24 hrs of delivery."
    ],
    flowSteps: {
      heading: "Flower first-aid fixes",
      sub: "Three quick rescues for grumpy blooms. Tap a fix to mark it done.",
      slotPrefix: "fix",
      steps: [
        { t: "Wilting flowers", img: "assets/fix-wilting.png", d: "Snip the stem again about an inch or two higher, place in lukewarm water, and let them hydrate again.", tip: "A little flower food gives them a shot of glucose to perk right up." },
        { t: "Sad hydrangea", img: "assets/fix-hydrangea.png", d: "Submerge the entire bloom completely in water for about 30 minutes, shake it out to dry, recut the stem, and place it back in water. Hydrangeas drink through their heads!", tip: "" },
        { t: "Brown or bruised petals", img: "assets/fix-bruised.png", d: "Common, especially on white petals. Pluck them off or trim the affected areas with scissors as soon as you see bruising (or right when you unpackage) to prevent the spread.", tip: "" }
      ]
    },
    moreFixes: {
      heading: "More quick fixes",
      sub: "A few other things that pop up — easy to solve, promise.",
      items: [
        { t: "Roses won't open", d: "Gently cup the bloom and ruffle the petals outward with your thumbs, or set them in a warm spot near a window. A little warmth coaxes them open." },
        { t: "Roses too open / blown", d: "The opposite problem — move them somewhere cool (a cold room or fridge, away from produce) to slow them down and hold them until the big day." },
        { t: "Drooping or bent rose neck", d: "Re-cut the stem and lay the whole rose flat in a tub of water for 20–30 minutes so the stem rehydrates fully, then stand it back up." },
        { t: "Leaves or petals browning early", d: "Usually dirty water or too much sun. Change to fresh clean water, recut stems, and keep everything in a cool spot out of direct light." },
        { t: "Cloudy or smelly water", d: "Bacteria! Dump it, rinse the bucket, refill with clean cool water, and give stems a fresh snip. Strip any leaves sitting below the waterline." }
      ]
    },
    normalVsReport: {
      heading: "Normal vs. worth an e-mail",
      normalLabel: "Totally normal",
      reportLabel: "Worth an e-mail",
      normal: [
        "1–3 lost stems per bunch (3–5%)",
        "Slight color, size or fragrance variation",
        "Sleepy, thirsty-looking blooms on arrival",
        "Guard petals that are bruised or brown",
        "Flowers that perk up after hydrating"
      ],
      report: [
        "Whole bunches arrive damaged or mushy",
        "Major mold or rot out of the box",
        "Wrong varieties or missing items vs. your order",
        "Flowers that won't recover after proper hydration",
        "Anything off — within 24 hrs, in writing"
      ]
    },
    full: [
      { h: "Nature does its own thing", p: "Flowers, like any natural product, vary in color, size, fragrance, and more. We can't guarantee any given shade, tint, or hue — we can't control nature (believe us, we've tried sweet-talking it)." },
      { h: "Delayed shipment?", p: "Deep breath — a delay does NOT mean your flowers are dead. They usually perk right up with some hydration once they arrive. Give them a drink and a little time before you worry." },
      { h: "When to e-mail us", p: "If flowers arrive in genuinely bad shape and careful hydration doesn't help, e-mail us in writing within 24 hours of delivery for a full or partial refund. We can't refund flowers that weren't hydrated or given time to recover." }
    ],
    checklist: [
      "Tried re-snipping + fresh lukewarm water",
      "Added flower food to perk-up buckets",
      "Plucked any bruised petals early",
      "Noted the 24-hr written-report window"
    ],
    links: [
      { label: "E-mail Bloom Culture", note: "We answer fast", href: "mailto:hello@bloomcultureflowers.com" },
      { label: "Flower Arrival Day", note: "The hydration routine", module: "arrival" },
      { label: "Full flower-care / refund policy", note: "The 24-hour window", href: "https://bloomcultureflowers.com/policies/refund-policy" }
    ],
    images: []
  }
];

window.BC = {
  modules: MODULES,
  byId: Object.fromEntries(MODULES.map(m => [m.id, m])),
  brand: {
    name: "Bloom Culture",
    tagline: "DIY Wedding Flower Planner",
    founder: "Alison Fleck",
    handle: "@bloomcultureflowers"
  }
};
