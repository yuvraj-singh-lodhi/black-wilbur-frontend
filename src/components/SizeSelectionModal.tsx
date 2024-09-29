// src/components/SizeSelectionModal.tsx
import React from "react";

interface SizeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (size: string) => void;
  productName: string;
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  productName,
}) => {
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(selectedSize);
      onClose(); // Close the modal after adding to cart
    }
  };

  if (!isOpen) return null; // Do not render anything if the modal is not open

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
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
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
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal;
