import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'donor' | 'hospital';
  bloodGroup?: string;
  verified: boolean;
  avatar?: string;
  location?: string;
  lastDonation?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'donor' | 'hospital') => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, type: 'donor' | 'hospital') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: type === 'donor' ? 'John Doe' : 'City Hospital',
      email,
      type,
      bloodGroup: type === 'donor' ? 'O+' : undefined,
      verified: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      location: 'New York, NY',
      lastDonation: type === 'donor' ? '2024-01-15' : undefined,
    };
    
    setUser(mockUser);
  };

  const register = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      verified: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};