"use client";

import { contributors } from "@/data/mockData";
import { Contributor } from "@/types/types";
import {
  Crown,
  HelpCircle,
  Trophy,
  X,
  Zap,
  MessageCircle,
  Ghost,
  Medal,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RangkingNetizen({user, post, relatedPosts } : {user: any, post: any, relatedPosts: any}) {
  // Gamification States
  const [showXpGain, setShowXpGain] = useState<{
    show: boolean;
    amount: number;
  }>({ show: false, amount: 0 });
  const [leaderboard, setLeaderboard] = useState<Contributor[]>(
    (contributors || []).sort((a, b) => b.xp - a.xp)
  );
  const [showRankInfo, setShowRankInfo] = useState(false); // State for Rank Info Modal
  const [showRules, setShowRules] = useState(false);

  return (
    <aside className="w-full lg:w-1/3 space-y-8 sticky top-24">
      {/* Leaderboard Widget */}
      <div className="bg-white rounded-4cl p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        {/* Header dengan Tombol Help */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500 fill-yellow-500" />
            <h3 className="font-display font-bold text-xl">Top Netizen</h3>
          </div>
          <button
            onClick={() => setShowRankInfo(!showRankInfo)}
            className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
            title="Lihat Aturan Rank"
          >
            <HelpCircle size={20} />
          </button>
        </div>

        {/* POPUP MODAL RULES RANK */}
        {showRankInfo && (
          <div className="absolute top-16 right-0 left-0 mx-4 z-20 bg-black text-white p-5 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-yellow-400 flex items-center gap-2 text-sm">
                <Crown size={14} /> Rank System
              </h4>
              <button
                onClick={() => setShowRankInfo(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                <span className="flex items-center gap-2 font-bold text-gray-300">
                  <Ghost size={12} /> Newbie
                </span>
                <span className="font-mono text-gray-500">0 XP</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                <span className="flex items-center gap-2 font-bold text-green-400">
                  <MessageCircle size={12} /> Warga
                </span>
                <span className="font-mono text-gray-500">100 XP</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                <span className="flex items-center gap-2 font-bold text-blue-400">
                  <Medal size={12} /> Active
                </span>
                <span className="font-mono text-gray-500">1k XP</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                <span className="flex items-center gap-2 font-bold text-purple-400">
                  <Zap size={12} /> Suhu
                </span>
                <span className="font-mono text-gray-500">2.5k XP</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-500/20 text-yellow-300 p-2 rounded-lg border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                <span className="flex items-center gap-2 font-bold">
                  <Crown size={12} /> The Sepuh
                </span>
                <span className="font-mono">5k+ XP</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 text-center border-t border-white/10 pt-2">
              Komen: <span className="text-green-400 font-bold">+10 XP</span> •
              Reply: <span className="text-green-400 font-bold">+5 XP</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {leaderboard.map((contributor, index) => {
            const isCurrentUser = user && contributor.id === user.id;
            return (
              <div
                key={contributor.id}
                className={`flex items-center gap-3 p-2 rounded-xl transition-colors cursor-default ${
                  isCurrentUser ? "bg-black text-white" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    index === 0
                      ? "bg-yellow-400 text-black"
                      : index === 1
                      ? "bg-gray-300 text-gray-800"
                      : index === 2
                      ? "bg-orange-300 text-white"
                      : isCurrentUser
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-8 h-8 rounded-full border border-gray-200 bg-white"
                />
                <div className="grow min-w-0">
                  <h4 className="font-bold text-sm truncate">
                    {contributor.name}
                  </h4>
                  <div
                    className={`text-xs font-medium flex items-center gap-1 ${
                      isCurrentUser ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    <Zap
                      size={10}
                      className={
                        isCurrentUser
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-purple-500 text-purple-500"
                      }
                    />
                    {contributor.xp} XP
                  </div>
                </div>
                {index === 0 && (
                  <Crown
                    size={16}
                    className="text-yellow-500 fill-yellow-500 animate-bounce"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Top 5 Global Rank
          </p>
        </div>
      </div>

      {/* Author Box Sidebar */}
      <div className="bg-gen-blue/20 rounded-[2rem] p-6 text-center">
        <img
          src={post.author.avatar}
          alt="Author"
          className="w-20 h-20 rounded-full border-4 border-white mx-auto mb-4"
        />
        <h4 className="font-display font-bold text-lg">{post.author.name}</h4>
        <p className="text-sm text-gray-600 mb-4">
          "Nulis artikel random di sela-sela overthinking."
        </p>
      </div>

      {/* Related Posts Sidebar */}
      <div className="space-y-4">
        <h4 className="font-bold text-lg ml-2">Baca Juga</h4>
        {relatedPosts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="block bg-white p-4 rounded-2xl border border-gray-100 hover:border-black transition-colors group"
          >
            <span className="text-[10px] font-bold text-purple-600 uppercase mb-1 block">
              {p.category}
            </span>
            <h5 className="font-bold leading-tight group-hover:underline">
              {p.title}
            </h5>
          </Link>
        ))}
      </div>
    </aside>
  );
}
