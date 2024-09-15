import React from 'react';
import tshirt from "../assets/blackT.png"; // Replace with your product image path

interface AddToCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartSidebar: React.FC<AddToCartSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="absolute right-0 w-80 bg-white h-full shadow-lg flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Example Cart Item */}
          <div className="flex items-center mb-4">
            <img src={tshirt} alt="Product" className="w-16 h-16 object-cover rounded-md" />
            <div className="ml-4">
              <p className="font-bold">Blvck x UNO Hoodie</p>
              <p className="text-sm">Size: XS</p>
              <p className="text-sm">1 x ₹12,000.00</p>
            </div>
          </div>

          {/* Add more items here if needed */}
        </div>

        {/* Cart Summary */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹12,000.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹12,000.00</span>
          </div>

          {/* Checkout Button */}
          <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSidebar;
