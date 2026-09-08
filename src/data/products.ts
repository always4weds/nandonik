import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aura-nocturne',
    sku: 'NB-FRG-001',
    name: 'Aura Nocturne Eau De Parfum',
    subtitle: 'Artisanal botanical fragrance 50ml',
    department: 'Fine Fragrance',
    category: 'fragrance',
    price: 3850,
    originalPrice: 4200,
    discountPercentage: 8,
    badge: 'Signature',
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 6,
    batchNumber: 'Batch 04',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A sensory ode to twilight florals and velvety amber notes. Formulated with organic Grasse jasmine, aged Mysore sandalwood, and dry Himalayan cedarwood for an enduring sillage.',
    olfactoryArchitecture: {
      family: 'Twilight Flora & Dry Woods',
      tags: ['Calabrian Bergamot', 'Night Jasmine', 'Himalayan Cedar']
    },
    harmonicNotes: {
      top: 'Bergamot Zest',
      heart: 'Night Jasmine',
      base1: 'White Amber',
      base2: 'Cashmere Musk'
    },
    specifications: {
      volumeOrSize: '50 ml / 1.7 fl. oz.',
      concentrationOrMaterial: 'Extrait (26%)',
      longevityOrCare: '10–12 Hours',
      provenance: 'Artisanal Workshop'
    },
    scentingRitual: 'Mist two measured pumps across pulse points: inner wrists, side of the throat, and the chest collar. Refrain from rubbing wrists together to allow the subtle top aldehydes to evaporate at their natural cadence.',
    packagingNote: 'Recyclable frosted heavy-wall glass with magnetic rose-gold atomiser cap.',
    companionIds: ['aurelia-serum', 'baroque-pearl-choker'],
    status: 'Active',
    lastModified: 'Modified 2 hours ago'
  },
  {
    id: 'aurelia-serum',
    sku: 'NB-SKN-002',
    name: 'Aurélia Botanical Repair Serum',
    subtitle: 'Hyaluronic acid & Vitamin C 30ml',
    department: 'Bio-Active Skincare',
    category: 'skincare',
    price: 2450,
    badge: 'Bestseller',
    rating: 4.95,
    reviewCount: 58,
    inStock: true,
    stockCount: 12,
    batchNumber: 'Batch 11',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-bb990391d4e0?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Cold-pressed Damascus rose hip, plant squalane, and micro-filtered organic immortelle elixir for restoring natural skin barrier and illuminated suppleness.',
    specifications: {
      volumeOrSize: '30 ml / 1 fl. oz.',
      concentrationOrMaterial: 'Cold-Pressed Botanical Extract',
      longevityOrCare: 'All-Day Cellular Moisture',
      provenance: 'Clean Lab Formulations'
    },
    scentingRitual: 'Dispense 3 to 4 drops onto warmed palms and press gently across freshly cleansed skin before facial moisturization.',
    packagingNote: 'Miron ultraviolet apothecary glass dropper bottle to preserve active botanical potency.',
    companionIds: ['aura-nocturne', 'rose-quartz-gua-sha'],
    status: 'Active',
    lastModified: 'Modified 5 hours ago'
  },
  {
    id: 'wabi-sabi-vase',
    sku: 'NB-CER-003',
    name: 'Wabi-Sabi Ceramic Flora Vase',
    subtitle: 'Handcrafted speckled stoneware',
    department: 'Studio Ceramics & Home',
    category: 'ceramics',
    price: 1890,
    badge: 'Hand-Thrown',
    rating: 4.88,
    reviewCount: 31,
    inStock: true,
    stockCount: 8,
    batchNumber: 'Studio Run 07',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Hand-thrown terracotta with matte glaze and subtle flecks of raw river clay. Each piece bears unique throwing rings celebrate organic imperfection.',
    specifications: {
      volumeOrSize: '22 cm height × 12 cm dia.',
      concentrationOrMaterial: 'High-Fired Stoneware & Kaolin Glaze',
      longevityOrCare: 'Hand wash with mild botanical soap',
      provenance: 'Old Dhaka Ceramic Guild'
    },
    scentingRitual: 'Designed to display wild dried botanicals, seasonal branches, or singular floral stems in quiet serenity.',
    packagingNote: 'Delivered in custom corrugated kraft box with pressed wood-wool cushioning.',
    companionIds: ['soy-candle', 'stoneware-espresso'],
    status: 'Active',
    lastModified: 'Modified 1 day ago'
  },
  {
    id: 'baroque-pearl-choker',
    sku: 'NB-JWL-004',
    name: 'Lustre Baroque Pearl Choker',
    subtitle: 'Natural organic baroque pearls & raw silk cord',
    department: 'Fine Handcrafted Jewelry',
    category: 'jewelry',
    price: 3200,
    badge: 'Limited Edition',
    rating: 5.0,
    reviewCount: 27,
    inStock: true,
    stockCount: 4,
    batchNumber: 'Atelier Series 02',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Hand-strung freshwater organic baroque pearls with subtle iridescent overtone, hand-tied on raw natural silk cord with an 18k rose gold vermeil clasp.',
    specifications: {
      volumeOrSize: '38–44 cm adjustable chain',
      concentrationOrMaterial: 'Grade AA Baroque Pearls & 18k Vermeil',
      longevityOrCare: 'Store in soft velvet pouch away from moisture',
      provenance: 'Handmade in Dhaka Atelier'
    },
    scentingRitual: 'Fasten gently around the base of the neck for an airy, luminous statement that transitions effortlessly from day to twilight.',
    packagingNote: 'Housed in linen jewel box embossed with rose gold foil seal.',
    companionIds: ['aura-nocturne', 'raw-silk-scarf'],
    status: 'Active',
    lastModified: 'Modified 3 days ago'
  },
  {
    id: 'rose-quartz-gua-sha',
    sku: 'NB-SKN-005',
    name: 'Rose Quartz Gua Sha & Facial Elixir',
    subtitle: 'Sculpted raw quartz stone with botanical infusion',
    department: 'Ritual Skincare',
    category: 'skincare',
    price: 1650,
    badge: 'Wellness',
    rating: 4.85,
    reviewCount: 19,
    inStock: true,
    stockCount: 15,
    batchNumber: 'Batch 08',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop',
    description: 'Sculpted from genuine Brazilian rose quartz crystal, cooled to ambient temperature to soothe puffiness and sculpt facial contours in morning rituals.',
    specifications: {
      volumeOrSize: '8.5 cm × 5.5 cm stone',
      concentrationOrMaterial: '100% Genuine Natural Rose Quartz',
      longevityOrCare: 'Rinse with cold water and dry thoroughly',
      provenance: 'Artisan Gem Cutters'
    },
    status: 'Active',
    lastModified: 'Modified 4 days ago'
  },
  {
    id: 'soy-candle',
    sku: 'NB-FRG-006',
    name: 'Hand-Poured Soy Wax Botanical Candle',
    subtitle: 'Smoked cedarwood, tonka bean & wild fig',
    department: 'Artisanal Home Fragrance',
    category: 'fragrance',
    price: 1250,
    badge: 'Atmospheric',
    rating: 4.9,
    reviewCount: 34,
    inStock: true,
    stockCount: 20,
    batchNumber: 'Batch 14',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop',
    description: 'Small-batch 100% natural soy wax candle infused with pure botanical essential oils and a crackling natural unbleached cotton wick.',
    specifications: {
      volumeOrSize: '220 g / 55-hour burn time',
      concentrationOrMaterial: 'Golden Soy Wax & Organic Oils',
      longevityOrCare: 'Trim wick to 5mm before every burn',
      provenance: 'Dhaka Candle Workshop'
    },
    status: 'Active',
    lastModified: 'Modified 2 days ago'
  },
  {
    id: 'raw-silk-scarf',
    sku: 'NB-LSE-007',
    name: 'Raw Mulberry Silk Pocket Scarf',
    subtitle: 'Hand-loomed natural mulberry silk in dusty blush',
    department: 'Handcrafted Accessories',
    category: 'linen',
    price: 1450,
    badge: 'Hand-Loomed',
    rating: 4.9,
    reviewCount: 16,
    inStock: true,
    stockCount: 9,
    batchNumber: 'Weave 03',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    description: 'Woven on heritage wooden pit looms using pure mulberry silk yarn, naturally dyed with local madder root and rose petals for an understated patina.',
    specifications: {
      volumeOrSize: '55 cm × 55 cm square',
      concentrationOrMaterial: '100% Pure Rajshahi Mulberry Silk',
      longevityOrCare: 'Dry clean or gentle cold hand wash',
      provenance: 'Rajshahi Heritage Weavers'
    },
    status: 'Active',
    lastModified: 'Modified 6 days ago'
  },
  {
    id: 'stoneware-espresso',
    sku: 'NB-CER-008',
    name: 'Stoneware Minimal Espresso Set',
    subtitle: 'Pair of hand-pinched ceramic cups with sand glaze',
    department: 'Studio Ceramics & Home',
    category: 'ceramics',
    price: 2100,
    badge: 'Edition',
    rating: 4.92,
    reviewCount: 22,
    inStock: true,
    stockCount: 11,
    batchNumber: 'Kiln Firing 09',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    description: 'A tactile pairing of double-fired stoneware demitasse cups, featuring toasted sand speckled clay with a silken chalk interior.',
    specifications: {
      volumeOrSize: 'Set of 2 • 90ml capacity each',
      concentrationOrMaterial: 'Durable Stoneware Clay',
      longevityOrCare: 'Dishwasher & Microwave Safe',
      provenance: 'Artisan Clay Studio'
    },
    status: 'Active',
    lastModified: 'Modified 1 week ago'
  }
];

export const WHATSAPP_PHONE = '8801892116999';
export const WHATSAPP_DISPLAY = '+880 1892 116999';

export interface WhatsAppLinkSet {
  waMe: string;
  apiWeb: string;
  appScheme: string;
}

export function getWhatsAppLinks(text: string): WhatsAppLinkSet {
  const encoded = encodeURIComponent(text);
  return {
    waMe: `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`,
    apiWeb: `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`,
    appScheme: `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encoded}`,
  };
}

export function createWhatsAppOrderLink(product: Product, customNote?: string): string {
  const text = `Hello Nandonik Bazar, I'd like to order ${product.name} (৳ ${product.price.toLocaleString()}) [SKU: ${product.sku}]${customNote ? ` - ${customNote}` : ''}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function createGeneralWhatsAppLink(message?: string): string {
  const defaultMsg = message || 'Hello Nandonik Bazar, I would like to inquire about your curated artisanal collection.';
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(defaultMsg)}`;
}
