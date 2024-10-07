import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { Product as ProductType, Category, ProductImage } from "../types"; // Adjust the import path based on your structure
import {
  fetchProducts as fetchProductsFromAPI,
  fetchCategories,
  fetchProductImages,
  fetchProductSizes,
} from "../services/api"; // Adjust the import path based on your structure

// Define the context properties
interface ProductContextProps {
  products: (ProductType & { images: ProductImage[]; sizes: { size: string; quality: string }[] })[]; // Changed to store sizes with quality
  filteredProducts: (ProductType & {
    images: ProductImage[];
    sizes: { size: string; quality: string }[];
  })[]; // Changed to store sizes with quality
  fetchProducts: (filters?: unknown) => Promise<void>;
  categories: Category[];
  selectedCategory: string;
  setCategory: (categoryName: string) => void;
  loading: boolean;
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  selectedPriceRange: number[] | null;
  setSelectedPriceRange: (range: number[] | null) => void;
  selectedAvailability: boolean | null;
  setSelectedAvailability: (availability: boolean | null) => void;
  getProductById: (id: number) => ProductType | undefined; // New method to get product by ID
}

// Create the ProductContext
export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

// ProductProvider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<(ProductType & { images: ProductImage[]; sizes: { size: string; quality: string }[] })[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<(ProductType & { images: ProductImage[]; sizes: { size: string; quality: string }[] })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Filter states
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[] | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);

  // Fetch products, categories, and images on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProductsFromAPI();
        const fetchedImages = await fetchProductImages();
        const fetchedSizes = await fetchProductSizes();

        const productsWithImagesAndSizes = fetchedProducts.map((product) => {
          const sizesWithQuality = fetchedSizes
            .filter((size) => size.product === product.id)
            .map((size) => ({
              size: size.size,
              quality: size.quantity,
            }));

          return {
            ...product,
            images: fetchedImages
              .filter((image) => image.product === product.id)
              .map((image) =>
                decodeURIComponent(image.image.replace(/http:\/\/127\.0\.0\.1:8000\//, ""))
              ),
            sizes: sizesWithQuality,
          };
        });

        setProducts(productsWithImagesAndSizes);
        setFilteredProducts(productsWithImagesAndSizes);
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

  // Method to get a product by its ID
  const getProductById = (id: number) => {
    return products.find((product) => product.id === id); // Find the product based on its ID
  };

  // Update filtered products based on selected category and filters
  const updateFilteredProducts = () => {
    let updatedProducts = products;

    // Filter by selected category
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter((product) => product.category.name === selectedCategory);
    }

    // Filter by selected size
    if (selectedSize) {
      updatedProducts = updatedProducts.filter((product) =>
        product.sizes.some((s) => s.size === selectedSize) // Check sizes
      );
    }

    // Filter by selected price range
    if (selectedPriceRange) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= selectedPriceRange[0] &&
          product.price <= selectedPriceRange[1]
      );
    }

    // Filter by availability
    if (selectedAvailability !== null) {
      updatedProducts = updatedProducts.filter(
        (product) => product.availability === selectedAvailability
      );
    }

    setFilteredProducts(updatedProducts);
  };

  // Set category and update filtered products
  const setCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    updateFilteredProducts();
  };

  // Use effect to update filtered products when any filter state changes
  useEffect(() => {
    updateFilteredProducts();
  }, [selectedSize, selectedPriceRange, selectedAvailability, selectedCategory, updateFilteredProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        fetchProducts: () => Promise.resolve(),
        categories,
        selectedCategory,
        setCategory,
        loading,
        selectedSize,
        setSelectedSize,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedAvailability,
        setSelectedAvailability,
        getProductById, // Provide getProductById method
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
