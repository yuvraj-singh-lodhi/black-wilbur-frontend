// // types.tsx
export interface CurrentUserDetails {
  user: UserData;
  cart: Cart[];
  cartItems:CartItem[], // Array of Cart items associated with the user
  wishlist: Wishlist; // Wishlist associated with the user
  orders: Order[];
  orderItems:OrderItem[], // Array of user's orders
  addresses: ShippingAddress[]; // Array of user's shipping addresses
  loyaltyPoints?: LoyaltyPoint; // Optional loyalty points
}

export interface UserData {
  id: number;
  password: string;
  last_login: string | null; // Use null for users who haven't logged in yet
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string; // Consider using Date type in your application logic if needed
  email: string;
  groups: Array<unknown>; // Specify a more detailed type if you have a structure for groups
  user_permissions: Array<unknown>; // Specify a more detailed type if you have a structure for user permissions
}

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

export interface ProductSize {
  id: number; // Unique identifier for the size entry
  product: Product; // Reference to the product
  size: string; // Size (e.g., S, M, L, XL, XXL)
  quantity: number; // Quantity available for this size
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  images: ProductImage[]; // Add support for multiple images
  sizes: ProductSize[]; // Array of sizes with quantities
  created_at: string;
  updated_at: string;
  availability: boolean; // Added availability field
}

// export interface UserDB {
//   id: number;
//   username: string;
//   email: string;
//   name: string;
//   token: string;
// }

export interface User {
  phone: string;
  id: number,
  username: string;
  email:string,
  password: string;
  password2?: string; 
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
export interface AccountDetails {
  customerName: string;  // Name of the customer
  country: string;       // Country of the customer
  addresses: ShippingAddress[];   // List of addresses associated with the customer
  email: string;         // Email of the customer (optional)
  phoneNumber?: string;  // Phone number of the customer (optional)
  // You can add more fields if your API returns additional account details
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
  size: string; // Size selected for the cart item
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

export interface Address {
  id: number;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  user: number;
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
