import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types'; // Adjust the path based on your project structure

interface SingleProductContextType {
  singleProduct: Product | null;
  setSingleProduct: (product: Product | null) => void;
}

const SingleProductContext = createContext<SingleProductContextType | undefined>(undefined);

export const SingleProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);

  return (
    <SingleProductContext.Provider value={{ singleProduct, setSingleProduct }}>
      {children}
    </SingleProductContext.Provider>
  );
};

export const useSingleProduct = () => {
  const context = useContext(SingleProductContext);
  if (!context) {
    throw new Error('useSingleProduct must be used within a SingleProductProvider');
  }
  return context;
};
