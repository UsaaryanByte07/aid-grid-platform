import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load persisted user on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aidgrid_user');
      if (saved) {
        const parsed: User = JSON.parse(saved);
        setUser(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = async (email: string, password: string, type: 'donor' | 'hospital') => {
    const response = await fetch('http://localhost:5500/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, type }),
    });
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    const data = await response.json();
    setUser(data.user);
    try {
      localStorage.setItem('aidgrid_user', JSON.stringify(data.user));
    } catch {
      // ignore
    }
    // Optionally: store token in localStorage for auth
    // localStorage.setItem('token', data.token);
  };

  const register = async (userData: any) => {
    const response = await fetch('http://localhost:5500/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    // Optionally, you can log the user in right after registration:
    const data = await response.json();
    // Fetch the user from backend if you want to setUser here, or redirect to login page
    // setUser({ ...userData, id: data.userId, verified: false });
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('aidgrid_user');
    } catch {
      // ignore
    }
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...updates } as User;
      try {
        localStorage.setItem('aidgrid_user', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    updateUser,
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