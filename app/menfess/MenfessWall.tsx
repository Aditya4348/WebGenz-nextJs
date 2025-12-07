"use client";

import React, { useState } from 'react';
import { Menfess } from '@/types/types';
import { Heart } from 'lucide-react';
import FormMenfess from './FormMenfes';

interface MenfessWallProps {
  initialMessages: Menfess[];
}

const MenfessWall: React.FC<MenfessWallProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<Menfess[]>(initialMessages);

  const addMessage = (newMessage: Menfess) => {
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  const handleReact = (id: string) => {
    setMessages(prevMessages => 
      prevMessages.map(m => {
        if (m.id === id) {
          return { ...m, reactions: m.reactions + 1 };
        }
        return m;
      })
    );
  };

  return (
    <>
      <FormMenfess addMessage={addMessage} />

      {/* The Wall (Masonry Grid Simulation) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mx-auto max-w-6xl px-4 mt-12">
          {messages.map((m, idx) => (
              <div 
                key={m.id} 
                className={`break-inside-avoid rounded-[2rem] p-6 border-2 border-black/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group relative ${m.color} ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 hover:z-10`}
              >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 border border-black/20 shadow-sm z-20"></div>

                  <div className="flex justify-between items-start mb-4 border-b border-black/10 pb-2">
                      <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">To:</p>
                          <p className="font-bold leading-tight">{m.to}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">From:</p>
                          <p className="font-bold leading-tight">{m.from}</p>
                      </div>
                  </div>

                  <p className="font-display font-bold text-xl leading-relaxed mb-6 min-h-20">"{m.message}"</p>

                  {m.sticker && <div className="absolute top-4 right-4 text-4xl transform rotate-12 opacity-80 pointer-events-none">{m.sticker}</div>}

                  <div className="flex justify-between items-end">
                      <p className="text-xs font-bold opacity-40">{m.createdAt}</p>
                      <button onClick={() => handleReact(m.id)} className="bg-white/40 hover:bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors group/btn">
                          <Heart size={14} className="group-hover/btn:fill-red-500 group-hover/btn:text-red-500 transition-colors" />
                          <span className="text-xs font-bold">{m.reactions}</span>
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </>
  );
};

export default MenfessWall;
