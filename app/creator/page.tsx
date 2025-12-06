""

import React from 'react';
import { creator } from '@/data/mockData';
import { Instagram, Twitter, Coffee, Code, Music, Gamepad2, MapPin, Quote as QuoteIcon } from 'lucide-react';

const Creator: React.FC = () => {
  return (
    <div className="pb-12 pt-8">
      <div className="text-center mb-12">
        <h1 className="font-display font-black text-5xl md:text-6xl mb-4">THE CREATOR</h1>
        <p className="text-xl text-gray-500">Kenalan sama orang di balik layar.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className=" mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto gap-4 md:h-[800px] lg:h-[600px]">
        
        {/* Profile Main Card */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-4xl p-8 border-2 border-gray-100 relative overflow-hidden flex flex-col justify-end group hover:border-black transition-colors">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-gen-purple/50 to-white/0 z-0"></div>
            <img src={creator.image} className="absolute top-8 right-8 w-32 h-32 rounded-full border-4 border-white shadow-xl rotate-6 group-hover:rotate-12 transition-transform duration-500" alt="Profile" />
            
            <div className="relative z-10 mt-32">
                <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full mb-4">Open for Collab</div>
                <h2 className="font-display font-black text-4xl mb-2">{creator.name}</h2>
                <p className="text-purple-600 font-bold text-xl mb-4">{creator.role}</p>
                <p className="text-gray-600 leading-relaxed max-w-md">{creator.bio}</p>
            </div>
        </div>

        {/* Social Stack */}
        <div className="col-span-1 md:col-span-1 bg-black rounded-4xl p-6 flex flex-col justify-center items-center text-white gap-4 group hover:scale-[1.02] transition-transform">
             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-black transition-colors">
                 <Instagram size={24} />
             </div>
             <div className="text-center">
                 <div className="font-bold text-lg">Instagram</div>
                 <div className="text-white/50 text-sm">@portorin.id</div>
             </div>
        </div>

        <div className="col-span-1 md:col-span-1 bg-blue-500 rounded-4xl p-6 flex flex-col justify-center items-center text-white gap-4 group hover:scale-[1.02] transition-transform">
             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-blue-500 transition-colors">
                 <Twitter size={24} />
             </div>
             <div className="text-center">
                 <div className="font-bold text-lg">Twitter</div>
                 <div className="text-white/80 text-sm">Rant zone.</div>
             </div>
        </div>

        {/* Location / Status */}
        <div className="col-span-1 bg-gen-yellow rounded-4xl p-6 flex items-center justify-between border-2 border-transparent hover:border-black transition-colors text-black">
             <div>
                <div className="font-bold text-xs uppercase tracking-wider mb-1 opacity-60">Location</div>
                <div className="font-display font-bold text-xl flex items-center gap-2">
                    <MapPin size={20} /> Jakarta
                </div>
             </div>
             <div className="text-4xl animate-pulse">🇮🇩</div>
        </div>

        {/* Philosophy */}
        <div className="col-span-1 md:col-span-2 bg-gray-50 rounded-4xl p-8 border-2 border-gray-100 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-center">
             <QuoteIcon className="text-gray-300 mb-4 transform rotate-180" size={40} />
             <p className="font-display font-bold text-xl md:text-2xl leading-relaxed text-gray-800">
                 "{creator.philosophy}"
             </p>
        </div>

        {/* Skills Marquee (Simulated) */}
        <div className="col-span-1 md:col-span-1 row-span-2 bg-gen-mint rounded-4xl p-8 overflow-hidden relative border-2 border-transparent hover:border-black transition-colors">
            <h3 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                <Code size={24} /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
                {creator.skills.map(skill => (
                    <span key={skill} className="bg-white/50 border border-black/5 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                        {skill}
                    </span>
                ))}
            </div>
            {/* Decoration */}
            <div className="absolute bottom-4 right-4 opacity-20">
                <Code size={100} />
            </div>
        </div>

        {/* Random Likes */}
        <div className="col-span-1 bg-white border-2 border-gray-100 rounded-4xl p-6 flex justify-around items-center">
             <div className="text-center">
                 <div className="bg-orange-100 p-3 rounded-full mb-2"><Coffee className="text-orange-500" /></div>
                 <span className="text-xs font-bold">Coffee</span>
             </div>
             <div className="text-center">
                 <div className="bg-purple-100 p-3 rounded-full mb-2"><Gamepad2 className="text-purple-500" /></div>
                 <span className="text-xs font-bold">Gaming</span>
             </div>
             <div className="text-center">
                 <div className="bg-pink-100 p-3 rounded-full mb-2"><Music className="text-pink-500" /></div>
                 <span className="text-xs font-bold">Lofi</span>
             </div>
        </div>

      </div>
    </div>
  );
};

export default Creator;