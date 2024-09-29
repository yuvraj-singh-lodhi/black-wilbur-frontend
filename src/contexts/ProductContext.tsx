import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Product as ProductType, Category, ProductImage } from "../types"; // Adjust the import path based on your structure
import { fetchProducts as fetchProductsFromAPI, fetchCategories, fetchProductImages } from "../services/api"; // Adjust the import path based on your structure

// Define the context properties
interface ProductContextProps {
  products: (ProductType & { images: ProductImage[] })[]; // Updated to include images
  filteredProducts: (ProductType & { images: ProductImage[] })[]; // Updated to include images
  fetchProducts: (filters?: unknown) => Promise<void>;
  categories: Category[];
  selectedCategory: string;
  setCategory: (categoryName: string) => void; // Expecting category name as string
  loading: boolean;
}

// Create the ProductContext
export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// ProductProvider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<(ProductType & { images: ProductImage[] })[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<(ProductType & { images: ProductImage[] })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch products, categories, and images on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProductsFromAPI();
        const fetchedImages = await fetchProductImages(); // Fetch images
        const productsWithImages = fetchedProducts.map(product => ({
          ...product,
          images: fetchedImages.filter(image => image.product.id === product.id), // Associate images with products
        }));
        setProducts(productsWithImages);
        setFilteredProducts(productsWithImages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategoriesData();
  }, []);

  const setCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setFilteredProducts(
      categoryName 
        ? products.filter(product => product.category.name === categoryName) 
        : products
    );
  };

  return (
    <ProductContext.Provider value={{ products, filteredProducts, fetchProducts: () => Promise.resolve(), categories, selectedCategory, setCategory, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
