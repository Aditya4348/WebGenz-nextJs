
"use client";

import React, { useState, useEffect, useRef, forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, Zap, ChevronDown, Smile, Palette, Clock, HelpCircle, Lightbulb, CheckCircle, LogIn, User, LogOut, StickyNote } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isMobileAppsOpen, setIsMobileAppsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  // Hide Navbar on Auth pages for cleaner look
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsMobileAppsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  if (isAuthPage) return null;

  const miniApps = [
    { id: 'mood', label: 'Mood Checker', icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'inspiration', label: 'Inspiration Gen', icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 'palette', label: 'Color Palette', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-100' },
    { id: 'timer', label: 'Study Timer', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'quiz', label: 'Personality Quiz', icon: HelpCircle, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'decision', label: 'Should I Do It?', icon: CheckCircle, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  const mainLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/menfess', label: 'Menfess' },
    { path: '/creator', label: 'Creator' },
    { path: '/contributor', label: 'Join Squad' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${scrolled ? 'pt-4' : 'pt-6'}`}>
      <div className={`
        relative mx-4 flex items-center justify-between px-2 pl-6 py-2 rounded-full transition-all duration-500
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg w-full max-w-5xl' 
          : 'bg-white/40 backdrop-blur-md border border-white/40 w-full max-w-6xl'}
      `}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group mr-4 md:mr-8">
          <div className="bg-black text-white p-2 rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300">
            <Zap size={18} className="fill-current" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors">Portorin.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center bg-gray-100/50 p-1.5 rounded-full border border-white/50 ml-auto md:ml-0">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                isActive(link.path)
                  ? 'bg-white text-black shadow-md shadow-gray-200'
                  : 'text-gray-500 hover:text-black hover:bg-white/50'
              }`}
            >
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}

          {/* Mini Apps Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAppsOpen(true)}
            onMouseLeave={() => setIsAppsOpen(false)}
          >
            <button
              // href="/miniapps"
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1 ${
                isActive('/miniapps')
                  ? 'bg-white text-black shadow-md shadow-gray-200'
                  : 'text-gray-500 hover:text-black hover:bg-white/50'
              }`}
            >
              Apps <ChevronDown size={14} className={`transition-transform ${isAppsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full right-0 pt-4 w-64 transition-all duration-200 ${isAppsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                <div className="bg-white rounded-3xl p-2 shadow-xl border border-gray-100 overflow-hidden">
                    {miniApps.map((app) => (
                        <Link 
                            key={app.id} 
                            href={`/miniapps?app=${app.id}`}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                        >
                            <div className={`p-2 rounded-full ${app.bg} ${app.color} group-hover:scale-110 transition-transform`}>
                                <app.icon size={16} />
                            </div>
                            <span className="font-bold text-sm text-gray-700 group-hover:text-black">{app.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Auth Section (Desktop) */}
        <div className="hidden md:block ml-4">
          {!user ? (
            <Link href="/login" className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
              Login <LogIn size={16} />
            </Link>
          ) : (
            <ProfileDropdown user={user} logout={logout} ref={profileRef} />
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-3 rounded-full hover:bg-gray-100 transition-colors ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-4xl p-4 md:hidden flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300 max-h-[80vh] overflow-y-auto">
            {/* Mobile Auth Header */}
            {user && (
                 <Link href="/profile" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-2 active:bg-gray-100">
                     <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full bg-gray-200" />
                     <div className="overflow-hidden">
                         <p className="font-bold truncate">{user.name}</p>
                         <p className="text-xs text-gray-500 truncate">Tap to see ID Card</p>
                     </div>
                 </Link>
            )}

            {mainLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`p-4 rounded-2xl text-center font-bold text-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-gen-mint text-black border-2 border-transparent'
                    : 'bg-gray-50 text-gray-500 border-2 border-transparent hover:border-black/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Mini Apps Accordion */}
            <div className="rounded-2xl bg-gray-50 border-2 border-transparent overflow-hidden">
                <button 
                    onClick={() => setIsMobileAppsOpen(!isMobileAppsOpen)}
                    className="w-full p-4 flex items-center justify-center gap-2 font-bold text-lg text-gray-500"
                >
                    Mini Apps <ChevronDown size={20} className={`transition-transform ${isMobileAppsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileAppsOpen && (
                    <div className="grid grid-cols-2 gap-2 p-2 pt-0">
                        {miniApps.map((app) => (
                             <Link 
                                key={app.id} 
                                href={`/miniapps?app=${app.id}`}
                                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 active:scale-95 transition-transform"
                             >
                                <div className={`p-2 rounded-full ${app.bg} ${app.color}`}>
                                    <app.icon size={18} />
                                </div>
                                <span className="text-xs font-bold text-center leading-tight">{app.label}</span>
                             </Link>
                        ))}
                    </div>
                )}
            </div>

            <Link href="/contact" className="p-4 rounded-2xl text-center font-bold text-lg bg-gray-50 text-gray-500 border-2 border-transparent hover:border-black/10 mt-2">
                Contact
            </Link>

            {!user ? (
                <Link href="/login" className="p-4 rounded-2xl text-center font-bold text-lg bg-black text-white mt-2 flex items-center justify-center gap-2">
                Login / Daftar <LogIn size={18} />
                </Link>
            ) : (
                <button onClick={logout} className="p-4 rounded-2xl text-center font-bold text-lg bg-red-50 text-red-500 mt-2 flex items-center justify-center gap-2">
                    Logout <LogOut size={18} />
                </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const ProfileDropdown = forwardRef<HTMLDivElement, { user: any; logout: () => void }>(
  ({ user, logout }, ref) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentRef = ref as React.RefObject<HTMLDivElement>;
      if (currentRef.current && !currentRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-black transition-all shadow-sm"
      >
        <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full bg-gray-200" />
        <span className="font-bold text-sm max-w-[100px] truncate">{user.name}</span>
        <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
      </button>

      {isProfileOpen && (
        <div className="absolute top-full right-0 pt-3 w-60 animate-in fade-in slide-in-from-top-2">
          <div className="bg-white rounded-3xl p-2 shadow-xl border border-gray-100 overflow-hidden flex flex-col gap-1">
            <div className="p-4 border-b border-gray-50 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
              <p className="font-bold truncate text-sm">{user.email}</p>
            </div>
            <Link
              href="/profile"
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors text-left w-full font-bold text-sm"
            >
              <User size={16} /> Kartu Tanda Gen Z
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors text-left w-full font-bold text-sm text-red-400"
            >
              <LogOut size={16} /> Cabut Dulu (Logout)
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ProfileDropdown.displayName = "ProfileDropdown";

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname);
  
  if (isAuthPage) return null;

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute -bottom-10 left-0 w-full overflow-hidden opacity-5 pointer-events-none">
         <h1 className="text-[12rem] font-display font-bold whitespace-nowrap leading-none text-center">PORTORIN</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
             <div className="bg-black text-white p-1.5 rounded-lg rotate-3">
               <Zap size={14} className="fill-current" />
             </div>
             <h2 className="font-display font-bold text-2xl text-black">Portorin.</h2>
          </div>
          <p className="text-gray-500 font-medium max-w-xs">
            Digital playground buat Gen Z yang lagi cari validasi hidup, tutorial ngoding, atau sekedar meme kucing.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Socials</h4>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all hover:-translate-y-1">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all hover:-translate-y-1">TW</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:-translate-y-1">YT</a>
            </div>
        </div>

        <div className="text-gray-400 text-sm font-medium border-t md:border-t-0 border-gray-100 pt-8 md:pt-0 w-full md:w-auto">
          &copy; {new Date().getFullYear()} Portorin Media.<br/>
          Made with <Heart size={14} className="inline text-red-500 fill-red-500 mx-1 animate-pulse" /> by Alex Kai
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-black selection:text-gen-yellow">
      {/* Global Background Gradients (Disable on Auth Pages for cleaner look) */}
      {!isAuthPage && (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gen-purple/20 rounded-full blur-[100px] animate-blob"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-gen-mint/20 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
            <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-gen-blue/10 rounded-full blur-[90px] animate-blob animation-delay-4000"></div>
        </div>
      )}
      
      <Navbar />
      <main className={`grow w-full ${isAuthPage ? '' : 'mx-auto px-2 mt-32'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
