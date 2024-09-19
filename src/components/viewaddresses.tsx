import React, { useState, useEffect } from "react";

// Define types for address management
interface AccountDetails {
  addresses: string[];
}

// Mock API to simulate fetching account details (addresses)
const fetchAccountDetails = async (): Promise<AccountDetails> => {
  return {
    addresses: ["123 Street Name, City, India", "456 Avenue, Town, India"],
  };
};

const ViewAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<string>("");

  // Fetch existing addresses on component mount
  useEffect(() => {
    const fetchData = async () => {
      const accountData = await fetchAccountDetails();
      setAddresses(accountData.addresses);
    };

    fetchData();
  }, []);

  // Handle adding a new address
  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, newAddress]);
      setNewAddress(""); // Reset the input field after adding
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  // Handle editing an address
  const handleEditAddress = (index: number, updatedAddress: string) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = updatedAddress;
    setAddresses(updatedAddresses);
  };

  return (
    <div className="min-h-screen lg:pt-24 px-8 bg-white text-black font-montserrat">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Manage Addresses</h1>

        {/* Add New Address */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Address</h2>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="border px-4 py-2 w-full"
            placeholder="Enter new address"
          />
          <button
            className="mt-4 px-4 py-2 border border-black rounded-full hover:bg-gray-200"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>

        {/* List of Addresses */}
        <h2 className="text-2xl font-semibold mb-4">Your Addresses</h2>
        {addresses.length > 0 ? (
          <ul>
            {addresses.map((address, index) => (
              <li key={index} className="mb-4">
                <input
                  type="text"
                  value={address}
                  onChange={(e) =>
                    handleEditAddress(index, e.target.value)
                  }
                  className="border px-4 py-2 w-full"
                />
                <button
                  className="mt-2 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-100"
                  onClick={() => handleDeleteAddress(index)}
                >
                  Delete Address
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You don't have any saved addresses.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAddresses;
