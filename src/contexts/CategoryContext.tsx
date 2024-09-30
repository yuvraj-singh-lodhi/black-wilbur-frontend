import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories } from '../services/api'; // Make sure this path is correct
import { Category } from '../types'; // Make sure this path is correct

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  setCategory: (categoryName: string) => void; // Setter for the selected category
}

// Create context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Track the selected category

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const setCategory = (categoryName: string) => {
    console.log(categoryName);
    setSelectedCategory(categoryName); // Set the selected category
  };

  return (
    <CategoryContext.Provider value={{ categories, loading, error, selectedCategory, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook for using the CategoryContext
export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

// Export the context itself for direct access if needed
export const CategoryContextInstance = CategoryContext; 
