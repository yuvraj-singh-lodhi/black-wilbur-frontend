// api.tsx

import axios from 'axios';
import { 
    Category, 
    Product, 
    ProductImage, 
    ProductSize,
    User, 
    CurrentUserDetails,
    Order, 
    OrderItem, 
    Cart, 
    Wishlist, 
    Review, 
    ShippingAddress, 
    Media, 
    NewsletterSubscription, 
    Discount, 
    LoyaltyPoint, 
    Referral, 
    DistributionPartnership, 
    Influencer, 
    SupportTicket, 
    UserData
} from '../types';

// Define base API URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Set up axios for authentication
const setAuthToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Authentication API functions
export const registerUser = async (userData: {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
}): Promise<{ access: string; refresh: string }> => {
    const response = await axios.post<{ access: string; refresh: string }>(`${API_BASE_URL}/auth/register/`, userData);
    return response.data;
};

export const loginUser = async (credentials: { identifier: string; password: string }) => {
    try {
      const response = await axios.post<{ token: string; user: User }>(`${API_BASE_URL}/auth/login/`, credentials);
      
      console.log('Login response:', response.data); 
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
  
        setAuthToken(response.data.token);
        return response.data // Make sure to return the response data
      } else {
        console.error('No token found in response');
      }
    } catch (error) {
      console.error('Error during login:', error); 
    }
  }; 
  

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const response = await axios.get(`${API_BASE_URL}current-user/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

  export const logoutUser = async (): Promise<void> => {
    setAuthToken(null); 
    localStorage.removeItem('token');
};


export const fetchUserDetails = async (userId: number): Promise<CurrentUserDetails> => {
    try {
        const [userResponse, cartResponse, cartItemsResponse, wishlistResponse, ordersResponse, ordersItemsResponse, addressesResponse, loyaltyPointsResponse] = await Promise.all([
            axios.get<Cart>(`${API_BASE_URL}/users/${userId}/`).catch(error => {
                console.error("Error fetching cart:", error);
                throw error;
            }),          
            axios.get<Cart>(`${API_BASE_URL}/carts/?user=${userId}`).catch(error => {
                console.error("Error fetching cart:", error);
                throw error;
            }),
            axios.get<Cart>(`${API_BASE_URL}/cart-items/?user=${userId}`).catch(error => {
                console.error("Error fetching cart:", error);
                throw error;
            }),
            axios.get<Wishlist>(`${API_BASE_URL}/wishlists/?user=${userId}`).catch(error => {
                console.error("Error fetching wishlist:", error);
                throw error;
            }),
            axios.get<Order[]>(`${API_BASE_URL}/orders/?user=${userId}`).catch(error => {
                console.error("Error fetching orders:", error);
                throw error;
            }),
            axios.get<Order[]>(`${API_BASE_URL}/order-items/?user=${userId}`).catch(error => {
                console.error("Error fetching orders:", error);
                throw error;
            }),
            axios.get<ShippingAddress[]>(`${API_BASE_URL}/shipping-addresses/?user=${userId}`).catch(error => {
                console.error("Error fetching addresses:", error);
                throw error;
            }),
            axios.get<LoyaltyPoint>(`${API_BASE_URL}/loyalty-points/?user=${userId}`).catch(error => {
                console.error("Error fetching loyalty points:", error);
                throw error;
            }),
        ]);
        return {
            user: userResponse.data,
            cart: cartResponse.data,
            cartItems: cartItemsResponse.data, // Assuming the response contains the cart items directly
            wishlist: wishlistResponse.data, // Assuming the response contains the wishlist directly
            orders: ordersResponse.data,
            orderItems: ordersItemsResponse.data, // Assuming the response contains an array of orders
            addresses: addressesResponse.data, // Assuming the response contains an array of addresses
            loyaltyPoints: loyaltyPointsResponse.data || undefined, // Optional, set to undefined if not available
        };
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error; // Rethrow if necessary for further handling
    }
};

// Add Item to Cart
export const addItemToCart = async (cartId: number, productId: number, size: string, quantity: number): Promise<OrderItem> => {
    const response = await axios.post<OrderItem>(`${API_BASE_URL}/cart-items/`, {
        cart: cartId,
        product: productId,
        size,
        quantity
    });
    return response.data;
};


export const fetchCurrentUser = async (): Promise<UserData | null> => {
    try {
        // Get user token from local storage
        const userToken = localStorage.getItem("token")?.trim();
        console.log('Fetched token from local storage:', userToken); // Log token

        if (!userToken) {
            console.warn('No user token found in local storage.');
            return null; // No token means no logged-in user
        }

        // Make the API call to fetch current user details
        const response = await axios.get(`${API_BASE_URL}/current-user/`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        console.log(response.data)
        return response.data; // Return the user data if successful
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null; // Return null if there was an error
    }
};




// 1. Categories
export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(`${API_BASE_URL}/categories/`);
    return response.data;
};

// 2. Products
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products/`);
    return response.data;
};

