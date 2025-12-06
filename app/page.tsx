"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sparkles,
  ArrowDown,
  Zap,
  Star,
  Code,
  Coffee,
  Send,
  MessageSquarePlus,
  Hash,
  Lock,
  StickyNote,
  ArrowUpRight,
  Heart,
  Smile,
  Lightbulb,
  Palette,
  CheckCircle,
  Gamepad2,
} from "lucide-react";
import { quotes, blogPosts, menfessData } from "../data/mockData";
import { BlogCard, QuoteCard, SectionHeader } from "../components/UI";
import { useAuth } from "../Context/AuthContext";

const MarqueeContent: React.FC = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="flex shrink-0 items-center gap-8 text-white font-bold font-display text-lg uppercase tracking-widest"
      >
        <span>Coding</span>
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
        <span>Overthinking</span>
        <Star size={16} className="text-[#dafa9d] fill-[#dafa9d]" />
        <span>Coffee</span>
        <Star size={16} className="text-pink-300 fill-pink-300" />
        <span>Memes</span>
        <Star size={16} className="text-blue-600 fill-blue-600" />
      </div>
    ))}
  </>
);

const Marquee: React.FC = () => (
  <div className="w-full overflow-hidden bg-black py-3 border-y border-black rotate-1 my-12">
    <div className="flex w-max animate-marquee gap-8">
      <MarqueeContent />
      <MarqueeContent />
    </div>
  </div>
);

