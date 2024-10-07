import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrentUserDetails as UserType } from "../types"; // Import Wishlist, CartItem, Order, etc.
import { fetchCurrentUser, fetchUserDetails } from "../services/api"; // Import your API functions

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>; // Include setUser for updates
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await fetchCurrentUser();
      console.log(currentUser);
      if (currentUser) {
        const currentUserDetail = await fetchUserDetails(currentUser.id);
        console.log("fetchUserDetails",currentUserDetail)
        setUser(currentUserDetail); // Set detailed user info in context
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
