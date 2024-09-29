import { createContext, useState, ReactNode } from "react";

// Define the Notification interface
interface Notification {
  type: 'success' | 'error';
  message: string;
}

// Define the UIContext properties
interface UIContextProps {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void; // Allow null notification
  error: string | null;
  setError: (error: string | null) => void; // Allow null error
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Create the UIContext
export const UIContext = createContext<UIContextProps | undefined>(undefined);

// UIProvider component
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <UIContext.Provider
      value={{
        showModal,
        openModal: () => setShowModal(true),
        closeModal: () => setShowModal(false),
        loading,
        setLoading,
        notification,
        setNotification,
        error,
        setError,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
