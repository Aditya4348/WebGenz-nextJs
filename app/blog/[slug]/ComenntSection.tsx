"use client";

import { useAuth } from "@/Context/AuthContext";
import { getBadge, getRandomAnonName } from "@/helper/Helper";
import { Contributor, Comment, BlogPost } from "@/types/types";
import { Info, Send, Zap, Reply, MessageCircle} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function CommentSection({ post }: { post: BlogPost }) {
  const { user, updateUser } = useAuth();

  // Initialize comments state with data from props
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gamification States
  const [showXpGain, setShowXpGain] = useState<{show: boolean, amount: number}>({show: false, amount: 0});
  const [leaderboard, setLeaderboard] = useState<Contributor[]>([]);
  const [showRankInfo, setShowRankInfo] = useState(false); // State for Rank Info Modal
  const [showRules, setShowRules] = useState(false);

  // Reply States
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);


  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user && !guestName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const isGuest = !user;
      const currentName = user ? user.name : guestName;
      const currentAvatar = user
        ? user.avatar
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${guestName}`;
      const earnedXp = 10;
      const currentXp = user ? (user.xp || 0) + earnedXp : 0;

      const commentData: Comment = {
        id: Date.now().toString(),
        author: currentName,
        avatar: currentAvatar,
        text: newComment,
        date: "Just now",
        replies: [],
        isAnonymous: isGuest,
        userXp: currentXp,
        badge: getBadge(currentXp).label,
      };

      setComments([...comments, commentData]);
      setNewComment("");
      setIsSubmitting(false);

      // Trigger Gamification Feedback
      if (user) {
        updateUser({ xp: currentXp });
        setShowXpGain({ show: true, amount: earnedXp });
        setTimeout(() => setShowXpGain({ show: false, amount: 0 }), 3000);
      }
    }, 800);
  };

  const handleReplyClick = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(commentId);
      setReplyText("");
    }
  };

  const handleSubmitReply = (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmittingReply(true);

    setTimeout(() => {
      const isGuest = !user;
      const currentName = user ? user.name : "Anonim Reply";
      const currentAvatar = user
        ? user.avatar
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
      const earnedXp = 5;

      const replyData: Comment = {
        id: Date.now().toString(),
        author: currentName,
        avatar: currentAvatar,
        text: replyText,
        date: "Just now",
        replies: [],
        isAnonymous: isGuest,
        badge: "Reply",
      };

      const updatedComments = comments.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), replyData],
          };
        }
        return c;
      });

      setComments(updatedComments);
      setReplyText("");
      setReplyingTo(null);
      setIsSubmittingReply(false);

      // XP Gain for reply too
      if (user) {
        updateUser({ xp: (user.xp || 0) + earnedXp });
        setShowXpGain({ show: true, amount: earnedXp });
        setTimeout(() => setShowXpGain({ show: false, amount: 0 }), 3000);
      }
    }, 800);
  };

  return (
    <section>
      {/* --- COMMENTS SECTION --- */}
      <div className="mt-16 pt-12 border-t border-gray-100" id="comments">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h3 className="font-display font-bold text-2xl">Diskusi Netizen</h3>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
              {comments.length}
            </span>
          </div>

          {/* XP Rules Info */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowRules(true)}
              onMouseLeave={() => setShowRules(false)}
              className="flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 hover:bg-purple-100 transition-colors"
            >
              <Info size={14} /> Cara dapet XP?
            </button>

            {showRules && (
              <div className="absolute top-10 right-0 w-64 bg-black text-white p-4 rounded-2xl shadow-xl z-20 animate-in fade-in slide-in-from-top-2 text-xs">
                <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-1">
                  <Zap size={12} /> Gamification Rules
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Kirim Komentar</span>{" "}
                    <span className="font-bold text-green-400">+10 XP</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Reply Komentar</span>{" "}
                    <span className="font-bold text-green-400">+5 XP</span>
                  </li>
                </ul>
                <div className="mt-3 pt-2 border-t border-white/20 text-[10px] text-gray-400">
                  Kumpulin XP buat naik rank dari Newbie sampe jadi Sepuh!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comment Form */}
        <div className="mb-10">
          <div
            className={`rounded-3xl border-2 overflow-hidden bg-white ${
              user
                ? "border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "border-gray-200"
            }`}
          >
            <form onSubmit={handlePostComment} className="p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                  <img
                    src={
                      user
                        ? user.avatar
                        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                            guestName || "guest"
                          }`
                    }
                    className="w-full h-full object-cover"
                    alt="Avatar"
                  />
                </div>
                <div className="grow">
                  {/* Guest Name Input */}
                  {!user && (
                    <div className="mb-3 flex items-center gap-2">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm font-bold focus:outline-none focus:border-black w-1/2"
                        placeholder="Nama Samaran (Wajib)"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        maxLength={20}
                      />
                      <button
                        type="button"
                        onClick={() => setGuestName(getRandomAnonName())}
                        className="text-xs font-bold text-purple-600 hover:underline"
                      >
                        🎲 Random Name
                      </button>
                    </div>
                  )}

                  <textarea
                    className="w-full bg-transparent focus:outline-none text-sm resize-none h-20 placeholder:text-gray-400 font-medium"
                    placeholder={
                      user
                        ? `Spill pemikiran lo, ${user.name}...`
                        : "Ikutan nimbrung dong..."
                    }
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-3">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {user ? "Logged in as Member" : "Mode: Anonymous Guest"}
                </div>
                <button
                  type="submit"
                  disabled={
                    (!user && !guestName.trim()) ||
                    !newComment.trim() ||
                    isSubmitting
                  }
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    (!user && !guestName.trim()) || !newComment.trim()
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white hover:scale-105 active:scale-95"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Spill (Kirim)"}{" "}
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Comment List */}
        <div className="space-y-8">
          {comments.length > 0 ? (
            comments.map((comment) => {
              // If it's the current user's temporary comment, use real XP, else use static XP
              const displayXP =
                user && comment.author === user.name
                  ? user.xp || 0
                  : comment.userXp || 0;
              const badgeInfo = getBadge(displayXP);
              const BadgeIcon = badgeInfo.icon;

              return (
                <div
                  key={comment.id}
                  className="animate-in fade-in slide-in-from-bottom-2 group"
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full border border-gray-200 shrink-0"
                      />
                      {/* Level Badge Indicator */}
                      {displayXP > 100 && (
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-[8px] font-bold px-1 rounded-sm border border-black z-10">
                          Lvl.{Math.floor(displayXP / 100)}
                        </div>
                      )}
                    </div>

                    <div className="grow">
                      <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 border border-gray-100 group-hover:border-black/20 transition-colors relative">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-black">
                              {comment.author}
                            </h4>
                            {/* BADGE CHIP */}
                            {!comment.isAnonymous && (
                              <div
                                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${badgeInfo.color}`}
                              >
                                <BadgeIcon size={8} /> {badgeInfo.label}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            {comment.date}
                          </span>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed">
                          {comment.text}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4 mt-2 ml-2 items-center">
                        <button
                          onClick={() => handleReplyClick(comment.id)}
                          className="text-xs font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
                        >
                          <Reply size={12} /> Balas
                        </button>
                      </div>

                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <form
                          onSubmit={(e) => handleSubmitReply(comment.id, e)}
                          className="mt-3 flex gap-3 animate-in fade-in slide-in-from-top-2"
                        >
                          <div className="grow flex gap-2">
                            <input
                              type="text"
                              autoFocus
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="grow bg-white border-2 border-black rounded-xl px-4 py-2 text-sm font-medium focus:outline-none placeholder:text-gray-400"
                              placeholder="Balas komentar..."
                            />
                            <button
                              type="submit"
                              disabled={!replyText.trim() || isSubmittingReply}
                              className="bg-black text-white p-2 rounded-xl hover:scale-105 transition-transform"
                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Replies Rendering */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-8 mt-4 space-y-3 border-l-2 border-gray-100 pl-4">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="bg-white p-3 rounded-xl border border-gray-100"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <img
                                  src={reply.avatar}
                                  className="w-5 h-5 rounded-full"
                                  alt=""
                                />
                                <span className="font-bold text-xs">
                                  {reply.author}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {reply.date}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600">
                                {reply.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <MessageCircle className="mx-auto text-gray-300 mb-3" size={32} />
              <p className="text-gray-400 font-medium">
                Belum ada yang komen nih. <br />
                Jadilah netizen pertama!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