const Home: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [quoteText, setQuoteText] = useState("");
  const [quoteTagline, setQuoteTagline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();

    // Auth Check
    if (!user) {
      router.push("/login");
      return;
    }

    if (!quoteText.trim() || !quoteTagline.trim()) return;

    setSubmitted(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitted(false);
      setQuoteText("");
      setQuoteTagline("");
    }, 3000);
  };

  const latestPosts = blogPosts.slice(0, 3);
  const trendingPosts = blogPosts
    .filter((p) => p.tags.includes("Life") || p.tags.includes("React"))
    .slice(0, 2);
  const recentMenfess = menfessData.slice(0, 3);

  // Data Preview Mini Apps
  const miniAppsPreview = [
    {
      id: "mood",
      label: "Mood Checker",
      icon: Smile,
      color: "bg-yellow-300",
      desc: "Cek vibe lo hari ini.",
    },
    {
      id: "inspiration",
      label: "Inspo Gen",
      icon: Lightbulb,
      color: "bg-purple-300",
      desc: "Cari ide random.",
    },
    {
      id: "palette",
      label: "Palette",
      icon: Palette,
      color: "bg-pink-300",
      desc: "Warna aesthetic.",
    },
    {
      id: "decision",
      label: "Decision",
      icon: CheckCircle,
      color: "bg-red-300",
      desc: "Galau? Klik ini.",
    },
  ];

  return (
    <div className="space-y-24 pb-12 ">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-16 pb-8 flex flex-col items-center text-center px-4">
        {/* Floating Elements/Stickers */}
        <div className="absolute top-10 left-[10%] hidden lg:block animate-float">
          <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 -rotate-6">
            <Code size={32} className="text-purple-500" />
          </div>
        </div>
        <div className="absolute bottom-20 right-[10%] hidden lg:block animate-float-delayed">
          <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 -rotate-6">
            <Coffee size={32} className="text-orange-500" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border-2 border-gray-100 shadow-sm mb-8 animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
            Portorin v2.0 Live
          </span>
        </div>

        <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-8 tracking-tighter relative z-10">
          TEMPAT <br />
          <span className="relative inline-block px-4">
            <span className="relative z-10 text-white drop-shadow-lg">
              RANDOM
            </span>
            <span className="absolute inset-0 bg-black rounded-full rotate-2 transform scale-110 z-0"></span>
          </span>{" "}
          <br />
          TAPI{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
            BERMAKNA.
          </span>
        </h1>

        <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
          Internet playground buat lo yang butuh asupan insight, tutorial
          coding, atau sekedar validasi kalau hidup itu emang chaos.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link
            href="/blog"
            className="group px-8 py-4 bg-[#fcde47] border-2 border-black text-black rounded-full font-bold shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Mulai Baca{" "}
            <ArrowDown size={20} className="group-hover:animate-bounce" />
          </Link>
          <a
            href="#featured"
            className="px-8 py-4 bg-white text-black border-2 border-gray-200 rounded-full font-bold hover:bg-gray-50 hover:border-black transition-all"
          >
            Explore Dulu
          </a>
        </div>
      </section>

      <Marquee />

      {/* Quote Widget */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <QuoteCard quote={randomQuote} />

        {/* User Submission Box */}
        {/* User Submission Box */}
        <div className="mt-8 w-full max-w-3xl">
          <div
            className={`bg-white rounded-4xl p-3 border-2 shadow-sm transition-all focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] ${
              !user
                ? "border-gray-200"
                : "border-gray-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
            }`}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmitQuote}
                className="flex flex-col md:flex-row gap-3"
              >
                {/* Icon */}
                <div className="hidden md:flex w-12 h-12 bg-gray-50 rounded-full items-center justify-center shrink-0 self-start mt-1">
                  <MessageSquarePlus size={20} className="text-gray-400" />
                </div>

                {/* Input 1: Quote Text */}
                <div className="grow">
                  <input
                    type="text"
                    className="w-full bg-transparent border-none focus:outline-none font-bold text-lg placeholder:text-gray-300 h-14 text-gray-800"
                    placeholder="Ketik quote bijak lo di sini..."
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    maxLength={120}
                  />
                </div>

                {/* Divider for Desktop */}
                <div className="hidden md:block w-px bg-gray-100 my-2"></div>

                {/* Input 2: Tagline */}
                <div className="w-full md:w-48 bg-gray-50 md:bg-transparent rounded-xl md:rounded-none px-4 md:px-0 flex items-center">
                  <Hash
                    size={14}
                    className="text-gray-400 mr-1 shrink-0"
                  />
                  <input
                    type="text"
                    className="w-full bg-transparent border-none focus:outline-none font-bold text-sm placeholder:text-gray-300 h-12 text-purple-600"
                    placeholder="Tagline (ex: Life Motto)"
                    value={quoteTagline}
                    onChange={(e) => setQuoteTagline(e.target.value)}
                    maxLength={30}
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shrink-0 transition-all ${
                    !user
                      ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      : "bg-black text-white hover:scale-105 active:scale-95"
                  }`}
                >
                  {!user ? (
                    <>
                      Login Dulu <Lock size={14} />
                    </>
                  ) : (
                    <>
                      Kirim <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 h-14 text-green-600 font-bold animate-in fade-in zoom-in duration-300">
                <Sparkles size={18} /> Mantap! Quote lo lagi direview admin.
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-3 px-2">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider opacity-60">
              *Quote terbaik bakal muncul di Daily Wisdom
            </p>
            {!user && (
              <Link
                href="/login"
                className="text-xs font-bold text-purple-600 hover:underline"
              >
                *Wajib login buat kirim
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section id="featured" className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Baru Diupload"
          subtitle="Tulisan yang masih anget, fresh from the oven."
          link="/blog"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, idx) => (
            <div key={post.id} className={idx === 1 ? "md:translate-y-12" : ""}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Menfess Preview Section */}
      <section className="max-w-7xl mx-auto px-4 bg-gen-off py-16 sm:bg-transparent sm:py-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <StickyNote size={14} /> Confession Wall
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl">
              Lagi Rame Di Menfess
            </h2>
          </div>
          <Link
            href="/menfess"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 font-bold text-sm hover:bg-black hover:text-white transition-all group"
          >
            Buka Tembok{" "}
            <ArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentMenfess.map((m, idx) => (
            <Link
              href="/menfess"
              key={m.id}
              className={`relative block p-6 rounded-4xl border-2 border-black/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group ${
                m.color
              } ${
                idx % 2 === 0 ? "md:rotate-1" : "md:-rotate-1"
              } hover:rotate-0`}
            >
              {/* Pin Decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 border border-black/20 shadow-sm z-20 group-hover:scale-110 transition-transform"></div>

              <div className="flex justify-between items-start mb-4 border-b border-black/10 pb-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">
                    To:
                  </p>
                  <p className="font-bold leading-tight text-sm truncate max-w-[100px]">
                    {m.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">
                    From:
                  </p>
                  <p className="font-bold leading-tight text-sm truncate max-w-[100px]">
                    {m.from}
                  </p>
                </div>
              </div>

              <p className="font-display font-bold text-lg leading-relaxed mb-6 line-clamp-3">
                "{m.message}"
              </p>

              <div className="flex justify-between items-end mt-auto">
                <p className="text-xs font-bold opacity-40">{m.createdAt}</p>
                <div className="bg-white/40 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Heart size={12} className="fill-black/20 text-transparent" />
                  <span className="text-xs font-bold opacity-60">
                    {m.reactions}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/menfess"
            className="inline-block border-b-2 border-black font-bold pb-1"
          >
            Lihat {menfessData.length - 3} pesan lainnya...
          </Link>
        </div>
      </section>

      {/* Mini Apps Preview Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-black rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
          {/* Background Decoration */}
          <div
            className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            {/* Text Side */}
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Gamepad2 size={14} /> Digital Playground
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
                TOOLS GABUT.
              </h2>
              <p className="text-gray-400 mb-8 font-medium">
                Kumpulan mini-apps buat seru-seruan, cari inspirasi, atau
                sekedar buang waktu dengan produktif (dikit).
              </p>
              <Link
                href="/miniapps"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                Cobain Semua <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Grid Apps Side */}
            <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
              {miniAppsPreview.map((app, i) => (
                <Link
                  key={app.id}
                  href={`/miniapps?app=${app.id}`}
                  className={`group bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black hover:border-white p-4 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${app.color} text-black group-hover:scale-110 transition-transform`}
                  >
                    <app.icon size={28} />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{app.label}</h3>
                  <p className="text-[10px] opacity-60 font-medium leading-tight group-hover:opacity-80">
                    {app.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Join Squad CTA Section */}
      <section className="max-w-7xl mx-auto px-4 relative overflow-hidden rounded-[3rem] bg-gen-yellow p-8 md:p-16 text-black border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-block bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 rotate-1">
              Open Submission
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl mb-6 leading-tight">
              PUNYA OPINI <br /> UNPOPULAR?
            </h2>
            <p className="text-xl font-medium mb-8">
              Jangan dipendem sendiri. Tulis di sini, biar satu internet tau isi
              kepala lo. Dapet fame + validasi instan.
            </p>
            <Link
              href="/contributor"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              Join Squad <Zap size={20} className="fill-current" />
            </Link>
          </div>

          {/* Visual Decoration */}
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full border-4 border-black flex items-center justify-center relative z-10">
              <Star
                size={80}
                className="text-black fill-black animate-spin-slow"
              />
            </div>
            {/* Abstract shapes behind */}
            <div className="absolute top-0 right-0 w-full h-full bg-black rounded-full transform translate-x-4 translate-y-4 z-0"></div>
          </div>
        </div>

        {/* Background Noise/Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </section>

      {/* Trending Section - Bento Style */}
      <section className="max-w-7xl mx-auto px-4 bg-black rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/40 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
              <Sparkles className="text-yellow-400" size={24} />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Lagi Trending
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Featured */}
            <Link
              href={`/blog/${trendingPosts[0].id}`}
              className="group relative bg-gray-900 rounded-[2.5rem] p-1 border border-white/10 hover:border-white/30 transition-all overflow-hidden h-[400px]"
            >
              <Image
                src={trendingPosts[0].coverImage}
                layout="fill"
                objectFit="cover"
                className="opacity-60 group-hover:scale-105 transition-transform duration-700"
                alt={trendingPosts[0].title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  #{trendingPosts[0].id} Most Read
                </span>
                <h3 className="text-3xl font-display font-bold mb-2 leading-tight group-hover:underline decoration-yellow-400">
                  {trendingPosts[0].title}
                </h3>
                <p className="text-gray-300 line-clamp-2">
                  {trendingPosts[0].excerpt}
                </p>
              </div>
            </Link>

            {/* List Style */}
            <div className="flex flex-col gap-6">
              {trendingPosts.slice(1).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-display font-bold text-white/20">
                      0{post.id}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowDown className="-rotate-90" size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm">{post.excerpt}</p>
                </Link>
              ))}

              {/* Community Box (Replaced Newsletter) */}
              <div className="flex-1 bg-linear-to-br from-gen-purple to-purple-600 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center text-black">
                <Zap size={32} className="mb-4 text-white" />
                <h4 className="font-bold text-xl text-white mb-2">
                  Join The Squad!
                </h4>
                <p className="text-white/80 text-sm mb-4">
                  Dapetin update artikel receh. 100% Gratis.
                </p>
                <Link
                  href="/contributor"
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold w-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  Gabung Komunitas{" "}
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
