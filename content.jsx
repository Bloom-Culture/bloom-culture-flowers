/* content.jsx, Bloom Culture DIY Flower Command Center
   All module content, mapped from the PDF guide. Exposed on window.BC. */

const MODULES = [
  /* ───────────────────────── 1. NEEDS & BUDGET ───────────────────────── */
  {
    id: "needs", num: "01", label: "Needs & Budget", nav: "Needs & Budget",
    kicker: "Let's turn your flower vision into a flower plan",
    intro: "Whether you're 'simple is best' or 'gimme all the flowers,' it starts with three things: what you want, what you'll spend, and the colors that make your heart skip. We'll help with all three! And yes, you're allowed to dream a little here.",
    quick: [
      "Make your wish list of every floral piece you'd love (bouquets, centerpieces, ceremony, details).",
      "Set a budget you're comfy with, use the price ranges below as a gut-check.",
      "Start a Pinterest board or phone folder for colors you love. Don't worry about flower varieties yet, that's our job."
    ],
    full: [
      { h: "Choose colors", p: "Now for the fun part: gather up the palettes that speak to you, wedding flowers, obviously, but also that bridesmaid dress you love, a painting, a sunset, anything that sparks joy. Not sure where to start? Tap one of our Color Collections below to save it as your color direction, or build your very own palette and mood board below with the mood board creator.",
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
          count: 10,
          heading: "Build your mood board",
          sub: "Drag in anything that makes your heart flutter! Once you've pinned a few, tap the 'create my mood board' button below and we'll generate a custom mood board with an editable color palette pulled right from your photos, ready to download and share."
        } },
      { h: "Take inventory & set your budget", p: "Two birds, one list. Knock out a list of what you need and your budget estimate in one shot. 1) Choose every item you need for your wedding flowers. 2) Select how many of each item you need. And 3) Watch a real budget estimate come together as you go. You can shape your flowers around a budget you're comfortable with.\n*This is an estimate based on current wholesale pricing and not a formal quote.", worksheet: "needs" },
    ],
    checklist: [
      "Created my wish list of floral items",
      "Set a floral budget I'm comfortable with",
      "Started a color / inspiration board",
      "(Kind of) decided on a color scheme I love"
    ],
    links: [
      { label: "Bloom Culture Color Collections", note: "Start here if colors feel overwhelming" },
      { label: "Supplies & Tools", note: "What you'll need to make it all", module: "supplies" },
      { label: "Vase Guide", note: "Vessel sizes shape what you need", module: "vases" },
      { label: "Tutorials & Recipes", note: "See what each piece involves", module: "design" }
    ],
    images: []
  },

  /* ───────────────────────── 2. WEDDING FLOWER TIMELINE ───────────────────────── */
  {
    id: "timeline", num: "02", label: "Wedding Flower Timeline", nav: "Wedding Flower Timeline",
    kicker: "Exactly what to do, and when",
    intro: "The size of your wedding directly affects how long flowers take, so we mapped it all out for you. Nothing here is a hard rule, just a do-this-next guide from a few months out all the way to 'I do,' so you always know what's coming and never feel behind.",
    scale: {
      heading: "How much time will this take?",
      sub: "A realistic look at the hands-on time needed based on the size of your wedding.",
      tiers: [
        { name: "Small", level: 1, detail: "Wedding party flowers + a handful of centerpieces", time: "A focused afternoon", helpers: "1–2 helpers" },
        { name: "Medium", level: 2, detail: "Up to ~15 centerpieces plus Wedding Party flowers", time: "Spread across 2 days", helpers: "2–3 helpers" },
        { name: "Large", level: 3, detail: "Arch / install + 15+ centerpieces & feature pieces + Wedding Party", time: "Plan for 2–3 days + a setup crew", helpers: "4–6+ helpers" }
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
        "Decide where you'll arrange, and where finished pieces will be stored (a cool room is ideal)",
        "Assign helpers their tasks",
        "Pay your package or floral proposal"
      ]},
      { h: "3–4 weeks before", phase: "p3", range: { type: "weeks", from: 4, to: 3 }, checkable: true, list: [
        "Print all your floral recipes and share with helpers",
        "Prep the room you'll arrange in",
        "Double-check buckets, vases, decor, supplies",
        "Finalize timeline details and tell your helpers",
        "Fill out worksheets and hand them out",
        "Procure snacks + make a playlist for good vibes 🌿"
      ]},
      { h: "Wedding week, day by day", note: "This schedule assumes a Saturday wedding. If your date falls on a different day, just shift each step back from your date, the order stays the same. Your flowers ship to arrive about 3 days ahead so they have time to hydrate and open.", days: [
        { day: "Wednesday", theme: "Flowers arrive · process · hydrate", items: [
          { t: "Get ready for your flowers to arrive", d: "Ideally 3–4 days before your wedding or event. Follow the \u201cGetting Started\u201d tutorial and the Flower Care section.", dLink: { text: "Watch the Getting Started tutorial →", href: "https://youtu.be/TJcue3iFRmw" } },
          { t: "Make sure someone's home to receive the delivery", d: "Flowers must be signed for, they can't be left at the door." },
          { t: "Unbox and process all your flowers", d: "Clean and snip stems, then get everything into clean water right away (see Flower Arrival Day)." },
          { t: "Let everything hydrate", d: "Overnight is ideal, at least 4–6 hours if you're on a time crunch. They'll perk up and open beautifully." },
          { t: "Pull your bouquet recipes & pre-hydrate them", d: "Optional but a real time-saver: once processed, place each bouquet's flowers right in its vase to hydrate overnight, so they're ready to assemble tomorrow." }
        ], tips: [
          "Set the recipes for big work, like the arbor or ceremony arrangements, aside now, so you're not tempted to use those stems for bouquets or centerpieces.",
          "Pulling (or setting aside) recipes helps you keep track of your florals so you don't over-use. Stick to the recipes!"
        ]},
        { day: "Thursday", theme: "Bouquets · centerpieces · bud vases", items: [
          { t: "Design the bridal bouquet first", d: "Set aside ~2 hours. Pull your recipe first, doing the bridal first lets you pick the prettiest blooms and sets the tone for the whole wedding. Your first piece takes longest; you'll pick up speed." },
          { t: "Make the bridesmaid bouquets", d: "About 20 minutes each after the first. Bouquets can take most of the morning depending on how many you need and how many helpers you have, keep finished ones in a cool, dark place." },
          { t: "Start on centerpieces", d: "Once the bouquets are done. Pull each recipe as you go (or all at once like the bouquets), just keep the flowers in water." },
          { t: "Then do your bud vases", d: "If they're in your design. Doing these after bouquets & centerpieces means you can use all the pretty little off-shoots you saved." }
        ], tips: [
          "Pull each recipe before you start: gather all the flowers listed for one arrangement and set them in their own vase or bucket. Build that piece, then move to the next recipe. Working one recipe at a time keeps you from accidentally using flowers meant for another arrangement, and it goes so much faster.",
          "ALWAYS save the little extras you pull off greenery and flowers, they're perfect later for bud vases, boutonnieres, and corsages. Keep a small cup of water beside you to hold them.",
          "At the end of the day, check water levels on bouquets, centerpieces, and bud vases and top them up. Stems in clean water, greenery in water."
        ]},
        { day: "Friday", theme: "Finish up & detail items", items: [
          { t: "Finish any low or remaining centerpieces", d: "Wrap up whatever's left from yesterday." },
          { t: "Design your tall centerpieces", d: "If you have them and haven't started. The first takes longest, then you'll fly, more helpers, faster going." },
          { t: "Make & tie your aisle markers / aisle flowers", d: "Make them and keep them in water until it's time to set them out." },
          { t: "Make your boutonnieres", d: "Use our Bout Hack on the blog to keep them fresh, you can even make these two days ahead with the hack." },
          { t: "Wrap the boutonnieres", d: "Wrap with 5/8\u2033 ribbon and give each one two pins." },
          { t: "Make your corsages", d: "" },
          { t: "Make any other detail items", d: "Flower crowns, flower-girl pieces, etc. To fridge them, keep them away from produce and bump the temp up a tad so they don't freeze." },
          { t: "Wrap the bouquets with ribbon & pin them", d: "Use 1/2\u2033 or 1\u2033 ribbon to cover the zip tie or tape, and pin it in place. Aim to have these done before your ceremony rehearsal (if you're having one)." },
          { t: "Prep your arbor / arch recipes", d: "Pull those recipes into one or two buckets so they're ready to go on the wedding day, to do yourself or hand off." }
        ], tips: [
          "Working in this order keeps the delicate detail items fresh and gets the big, time-consuming pieces off your plate first."
        ]},
        { day: "Saturday", theme: "Transport · set up · installations", items: [
          { t: "Check all pieces for freshness & run the checklist", d: "Have a friend or family member double-check so nothing gets skipped over." },
          { t: "Transport all flowers to the venue", d: "Follow our transportation guidelines and delegate this to a Type-A Aunt Tammy or trusted friends/family. Make sure you give them the checklist!" },
          { t: "Set it all up", d: "Use the venue diagram you made to keep set-up running smooth." },
          { t: "Handle any installations (arch / arbor)", d: "For big on-site pieces like an arch: plan about 30–45 minutes to prep and load in, plus 1–2 hours to build it on site (don't give yourself less than 1.5 hours total). Aim to finish at least 2 hours before the ceremony, and check the weather, heat and sun are hard on arrangements. This is a great job to hand to your most trusted, capable helpers." }
        ], tips: [
          "Feel free to adjust this timeline to fit your wedding, it's a suggested rhythm to keep you on track, not a hard rule."
        ]}
      ]}
    ],
    checklist: [
      "Booked my consult, ordered flowers & started recruiting helpers, 4–6 months",
      "Bought supplies, collected vases & locked my arranging spot, 2–3 months",
      "Printed recipes, assigned jobs & prepped the room, 3–4 weeks",
      "Flowers hydrated, designed & delivered, wedding week"
    ],
    checklistNote: "The big-picture milestones, tick each phase off as you finish it. (The detailed tasks live in the dropdowns above.)",
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
    intro: "Having the right gear on hand is half the battle, we promise. Here's everything we always keep nearby, plus what each thing actually does so nothing's a mystery.",
    collapsibleFull: true,
    quick: [
      "Floral snips to cut/trim stems/ greenery (NOT scissors, scissors crush stems).",
      "Wet floral tape + stem wrap.",
      "Floral glue (not hot glue, it burns stems).",
      "Ribbon in a few widths.",
      "Buckets, vases, zip ties, paddle wire, pins, flower food."
    ],
    full: [
      { h: "Floral snips", p: "Do NOT use scissors to cut or trim stems. Scissors squash the stem so the flower can't drink water (and then, R.I.P. flower). No bueno. Scissors are only for cutting ribbon. Scissors dull quickly when used to cut stems and greenery. To cut stems cleanly, use for a floral pruner or shear (ideally something with a curved blade) which gives a clean cut so your flowers keep drinking happily." },
      { h: "Floral tape", p: "Two tapes, two jobs. Wet floral tape (like mini duct tape) is water-resistant, use it to build a grid across the top of your vases to hold stems in place (our tutorials show exactly how). Fill vases with water AFTER you've taped them. Stem wrap is a lightweight tape you wrap around bouquet and boutonniere stems to bind them together before you cover them with ribbon." },
      { h: "Floral glue (not hot glue)", p: "There's a real difference between floral adhesive and hot glue, especially in how they dry and how they treat your flowers. Hot glue can burn petals, leaves, and stems and make them wilt faster. And if a hot-glued piece goes in the fridge, the stems contract and pull away from the hardened glue, so the combs, crowns, and bouts you worked so hard on can fall apart.\n\nFloral adhesive works more like rubber cement: flexible, forgiving, and it sticks to itself. Pro tip: it's like honey straight from the tube, then forms a skin and thickens as it dries, so take your time. It flexes with your flowers (even in the fridge) instead of separating. Always reach for floral adhesive and give any wearable piece at least an hour to dry before it's worn." },
      { h: "Flower food", p: "Optional, your flowers will do beautifully without it, but a packet of flower food in the water gives them a little boost: it feeds the blooms, keeps the water cleaner, and helps everything last a bit longer. If you've got it, use it; if not, fresh clean water and a good re-cut do the job. It's mainly a retail-florist trick for making arrangements last on a shelf, totally optional for DIY. If you'd like to use it, just follow the instructions on whatever you buy." },
      { h: "Floral foam", p: "Floral foam (you may know it as the brand \u201cOasis\u201d) is a spongy block that holds water and anchors stems exactly where you place them, great for arch pieces, urns, and low arrangements where you want full control. It comes in different shapes and sizes for different jobs: bricks, spheres, cages, and bouquet holders. Don't stress about picking, your recipe tells you which type and how much to use.\n\nTo soak it, don't rush: do NOT press it down into the water, or it'll trap air bubbles and end up wet on the outside yet bone-dry in the middle! Instead, gently set the foam on top of a bucket of water and let it drink on its own. Once it sinks to the bottom, it's fully soaked and ready to go." },
      { h: "Ribbon widths", p: "Ribbon is the finishing touch that makes a bouquet look polished and intentional. Match the width to the piece, narrow for tiny stems, wider for a full bridal bouquet, and choose a soft, natural fiber like silk, satin, or chiffon that drapes and trails beautifully (avoid stiff wired ribbon). A good rule: ribbon should complement your flowers, not compete with them.", list: [
        "⅝\u2033, corsages & boutonnieres (just enough to wrap the little stems)",
        "½\u2033–1\u2033, bridesmaid bouquets",
        "1\u2033+, the bridal bouquet; go wider for longer, romantic trailing tails, or mix a few widths & textures for a designer look",
        "Pro tip: cut ribbon ends at an angle or a V-notch so they don't fray, and order a little extra for do-overs"
      ]},
      { h: "Miscellaneous must-haves", p: "The little workhorses we always keep within arm's reach, here's what each one actually does so you know when to grab it:", list: [
        "Zip ties, your secret weapon for holding things together fast. 8\u2033 cinch a bouquet before ribboning · 11–14\u2033 anchor arch & installation pieces · 4\u2033 attach greenery for DIY garlands & secure small items (see the backdrop tutorial). Snip the tail flush when done.",
        "Paddle wire, thin spooled wire for binding garlands, wiring greenery to arches, and reinforcing heavy stems; it bends to hold shape without showing.",
        "Pins (corsage/boutonniere + pearl-head), pin boutonnieres & corsages onto jackets and dresses, and tuck a pin to lock ribbon in place on bouquet handles.",
        "Cuffs, pre-made wristlets that turn any little arrangement into a wrist corsage in seconds, no wire-work required.",
        "Lomey bowls, clear plastic bowls that hold soaked floral foam, so you can build low centerpieces & arch pieces in any vessel (or right on a table).",
        "Flocked wire, soft fuzzy-coated wire that's gentle on stems; perfect for shaping flower crowns and delicate hair pieces."
      ]}
    ],
    shop: {
      heading: "Our fave supplies",
      sub: "Every tool below is BCF-approved and budget-friendly. Tap any one to shop it, these are the exact pieces we reach for. (We may earn a small commission, at no cost to you.)",
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
    intro: "Heads up: when your flowers are delivered they'll look a little weak and sleepy. DO NOT PANIC, this is absolutely normal and we promise they're not dead. They're just really thirsty (dying for a drink of water!). Follow the flower-prep steps below and your blooms will be perky and blooming in a couple of hours.",
    collapsibleFull: true,
    fullHeading: "✦ HELPFUL INFO",
    quick: [
      "Be home to sign for the delivery (it can't be left at the door).",
      "Unbox immediately and unpackage everything.",
      "Clean → snip at 45° → into clean water (no leaves below the waterline).",
      "Hydrate in a cool, dark spot, overnight is ideal, 2–4 hrs minimum.",
      "Report any issues in writing within 24 hours."
    ],
    flowSteps: {
      heading: "Simple flower prep steps",
      sub: "Your game plan for the moment they arrive, follow these steps and watch your flowers go from sleepy to prancy. Check off each step as you finish it.",
      steps: [
        { t: "Unpackage & organize", d: "Before the flowers arrive, clean your buckets and vases and fill them with 4–5\u2033 of fresh water. As soon as the flowers arrive, unbox right away, snip off rubber bands, remove the sleeves, sort the bunches by variety, and check everything against your order confirmation so you know everything arrived. Heads up: you have 24 hours from delivery to let us know about any missing or damaged product, so check it all now.", tip: "Leave cardboard sleeves on roses until they've hydrated, they need the extra support." },
        { t: "Clean stems", d: "Working one variety at a time, strip off any leaves that would sit below the waterline (they decay and cloud the water). Watch for thorns on roses. If you see bruised outer 'guard petals,' leave them for now, they're protecting the bloom, you can pluck them off once the flower has hydrated while you are arranging.", tip: "Keep a trash bin close or lay a tarp down so the stripped greenery and snipped stems don't take over your workspace!" },
        { t: "Snip stems", d: "Cut every stem at a 45° angle so it can drink, never straight across. Trim about ¼\u2033–½\u2033 off longer stems like roses, and just a sliver (~⅛\u2033) off delicate short stems like ranunculus and anemones. Cut, then place stems immediately into water.", tip: "Do NOT use scissors, they crush the stem so the flower can't drink." },
        { t: "Place in bucket", d: "Place cut stems into water right away so the fresh cut doesn't dry out. Keep blooms and leaves above the waterline (anything submerged breeds bacteria), and make sure all the flower heads sit above the bucket or vase edge so they don't get smashed, forgotten, or accidentally decapitated. One variety per bucket makes the next steps easier.", tip: "Do NOT overcrowd your buckets, flowers need ROOM to BLOOM! (Bonus: label buckets with masking tape as you go so helpers can find each variety fast.)" },
        { t: "Hydrate", d: "Set everything in a cool, dry spot out of direct sun and let them drink. Overnight is ideal; if you're on a time crunch, give them at least 2–4 hours. They'll perk up and open beautifully.", tip: "No cooler needed, a cool room works great. Just keep them out of hot, sunny windows." },
        { t: "Prep your workspace", d: "While the flowers rest, set up where you'll arrange. Gather every vase, bucket, and tool you'll need (enough for all your helpers, too), and lay down a tarp, old sheet, or towels to catch the flying stems and leaves. A little setup now makes design day so much smoother.", tip: "Set out snacks, drinks, and a good playlist, arranging goes faster (and is way more fun) with a little ambiance." }
      ]
    },
    beforeAfter: {
      heading: "Sleepy → prancy",
      sub: "Snap a before-and-after of your blooms so you can see the hydration magic for yourself.",
      before: { label: "Just arrived (sleepy)", id: "arrival-before" },
      after: { label: "After hydrating (prancy!)", id: "arrival-after" }
    },
    full: [
      { h: "Bucket sizes, what holds what", p: "One bucket or vase per variety is the rule of thumb, some varieties are temperamental and don't play well with others. Fill with 4–5\u2033 of fresh water and don't overcrowd. Rough capacities to plan around:", list: [
        "Large 5-gal bucket, 25–50 roses (50 max)",
        "Large bucket, 25–50 carnations (50 max)",
        "Large bucket, 4–5 bunches of greenery",
        "Large / tall bucket, top-heavy stems like snapdragon, delphinium & larkspur (~40 stems max)",
        "Medium 2.5-gal bucket, 10–30 like spray roses (30 max)",
        "Small bucket or vase, delicate short stems like ranunculus, anemone & tulip (~20 max)"
      ] },
      { h: "Guard petals are totally normal", p: "Those bruised, brown-looking petals on the outside of roses and other blooms are guard petals, they shield the flower during shipping (they did their job!). Gently pluck them off once the flower has hydrated, or as you arrange, and the clean petals underneath will show. It does NOT mean the flower is bad." },
      { h: "Will they need a cooler?", p: "Nope, no cooler required, promise. A cool, dry spot out of direct sun is all your flowers need to stay happy until you arrange. We always say: if you're warm, they're warm; if you're cold, they're cold; if you're comfortable, they're comfortable! So keep it cool, anywhere from 68–72°F.", tip: "Want a few blooms to open up faster? Set just those near a window or outside (as long as it's under 80°F) and they'll bloom on cue." },
      { h: "Keep your shipping boxes!", p: "Don't toss the boxes your flowers arrived in, they're sturdy and the perfect size for transporting finished arrangements to your ceremony and reception. Break them down flat if you need to store them, then pop them back up on the big day. Bonus: tuck a few in your car so vases don't tip on the drive.", tip: "Save any extra packaging too, it's great for cushioning delicate blooms in transit." },
      { h: "What if my flowers aren't in great shape?", p: "First, don't panic, sleepy or thirsty-looking blooms on arrival are completely normal and almost always bounce back after a good drink. Give them a fresh angled re-cut, clean water, and a few hours to rest before you judge them. A loss of 1–3 stems per bunch is also normal (we build a little cushion into your quantities for exactly this).\n\nIf something still seems truly unsalvageable after hydrating, snap a quick photo and contact us in writing within 24 hours of delivery for a full or partial refund. We can't refund flowers that weren't properly hydrated or given time to recover, so always give them that chance first.", tip: "Check out the Troubleshooting module for our favorite revival hacks, most 'bad' flowers just need water and time." }
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
    kicker: "Floral Design 101, you've got this",
    intro: "Okay, this is the fun part, and you are so much more capable than you think. Work in order (bouquets first, then centerpieces, then the little details), follow your recipes like a trusty cookbook, and watch your flowers come to life. Your very first piece will feel slow and a little chaotic, totally normal! Then you'll hit your groove and start feeling like the floral wizard you were always meant to be.",
    quick: [
      "Order of operations: bridal bouquet → bridesmaids → centerpieces → bud vases → detail items.",
      "Pull each recipe before you start that piece so you don't over-use flowers.",
      "Save every off-cut bud & sprig, they're gold for bouts, corsages & bud vases.",
      "First piece is slow (~20 min/bouquet after that). Keep finished pieces in a cool, dark place.",
      "Top up water at the end of every day."
    ],
    collapsibleFull: true,
    fullHeading: "✦ PRO TIPS",
    orderOfOps: {
      heading: "Order of operations",
      sub: "Work in this order for arranging, it keeps your delicate detail pieces fresh and gets the big, time-consuming jobs off your plate first.",
      steps: ["Bridal bouquet", "Bridesmaid bouquets", "Centerpieces", "Bud vases", "Detail items"]
    },
    families: {
      heading: "Flower terminology",
      sub: "There are six flower \u2018families\u2019 to familiarize yourself with so you know what each \"ingredient\" does. (Examples include but aren't limited to those listed.)",
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
      sub: "Our step-by-step videos teach you how to make everything. Tap a category and watch before your flowers arrive, soon they'll ask \u201cwho did the lovely flowers?!\u201d & you'll say \u201cwe did.\u201d",
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
      { h: "Front-load your ceremony pieces (the \u201creverse mullet\u201d)", p: "Ceremony and aisle arrangements usually face one direction, so the front is the only side guests (and your photos) really see. Put the bulk of your flowers up front where they'll show, and go lighter on the back. It still looks full from the front, just not packed all the way around, so your flowers (and budget) go further. We lovingly call it the reverse mullet: party in the front, business in the back." },
      { h: "Use more greenery to save money", p: "Greenery is your budget's best friend, it fills space beautifully for a fraction of what flowers cost, even the affordable blooms. Lean on it to make arrangements look lush, full, and grand without adding more stems. Want that overflowing, garden-y look on a tighter budget? More greenery, fewer focal flowers, and nobody will know the difference (except your wallet)." },
      { h: "Re-use your ceremony items!", p: "Your ceremony flowers are statement pieces, don't let them sit pretty for just 30 minutes and call it a day! Assign someone the simple job of moving them to the reception once the ceremony wraps. Arch and aisle arrangements can flank your sweetheart table, greet guests at the entry, or dress up the photo booth, bar, or cake table. One build, two moments, double the impact (and the value)." },
      { h: "Re-purpose the bridesmaid bouquets", p: "Those gorgeous bouquets shouldn't sit forgotten once photos wrap. Pop them in vases along your reception tables, head table, or bar for instant, free décor. Assign your head bridesmaid (or trusty Aunt Karen) to round them up and set them out." }
    ],
    recipe: {
      heading: "Flower recipes",
      intro: "We give you a recipe for every bouquet, centerpiece, and arrangement you need. Think of it like a cooking recipe, it lists every ingredient and the exact quantities, so all you do is follow along and voilà (magic appears, no calories). We even calculate the stem count to generate your whole flower order, one-stop shop, zero guesswork on your end.",
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
    intro: "Here's a happy truth: people WANT to help with the flowers, it's genuinely the fun job, and literally anyone can do it (no gifted-and-talented certificate required). The only catch is you gotta prep your peeps. Nobody likes walking into a job they weren't ready for, so give everyone a clear role ahead of time and give them a filled-out worksheet. But first, let's figure out how many people you need to buy pizza for.",
    quick: [
      "Use the chart to figure out how many helpers you need.",
      "Split them into 4 jobs: Receive & Process · Arrange · Transport & Set-up · Tear-down & Clean-up.",
      "Send the tutorial page + their role in advance so no one's caught off guard.",
      "Fill out a Helper Assignment Sheet for each person and hand it out with their recipes."
    ],
    photo: { id: "helpers-crew", fit: "cover", ratio: "5 / 2", src: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/make_less_sepiagolden_hour_ton_Nano_Banana_2_50444.png?v=1780083091", caption: "Your dream team in action, flowers are more fun with your favorite people. 🌸" },
    helperChart: {
      heading: "How many helpers will I need?",
      sub: "One size does not fit all, use this as a starting point, then pick what feels comfortable. If you only need bridal-party flowers and a couple of centerpieces, no need to call in the cavalry!",
      cols: ["Bridal party", "Centerpieces", "Ceremony items", "Helpers"],
      rows: [
        { c: ["Bouquets + personal flowers", "-", "-", "1–2"] },
        { c: ["Bouquets + personal flowers", "Up to 5", "-", "1–2"] },
        { c: ["Bouquets + personal flowers", "5–15", "-", "2–3"] },
        { c: ["Bouquets + personal flowers", "15+", "Floral arch", "3–5"] },
        { c: ["Bouquets + personal flowers", "20+", "Arch / install + feature pieces", "4–6+"] }
      ]
    },
    jobs: {
      heading: "Jobs for your helpers",
      sub: "Based on how many helpers you land on, here's how we'd divvy up the work. Helpful tip: have all the supplies ready for them, buckets, vases, snips, the works, so they can dive right in.",
      items: [
        { n: "1", title: "Receive & process flowers", team: "", steps: [
          "Be on time to receive the delivery.",
          "Have clean buckets/vases filled with water and ready.",
          "Set out all tools & supplies, and lay a tarp for easy cleanup.",
          "Unbox, clean, and trim stems (see Flower Arrival Day for the how-to).",
          "Sort flowers into buckets, grouping like with like.",
          "Sip coffee or rosé, depending on the time of day."
        ], homework: "Have these helpers read the Flower Arrival Day section BEFORE delivery day.", homeworkLink: { text: "Watch the Getting Started Video →", href: "https://youtu.be/TJcue3iFRmw" }, tip: "Optional but helpful: once sorted, you can split flowers into recipes so no one over-uses product.", fun: "Opening a box of flowers is like Christmas, but with flowers!" },
        { n: "2", title: "Designing flowers", team: "Can be 2–3 teams, Bridal Party / Bouquets · Centerpieces · Ceremony", steps: [
          "Find your assigned pieces on your Helper Sheet, that's your to-do list.",
          "Watch the linked tutorial for each piece before you start it.",
          "Pull each recipe's flowers, then build it following the recipe & video.",
          "Start with greenery as your base, then add focal flowers, then fill gaps.",
          "First piece takes longest, then everyone speeds up (promise!).",
          "Keep finished pieces in water, in a cool spot away from sun until transport."
        ], homework: "Watch the tutorials, make a mock-up if you can, and have all supplies & tools ready for helpers before they arrive.", tip: "Have your craftiest helper make a 'prototype' piece others can copy, then everyone has a model to match.", fun: "You get to arrange beautiful flowers with your besties!" },
        { n: "3", title: "Transport & set-up", team: "Can be the same teams or separate, see Transport & Setup for timelines", steps: [
          "Pack pieces snug in boxes, padded with towels; transport tall vases LOW.",
          "Drive slow and take turns gently, then fluff & top up water on arrival.",
          "Place ceremony pieces per the diagram with fresh water (do any arch work first).",
          "Set out arrangements ~1.5 hrs before photos (weather depending).",
          "At the reception, set pieces on the right tables using your diagram.",
          "Work backwards from ceremony time, and confirm venue access."
        ], homework: "Walk helpers through how you'd like everything set up, a diagram is gold so no one has to keep asking for directions.", tip: "See the Transport & Setup module for packing tricks and a venue diagram template.", fun: "" },
        { n: "4", title: "Tear-down & clean-up", team: "Can be the same crew or a fresh set of hands for the end of the night", steps: [
          "Confirm your venue's clear-out time (and whether you can return next morning).",
          "Decide ahead what goes home, what's gifted to guests, and what's tossed.",
          "Send blooms home with guests, keep a few bags/boxes handy.",
          "Empty water, then pack up all rented or borrowed vases & decor to return.",
          "Compost the spent flowers, recycle boxes, and do a final sweep for personal items."
        ], homework: "Make a quick \u2018what goes where\u2019 plan so tear-down is fast and nothing gets lost or left behind.", fun: "Send the leftover blooms home with your favorite people, flowers are the best party favor. 🌸" }
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
    intro: "You'd think moving flowers is simple, but anyone who's done it will tell you it can be the stressful part. Don't worry, these tricks keep heads on stems and water off your upholstery, and we've got worksheets to keep your drivers organized.",
    collapsibleFull: true,
    quick: [
      "Use boxes to stabilize, keep the shipping ones! Pad between vases with towels.",
      "Don't overcrowd; everyone needs space on a road trip.",
      "Cut boxes down to vase height so blooms don't get smashed.",
      "Tarp/towels in the car. Drive slow, take turns gently.",
      "Transport tall vases LOW, take the bowl off the stand."
    ],
    full: [
      { h: "Boxes & packing", p: "Boxes stabilize your flowers on the road and keep them from tipping. A few box rules:", list: [
        "Keep the boxes your flowers shipped in, they're perfect for transport.",
        "Pad between arrangements & vases with towels or newspaper.",
        "Don't overcrowd, crowding snaps heads and stems. Everyone needs a little space on a road trip!",
        "Ask local liquor stores for boxes, wine boxes are especially handy for bud vases.",
        "Cut boxes down to the same height as your vases so blooms don't get smashed (laundry baskets work too).",
        "Make sure boxes are sturdy, vases full of flowers & water get HEAVY. Reinforce any fold-out bottoms big time, and only use those in the vehicle, never for carrying into the venue (we've had many collapse, not good).",
        "Pack boxes snug; out of boxes, nestle pieces close so they support each other, just keep blooms from touching."
      ] },
      { h: "Your vehicle", p: "", list: [
        "Any clean car works! For a smaller wedding, your everyday vehicle is usually plenty, just fold seats down for flat space.",
        "An SUV, van, or hatchback is ideal, flat cargo space beats deep car trunks and bucket seats.",
        "Lay a tarp or old towels down first to protect against water & spills.",
        "Crank the A/C in summer and keep flowers out of direct sun through the windows, a hot car wilts blooms fast.",
        "Never use the trunk on a hot day, no airflow and it bakes the flowers.",
        "For a larger wedding, size up the vehicle to cut down on trips, even a budget U-Haul van (around $19.99 + mileage) works great. Or make a couple of trips, or split the load across a few helpers' cars.",
        "Map your route ahead and pad in extra time, smooth and unhurried beats fast every time."
      ] },
      { h: "On the road & on arrival", p: "", list: [
        "Transport tall vases LOW, take the dish or lomey bowl off the tall stand and reattach on site (transport the stands separately).",
        "Steady taller arrangements in a box, bucket, or between passengers' feet so they can't tip.",
        "Take your time: drive slow and take turns gently so the flowers shift as little as possible (less spillage!).",
        "Avoid hard stops, sudden lane changes, and bumpy back roads when you can, gentle is the goal.",
        "On arrival, give everything a few minutes, then fluff & quality-check and top up with clean water.",
        "Set each piece in its spot using your venue diagram, place the heaviest/largest pieces first.",
        "Keep a kit handy for touch-ups: snips, extra water, a few spare stems, and paper towels for spills."
      ] }
    ],
    venueDiagram: {
      heading: "Make a venue diagram",
      sub: "A placement diagram makes set-up smooth, your crew knows exactly where every arrangement goes, no constant \u201cwhere does this one go?\u201d Even if you'll be there, make one so helpers can work without you.",
      steps: [
        "Get a copy of your venue layout, or sketch a quick one, it doesn't have to be perfect!",
        "Assign each arrangement a letter or number.",
        "Make a quick legend describing which arrangement goes with each letter or number.",
        "Mark each spot on your diagram, as elaborate or as simple as you need."
      ],
      imgId: "venue-diagram",
      caption: "Drop your venue diagram here (a phone photo of a sketch is perfect).",
      legend: [
        { k: "A", v: "Centerpiece 1, low" },
        { k: "B", v: "Centerpiece 2, tall" },
        { k: "C", v: "Centerpiece 3, 3 bud vases" },
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
    intro: "Think of these as friendly guidelines, not hard rules! They'll help you picture the scale of each piece, and every recipe flexes to fit your vase, your budget, and your vision.",
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
      sub: "Not every vase or arrangement fits this exactly, it's a starting point for picking the scale of centerpiece you want. Adjust to your needs, budget, and vase size.",
      note: "Stems of greenery and flowers can be broken down from one large stem to stretch your product!",
      glossaryNote: "New to focal / linear / spray / detail / filler? Meet the flower families in the glossary.",
      sizeCue: [
        { label: "Small", h: 46, w: 38, sub: "mason-jar size" },
        { label: "Medium", h: 64, w: 50, sub: "guest-table go-to" },
        { label: "Large", h: 92, w: 66, sub: "lush statement" }
      ],
      rows: ["Focal flowers", "Linear flowers", "Sprays", "Detail flowers", "Filler flowers", "Greenery"],
      sizes: [
        { label: "Small", vals: ["2–3", "1", "1–2", "-", "3–4", "3–4"] },
        { label: "Medium", vals: ["4–6", "2", "2–3", "2–3", "4–7", "4–8"] },
        { label: "Large", vals: ["6–8", "2–4", "3–4", "3–4", "6–9", "6–10"] }
      ]
    },
    vaseTally: {
      heading: "How many vases do I need?",
      sub: "Tally up your vessels here, it saves as you go, so you know exactly what to source or shop. (A good starting point: one centerpiece per guest table.)",
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
    checklistPhoto: { id: "vase-lineup", fit: "cover", ratio: "16 / 9", placeholder: "Drop a photo of your vessels", caption: "Small, Medium, & Large vases." },
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
      "Don't assume your planner/coordinator handles flowers, ask what's actually in their contract.",
      "Ask your venue the earliest time you can get in with flowers.",
      "Don't assume you can use the venue's kitchen, cooler, or sink, always ask.",
      "Never dump flower water in planters or prominent spots; clean up & leave no trace.",
      "Over-communicate with your whole team, helpers, coordinators, venue owners."
    ],
    full: [
      { h: "Don't assume, ask", p: "Don't assume your wedding planner or coordinator (or anyone, really) will do your arrangements, transportation, or clean-up. If that's something you're expecting from them, communicate it clearly and ask whether it's part of their contract with you." },
      { h: "Ask about venue access", p: "Always ask your venue(s) the earliest time you can gain access with your flowers. Most of the time, the people setting up are allowed to arrive earlier than the bridal party, but you have to ask." },
      { h: "Don't assume kitchen or cooler use", p: "Do not assume you can use your venue's kitchen or cooler. Most of the time they don't allow it, they have to keep high sanitation standards in their kitchens. Ask which sink they'd prefer you and your helpers use, if you need one." },
      { h: "Be kind to their landscaping", p: "Do NOT dump buckets of water out in prominent places or planters. Look for inconspicuous areas so you don't flood their landscapes." },
      { h: "Clean up after yourself", p: "Goes without saying, but leave no trace after your floral installation or any on-site work. Don't fill the venue's trash cans with flower trash, those are emptied for YOUR guests to use, and you don't want them overflowing at your ceremony or reception. This is exactly why we suggest a tarp: catch all your trash on it, roll it up, toss it in the back of the truck, and dispose of it later in a dumpster. (The trash, not the tarp!)" },
      { h: "Communicate with your whole team", p: "Helpers, coordinators, venue owners, everyone. People are WAY more willing to work with you, help you, and open up venues for you if you let them know what you're planning." },
      { h: "Say thank you 🌸", p: "Your helpers are giving you their time and energy, that's a real gift. Feed them well, keep snacks and drinks flowing on design day, and a heartfelt handwritten thank-you note afterward goes a loooong way (and costs nothing but a few sweet minutes). Don't forget to thank your venue staff and coordinator too, kindness is free, and it's the kind of thing people remember." }
    ],
    venueQuestions: {
      heading: "Questions to ask your venue",
      sub: "Bring this to your venue walkthrough or send it in an email, it saves so much day-of scrambling. Check them off as you get answers.",
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
      sub: "Your people, all in one place, so on the big day, everyone can reach everyone. 🌸",
      subNote: "Saves as you type, and prints or emails to your whole crew.",
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
    intro: "Standard natural hierarchy here, people. Most 'emergencies' are just thirsty flowers, if yours still need help after following the prep guide and hydrating, they are NOT goners. We'll just give them the floral version of avocado toast to de-grump. Here's how, plus when to actually e-mail us.",
    introLink: { text: "e-mail us", href: "mailto:hello@bloomcultureflowers.com" },
    collapsibleFull: true,
    banner: "99% of flower \u201cemergencies\u201d are just thirst. Breathe, you've got this.",
    quick: [
      "Wilting? Re-snip an inch higher, lukewarm water, add flower food.",
      "Hydrangea down? Submerge the whole head ~30 min, shake, recut, rehydrate.",
      "Brown/bruised petals? Pluck them off ASAP to stop the spread.",
      "Shipment delayed? They're not dead, hydration usually revives them.",
      "Truly unsalvageable? E-mail us in writing within 24 hrs of delivery."
    ],
    flowSteps: {
      heading: "Flower first-aid fixes",
      sub: "Three quick rescues for grumpy blooms. Tap a fix to mark it done.",
      slotPrefix: "fix",
      steps: [
        { t: "Wilting flowers", img: "assets/fix-wilting.png", d: "Snip the stem again about an inch higher, place in lukewarm water, and let them hydrate again.", tip: "A little flower food gives them a shot of glucose to perk right up." },
        { t: "Sad hydrangea", img: "assets/fix-hydrangea.png", d: "Submerge the entire bloom (head and all) in cool water for about 30 minutes, shake it out to dry, recut the stem, and place it back in water. Hydrangeas drink through their heads!", tip: "" },
        { t: "Brown or bruised petals", img: "assets/fix-bruised.png", d: "Common, especially on white petals. Pluck them off or trim the affected areas with scissors as soon as you see bruising (or right when you unpackage) to prevent the spread.", tip: "" }
      ]
    },
    moreFixes: {
      heading: "More ways to help your blooms",
      sub: "A few other little hiccups that can pop up, and the easy fix for each.",
      items: [
        { t: "Roses won't open", d: "Gently cup the bloom and ruffle the petals outward with your thumbs, or set them in a warm spot near a window. A little warmth coaxes them open." },
        { t: "Roses too open / blown", d: "The opposite problem, move them somewhere cool (a cold room or fridge, away from produce) to slow them down and hold them until the big day. Note: some roses open quickly but won't wilt fast, just give them room in the bucket so their petals don't bruise." },
        { t: "Drooping or bent rose neck", d: "Usually a hydration issue, a smashed or improperly cut stem, or sleeves taken off too soon (they support the blooms while hydrating). Re-cut the stem at an angle and lay the whole rose flat in a tub of water for 20–30 minutes so it rehydrates fully, then stand it back up." },
        { t: "Leaves or petals browning early", d: "Usually dirty water or too much sun. Change to fresh clean water, recut stems, and keep everything in a cool spot out of direct light. Pluck off any spotted or browning petals the moment you see them, it can spread, and try not to handle the petals too much since they bruise easily." },
        { t: "Cloudy or smelly water", d: "Bacteria! Dump it, then scrub the bucket with soap and water to kill the bacteria before you refill with clean cool water. Give stems a fresh snip and strip any leaves sitting below the waterline." }
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
        "Anything off, within 24 hrs, in writing"
      ]
    },
    full: [
      { h: "Nature does its own thing", p: "Flowers, like any natural product, vary in color, size, fragrance, and more. We can't guarantee any given shade, tint, or hue, we can't control nature (believe us, we've tried sweet-talking it)." },
      { h: "Delayed shipment?", p: "Deep breath, a delay does NOT mean your flowers are dead. They usually perk right up with some hydration once they arrive. Give them a drink and a little time before you worry." },
      { h: "When to e-mail us", pLink: { text: "e-mail us", href: "mailto:hello@bloomcultureflowers.com" }, p: "If flowers arrive in genuinely bad shape and careful hydration doesn't help, e-mail us in writing within 24 hours of delivery for a full or partial refund. We can't refund flowers that weren't hydrated or given time to recover." }
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
  get allPalettes(){ const n = this.byId.needs; for(const s of (n.full||[])){ if(s.palettes) return s.palettes; } return []; },
  /* Curated arrangement list for the Helper Assignment Sheet dropdowns.
     Edit names freely; tutorial maps to a tutorials-tagged page. */
  tutorialURLs: {
    bouquets: "https://bloomcultureflowers.com/blogs/tutorials/tagged/bouquets",
    boutonnieres: "https://bloomcultureflowers.com/blogs/tutorials/tagged/boutonnieres",
    corsages: "https://bloomcultureflowers.com/blogs/tutorials/tagged/corsages",
    crowns: "https://bloomcultureflowers.com/blogs/tutorials/tagged/crowns",
    ceremony: "https://bloomcultureflowers.com/blogs/tutorials/tagged/ceremony",
    reception: "https://bloomcultureflowers.com/blogs/tutorials/tagged/reception"
  },
  qrMap: {"https://www.amazon.com/shop/bloomcultureflowers/list/3IQCSF2FEFH7V?ref_=cm_sw_r_cp_ud_aipsflist_aipsfbloomcultureflowers_311ZP02S73QPPV2QTX5D&ccs_id=a9c40d38-0718-4a44-8e55-7c0d72b9b45b":"assets/qr/supply-floral-snips.png","https://www.amazon.com/shop/bloomcultureflowers/list/3948OJQLMFKGW?ref_=aip_sf_list_spv_ons_mixed_d&ccs_id=ff3dc14b-76ab-47fc-a50c-dbb34a96d17a":"assets/qr/supply-floral-tape.png","https://www.amazon.com/shop/bloomcultureflowers/list/N5LMGLCEBYJA?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_mixed_d&ccs_id=88528c7e-7a9b-49b3-b4e8-19ed703a01f2":"assets/qr/supply-floral-glue.png","https://www.amazon.com/shop/bloomcultureflowers/list/2QC8A0PMZ7U4?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_mixed_d&ccs_id=b1b244ff-e25b-4d5e-bfc4-cc5467e08d93":"assets/qr/supply-floral-foam.png","https://www.amazon.com/shop/bloomcultureflowers/list/1RTTC2OLB3RC?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=936fd527-92a5-4624-b509-d9e8eb5c8455":"assets/qr/supply-ribbon.png","https://www.amazon.com/shop/bloomcultureflowers/list/3SJ89RJ0F79VK?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=79f930de-dfd9-490c-a6c5-20574cb4e2f6":"assets/qr/supply-flower-food.png","https://www.amazon.com/shop/bloomcultureflowers/list/2H5E92KPOYHDF?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=9a89ed9f-6f0b-48f7-b364-765ea62df802":"assets/qr/supply-buckets.png","https://www.amazon.com/shop/bloomcultureflowers/list/1MQVFHG4S2S3P?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=30d7a0a3-ef7f-4323-9708-f47e940f3594":"assets/qr/supply-vases.png","https://www.amazon.com/shop/bloomcultureflowers/list/1GRG90SQ62D1?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=d5508b4e-268f-473a-8196-9ac04855ee69":"assets/qr/supply-ceremony-arches.png","https://www.amazon.com/shop/bloomcultureflowers/list/3S2PGKXTO2WQ6?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=1d170cfd-010b-4720-83f9-7195c8b76c0a":"assets/qr/supply-floral-tint-spray.png","https://www.amazon.com/shop/bloomcultureflowers/list/2X337WPBLA5YH?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=27d30b57-3f50-4d97-911a-9ceb3296d1e3":"assets/qr/supply-metal-stands.png","https://www.amazon.com/shop/bloomcultureflowers/list/1M547YOJ1EHZ9?tag=juniperdesi0e-20&ref_=aip_sf_list_spv_ons_list_d&ccs_id=3b139da6-4d0f-4260-8d89-af707da0fbd6":"assets/qr/supply-miscellaneous.png","https://youtu.be/TJcue3iFRmw":"assets/qr/youtu-be-TJcue3iFRmw.png","https://youtu.be/q_5mJHqfJ5Y":"assets/qr/youtu-be-q-5mJHqfJ5Y.png","https://youtu.be/0RaQfBiRfNk":"assets/qr/youtu-be-0RaQfBiRfNk.png","https://youtu.be/2DFzneSiCik":"assets/qr/youtu-be-2DFzneSiCik.png","https://youtu.be/vcGZaOWlEAY":"assets/qr/youtu-be-vcGZaOWlEAY.png","https://youtu.be/TphXESyjbKo":"assets/qr/youtu-be-TphXESyjbKo.png","https://youtu.be/46Vt3lRrqBA":"assets/qr/youtu-be-46Vt3lRrqBA.png","https://youtu.be/faT-Z4CS3PU":"assets/qr/youtu-be-faT-Z4CS3PU.png","https://youtu.be/ApLHe3SAHiA":"assets/qr/youtu-be-ApLHe3SAHiA.png","https://youtu.be/tX3xls03nxY":"assets/qr/youtu-be-tX3xls03nxY.png","https://youtu.be/S1dg2S8hqG0":"assets/qr/youtu-be-S1dg2S8hqG0.png","https://youtu.be/Srbc3zoqeHU":"assets/qr/youtu-be-Srbc3zoqeHU.png","https://youtu.be/RHyIvmCZ8B0":"assets/qr/youtu-be-RHyIvmCZ8B0.png","https://youtu.be/U2cr-7TzwO0":"assets/qr/youtu-be-U2cr-7TzwO0.png","https://youtu.be/pcc2Lmhv6_g":"assets/qr/youtu-be-pcc2Lmhv6-g.png","https://youtu.be/tIshWHHt1CI":"assets/qr/youtu-be-tIshWHHt1CI.png","https://youtu.be/gxaygulfIQM":"assets/qr/youtu-be-gxaygulfIQM.png","https://youtu.be/OnVvvUbAaks":"assets/qr/youtu-be-OnVvvUbAaks.png","https://youtu.be/2Ci1N9NweT4":"assets/qr/youtu-be-2Ci1N9NweT4.png","https://youtu.be/6krRAsisWW0":"assets/qr/youtu-be-6krRAsisWW0.png","https://youtu.be/66vcqWVTaNU":"assets/qr/youtu-be-66vcqWVTaNU.png","https://youtu.be/BTORCiOS3kM":"assets/qr/youtu-be-BTORCiOS3kM.png"},
  arrangements: [
    { group: "Wedding Party Flowers", items: [
      { name: "DIY Bridal Bouquet", low: 105, high: 170, tut: "https://youtu.be/q_5mJHqfJ5Y", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/01._Bridal_Bouquet._290019bc-7863-4b4c-8f40-2648dd8766a6.jpg?v=1780084621" },
      { name: "DIY Bridesmaid Bouquet", low: 40, high: 55, tut: "https://youtu.be/0RaQfBiRfNk", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/02._Bridesmaid_Bouquet._9e840aeb-43bc-40d4-82b2-5d5885ab4f99.jpg?v=1780084620" },
      { name: "DIY Floral Hoop", low: 35, high: 45, tut: "https://youtu.be/2DFzneSiCik", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/37._Floral_Hoop..jpg?v=1780084622" },
      { name: "DIY Boutonniere(s)", low: 5, high: 5, tut: "https://youtu.be/vcGZaOWlEAY", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/03._Boutonniere._34ffb294-0431-47fe-8ee4-035049b1d2b7.jpg?v=1780084621" },
      { name: "DIY Floral Pocket Square", low: 5, high: 5, tut: "https://youtu.be/TphXESyjbKo", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/04._Pocket_Square..jpg?v=1780084620" },
      { name: "DIY Corsage(s)", low: 5, high: 10, tut: "https://youtu.be/46Vt3lRrqBA", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/05._Corsage._55b1c250-6d44-476f-9080-c281d9507747.jpg?v=1780084620" },
      { name: "DIY Bridal Floral Crown", low: 45, high: 55, tut: "https://youtu.be/faT-Z4CS3PU", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/06._Full_Crown..jpg?v=1780084621" },
      { name: "DIY Flower Girl Crown", low: 15, high: 20, tut: "https://youtu.be/ApLHe3SAHiA", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/08._Flower_Girl..jpg?v=1780084621" }
    ]},
    { group: "Ceremony Flowers", items: [
      { name: "DIY Single Arrangement Arbor", low: 150, high: 170, tut: "https://youtu.be/tX3xls03nxY", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/10._Central_Arrangment._48c06cf1-3575-45c6-86a7-a1b87376eb3c.jpg?v=1780084621" },
      { name: "DIY Double Arrangement Arbor", low: 225, high: 270, tut: "https://youtu.be/S1dg2S8hqG0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/09._Asymmetrical_Arrangements._c5a48934-7778-48fa-b972-cdfcd33ca10b.jpg?v=1780084622" },
      { name: "2 Corner Arbor Arrangements", low: 280, high: 310, tut: "https://youtu.be/S1dg2S8hqG0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/12._Corner_Arrangements..jpg?v=1780084622" },
      { name: "2 Side Arbor Arrangements", low: 150, high: 170, tut: "https://youtu.be/Srbc3zoqeHU", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/13._Side_Arrangements..jpg?v=1780084621" },
      { name: "Vase-less Statement Arrangement", low: 170, high: 195, tut: "https://youtu.be/RHyIvmCZ8B0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/14._Statement_Piece_1_barrel..jpg?v=1780084621" },
      { name: "Large Ceremony Urn", low: 110, high: 140, tut: "https://youtu.be/U2cr-7TzwO0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/15._Ceremony_Urn..jpg?v=1780084621" },
      { name: "Chair/Pew Floral Grouping", low: 30, high: 50, tut: "https://youtu.be/pcc2Lmhv6_g", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/17._Chair..jpg?v=1780084620" },
      { name: "Aisle Statement Arrangement", low: 110, high: 140, tut: "https://youtu.be/RHyIvmCZ8B0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/16._Statement_Piece_2_floor..jpg?v=1780084622" },
      { name: "DIY Flower Pillar", low: 390, high: 560, tut: "https://youtu.be/tIshWHHt1CI" },
      { name: "Signage Flowers", low: 40, high: 85, tut: "https://youtu.be/gxaygulfIQM" }
    ]},
    { group: "Reception Flowers", items: [
      { name: "Bud Vase Trio (round table)", low: 15, high: 30, tut: "https://youtu.be/OnVvvUbAaks", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/18._Trio_Bud_vases..jpg?v=1780084621" },
      { name: "Bud Vases — 6 (rectangle table)", low: 40, high: 55, tut: "https://youtu.be/OnVvvUbAaks", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/18._Trio_Bud_vases..jpg?v=1780084621" },
      { name: "A La Carte Bud Vases", low: 5, high: 10, tut: "https://youtu.be/OnVvvUbAaks", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/18._Trio_Bud_vases..jpg?v=1780084621" },
      { name: "Hand Placed Greenery", low: 12, high: 28, tut: "reception", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/21._Greenery_runner_rectangle..jpg?v=1780084621" },
      { name: "Small Centerpiece", low: 40, high: 50, tut: "https://youtu.be/2Ci1N9NweT4", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/23._Small_Centerpiece._09e802de-bd86-4cfd-b685-cc289002412a.jpg?v=1780084621" },
      { name: "Medium Centerpiece", low: 60, high: 75, tut: "https://youtu.be/2Ci1N9NweT4", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/24._Medium_Centerpiece..jpg?v=1780084621" },
      { name: "Large Centerpiece", low: 85, high: 110, tut: "https://youtu.be/2Ci1N9NweT4", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/25._Large_Centerpiece..jpg?v=1780084621" },
      { name: "Vase-less Centerpiece", low: 60, high: 75, tut: "https://youtu.be/6krRAsisWW0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/27._Vase-less_Arrangement..jpg?v=1780084621" },
      { name: "Compote Centerpiece", low: 75, high: 85, tut: "https://youtu.be/66vcqWVTaNU", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/28._Compote_on_Table..jpg?v=1780084621" },
      { name: "Tall Centerpiece", low: 140, high: 170, tut: "https://youtu.be/U2cr-7TzwO0", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/29._Tall_Centrepiece..jpg?v=1780084622" },
      { name: "Floral Table Runner", low: 110, high: 140, tut: "https://youtu.be/BTORCiOS3kM", thumb: "https://cdn.shopify.com/s/files/1/0750/7984/4147/files/30._Floral_Runner_Rectangle..jpg?v=1780084621" }
    ]}
  ],
  estimateItems: [
    { group: "Wedding Party Flowers", items: [
      { name: "DIY Bridal Bouquet", low: 105, high: 170 },
      { name: "DIY Bridesmaid Bouquet", low: 40, high: 55 },
      { name: "DIY Floral Hoop", low: 35, high: 45 },
      { name: "DIY Boutonniere(s)", low: 5, high: 5 },
      { name: "DIY Floral Pocket Square", low: 5, high: 5 },
      { name: "DIY Corsage(s)", low: 5, high: 10 },
      { name: "DIY Bridal Floral Crown", low: 45, high: 55 },
      { name: "DIY Flower Girl Crown", low: 15, high: 20 }
    ]},
    { group: "Ceremony Flowers", items: [
      { name: "DIY Single Arrangement Arbor", low: 150, high: 170 },
      { name: "DIY Double Arrangement Arbor", low: 225, high: 270 },
      { name: "2 Corner Arbor Arrangements", low: 280, high: 310 },
      { name: "2 Side Arbor Arrangements", low: 150, high: 170 },
      { name: "Vase-less Statement Arrangement", low: 170, high: 195 },
      { name: "Large Ceremony Urn", low: 110, high: 140 },
      { name: "Chair/Pew Floral Grouping", low: 30, high: 50 },
      { name: "Aisle Statement, Small", low: 65, high: 85 },
      { name: "Aisle Statement, Medium", low: 110, high: 140 },
      { name: "Aisle Statement, Large", low: 170, high: 195 },
      { name: "DIY Flower Pillar", low: 390, high: 560 },
      { name: "Signage Flowers", low: 40, high: 85 }
    ]},
    { group: "Reception Flowers", items: [
      { name: "Bud Vase Trio (round table)", low: 15, high: 30 },
      { name: "Bud Vases, 6 (rectangle table)", low: 40, high: 55 },
      { name: "A La Carte Bud Vases", low: 5, high: 10 },
      { name: "Hand-Placed Greenery (rectangle)", low: 20, high: 40 },
      { name: "Hand-Placed Greenery (round)", low: 10, high: 20 },
      { name: "Small Centerpiece", low: 40, high: 50 },
      { name: "Medium Centerpiece", low: 60, high: 75 },
      { name: "Large Centerpiece", low: 85, high: 110 },
      { name: "Vase-less Centerpiece", low: 60, high: 75 },
      { name: "Compote Centerpiece", low: 75, high: 85 },
      { name: "Tall Centerpiece", low: 140, high: 170 },
      { name: "Floral Table Runner", low: 110, high: 140 },
      { name: "Short Rectangle Box", low: 45, high: 55 },
      { name: "Sweetheart, Small Single", low: 60, high: 75 },
      { name: "Sweetheart, Medium Double", low: 110, high: 140 },
      { name: "Sweetheart, Large Double", low: 95, high: 140 },
      { name: "Sweetheart, Full Table", low: 280, high: 335 },
      { name: "Sweetheart, Greenery Only", low: 55, high: 55 },
      { name: "Pre-Made Garland (8ft)", low: 180, high: 180 },
      { name: "Hand-Placed Greenery (8ft)", low: 30, high: 30 }
    ]}
  ],
  brand: {
    name: "Bloom Culture",
    tagline: "DIY Wedding Flower Planner",
    founder: "Alison Fleck",
    handle: "@bloomcultureflowers"
  }
};
