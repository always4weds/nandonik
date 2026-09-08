export type CategoryId = 'all' | 'fragrance' | 'skincare' | 'ceramics' | 'jewelry' | 'linen';

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  department: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  batchNumber?: string;
  image: string;
  gallery?: string[];
  description: string;
  olfactoryArchitecture?: {
    family: string;
    tags: string[];
  };
  harmonicNotes?: {
    top?: string;
    heart?: string;
    base1?: string;
    base2?: string;
  };
  specifications: {
    volumeOrSize: string;
    concentrationOrMaterial: string;
    longevityOrCare: string;
    provenance: string;
  };
  scentingRitual?: string;
  packagingNote?: string;
  companionIds?: string[];
  status: 'Active' | 'Draft' | 'Archived';
  lastModified?: string;
}

export type ActiveScreen = 'home' | 'products' | 'categories' | 'how-to-order' | 'admin';

export interface CustomerOrder {
  id?: string;
  customerName: string;
  contactNumber: string;
  houseAndRoad: string;
  areaDetails: string;
  districtRegion: string;
  product?: {
    id: string;
    sku: string;
    name: string;
    price: number;
    category: string;
  } | null;
  paymentMethod: string;
  specialNote?: string;
  messageText: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface ChatMessageRecord {
  id?: string;
  sender: 'user' | 'concierge';
  text: string;
  customerName?: string;
  contactNumber?: string;
  productId?: string | null;
  productName?: string | null;
  timestamp: string;
  createdAt?: string;
}
