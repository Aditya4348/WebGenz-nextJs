'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';
import { QrCode, Sparkles, Fingerprint, Share2, Download, ShieldCheck, Edit2, Save, X } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editQuote, setEditQuote] = useState('');

  // Initialize state when user loads
  // And redirect if user is not logged in
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditQuote(user.quote || "Belum ada kata-kata mutiara.");
    } else {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // Return a loading state or null while redirecting
    return <div className="min-h-[80vh] flex items-center justify-center">Loading profile...</div>;
  }

  const handleSave = () => {
    updateUser({
        name: editName,
        quote: editQuote
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditQuote(user.quote || "");
    setIsEditing(false);
  };

  // Random Generate "Vibe" based on name length
  const vibes = ["Main Character Energy", "Lowkey Genius", "Professional Overthinker", "Certified Slay", "Chaos Coordinator"];
  const userVibe = vibes[user.name.length % vibes.length];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">IDENTITY CARD</h1>
        <p className="text-gray-500">Ini bukti valid kalo lo bagian dari circle ini.</p>
      </div>

      {/* Control Bar */}
      <div className="mb-6 flex gap-4">
          {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-black hover:text-white transition-colors"
              >
                  <Edit2 size={14} /> Edit Profile
              </button>
          ) : (
              <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition-colors"
                  >
                      <Save size={14} /> Simpan
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 rounded-full font-bold text-sm hover:bg-red-200 transition-colors"
                  >
                      <X size={14} /> Batal
                  </button>
              </div>
          )}
      </div>

      {/* THE ID CARD */}
      <div className="relative group perspective-1000">
        <div className={`w-[350px] md:w-[450px] bg-white rounded-[2rem] p-6 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transition-transform duration-500 ${!isEditing && 'hover:rotate-1 hover:scale-[1.02]'}`}>
          
          {/* Holographic/Gradient Background Overlay */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-linear-to-br from-gen-purple/40 via-gen-blue/40 to-transparent rounded-full blur-3xl z-0 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
          
          {/* Header Card */}
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-gen-yellow" />
               </div>
               <span className="font-display font-bold text-lg tracking-tight">PORTORIN<span className="text-purple-600">.ID</span></span>
            </div>
            <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-800">
               Official Member
            </div>
          </div>

          {/* Photo & Main Info */}
          <div className="flex gap-6 items-center mb-6 relative z-10">
             <div className="relative">
                <img 
                  src={user.avatar} 
                  alt="User" 
                  className="w-24 h-24 rounded-2xl border-4 border-black object-cover bg-gray-100" 
                />
                <div className="absolute -bottom-2 -right-2 bg-gen-mint border-2 border-black rounded-full p-1.5">
                   <ShieldCheck size={14} className="text-black" />
                </div>
             </div>
             <div className="grow">
                {isEditing ? (
                    <div className="mb-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Edit Nama</label>
                        <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-gray-50 border-b-2 border-black focus:outline-none font-display font-black text-xl px-1"
                        />
                    </div>
                ) : (
                    <h2 className="font-display font-black text-2xl leading-none mb-1">{user.name}</h2>
                )}
                
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{user.role}</p>
                <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold border border-purple-200">
                   {userVibe} ✨
                </div>
             </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-6 relative z-10 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
             <div>
                <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">Email Address</p>
                <p className="font-bold truncate">{user.email}</p>
             </div>
             <div>
                <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">Joined Date</p>
                <p className="font-bold">Oct 2023</p>
             </div>
             <div>
                <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">ID Number</p>
                <p className="font-mono font-bold">{user.id.toUpperCase()}</p>
             </div>
             <div>
                <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">Status</p>
                <p className="font-bold text-green-600 flex items-center gap-1">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Active
                </p>
             </div>
          </div>

          {/* NEW: Quote of The Day Section */}
          <div className="mb-6 relative z-10">
              <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl p-3 relative transform -rotate-1">
                  <div className="absolute -top-3 left-4 bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
                      Kata-kata Hari Ini
                  </div>
                  {isEditing ? (
                      <textarea 
                        value={editQuote}
                        onChange={(e) => setEditQuote(e.target.value)}
                        className="w-full bg-transparent border-b border-yellow-300 focus:outline-none text-sm font-medium italic text-gray-800 resize-none h-16 leading-relaxed"
                        placeholder="Tulis sesuatu yang bijak (atau receh)..."
                        maxLength={80}
                      />
                  ) : (
                      <p className="font-display font-bold text-lg leading-tight text-gray-800 italic">
                          "{user.quote || "Hidup itu random, yang penting outfit cakep."}"
                      </p>
                  )}
              </div>
          </div>

          {/* Footer / Barcode */}
          <div className="flex justify-between items-end border-t-2 border-dashed border-gray-200 pt-4 relative z-10">
             <div className="flex flex-col gap-1">
                <p className="text-[10px] text-gray-400 font-medium max-w-[150px] leading-tight">
                   Kartu ini sah digunakan untuk flexing di sosial media.
                </p>
             </div>
             <div className="opacity-80">
                <QrCode size={40} />
             </div>
          </div>
          
          {/* Fingerprint Decoration */}
          <div className="absolute bottom-4 right-16 opacity-5 rotate-12 pointer-events-none">
             <Fingerprint size={120} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
         <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
            <Share2 size={18} /> Pamerin (Share)
         </button>
         <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-black rounded-full font-bold hover:bg-gray-50 transition-colors">
            <Download size={18} /> Simpan
         </button>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 w-full max-w-lg text-center">
         <button onClick={logout} className="text-red-500 font-bold hover:bg-red-50 px-6 py-2 rounded-full transition-colors text-sm">
            Log Out dari Sini
         </button>
      </div>
    </div>
  );
};

export default UserProfile;