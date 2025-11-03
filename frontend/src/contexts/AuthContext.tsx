import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "../components/ProfileMenu";

interface User {
  email: string;
  name: string;
  npm: string;
  faculty: string;
  avatar: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Determine role based on email
    const isOfficer = email.toLowerCase().includes("officer") || 
                      email.toLowerCase().includes("petugas") ||
                      email.toLowerCase().includes("security");
    
    const role: UserRole = isOfficer ? "officer" : "general";
    
    // Create user object
    const newUser: User = {
      email,
      name: isOfficer ? "Pak Joko (Security)" : "Ahmad Rizki",
      npm: isOfficer ? "Staff Security" : "2106123456",
      faculty: isOfficer ? "Keamanan UI" : "Fakultas Teknik",
      avatar: isOfficer 
        ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateRole = (role: UserRole) => {
    if (user) {
      setUser({
        ...user,
        role,
        name: role === "officer" ? "Pak Joko (Security)" : "Ahmad Rizki",
        npm: role === "officer" ? "Staff Security" : "2106123456",
        faculty: role === "officer" ? "Keamanan UI" : "Fakultas Teknik",
        avatar: role === "officer" 
          ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      updateRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
