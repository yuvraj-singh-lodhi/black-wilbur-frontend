import React from "react";
import { useProducts } from "../contexts/ProductContext"; 

interface SizeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (size: string) => void; 
  onConfirmBuyNow: (size: string) => void; 
  productName: string;
  productId: number; 
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onConfirmBuyNow, 
  productName,
  productId,
}) => {
  const { products } = useProducts();
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  const product = products.find((product) => product.id === productId);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(selectedSize); 
      onClose(); 
    }
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      onConfirmBuyNow(selectedSize);
      onClose(); 
    }
  };

  if (!isOpen || !product) return null; 

  // Create a size options array from the product's available sizes
  const sizeOptions = product.sizes.map(sizeObj => sizeObj.size); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Select Size for {productName}</h2>
        
        <select
          className="bg-gray-100 text-black rounded p-2 mb-4 border border-black"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
            onClick={handleBuyNow} 
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal;
