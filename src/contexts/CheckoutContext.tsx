import React, { createContext, useState, ReactNode } from "react";
import { ShippingAddress } from "../types"; // Adjust the import path based on your structure

// Define PaymentMethod type
type PaymentMethod = 'Razorpay' | 'PhonePe' | 'CreditCard';

// Define the context properties
interface CheckoutContextProps {
  address: ShippingAddress | null; // Use the ShippingAddress interface
  paymentMethod: PaymentMethod; // Use the defined PaymentMethod type
  setAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  placeOrder: () => Promise<void>;
}

// Create the CheckoutContext
export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

// CheckoutProvider component
export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Razorpay');

  const placeOrder = async () => {
    if (!address) {
      throw new Error("Address is required to place an order");
    }

    // Order placement logic (customize as per your backend)
    try {
      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, paymentMethod }),
      });

      if (!response.ok) {
        throw new Error("Order placement failed");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
    } catch (error) {
      console.error("Error placing order:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  return (
    <CheckoutContext.Provider value={{ address, setAddress, paymentMethod, setPaymentMethod, placeOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
};
