/* ===========================================================================
   Bloom Culture - Quote Builder DATA
   Two tables: PRODUCTS (your flowers) and RECIPES (your arrangements).
   PRICES + STEMS-PER-BUNCH ARE PLACEHOLDERS - replace with your real numbers.
   ---------------------------------------------------------------------------
   PRODUCTS: name, role, bunch (price per wholesale bunch), stems (stems per bunch)
   ROLES: greenery, line, focal, large, spray, detail, filler
   ---------------------------------------------------------------------------
   RECIPE SLOT format: [role, amount, unit, optional, defaultFlower]
     role    : one of the roles above
     amount  : number. For unit 's' = stems. For unit 'b' = fraction of a bunch.
     unit    : 's' (stems) or 'b' (bunch fraction)
     optional: 1 = couple may remove it, 0 = required (counts toward the floor)
     default : (optional) flower name to pre-select for that slot
   =========================================================================== */

/* ===========================================================================
   FLOWER PHOTOS  -  flowerName -> image URL (Shopify CDN, like your banner).
   Fill these in to show real blooms in the recipes. Any flower left out
   falls back to a small floret icon, so you can add them gradually.
   Example:
     'Rose': 'https://cdn.shopify.com/s/files/.../white-rose.webp',
   =========================================================================== */
window.BCF_PIECE_PHOTOS = {
  /* pieceId : image URL  -  shown in the hover/tap "?" preview on Step 1.
     Leave a piece out and it simply shows no "?" icon.
     These pull the same arrangement photos used in the planner's Budget Estimator. */
  'bridal-bouquet':    'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/01._Bridal_Bouquet._290019bc-7863-4b4c-8f40-2648dd8766a6.jpg?v=1780084621',
  'bridesmaid-bouquet':'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/02._Bridesmaid_Bouquet._9e840aeb-43bc-40d4-82b2-5d5885ab4f99.jpg?v=1780084620',
  'floral-hoop':       'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/37._Floral_Hoop..jpg?v=1780084622',
  'boutonniere':       'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/03._Boutonniere._34ffb294-0431-47fe-8ee4-035049b1d2b7.jpg?v=1780084621',
  'pocket-square':     'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/04._Pocket_Square..jpg?v=1780084620',
  'corsage':           'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/05._Corsage._55b1c250-6d44-476f-9080-c281d9507747.jpg?v=1780084620',
  'bridal-crown':      'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/06._Full_Crown..jpg?v=1780084621',
  'flower-girl-crown': 'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/08._Flower_Girl..jpg?v=1780084621',
  'arbor-single':      'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/10._Central_Arrangment._48c06cf1-3575-45c6-86a7-a1b87376eb3c.jpg?v=1780084621',
  'arbor-double':      'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/09._Asymmetrical_Arrangements._c5a48934-7778-48fa-b972-cdfcd33ca10b.jpg?v=1780084622',
  'arbor-2corner':     'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/12._Corner_Arrangements..jpg?v=1780084622',
  'arbor-2side':       'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/13._Side_Arrangements..jpg?v=1780084621',
  'vaseless-statement':'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/14._Statement_Piece_1_barrel..jpg?v=1780084621',
  'ceremony-urn':      'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/15._Ceremony_Urn..jpg?v=1780084621',
  'chair-pew':         'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/17._Chair..jpg?v=1780084620',
  'aisle-statement':   'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/16._Statement_Piece_2_floor..jpg?v=1780084622',
  'budvase-trio':      'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/18._Trio_Bud_vases..jpg?v=1780084621',
  'budvase-six':       'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/18._Trio_Bud_vases..jpg?v=1780084621',
  'budvase-alacarte':  'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/18._Trio_Bud_vases..jpg?v=1780084621',
  'greenery-rect':     'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/21._Greenery_runner_rectangle..jpg?v=1780084621',
  'greenery-round':    'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/21._Greenery_runner_rectangle..jpg?v=1780084621',
  'cp-small':          'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/23._Small_Centerpiece._09e802de-bd86-4cfd-b685-cc289002412a.jpg?v=1780084621',
  'cp-medium':         'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/24._Medium_Centerpiece..jpg?v=1780084621',
  'cp-large':          'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/25._Large_Centerpiece..jpg?v=1780084621',
  'cp-vaseless':       'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/27._Vase-less_Arrangement..jpg?v=1780084621',
  'cp-compote':        'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/28._Compote_on_Table..jpg?v=1780084621',
  'cp-tall':           'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/29._Tall_Centrepiece..jpg?v=1780084622',
  'table-runner':      'https://cdn.shopify.com/s/files/1/0750/7984/4147/files/30._Floral_Runner_Rectangle..jpg?v=1780084621'
};

window.BCF_PHOTOS = {
  // 'Salal / Lemon Leaf': '',
  // 'Rose': '',
  // 'Carnation': '',
};

