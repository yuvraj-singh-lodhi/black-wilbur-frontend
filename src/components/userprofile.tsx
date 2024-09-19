import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define types for the data structures
interface Order {
  id: number;
  productName: string;
  price: number;
  status: string;
}

interface AccountDetails {
  customerName: string;
  country: string;
  addresses: string[];
}

// Mock API to simulate data fetching
const fetchOrders = async (): Promise<Order[]> => {
  return [
    { id: 1, productName: "Black T-shirt", price: 30, status: "Delivered" },
    { id: 2, productName: "White T-shirt", price: 25, status: "Processing" },
  ];
};

const fetchAccountDetails = async (): Promise<AccountDetails> => {
  return {
    customerName: "Customer 1",
    country: "India",
    addresses: ["123 Street Name, City, India"],
  };
};

const MyAccount: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  );
  const navigate = useNavigate();

  // Fetch data from mock API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await fetchOrders();
      const accountData = await fetchAccountDetails();
      setOrders(ordersData);
      setAccountDetails(accountData);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
    navigate("/login"); // Redirect user to login page after logout
  };

  return (
    <div className="min-h-screen lg:pt-24 px-8 bg-white text-black font-montserrat">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center border-b pb-6">
          <h1 className="text-4xl font-bold">My Account</h1>
          <button
            className="px-4 py-2 border border-black rounded-full hover:bg-gray-200"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Left side - Orders */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id} className="mb-4">
                    <div className="font-bold">{order.productName}</div>
                    <div>Price: ${order.price}</div>
                    <div>Status: {order.status}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't placed any orders yet.</p>
            )}
          </div>

          {/* Right side - Account Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            {accountDetails ? (
              <>
                <p>{accountDetails.customerName}</p>
                <p>{accountDetails.country}</p>
                <a
                  onClick={() => navigate("/ViewAddresses")} // Ensure routing is set up
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Addresses ({accountDetails.addresses.length})
                </a>
                <ul className="mt-2">
                  {accountDetails.addresses.map((address, index) => (
                    <li key={index} className="text-gray-700">
                      {address}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Loading account details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