// 2. Fetch a Product by ID
export const fetchProductById = async (productId: number): Promise<Product> => {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${productId}/`);
    return response.data;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axios.post<Product>(`${API_BASE_URL}/products/`, product);
    return response.data;
};

export const updateProduct = async (productId: number, product: Partial<Omit<Product, 'id'>>): Promise<Product> => {
    const response = await axios.put<Product>(`${API_BASE_URL}/products/${productId}/`, product);
    return response.data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/products/${productId}/`);
};

// 3. Product Images
export const fetchProductImages = async (): Promise<ProductImage[]> => {
    const response = await axios.get<ProductImage[]>(`${API_BASE_URL}/product-images/`);
    return response.data;
};

export const createProductImage = async (image: Omit<ProductImage, 'id'>): Promise<ProductImage> => {
    const response = await axios.post<ProductImage>(`${API_BASE_URL}/product-images/`, image);
    return response.data;
};

// 3. Product sizes
export const fetchProductSizes = async (): Promise<ProductSize[]> => {
    const response = await axios.get<ProductSize[]>(`${API_BASE_URL}/product-sizes/`);
    return response.data;
};

export const createProductsizes = async (image: Omit<ProductSize, 'id'>): Promise<ProductSize> => {
    const response = await axios.post<ProductSize>(`${API_BASE_URL}/product-sizes/`, image);
    return response.data;
};

// 4. Users
export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users/`);
    return response.data;
};

export const fetchOrders = async (userId: number): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders/?user=${userId}`); // Make sure the query param is supported by your backend
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json(); // Ensure this matches your API response structure
};

// 6. Order Items
export const fetchOrderItems = async (): Promise<OrderItem[]> => {
    const response = await axios.get<OrderItem[]>(`${API_BASE_URL}/order-items/`);
    return response.data;
};

// 7. Carts
export const fetchCarts = async (): Promise<Cart[]> => {
    const response = await axios.get<Cart[]>(`${API_BASE_URL}/carts/`);
    return response.data;
};

// 8. Wishlist
export const fetchWishlists = async (): Promise<Wishlist[]> => {
    const response = await axios.get<Wishlist[]>(`${API_BASE_URL}/wishlists/`);
    return response.data;
};

// 9. Reviews
export const fetchReviews = async (): Promise<Review[]> => {
    const response = await axios.get<Review[]>(`${API_BASE_URL}/reviews/`);
    return response.data;
};

// 10. Shipping Addresses
export const fetchShippingAddresses = async (): Promise<ShippingAddress[]> => {
    const response = await axios.get<ShippingAddress[]>(`${API_BASE_URL}/shipping-addresses/`);
    return response.data;
};

export const createShippingAddresses = async (
    shippingData: Omit<ShippingAddress, 'id'>
): Promise<ShippingAddress> => {
    const response = await axios.post<ShippingAddress>(`${API_BASE_URL}/shipping-addresses/`, shippingData);
    return response.data;
};

// 11. Media
export const fetchMedia = async (): Promise<Media[]> => {
    const response = await axios.get<Media[]>(`${API_BASE_URL}/media/`);
    return response.data;
};

// 12. Newsletter Subscriptions
export const fetchNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
    const response = await axios.get<NewsletterSubscription[]>(`${API_BASE_URL}/newsletter-subscriptions/`);
    return response.data;
};

// 13. Discounts
export const fetchDiscounts = async (): Promise<Discount[]> => {
    const response = await axios.get<Discount[]>(`${API_BASE_URL}/discounts/`);
    return response.data;
};

// 14. Loyalty Points
export const fetchLoyaltyPoints = async (): Promise<LoyaltyPoint[]> => {
    const response = await axios.get<LoyaltyPoint[]>(`${API_BASE_URL}/loyalty-points/`);
    return response.data;
};

// 15. Referrals
export const fetchReferrals = async (): Promise<Referral[]> => {
    const response = await axios.get<Referral[]>(`${API_BASE_URL}/referrals/`);
    return response.data;
};

// 16. Distribution Partnerships
export const fetchDistributionPartnerships = async (): Promise<DistributionPartnership[]> => {
    const response = await axios.get<DistributionPartnership[]>(`${API_BASE_URL}/distribution-partnerships/`);
    return response.data;
};

// 17. Influencers
export const fetchInfluencers = async (): Promise<Influencer[]> => {
    const response = await axios.get<Influencer[]>(`${API_BASE_URL}/influencers/`);
    return response.data;
};

// 18. Support Tickets
export const fetchSupportTickets = async (): Promise<SupportTicket[]> => {
    const response = await axios.get<SupportTicket[]>(`${API_BASE_URL}/support-tickets/`);
    return response.data;
};
