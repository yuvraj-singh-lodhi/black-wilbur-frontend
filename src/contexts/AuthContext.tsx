import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserData } from "../types";
import { fetchCurrentUser } from "../services/api";

// Define the context properties
interface AuthContextProps {
  userauth: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>; // For updating the user state
  isAuthenticated: boolean;
}

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to use AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userauth, setUser] = useState<UserData | null>(null);
   // Fetch current user on mount
   useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      console.log(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userauth, setUser, isAuthenticated: !!userauth }}>
      {children}
    </AuthContext.Provider>
  );
};
