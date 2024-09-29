import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User } from "../types"; // Importing User interface from types.tsx

// Define the context properties
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode; // ReactNode is used to type the children prop
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulating backend login logic
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const loggedInUser: User = {
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token,
          username: ""
      };

      setUser(loggedInUser);
      localStorage.setItem("authToken", data.token);

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Simulating backend signup logic
  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      const newUser: User = {
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token,
          username: data.username
      };

      setUser(newUser);
      localStorage.setItem("authToken", data.token);

    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Logout logic
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  // Check if the user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch("/api/validate-token", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error("Token validation failed");
          }

          const data = await response.json();
          const loggedInUser: User = {
              id: data.id,
              name: data.name,
              email: data.email,
              token: token,
              username: ""
          };

          setUser(loggedInUser);
        } catch (error) {
          console.error("Token validation error:", error);
          logout();
        }
      };

      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
