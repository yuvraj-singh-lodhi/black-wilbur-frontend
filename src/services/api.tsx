// api.tsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});
// Define interfaces for the data types used in the API responses
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface Category {
  name: string;
}

interface Cart {
  id: number;
  userId: number;
  products: Array<{ productId: number; quantity: number }>;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};

// Fetch product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}`, error);
    throw error;
  }
};

// Fetch product categories
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories', error);
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}`, error);
    throw error;
  }
};

// Fetch cart by user ID
export const fetchCartByUserId = async (userId: number): Promise<Cart[]> => {
  try {
    const response = await api.get<Cart[]>(`/carts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart for user ID ${userId}`, error);
    throw error;
  }
};

// Fetch limited products
export const fetchLimitedProducts = async (limit: number): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching limited products', error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response = await api.post<Product>('/products', newProduct);
    return response.data;
  } catch (error) {
    console.error('Error adding product', error);
    throw error;
  }
};

// Update product using PUT
export const updateProduct = async (id: number, updatedProduct: Product): Promise<Product> => {
  try {
    const response = await api.put<Product>(`/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}`, error);
    throw error;
  }
};

// Partially update product using PATCH
export const patchProduct = async (id: number, partialUpdate: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.patch<Product>(`/products/${id}`, partialUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error patching product with ID ${id}`, error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
    console.log(`Product with ID ${id} deleted`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}`, error);
    throw error;
  }
};
