import React from "react";
import {
  PenTool,
  Send,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Rocket,
  Sparkles,
  Award,
} from "lucide-react";
import Link from "next/link";
import { contributors } from "@/data/mockData";

const Contributor: React.FC = () => {
  return (
    <div className="pb-12 space-y-24">
      {/* Hero Header */}
      <section className="text-center relative py08">
        <div className="inline-block px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-bounce">
          Open Submission
        </div>
        <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6">
          WAKTUNYA SUARA <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
            LO DIDENGAR.
          </span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Punya opini unpopular? Tutorial coding yang gak bikin pusing? Atau
          curhatan quarter life crisis? Kirim tulisan lo ke Portorin.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-gen-yellow text-black px-8 py-4 rounded-full font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          <MessageCircle className="fill-current" />
          Chat Admin Sekarang
        </Link>
      </section>

      {/* Contributor Hall of Fame */}
      <section className="bg-gen-offwhite rounded-5xl border mx-auto max-w-7xl border-gray-100 p-3 md:p-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl mb-3">Hall of Fame</h2>
          <p className="text-gray-500">
            Mereka yang udah pernah nyumbang tulisan di sini.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {contributors.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all hover:-translate-y-2 relative group"
            >
              {user.topBadge && (
                <div className="absolute -top-3 right-0 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
                  {user.topBadge}
                </div>
              )}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-gray-100 mb-3 group-hover:border-purple-400 transition-colors"
              />
              <h4 className="font-bold text-sm mb-1">{user.name}</h4>
              <p className="text-xs text-gray-400 mb-2">{user.role}</p>
              <div className="mt-auto pt-2 border-t border-gray-50 w-full">
                <span className="text-xs font-bold text-purple-600">
                  {user.articlesCount} Articles
                </span>
              </div>
            </div>
          ))}

          {/* Slot Kosong */}
          <div className="bg-gray-50 p-4 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <span className="text-xl font-bold text-gray-400">?</span>
            </div>
            <p className="text-xs font-bold text-gray-400">
              Slot kosong <br /> buat lo
            </p>
          </div>
        </div>
      </section>

      {/* Steps to Publish */}
      <section className="max-w-5xl mx-auto pb-12">
        <h2 className="font-display font-bold text-4xl mb-12 text-center flex items-center justify-center gap-3">
          <Sparkles className="text-yellow-400 fill-yellow-400" />
          Mau jadi contributor Kayak mereka?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-4xl border-2 border-gray-100 hover:border-black transition-all group">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PenTool size={32} className="text-purple-600" />
            </div>
            <h3 className="font-bold text-xl mb-3">1. Tulis Draft</h3>
            <p className="text-gray-500">
              Bikin tulisan lo di Google Docs atau Notion. Pastiin gaya
              bahasanya santai, gak kaku kayak buku paket sekolah.
            </p>
          </div>

          <div className="bg-white p-8 rounded-4xl border-2 border-gray-100 hover:border-black transition-all group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Send size={32} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-xl mb-3">2. Kirim ke Admin</h3>
            <p className="text-gray-500">
              Klik tombol "Chat Admin", kenalan dulu, terus kirim link draft lo.
              Jangan lupa open access ya!
            </p>
          </div>

          <div className="bg-white p-8 rounded-4xl border-2 border-gray-100 hover:border-black transition-all group">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket size={32} className="text-green-600" />
            </div>
            <h3 className="font-bold text-xl mb-3">3. Publish!</h3>
            <p className="text-gray-500">
              Kalo lolos kurasi, tulisan lo bakal tayang. Lo bakal dapet badge
              contributor dan exposure.
            </p>
          </div>
        </div>
      </section>

      {/* Rules & Guidelines (Bento Style) */}
      <section className="bg-black text-white rounded-5xl mx-auto max-w-7xl p-8 md:p-16 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gen-purple/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gen-mint/40 rounded-full blur-3xl"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6">
              ATURAN MAIN.
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Kita chill, tapi tetep ada rules biar komunitas ini tetep asik
              buat semua orang.
            </p>
            <div className="bg-white/10 backdrop-blur p-6 rounded-3xl border border-white/10 inline-block">
              <p className="font-bold text-yellow-300 mb-2 flex items-center gap-2">
                <Award size={18} /> Pro Tip:
              </p>
              <p className="text-sm">
                Tulisan yang personal dan relate-able biasanya lebih cepet
                di-approve daripada tulisan yang terlalu general.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-2xl flex items-start gap-4">
              <CheckCircle2 className="text-green-400 shrink-0" />
              <div>
                <h4 className="font-bold text-green-400">Original Content</h4>
                <p className="text-sm text-gray-400">
                  Tulisan asli dari otak lo, bukan copy-paste Wikipedia atau
                  hasil generate AI mentah-mentah.
                </p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-2xl flex items-start gap-4">
              <CheckCircle2 className="text-green-400 shrink-0" />
              <div>
                <h4 className="font-bold text-green-400">Bahasa Santai</h4>
                <p className="text-sm text-gray-400">
                  Pake "Lo-Gue" boleh, bahasa jaksel boleh. Yang penting enak
                  dibaca.
                </p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-start gap-4">
              <XCircle className="text-red-400 shrink-0" />
              <div>
                <h4 className="font-bold text-red-400">
                  No SARA / Hate Speech
                </h4>
                <p className="text-sm text-gray-400">
                  Big no. Kita di sini buat have fun, bukan buat ribut.
                </p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-start gap-4">
              <XCircle className="text-red-400 shrink-0" />
              <div>
                <h4 className="font-bold text-red-400">Bukan Jualan</h4>
                <p className="text-sm text-gray-400">
                  Artikel promosi terselubung bakal langsung di-skip admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contributor;
