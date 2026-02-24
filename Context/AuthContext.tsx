 "use client";

import { loginUser, registerUser } from '@/service/auth';
import { credentials, regisCredentials } from '@/types/types';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

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
  loginMutate: UseMutateFunction<void, Error, credentials, unknown>;
  registerMutate: UseMutateFunction<void, Error, regisCredentials, unknown>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;

  // Logic Untuk Loading
  isRegistering: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check localStorage on mount to persist login

  const { mutate: loginMutate, isPending: isLoggingIn} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('Login berhasil!',)
    },
    onError: (error: any) => {
    const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server";
    
    toast.error(errorMessage);
    }
  })

  const { mutate: registerMutate, isPending: isRegistering } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success('Register berhasil!',)
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server";
    
    toast.error(errorMessage);
    }
  })

  // const login = (email: string) => {
  //   const mockUser: User = {
  //     id: 'user_123',
  //     name: email === 'admin@VibeHub.com' ? 'Mimin Kece' : 'VibeHub Squad',
  //     email: email,
  //     avatar: email === 'admin@VibeHub.com' 
  //       ? 'https://picsum.photos/seed/admin/200/200' 
  //       : `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
  //     role: email === 'admin@VibeHub.com' ? 'admin' : 'user',
  //     quote: "Hidup itu random, yang penting outfit cakep.",
  //     xp: 0,
  //     badges: [],
  //   };

  //   setUser(mockUser);
  //   localStorage.setItem('VibeHub_user', JSON.stringify(mockUser));
  // };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('VibeHub_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('VibeHub_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginMutate, registerMutate, isRegistering, isLoggingIn, logout, updateUser, isAuthenticated: !!user }}>
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

