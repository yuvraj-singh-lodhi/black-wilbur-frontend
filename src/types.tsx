// types.tsx

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product: Product;
  image: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  images: ProductImage[]; // Add support for multiple images
  sizes: string[]; // Add this field for sizes
  created_at: string;
  updated_at: string;
  availability:boolean
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  token: string;
}

export interface Order {
  id: number;
  user: User;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'completed' | 'canceled'; // Define status types
}

export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  user: User;
  products: Product[];
}

export interface CartItem {
  id: number;
  cart: Cart;
  product: Product;
  quantity: number;
  size: string;
}

export interface Wishlist {
  id: number;
  user: User;
  products: Product[];
}

export interface Review {
  id: number;
  product: Product;
  user: User;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ShippingAddress {
  id: number;
  user: User;
  address_line_1: string;
  address_line_2?: string; // Optional
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface Media {
  id: number;
  image: string;
  video_url?: string; // Optional
  banner_text?: string; // Optional
  created_at: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribed_at: string;
}

export interface Discount {
  id: number;
  code: string;
  percentage: number;
  start_date: string;
  end_date: string;
}

export interface LoyaltyPoint {
  id: number;
  user: User;
  points: number;
}

export interface Referral {
  id: number;
  referrer: User;
  referred: User;
  created_at: string;
}

export interface DistributionPartnership {
  id: number;
  name: string;
  contact_info: string;
  created_at: string;
}

export interface Influencer {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface SupportTicket {
  id: number;
  user: User;
  subject: string;
  message: string;
  created_at: string;
  is_resolved: boolean;
}
