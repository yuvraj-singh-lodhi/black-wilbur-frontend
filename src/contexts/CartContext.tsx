import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product, CartItem } from "../types"; // Importing types

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: number, size: string) => void; // Accept both productId and size
  updateQuantity: (productId: number, size: string, quantity: number) => void;
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
    // Find the selected size from the product's available sizes
    const selectedSize = product.sizes.find((s) => s.size === size);

    if (!selectedSize) {
      console.error(`Size ${size} is not available for this product.`);
      return;
    }

    // Check if requested quantity exceeds available stock for that size
    if (quantity > selectedSize.quantity) {
      console.error(`Requested quantity exceeds available stock for size ${size}.`);
      return;
    }

    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingCartItem) {
      // Update quantity if product with the same size is already in the cart
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new product to cart
      const newCartItem: CartItem = {
        id: Date.now(), // Temporary ID; replace with your logic
        cart: {
          id: 1,
          user: {
            id: 1,
            username: "user",
            email: "user@example.com",
            name: "",
            token: "",
          },
          products: [],
        }, // Example cart
        product,
        quantity,
        size, // Include the selected size
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  // Updated the signature of removeFromCart to accept both productId and size
  const removeFromCart = (productId: number, size: string) => {
    setCartItems(cartItems.filter((item) => !(item.product.id === productId && item.size === size)));
  };
  
  const updateQuantity = (productId: number, size: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: quantity <= 0 ? 1 : quantity } // Prevents quantity from going below 1
          : item
      )
    );
  };
  

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
