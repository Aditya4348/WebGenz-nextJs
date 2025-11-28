import React from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, Star, Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative z-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 font-bold group">
            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowLeft size={18} />
            </div>
            Back to Home
          </Link>

          <div className="max-w-md mx-auto w-full animate-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8">
                <h1 className="font-display font-black text-4xl md:text-5xl mb-3 leading-tight text-black">
                    {title}
                </h1>
                <p className="text-gray-500 text-lg font-medium">
                    {subtitle}
                </p>
            </div>
            
            {children}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Portorin Media. No cookies, just vibes.
        </div>
      </div>

      {/* Right Side - Visual Area (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center p-12">
        {/* Abstract Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gen-purple rounded-full blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gen-mint rounded-full blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        
        {/* Floating Content */}
        <div className="relative z-10 text-center text-white max-w-lg">
            <div className="mb-8 flex justify-center">
                 <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/20 shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-500">
                    <Zap size={80} className="text-gen-yellow fill-gen-yellow" />
                 </div>
            </div>
            
            <h2 className="font-display font-black text-6xl mb-6 leading-none tracking-tighter">
                JOIN THE <br/> 
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gen-blue via-gen-purple to-gen-pink">
                    CHAOS.
                </span>
            </h2>
            <p className="text-white/60 text-xl font-medium leading-relaxed">
                "Masuk ke portal dimensi lain dimana coding, curhat, dan meme bersatu padu."
            </p>

            {/* Floating Stickers */}
            <div className="absolute top-0 right-10 animate-float">
                <Star className="text-gen-yellow fill-gen-yellow" size={40} />
            </div>
            <div className="absolute bottom-20 left-0 animate-float-delayed">
                <Sparkles className="text-gen-pink" size={48} />
            </div>
        </div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-white opacity-[0.02] pointer-events-none mix-blend-overlay" 
             style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}>
        </div>
      </div>
    </div>
  );
};