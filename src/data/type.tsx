// types.ts
export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    sizes: string[];
    rating: number;
  }
  
  export interface ProductImage {
    productId: number;
    url: string;
  }
  