export interface WatchVariation {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice: number;
  image: string;
  colorCode: string; // Tailwind class or hex
  colorName: string;
  strapType: 'leather' | 'metal' | 'silicone';
  strapNameAr: string;
}

export interface Order {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  variationId: string;
  variationName: string;
  quantity: number;
  totalPrice: number;
  status: 'new' | 'confirmed' | 'delivered';
  timestamp: string;
}

export interface Review {
  id: string;
  userName: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  verifiedPurchase: boolean;
  productImage?: string;
}

export interface PixelEvent {
  id: string;
  platform: 'facebook' | 'tiktok' | 'google';
  eventName: 'PageView' | 'AddToCart' | 'InitiateCheckout' | 'Purchase';
  payload: Record<string, any>;
  timestamp: string;
}
