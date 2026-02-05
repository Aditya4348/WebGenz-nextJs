import React from 'react';
import { Send, MessageCircle, Instagram, Mail, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
      
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[3rem] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Visual */}
        <div className="w-full md:w-1/2 bg-gen-purple p-5 md:p-12 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 p-5 md:p-12 opacity-10">
                 <Send size={200} />
             </div>
             
             <div className="relative z-10">
                 <div className="bg-white/30 backdrop-blur inline-block px-4 py-2 rounded-full text-sm font-bold text-purple-900 mb-6 border border-white/20">
                    Community First
                 </div>
                 <h1 className="font-display font-black text-5xl mb-4 leading-none">
                    LET'S <br/> TALK!
                 </h1>
                 <p className="text-purple-900/80 text-lg font-medium">
                    Punya ide gila? Atau cuma mau curhat soal error React? Gas aja.
                 </p>
             </div>

             <div className="mt-12 relative z-10">
                 <div className="flex -space-x-4">
                     <img className="w-12 h-12 rounded-full border-2 border-white" src="https://picsum.photos/seed/user1/100/100" alt="" />
                     <img className="w-12 h-12 rounded-full border-2 border-white" src="https://picsum.photos/seed/user2/100/100" alt="" />
                     <img className="w-12 h-12 rounded-full border-2 border-white" src="https://picsum.photos/seed/user3/100/100" alt="" />
                     <div className="w-12 h-12 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-xs font-bold">+99</div>
                 </div>
                 <p className="text-xs font-bold uppercase tracking-wider mt-2 opacity-60">Join the community</p>
             </div>
        </div>

        {/* Right Side: Actions */}
        <div className="w-full md:w-1/2 p-5 md:p-12 flex flex-col justify-center bg-white">
            <h3 className="font-bold text-2xl mb-8">Pilih Jalur Komunikasi</h3>
            
            <div className="space-y-4">
                <button className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <MessageCircle size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold">WhatsApp</div>
                            <div className="text-xs text-gray-500">Fast response (Admin Gabut)</div>
                        </div>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </button>

                <button className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-pink-500 hover:bg-pink-50 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                            <Instagram size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold">Instagram DM</div>
                            <div className="text-xs text-gray-500">Buat collab & tag story</div>
                        </div>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                </button>

                <button className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-black flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold">Email</div>
                            <div className="text-xs text-gray-500">Collab & Feedback</div>
                        </div>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                    "Kirim artikel? Boleh banget! Minimal ada 1 meme di dalamnya ya."
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;