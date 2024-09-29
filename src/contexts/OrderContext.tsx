import React, { createContext, useState, ReactNode } from "react";
import { Order as OrderType, CartItem } from "../types"; // Adjust the import path based on your structure

// Define the context properties
interface OrderContextProps {
  orders: OrderType[]; // Use the Order type from types.tsx
  placeOrder: (cartItems: CartItem[], totalAmount: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

// Create the OrderContext
export const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// OrderProvider component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderType[]>([]); // Use the Order type from types.tsx

  const placeOrder = async (cartItems: CartItem[], totalAmount: number) => {
    try {
      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, totalAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      // Optionally, you might want to add the newly created order to state
      setOrders((prevOrders) => [...prevOrders, data]);
    } catch (error) {
      console.error("Error placing order:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.orders); // Assuming the response has an array of orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
