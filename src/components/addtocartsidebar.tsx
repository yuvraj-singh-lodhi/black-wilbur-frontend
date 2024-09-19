import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import tshirt from "../assets/blackT.png"; // Replace with your product image path

interface AddToCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartSidebar: React.FC<AddToCartSidebarProps> = ({ isOpen, onClose }) => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Black Tshirt ', size: 'XS', price: 12000, quantity: 1, image: tshirt },
    { id: 2, name: 'Black Oversized', size: 'M', price: 6000, quantity: 2, image: tshirt },
  ]);

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">Size: {item.size}</p>
                  <p className="text-sm">
                    {item.quantity} x ₹{item.price}
                  </p>
                  <div className="flex mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>

          {/* Checkout Button */}
          <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToCartSidebar;