window.BCF_PRODUCTS = [

  /* GREENERY */
  { name:'Dusty Miller', role:'greenery', bunch:34, stems:10 },
  { name:'Eucalyptus - Baby Blue/Spiral', role:'greenery', bunch:21, stems:10 },
  { name:'Eucalyptus - Gunni', role:'greenery', bunch:23, stems:10 },
  { name:'Eucalyptus - Seeded', role:'greenery', bunch:23, stems:10 },
  { name:'Eucalyptus - Silver Dollar', role:'greenery', bunch:23, stems:10 },
  { name:'Eucalyptus - willow', role:'greenery', bunch:23, stems:10 },
  { name:'Grevillea', role:'greenery', bunch:26, stems:10 },
  { name:'Huckleberry', role:'greenery', bunch:19, stems:10 },
  { name:'Israeli Ruscus', role:'greenery', bunch:23, stems:10 },
  { name:'Italian Ruscus', role:'greenery', bunch:23, stems:10 },
  { name:'Leather Leaf', role:'greenery', bunch:18, stems:10 },
  { name:'Nagi', role:'greenery', bunch:23, stems:10 },
  { name:'Nandina', role:'greenery', bunch:28, stems:10 },
  { name:'Pittosporum', role:'greenery', bunch:23, stems:10 },
  { name:'Pittosporum - Nigra Variegated', role:'greenery', bunch:22, stems:10 },
  { name:'Plumosa', role:'greenery', bunch:17, stems:10 },
  { name:'Robellini Palm', role:'greenery', bunch:23, stems:10 },
  { name:'Sage', role:'greenery', bunch:23, stems:10 },
  { name:'Salal Tips', role:'greenery', bunch:17, stems:10 },
  { name:'Salal/Lemon Leaf', role:'greenery', bunch:23, stems:10 },
  { name:'Silver Queen Pittosporum', role:'greenery', bunch:23, stems:10 },
  { name:'Variegate Pittosporum', role:'greenery', bunch:23, stems:10 },

  /* LINE */
  { name:'Bells of Ireland - Green', role:'line', bunch:40, stems:10 },
  { name:'Delphinium - Dark Blue', role:'line', bunch:42, stems:10 },
  { name:'Delphinium - Lavender', role:'line', bunch:85, stems:10 },
  { name:'Delphinium - Light Blue', role:'line', bunch:42, stems:10 },
  { name:'Delphinium - White', role:'line', bunch:42, stems:10 },
  { name:'Snapdragon - Orange', role:'line', bunch:36, stems:10 },
  { name:'Snapdragon - Pink', role:'line', bunch:36, stems:10 },
  { name:'Snapdragon - Pink/White', role:'line', bunch:36, stems:10 },
  { name:'Snapdragon - Yellow', role:'line', bunch:36, stems:10 },
  { name:'Snapdragons - Burgundy', role:'line', bunch:36, stems:10 },
  { name:'Snapdragons - Dark Pink (Medium Pink)', role:'line', bunch:36, stems:10 },
  { name:'Snapdragons - Sorbet', role:'line', bunch:36, stems:10 },
  { name:'Snapdragons - White', role:'line', bunch:36, stems:10 },
  { name:'Stock - Blush', role:'line', bunch:28, stems:10 },
  { name:'Stock - Dark Purple', role:'line', bunch:28, stems:10 },
  { name:'Stock - Fuchsia', role:'line', bunch:34, stems:10 },
  { name:'Stock - Lavender', role:'line', bunch:28, stems:10 },
  { name:'Stock - Mauve', role:'line', bunch:28, stems:10 },
  { name:'Stock - Peach', role:'line', bunch:28, stems:10 },
  { name:'Stock - Pink', role:'line', bunch:28, stems:10 },
  { name:'Stock - Purple', role:'line', bunch:28, stems:10 },
  { name:'Stock - White', role:'line', bunch:28, stems:10 },
  { name:'Stock - Yellow', role:'line', bunch:28, stems:10 },
  { name:'Stock -Burgundy', role:'line', bunch:28, stems:10 },
  { name:'Veronica - Purple', role:'line', bunch:27, stems:10 },
  { name:'Veronica - White', role:'line', bunch:28, stems:10 },

  /* LARGE */
  { name:'Hydrangea - Antique Green', role:'large', bunch:70, stems:5 },
  { name:'Hydrangea - Burgundy', role:'large', bunch:51, stems:5 },
  { name:'Hydrangea - Dark Purple', role:'large', bunch:51, stems:5 },
  { name:'Hydrangea - Green', role:'large', bunch:45, stems:5 },
  { name:'Hydrangea - Lavender', role:'large', bunch:45, stems:5 },
  { name:'Hydrangea - Light Blue', role:'large', bunch:45, stems:5 },
  { name:'Hydrangea - Light Pink', role:'large', bunch:45, stems:5 },
  { name:'Hydrangea - Mini Green', role:'large', bunch:40, stems:5 },
  { name:'Hydrangea - White', role:'large', bunch:45, stems:5 },
  { name:'Hydrangea - White (Large)', role:'large', bunch:68, stems:5 },
  { name:'King Protea', role:'large', bunch:34, stems:5 },

  /* FOCAL */
  { name:'Astilbe - Light Pink', role:'focal', bunch:42, stems:10 },
  { name:'Calla Lily - White', role:'focal', bunch:67, stems:10 },
  { name:'Calla Lily Mini - Burgundy', role:'focal', bunch:56, stems:10 },
  { name:'Calla Lily Mini - Pink/Mauve', role:'focal', bunch:56, stems:10 },
  { name:'Calla Lily Mini - White', role:'focal', bunch:56, stems:10 },
  { name:'Carnation - Bi-color Pink/Yellow', role:'focal', bunch:54, stems:25 },
  { name:'Carnation - Cobalt Thrill Magenta/Mauve', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Creola Antique Pink', role:'focal', bunch:54, stems:25 },
  { name:'Carnation - Crimson Tempo', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Green', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Hot Pink', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Hypnosis', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Light Orange', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Nobbio Burgundy', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Peach', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Sepia Mauve', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Terra-Cotta/Le Marrone Beige', role:'focal', bunch:51, stems:25 },
  { name:'Carnation - Yellow', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Babylon - Deep Pink', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Betsy Light Pink', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Blush', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Brut/Light Blush', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Burgundy', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Cream', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Deep Pink', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Hot Pink', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Moonaqua Fancy', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Moonlight Fancy', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Moonshade Fancy', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Moonvista Fancy', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - Red', role:'focal', bunch:51, stems:25 },
  { name:'Carnations - White', role:'focal', bunch:51, stems:25 },
  { name:'China Mum - White', role:'focal', bunch:34, stems:10 },
  { name:'Chrysanthemum - Blush', role:'focal', bunch:51, stems:10 },
  { name:'Chrysanthemum - Burgundy/Red', role:'focal', bunch:51, stems:10 },
  { name:'Chrysanthemum - Lavender', role:'focal', bunch:42, stems:10 },
  { name:'Chrysanthemum - Salmon', role:'focal', bunch:51, stems:10 },
  { name:'Chrysanthemum - White', role:'focal', bunch:51, stems:10 },
  { name:'Football Mum - Bronze', role:'focal', bunch:51, stems:10 },
  { name:'Football Mums - Cream', role:'focal', bunch:51, stems:10 },
  { name:'Fuji Mum - Bronze', role:'spray', bunch:21, stems:10 },
  { name:'Garden Rose - Cappuccino/Beige', role:'focal', bunch:118, stems:12 },
  { name:'Garden Rose - Juliette', role:'focal', bunch:120, stems:12 },
  { name:'Garden Rose - Peach Campanella', role:'focal', bunch:118, stems:12 },
  { name:'Garden Rose - Tess', role:'focal', bunch:117, stems:12 },
  { name:'Garden Rose - Wanted', role:'focal', bunch:118, stems:12 },
  { name:'Garden Rose - White O\'hara', role:'focal', bunch:120, stems:12 },
  { name:'Garden Rose - White Vitality', role:'focal', bunch:118, stems:12 },
  { name:'Gomphrena - Orange', role:'detail', bunch:34, stems:10 },
  { name:'Kangaroo Paw - Orange', role:'detail', bunch:40, stems:10 },
  { name:'Pincushion Protea - Orange', role:'focal', bunch:51, stems:5 },
  { name:'Pincushion Protea - Red', role:'focal', bunch:51, stems:5 },
  { name:'Pincushion Protea - Yellow', role:'focal', bunch:51, stems:5 },
  { name:'PomPon - Button - Hotrod Burgundy', role:'spray', bunch:32, stems:10 },
  { name:'PomPon - Button Micro Daisy Yellow', role:'spray', bunch:29, stems:10 },
  { name:'PomPon - Button Micro Dotty Gold/Orange', role:'spray', bunch:29, stems:10 },
  { name:'PomPon - Button Micro Smokey Salmon', role:'spray', bunch:29, stems:10 },
  { name:'PomPon - Lexi Bronze', role:'spray', bunch:29, stems:10 },
  { name:'PomPon - Salmon', role:'spray', bunch:29, stems:10 },
  { name:'Protea - Pink Ice', role:'focal', bunch:62, stems:5 },
  { name:'Rose - Amnesia Rose', role:'focal', bunch:100, stems:25 },
  { name:'Rose - Barista', role:'focal', bunch:163, stems:25 },
  { name:'Rose - Black Pearl (deep red)', role:'focal', bunch:100, stems:25 },
  { name:'Rose - Blueberry Rose', role:'focal', bunch:96, stems:25 },
  { name:'Rose - Bridal Akito Blush', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Camel Rose', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Cherry Brandy', role:'focal', bunch:110, stems:25 },
  { name:'Rose - Coffee Break', role:'focal', bunch:110, stems:25 },
  { name:'Rose - Country Home', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Cream: Carpe Diem', role:'focal', bunch:96, stems:25 },
  { name:'Rose - Cream/Blush Soul', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Dark Pink', role:'focal', bunch:110, stems:25 },
  { name:'Rose - Faith', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Free Spirit', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Freedom Red Rose', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Geraldine Antique Pink', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Golden Mustard', role:'focal', bunch:135, stems:25 },
  { name:'Rose - Mauve', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Miss Piggy', role:'focal', bunch:124, stems:25 },
  { name:'Rose - Moab', role:'focal', bunch:168, stems:25 },
  { name:'Rose - Moonstone', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Ocean Song', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Orange', role:'focal', bunch:96, stems:25 },
  { name:'Rose - Orange Bi-color', role:'focal', bunch:96, stems:25 },
  { name:'Rose - Pink Floyd', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Pink Mondial', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Quicksand', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Roseberry Magenta', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Sahara', role:'focal', bunch:101, stems:25 },
  { name:'Rose - Shimmer', role:'focal', bunch:96, stems:25 },
  { name:'Rose - Shukrani (peach)', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Sweet Escimo', role:'focal', bunch:90, stems:25 },
  { name:'Rose - Toffee', role:'focal', bunch:163, stems:25 },
  { name:'Rose - Vendela (ivory w/ blush center)', role:'focal', bunch:84, stems:25 },
  { name:'Rose - White', role:'focal', bunch:84, stems:25 },
  { name:'Rose - Yellow', role:'focal', bunch:90, stems:25 },
  { name:'Safari Sunset', role:'focal', bunch:26, stems:10 },
  { name:'Sunflower - Ring of Fire', role:'focal', bunch:14, stems:10 },
  { name:'Sunflowers - Yellow', role:'focal', bunch:42, stems:10 },
  { name:'Vintage Carnations - Minerva', role:'focal', bunch:51, stems:25 },

  /* SPRAY */
  { name:'Alstroemeria - Blush/Light Pink', role:'spray', bunch:21, stems:10 },
  { name:'Alstroemeria - Light Pink', role:'spray', bunch:21, stems:10 },
  { name:'Alstroemeria - Orange', role:'spray', bunch:21, stems:10 },
  { name:'Alstroemeria - Red', role:'spray', bunch:21, stems:10 },
  { name:'Alstroemeria - White', role:'spray', bunch:21, stems:10 },
  { name:'Lisianthus - Blush/Pink', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus - Cream', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus - Lavender', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus - Mauve - Roseanne Brown', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus - Pink', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus - Purple', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus - White', role:'spray', bunch:68, stems:10 },
  { name:'Lisianthus -Dark Pink', role:'spray', bunch:68, stems:10 },
  { name:'Mini Carnation - Hot Pink', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnation - Light pink', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnations - Blush', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnations - Burgundy', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnations - MoonPearl Fancy', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnations - MoonVelvet Fancy', role:'spray', bunch:33, stems:10 },
  { name:'Mini Carnations - Peach', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnations - White', role:'spray', bunch:23, stems:10 },
  { name:'Mini Carnations - Yellow', role:'spray', bunch:23, stems:10 },
  { name:'Spray Rose - Blush', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Coral', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Cream/Ivory', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Dark Red/Rubicon', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Deep Pink/ Magenta', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Hot Pink', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Ilse peachy/pink', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Lavender', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Light pink', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Mauve', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Mauve/Lavender', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Medium Pink/Jewel tone', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Orange', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Peach', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Pink Majolica', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Red', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Rust', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Sahara', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - White', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - White Majolica', role:'spray', bunch:43, stems:10 },
  { name:'Spray Rose - Yellow', role:'spray', bunch:43, stems:10 },

  /* DETAIL */
  { name:'Anemone - Purple', role:'detail', bunch:43, stems:10 },
  { name:'Anemone - White with Dark Center', role:'detail', bunch:43, stems:10 },
  { name:'Astrantia - Burgundy', role:'detail', bunch:48, stems:10 },
  { name:'Astrantia - Light Pink', role:'detail', bunch:36, stems:10 },
  { name:'Astrantia - Mauve', role:'detail', bunch:36, stems:10 },
  { name:'Astrantia - Pink', role:'detail', bunch:36, stems:10 },
  { name:'Astrantia - White', role:'detail', bunch:48, stems:10 },
  { name:'Campanula - Pink', role:'detail', bunch:52, stems:10 },
  { name:'Campanula - White', role:'detail', bunch:52, stems:10 },
  { name:'Chamomile - Daisy White', role:'detail', bunch:39, stems:10 },
  { name:'Cotinus Foliage - Smoke Bush/Burgundy', role:'greenery', bunch:40, stems:10 },
  { name:'Thistle', role:'detail', bunch:31, stems:10 },
  { name:'Thistle', role:'spray', bunch:31, stems:10 },
  { name:'Ranunculus - Apricot', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus - CLOONEY HANOI BLUSH', role:'detail', bunch:54, stems:10 },
  { name:'Ranunculus - Coral/Peach', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus - Orange', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus - Pink/Blush', role:'detail', bunch:44, stems:10 },
  { name:'Ranunculus - Red', role:'detail', bunch:38, stems:10 },
  { name:'Ranunculus - White', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus - Wine Plum', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus - Wine tone (burgundy/deep plumb)', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus - Yellow', role:'detail', bunch:43, stems:10 },
  { name:'Ranunculus Butterfly - blush', role:'detail', bunch:118, stems:10 },
  { name:'Ranunculus Butterfly - Cream', role:'detail', bunch:118, stems:10 },
  { name:'Ranunculus Butterfly - Magical Salmon', role:'detail', bunch:118, stems:10 },
  { name:'Ranunculus Butterfly - Orange', role:'detail', bunch:118, stems:10 },
  { name:'Ranunculus Butterfly - Red', role:'detail', bunch:118, stems:10 },
  { name:'Ranunculus Butterfly - Salmon', role:'detail', bunch:118, stems:10 },
  { name:'Scabiosa - Lavender', role:'detail', bunch:36, stems:10 },
  { name:'Scabiosa - Plum', role:'detail', bunch:36, stems:10 },
  { name:'Scabiosa - White', role:'detail', bunch:36, stems:10 },
  { name:'Tulip - Brown/Mauve (Dyed)', role:'detail', bunch:104, stems:10 },
  { name:'Tulip - Dark Pink', role:'detail', bunch:44, stems:10 },
  { name:'Tulip - Dark Purple', role:'detail', bunch:44, stems:10 },
  { name:'Tulip - White', role:'detail', bunch:44, stems:10 },
  { name:'Tulip - Yellow', role:'detail', bunch:44, stems:10 },
  { name:'Tweedia - Light blue', role:'detail', bunch:42, stems:10 },
  { name:'Tweedia - White', role:'detail', bunch:42, stems:10 },

  /* FILLER */
  { name:'Amaranthus - Hanging Green', role:'detail', bunch:32, stems:10 },
  { name:'Amaranthus - Hanging Red', role:'detail', bunch:32, stems:10 },
  { name:'Amaranthus - Upright - Brown/Bronze', role:'detail', bunch:32, stems:10 },
  { name:'Amaranthus - Upright - Red', role:'detail', bunch:32, stems:10 },
  { name:'Aster - Hot Pink', role:'spray', bunch:23, stems:10 },
  { name:'Aster - Pink', role:'spray', bunch:23, stems:10 },
  { name:'Aster - White', role:'spray', bunch:26, stems:10 },
  { name:'Baby\'s Breath - Gypsophila', role:'filler', bunch:28, stems:10 },
  { name:'Brunia - Silver/Grey', role:'filler', bunch:35, stems:10 },
  { name:'Craspedia - Billy Balls', role:'filler', bunch:26, stems:10 },
  { name:'Hypericum Berry - Burgundy', role:'filler', bunch:22, stems:10 },
  { name:'Hypericum Berry - Coral', role:'filler', bunch:22, stems:10 },
  { name:'Hypericum Berry - Green', role:'filler', bunch:22, stems:10 },
  { name:'Hypericum Berry - Pink', role:'filler', bunch:22, stems:10 },
  { name:'Hypericum Berry - Red', role:'filler', bunch:22, stems:10 },
  { name:'Hypericum Berry - White', role:'filler', bunch:22, stems:10 },
  { name:'Limonium - Light Purple', role:'filler', bunch:19, stems:10 },
  { name:'Aster - Montecasino Lavender', role:'spray', bunch:26, stems:10 },
  { name:'Queen Annes Lace - Chocolate/Burgundy', role:'filler', bunch:30, stems:10 },
  { name:'Queen Annes Lace - White', role:'filler', bunch:24, stems:10 },
  { name:'Rice Flower - Light Pink', role:'filler', bunch:28, stems:10 },
  { name:'Scabiosa Pods', role:'filler', bunch:34, stems:10 },
  { name:'Solidago - Yellow', role:'filler', bunch:19, stems:10 },
  { name:'Statice - Lavender', role:'filler', bunch:19, stems:10 },
  { name:'Statice - Purple', role:'filler', bunch:20, stems:10 },
  { name:'Statice - White', role:'filler', bunch:20, stems:10 },
  { name:'Wax Flower - Pink/blush', role:'filler', bunch:34, stems:10 },
  { name:'Wax Flower - Purple', role:'filler', bunch:34, stems:10 },
  { name:'Wax Flower - White', role:'filler', bunch:34, stems:10 },
  { name:'Waxflower - Lavender/Purple', role:'filler', bunch:34, stems:10 },
  { name:'Waxflower (White)', role:'filler', bunch:36, stems:10 },
  { name:'Yarrow - Yellow', role:'filler', bunch:40, stems:10 }
];

/* g(),l(),f(),lg(),s(),d(),fi() helpers keep the recipe rows short & readable.
   amount, optional(0/1), defaultFlower(optional). 'b' = bunch fraction, 's' = stems. */
function g(amt,unit,opt,def){ return ['greenery',amt,unit,opt||0,def||'']; }
function l(amt,opt,def){ return ['line',amt,'s',opt||0,def||'']; }
function f(amt,opt,def){ return ['focal',amt,'s',opt||0,def||'']; }
function lg(amt,opt,def){ return ['large',amt,'s',opt||0,def||'']; }
function s(amt,opt,def){ return ['spray',amt,'s',opt||0,def||'']; }
function d(amt,opt,def){ return ['detail',amt,'s',opt||0,def||'']; }
function fi(amt,unit,opt,def){ return ['filler',amt,unit,opt||0,def||'']; }

/* RECIPES: grouped into the four estimator categories.
   Each piece: { id, name, note?, mult?, recipe:[slots], greeneryOnly? } */
window.BCF_CATEGORIES = [
  {
    id:'party', name:'Wedding Party Flowers',
    pieces:[
      { id:'bridal-bouquet', name:'Bridal Bouquet', recipe:[
        g(1/5,'b',0), g(1/5,'b',1),
        f(8,0), l(4,0), s(3,0), d(5,1), s(3,0)
      ]},
      { id:'bridesmaid-bouquet', name:'Bridesmaid Bouquet', recipe:[
        g(1/6,'b',0), g(1/6,'b',1),
        f(3,0,'Rose'), l(2,0,'Stock'), s(2,0,'Spray Rose'), d(2,1,'Ranunculus'), s(2,0,'Lisianthus')
      ]},
      { id:'floral-hoop', name:'Floral Hoop', recipe:[
        g(5,'s',0), g(2,'s',1),
        f(3,0,'Rose'), f(2,1,'Carnation'), s(1,0,'Spray Rose'), s(1,0,'Alstroemeria'), d(2,1,'Ranunculus'), fi(4,'s',0,'Wax Flower')
      ]},
      { id:'boutonniere', name:'Boutonniere', recipe:[
        s(1,0,'Spray Rose'), g(1,'s',0)
      ]},
      { id:'pocket-square', name:'Floral Pocket Square', recipe:[
        s(4,0,'Spray Rose'), d(2,1,'Ranunculus'), g(1,'s',0), fi(1,'s',1,'Wax Flower')
      ]},
      { id:'corsage', name:'Corsage', recipe:[
        s(4,0,'Spray Rose'), g(2,'s',0)
      ]},
      { id:'bridal-crown', name:'Bridal Floral Crown', recipe:[
        g(1/6,'b',0), f(3,0,'Rose'), f(2,0,'Carnation'), s(2,0,'Spray Rose'), fi(1,'s',1,'Wax Flower')
      ]},
      { id:'flower-girl-crown', name:'Flower Girl Crown', recipe:[
        g(1/6,'b',0), s(7,0,'Spray Rose'), fi(5,'s',1,'Wax Flower')
      ]}
    ]
  },
  {
    id:'ceremony', name:'Ceremony Flowers',
    pieces:[
      { id:'arbor-single', name:'Single Arrangement Arbor', recipe:[
        g(1/2,'b',0), g(1/2,'b',0),
        l(5,0,'Snapdragon'), s(5,0,'Lisianthus'), f(12,0,'Rose'), f(9,0,'Carnation'), s(5,0,'Mini Carnation'), fi(1/4,'b',1,'Wax Flower')
      ]},
      { id:'arbor-double', name:'Double Arrangement Arbor', note:'Top + side arrangement combined', recipe:[
        g(3/4,'b',0), g(3/4,'b',0),
        l(8,0,'Snapdragon'), s(8,0,'Lisianthus'), f(15,0,'Rose'), f(12,0,'Carnation'), s(8,0,'Mini Carnation'), fi(1/2,'b',1,'Wax Flower')
      ]},
      { id:'arbor-2corner', name:'2 Corner Arbor Arrangements', mult:2, note:'Recipe shown per corner (x2)', recipe:[
        g(1/2,'b',0), g(1/2,'b',0),
        l(5,0,'Snapdragon'), s(5,0,'Lisianthus'), f(12,0,'Rose'), f(9,0,'Carnation'), s(5,0,'Mini Carnation'), fi(1/4,'b',1,'Wax Flower')
      ]},
      { id:'arbor-2side', name:'2 Side Arbor Arrangements', mult:2, note:'Recipe shown per side (x2)', recipe:[
        g(1/4,'b',0), g(1/4,'b',0),
        l(3,0,'Snapdragon'), s(3,0,'Lisianthus'), f(3,0,'Rose'), f(3,0,'Carnation'), s(3,0,'Mini Carnation'), fi(1/4,'b',1,'Wax Flower')
      ]},
      { id:'vaseless-statement', name:'Vase-less Statement Arrangement', recipe:[
        g(1/2,'b',0,'Salal / Lemon Leaf'), g(1/2,'b',0,'Silver Dollar Eucalyptus'), g(1/4,'b',0,'Leather Leaf'),
        lg(5,0,'Hydrangea'), l(5,0,'Stock'), l(5,0,'Delphinium'), f(12,0,'Rose'), f(10,0,'Rose'), s(5,0,'Alstroemeria'), fi(1/2,'b',0,'Wax Flower')
      ]},
      { id:'ceremony-urn', name:'Large Ceremony Urn', recipe:[
        g(1/2,'b',0), g(1/2,'b',0),
        lg(5,0,'Hydrangea'), l(5,0,'Snapdragon'), f(8,0,'Rose'), f(8,0,'Carnation'), s(5,0,'Mini Carnation'), fi(1/3,'b',1,'Wax Flower')
      ]},
      { id:'chair-pew', name:'Chair / Pew Floral Grouping', recipe:[
        g(1/5,'b',0), l(2,0,'Stock'), f(1,0,'Rose'), f(2,0,'Carnation')
      ]},
      { id:'aisle-statement', name:'Aisle Statement Arrangement', recipe:[
        g(1/3,'b',0), g(1/3,'b',0), g(1/3,'b',0),
        l(5,0,'Stock'), l(5,0,'Snapdragon'), f(12,0,'Rose'), f(8,0,'Carnation'), s(5,0,'Mini Carnation'), s(5,0,'Alstroemeria'), fi(1/4,'b',1,'Wax Flower')
      ]},
      { id:'pillar-standard', name:'Flower Pillar - Standard', recipe:[
        g(1,'b',0,'Gunni Eucalyptus'), g(1,'b',0,'Silver Dollar Eucalyptus'), g(2,'b',0,'Leather Leaf'), g(2,'b',0,'Salal / Lemon Leaf'),
        l(10,0,'Delphinium'), l(10,0,'Snapdragon'), f(12,0,'Carnation'), f(25,0,'Carnation'), f(25,0,'Rose'), s(20,0,'Mini Carnation'), d(20,0,'Butterfly Ranunculus'), fi(1,'b',0,'Wax Flower')
      ]},
      { id:'pillar-4ft', name:'Flower Pillar - 4 ft', recipe:[
        g(1,'b',0,'Leather Leaf'), g(1,'b',0,'Salal / Lemon Leaf'), g(2,'b',0,'Italian Ruscus'), g(2,'b',0,'Israeli Ruscus'),
        l(5,0,'Delphinium'), l(10,0,'Stock'), f(12,0,'Carnation'), f(12,0,'Rose'), f(12,0,'Rose'), s(5,0,'Mini Carnation'), d(5,0,'Thistle'), fi(1,'b',0,'Wax Flower')
      ]},
      { id:'pillar-6ft', name:'Flower Pillar - 6 ft', recipe:[
        g(1,'b',0,'Leather Leaf'), g(1,'b',0,'Salal / Lemon Leaf'), g(2,'b',0,'Italian Ruscus'), g(2,'b',0,'Israeli Ruscus'),
        l(5,0,'Delphinium'), l(5,0,'Snapdragon'), f(25,0,'Carnation'), f(25,0,'Rose'), s(10,0,'Mini Carnation'), fi(1,'b',0,'Wax Flower')
      ]},
      { id:'signage', name:'Signage Flowers', recipe:[
        g(4,'s',0,'Gunni Eucalyptus'), g(3,'s',0,'Silver Dollar Eucalyptus'), g(3,'s',0,'Leather Leaf'), g(3,'s',0,'Salal / Lemon Leaf'),
        l(1,0,'Delphinium'), f(5,0,'Carnation'), f(3,0,'Rose'), s(3,0,'Mini Carnation'), fi(3,'s',1,'Wax Flower')
      ]}
    ]
  },
  {
    id:'reception', name:'Reception Flowers',
    pieces:[
      { id:'budvase-trio', name:'Bud Vase Trio (round table)', mult:3, note:'Recipe per bud vase (x3)', recipe:[
        g(1,'s',0,'Silver Dollar Eucalyptus'), f(2,0,'Rose')
      ]},
      { id:'budvase-six', name:'Bud Vases - 6 (rectangle table)', mult:6, note:'Recipe per bud vase (x6)', recipe:[
        g(1,'s',0,'Silver Dollar Eucalyptus'), f(2,0,'Rose')
      ]},
      { id:'budvase-alacarte', name:'A La Carte Bud Vase', note:'Recipe per bud vase', recipe:[
        g(1,'s',0,'Silver Dollar Eucalyptus'), f(2,0,'Rose')
      ]},
      { id:'greenery-rect', name:'Hand-Placed Greenery (rectangle table)', greeneryOnly:true, recipe:[
        g(1,'b',0,'Italian Ruscus')
      ]},
      { id:'greenery-round', name:'Hand-Placed Greenery (round table)', greeneryOnly:true, recipe:[
        g(1/4,'b',0,'Silver Dollar Eucalyptus')
      ]},
      { id:'cp-small', name:'Small Centerpiece', recipe:[
        g(1/6,'b',0), g(1/7,'b',1),
        f(3,0,'Rose'), f(2,0,'Carnation'), s(3,0,'Mini Carnation'), l(2,0,'Stock')
      ]},
      { id:'cp-medium', name:'Medium Centerpiece', recipe:[
        g(1/6,'b',0), g(1/6,'b',1),
        f(5,0,'Rose'), f(4,0,'Carnation'), s(3,0,'Mini Carnation'), l(3,0,'Stock'), s(2,0,'Spray Rose')
      ]},
      { id:'cp-large', name:'Large Centerpiece', recipe:[
        g(1/5,'b',0), g(1/5,'b',1),
        l(3,0,'Delphinium'), f(6,0,'Rose'), s(3,0,'Mini Carnation'), s(3,0,'Spray Rose'), f(5,0,'Carnation'), d(3,1,'Ranunculus')
      ]},
      { id:'cp-vaseless', name:'Vase-less Centerpiece', recipe:[
        g(1/6,'b',0), g(1/6,'b',0),
        f(3,0,'Rose'), f(3,0,'Carnation'), s(3,0,'Mini Carnation'), s(2,0,'Spray Rose'), l(2,0,'Snapdragon'), fi(1/7,'b',1,'Wax Flower')
      ]},
      { id:'cp-compote', name:'Compote Centerpiece', recipe:[
        g(1/6,'b',0), g(1/6,'b',0),
        f(6,0,'Rose'), f(4,0,'Carnation'), s(3,0,'Spray Rose'), l(3,0,'Delphinium'), s(3,0,'Mini Carnation'), fi(1/7,'b',1,'Wax Flower')
      ]},
      { id:'cp-tall', name:'Tall Centerpiece', recipe:[
        g(1/3,'b',0), g(1/3,'b',0), g(1/3,'b',1),
        l(5,0,'Stock'), l(5,0,'Snapdragon'), f(9,0,'Rose'), f(9,0,'Carnation'), s(5,0,'Mini Carnation'), fi(1/4,'b',0,'Wax Flower')
      ]},
      { id:'table-runner', name:'Floral Table Runner', recipe:[
        g(1/4,'b',0), g(1/4,'b',0), g(1/4,'b',0),
        f(15,0,'Rose'), l(5,0,'Snapdragon'), f(9,0,'Carnation'), s(5,0,'Mini Carnation'), s(5,0,'Spray Rose'), fi(1/4,'b',0,'Wax Flower')
      ]},
      { id:'sweetheart-double', name:'Sweetheart - Corner Pair', mult:2, note:'Recipe per corner (x2)', recipe:[
        g(1/4,'b',0), g(1/4,'b',0),
        l(5,0,'Stock'), s(3,0,'Spray Rose'), f(9,0,'Rose'), f(6,0,'Carnation'), fi(1/5,'b',1,'Wax Flower')
      ]},
      { id:'sweetheart-lush', name:'Sweetheart - 3/4 Lush', note:'Greenery foundation, fill with leftover blooms', recipe:[
        g(1/2,'b',0), g(1/2,'b',0), g(1/2,'b',1), g(1,'b',0,'Italian Ruscus'),
        f(6,1,'Rose'), f(6,1,'Carnation')
      ]},
      { id:'sweetheart-greenery', name:'Sweetheart - Greenery Only', greeneryOnly:true, recipe:[
        g(2,'b',0,'Italian Ruscus'), g(1,'b',0,'Silver Dollar Eucalyptus')
      ]},
      { id:'garland-8ft', name:'Pre-Made Garland (8 ft)', greeneryOnly:true, note:'Greenery garland; add loose blooms a la carte', recipe:[
        g(2,'b',0,'Salal / Lemon Leaf'), g(1,'b',0,'Leather Leaf'), g(1,'b',0,'Silver Dollar Eucalyptus'), g(4,'b',0,'Italian Ruscus')
      ]}
    ]
  }
];
