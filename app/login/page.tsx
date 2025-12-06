"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Github, Info, Copy } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { useAuth } from '@/Context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      login(email); // Call global login
      setLoading(false);
      router.push('/');
    }, 1000);
  };

  const fillDummy = () => {
    setEmail('admin@portorin.com');
  };

  return (
    <AuthLayout 
      title="Welcome Back!" 
      subtitle="Kangen ya? Masuk dulu sini biar bisa akses fitur rahasia."
    >
      {/* Dummy Account Box */}
      <div 
        onClick={fillDummy}
        className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-yellow-100 transition-colors group"
      >
        <Info className="text-yellow-600 shrink-0 mt-0.5" size={18} />
        <div className="grow">
          <p className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1">Akun Dummy (Klik buat Auto-fill)</p>
          <p className="text-sm text-yellow-900">Email: <span className="font-mono font-bold">admin@portorin.com</span></p>
          <p className="text-sm text-yellow-900">Pass: <span className="font-mono font-bold">bebas aja</span></p>
        </div>
        <Copy size={16} className="text-yellow-400 group-hover:text-yellow-600" />
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Email / Username</label>
            <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                <input 
                    type="email" 
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-12 py-4 font-bold focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
                />
            </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-purple-600 hover:underline">
                    Lupa password?
                </Link>
            </div>
            <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                <input 
                    type="password" 
                    required
                    placeholder="Rahasia negara..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-12 py-4 font-bold focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
                />
            </div>
        </div>

        {/* Action Buttons */}
        <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none translate-y-0 hover:translate-y-1"
        >
            {loading ? 'Lagi loading...' : 'Gas Masuk'} 
            {!loading && <ArrowRight size={20} />}
        </button>

        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-100 rounded-2xl font-bold hover:bg-gray-50 hover:border-black transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-100 rounded-2xl font-bold hover:bg-gray-50 hover:border-black transition-all">
                <Github size={20} />
                GitHub
            </button>
        </div>

        <div className="text-center">
            <p className="text-gray-500 font-medium">
                Belum punya akun? <Link href="/register" className="text-black font-bold underline hover:text-purple-600">Bikin dulu sini</Link>
            </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;