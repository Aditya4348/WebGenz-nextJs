 "use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Asumsikan Anda memiliki tipe User di sini atau diimpor dari file lain
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  quote: string;
  xp: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check localStorage on mount to persist login
  useEffect(() => {
    const storedUser = localStorage.getItem('portorin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    const mockUser: User = {
      id: 'user_123',
      name: email === 'admin@portorin.com' ? 'Mimin Kece' : 'Portorin Squad',
      email: email,
      avatar: email === 'admin@portorin.com' 
        ? 'https://picsum.photos/seed/admin/200/200' 
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: email === 'admin@portorin.com' ? 'admin' : 'user',
      quote: "Hidup itu random, yang penting outfit cakep.",
      xp: 0,
      badges: [],
    };

    setUser(mockUser);
    localStorage.setItem('portorin_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portorin_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('portorin_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

