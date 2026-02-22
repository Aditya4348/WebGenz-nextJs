import Link from "next/link";
import { Shield, Heart, AlertTriangle, Ghost, ArrowLeft, CheckCircle2, Scale } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-yellow-200 selection:text-black">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/register" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors mb-4">
            <ArrowLeft size={16} /> Balik ke Daftar
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <Scale size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Rules of The Game
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-xl mx-auto">
            Baca bentar biar gak kegocek pas main. <br/>Simple kok, gak kayak skripsi.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          
          {/* Rule 1 */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border-2 border-gray-100 hover:border-black transition-all group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-white border-2 border-gray-200 rounded-2xl group-hover:scale-110 transition-transform shadow-sm shrink-0">
                <Heart className="text-red-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">1. No Toxic Vibes</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Kita di sini buat seru-seruan. Dilarang keras bullying, hate speech, SARA, atau drama gak jelas. Kalau mau berantem, di ring tinju aja, jangan di sini. <span className="text-black font-bold">Be nice or leave.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border-2 border-gray-100 hover:border-black transition-all group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-white border-2 border-gray-200 rounded-2xl group-hover:scale-110 transition-transform shadow-sm shrink-0">
                <Ghost className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">2. Anonimitas & Privasi</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Lo boleh pake mode anonim, tapi bukan berarti lo kebal hukum. Identitas asli lo aman sama kita, kecuali lo ngelakuin hal kriminal. <span className="italic">We respect your privacy, so respect our platform.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border-2 border-gray-100 hover:border-black transition-all group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-white border-2 border-gray-200 rounded-2xl group-hover:scale-110 transition-transform shadow-sm shrink-0">
                <AlertTriangle className="text-yellow-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">3. Konten Lo, Tanggung Jawab Lo</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Apapun yang lo posting, itu tanggung jawab lo sepenuhnya. Jangan share hoax, konten ilegal, atau link phising. Kalau ketahuan, auto-banned permanen + dilaporkan ke pihak berwajib kalau perlu.
                </p>
              </div>
            </div>
          </div>

           {/* Rule 4 */}
           <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border-2 border-gray-100 hover:border-black transition-all group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-white border-2 border-gray-200 rounded-2xl group-hover:scale-110 transition-transform shadow-sm shrink-0">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">4. Fair Play</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Jangan spam, jangan nge-bot, jangan coba-coba hack sistem. Kita bangun komunitas ini bareng-bareng, jadi tolong dijaga ya bestie.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Agreement Section */}
        <div className="mt-12 p-8 bg-black text-white rounded-[2rem] text-center relative overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Deal? 🤝</h3>
                <p className="text-gray-300 mb-8 max-w-md mx-auto font-medium">
                    Dengan mendaftar, lo dianggap udah setuju sama aturan main di atas. Gampang kan?
                </p>
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none translate-y-0 hover:translate-y-1">
                    <CheckCircle2 size={20} /> Gas Daftar Sekarang
                </Link>
            </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </div>

      </div>
    </div>
  );
};

export default TermsPage;
