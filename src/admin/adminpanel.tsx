import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'products' | 'orders' | 'users'>('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin is authenticated
    const adminToken = localStorage.getItem('adminToken'); // Example for token-based auth
    if (!adminToken) {
      navigate('/admin-login'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // Admin is authenticated
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <Orders />;
      case 'users':
        return <Users />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication is checked
  }

  return (
    <div className="pt-12 px-8 h-screen bg-black text-white">
      <div className="flex h-full lg:pt-20">
        {/* Sidebar */}
        <div className="w-1/5 bg-white text-black p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <ul className="mt-6 space-y-4">
            <li
              className={`cursor-pointer ${activeSection === 'products' ? 'text-black font-bold' : 'text-gray-500'}`}
              onClick={() => setActiveSection('products')}
            >
              Products
            </li>
            <li
              className={`cursor-pointer ${activeSection === 'orders' ? 'text-black font-bold' : 'text-gray-500'}`}
              onClick={() => setActiveSection('orders')}
            >
              Orders
            </li>
            <li
              className={`cursor-pointer ${activeSection === 'users' ? 'text-black font-bold' : 'text-gray-500'}`}
              onClick={() => setActiveSection('users')}
            >
              Users
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-4/5 p-10 bg-black">
          <div className="mb-6 text-3xl font-semibold">Admin Dashboard</div>
          <div className="bg-[#7A7A7A] p-6 rounded-md">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

// Product Management Component
const ProductManagement: React.FC = () => (
  <div className="text-black">
    <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
    <form className="space-y-4">
      <div>
        <label className="block">Product Name</label>
        <input type="text" className="w-full p-2 bg-white text-black rounded-md" placeholder="Product Name" />
      </div>
      <div>
        <label className="block">Price</label>
        <input type="number" className="w-full p-2 bg-white text-black rounded-md" placeholder="Price" />
      </div>
      <div>
        <label className="block">Description</label>
        <textarea className="w-full p-2 bg-white text-black rounded-md" placeholder="Product Description"></textarea>
      </div>
      <button className="bg-black text-white px-4 py-2 mt-2 rounded-md">Add Product</button>
    </form>
  </div>
);

// Orders Component
const Orders: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: 'T-shirt', quantity: 2, status: 'Pending' },
    { id: 2, product: 'Shoes', quantity: 1, status: 'Shipped' },
    { id: 3, product: 'Hat', quantity: 3, status: 'Delivered' },
  ]);

  const updateStatus = (id: number, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const removeOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Manage Orders</h3>
      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <table className="min-w-full text-left rounded-md text-black bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="p-1 bg-gray-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    onClick={() => removeOrder(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Users Component
const Users: React.FC = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
    <p>No users to display.</p>
  </div>
);

export default AdminPanel;
