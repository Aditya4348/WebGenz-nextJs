"use client";

import { getUser, loginUser, registerUser } from "@/service/auth";
import { credentials, regisCredentials } from "@/types/types";
import {
  QueryClient,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

// Asumsikan Anda memiliki tipe User di sini atau diimpor dari file lain
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
  quote: string;
  xp: number;
  badges: string[];
}

const queryclient = new QueryClient();

interface AuthContextType {
  // user: User | null;
  user: User | null;
  loginMutate: UseMutateFunction<void, Error, credentials, unknown>;
  registerMutate: UseMutateFunction<void, Error, regisCredentials, unknown>;
  logoutMutate: UseMutateFunction<void, Error, void, unknown>;
  // updateUser: (data: Partial<User>) => void;

  // Logic Untuk Loading
  isLoggingOut: boolean;
  isLoading: boolean;
  isRegistering: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  // const [user, setUser] = useState<User | null>(null);

  // Check localStorage on mount to persist login
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 1, // Only retry once on failure
    refetchOnWindowFocus: "always",
  });

  const { mutate: loginMutate, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryclient.setQueryData(["user"], data.user);
      toast.success("Login berhasil!");
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan pada server";

      toast.error(errorMessage);
      router.push("/login");
    },
  });

  const { mutate: registerMutate, isPending: isRegistering } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Register berhasil!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan pada server";

      toast.error(errorMessage);
    },
  });

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

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/logout", {
        method: "POST",
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Logout berhasil!");
      window.location.reload();
    },
    onError: (error: any) => {
      toast.error(
        "Logout gagal!",
        error.response?.data?.message || "Terjadi kesalahan pada server",
      );
    },
  });

  // const updateUser = (data: Partial<User>) => {
  //   if (user) {
  //     const updatedUser = { ...user, ...data };
  //     localStorage.setItem('VibeHub_user', JSON.stringify(updatedUser));
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        loginMutate,
        registerMutate,
        logoutMutate,
        isRegistering,
        isLoggingIn,
        isLoggingOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
