import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product, CartItem } from "../types"; // Importing types

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void; // Updated to include size
  removeFromCart: (productId: number) => void; // Updated to number type
  updateQuantity: (productId: number, quantity: number) => void; // Updated to number type
  totalAmount: number;
  totalItems: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, size: string) => {
    const existingCartItem = cartItems.find(item => item.product.id === product.id && item.product.size === size);
    
    if (existingCartItem) {
      // Update quantity if product with the same size is already in the cart
      setCartItems(cartItems.map(item =>
        item.product.id === product.id && item.product.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Add new product to cart
      const newCartItem: CartItem = {
        id: Date.now(), // Temporary ID; replace with your logic
        cart: { id: 1, user: {
            id: 1, username: "user", email: "user@example.com",
            name: "",
            token: ""
        }, products: [] }, // Example cart
        product,
        quantity,
        size, // Include the selected size
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
