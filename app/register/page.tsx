"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);
  const { registerMutate, isRegistering, user } = useAuth();

  const router = useRouter();
  if (user) {
    router.push("/");
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutate({ name, email, password, isAcceptedTerms }); // Auto login new user
  };

  return (
    <AuthLayout
      title="Join the Squad"
      subtitle="Gabung komunitas paling random tapi positif di internet."
    >
      <form onSubmit={handleRegister} className="space-y-5">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">Nama Panggilan</label>
          <div className="relative group">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              size={20}
            />
            <input
              type="text"
              required
              placeholder="Siapa nama keren lo?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-12 py-4 font-bold focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">Email</label>
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              size={20}
            />
            <input
              type="email"
              required
              placeholder="email@paling.valid"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-12 py-4 font-bold focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">Password</label>
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              size={20}
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter ya"
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-12 py-4 font-bold focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3 ml-1">
          <input
            type="checkbox"
            checked={isAcceptedTerms}
            onChange={(e) => setIsAcceptedTerms(e.target.checked)}
            id="terms"
            required
            className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="terms" className="text-sm text-gray-500 font-medium">
            Gue setuju sama{" "}
            <Link href="/terms" className="text-black underline font-bold">
              Rules & Terms
            </Link>{" "}
            yang berlaku. (Janji gak toxic).
          </label>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isRegistering}
          className="w-full bg-gen-yellow text-black border-2 border-black py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_black] hover:shadow-none translate-y-0 hover:translate-y-1"
        >
          {isRegistering ? "Sabar..." : "Daftar Sekarang"}
          {!isRegistering && <Sparkles size={20} className="fill-black" />}
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-500 font-medium">
            Udah punya akun?{" "}
            <Link
              href="/login"
              className="text-black font-bold underline hover:text-purple-600"
            >
              Login aja
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
