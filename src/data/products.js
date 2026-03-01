// Static product list for the whole app.
// In a real project this would come from a backend API,
// but here we keep it in a simple array so we can focus
// on React and state management.

export const products = [
  {
    id: 'lipstick-velvet-rose',
    name: 'Velvet Rose Lipstick',
    category: 'makeup',
    type: 'lipstick',
    price: 799,
    badge: 'Best seller',
    description: 'Soft-matte lipstick in a rosy pink shade, perfect for everyday glam.',
  },
  {
    id: 'blush-peach-cloud',
    name: 'Peach Cloud Blush',
    category: 'makeup',
    type: 'blush',
    price: 699,
    badge: 'New',
    description: 'Blendable powder blush that gives a cloudy, flushed finish to your cheeks.',
  },
  {
    id: 'highlighter-moon-glow',
    name: 'Moon Glow Highlighter',
    category: 'makeup',
    type: 'highlighter',
    price: 899,
    badge: 'Glowy fave',
    description: 'Pearl champagne highlighter for that lit-from-within glow.',
  },
  {
    id: 'serum-glass-skin',
    name: 'Glass Skin Serum',
    category: 'skincare',
    type: 'serum',
    price: 1299,
    badge: 'Hydrating',
    description: 'Lightweight serum with hyaluronic acid for bouncy, glassy skin.',
  },
  {
    id: 'mask-rose-relax',
    name: 'Rose Relax Sheet Mask',
    category: 'skincare',
    type: 'mask',
    price: 249,
    badge: 'Self-care',
    description: 'Cooling sheet mask infused with rose water for instant calm.',
  },
  {
    id: 'moisturizer-cloud-cream',
    name: 'Cloud Cream Moisturizer',
    category: 'skincare',
    type: 'moisturizer',
    price: 1099,
    badge: 'Lightweight',
    description: 'Fluffy gel-cream that keeps your skin hydrated without feeling heavy.',
  },
  {
    id: 'accessory-satin-scrunchies',
    name: 'Satin Scrunchies Set',
    category: 'accessories',
    type: 'hair',
    price: 499,
    badge: 'Bundle',
    description: 'Set of 5 pastel satin scrunchies that are gentle on your hair.',
  },
  {
    id: 'accessory-pearl-clips',
    name: 'Pearl Hair Clips',
    category: 'accessories',
    type: 'hair',
    price: 399,
    badge: 'Cute',
    description: 'Pair of pearl-studded clips that instantly dress up any hairstyle.',
  },
]

// Helper: find a product by its id.
export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

// Helper: get products for a category (makeup, skincare, accessories).
// If category is "all" or undefined, we simply return everything.
export function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  return products.filter((product) => product.category === category);
}

