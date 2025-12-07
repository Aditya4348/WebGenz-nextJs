"use client";

import { QuoteCard } from "@/components/UI";
import { useAuth } from "@/Context/AuthContext";
import { quotes } from "@/data/mockData";
import { MessageSquarePlus, Send, Hash, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Quote() {
  const { user } = useAuth();
  const router = useRouter();

  const [quoteText, setQuoteText] = useState("");
  const [quoteTagline, setQuoteTagline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);


  // Form Submission
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

  
  return (
    <section className="max-w-4xl mx-auto px-4 flex flex-col items-center">
      <QuoteCard quote={randomQuote} />

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
                <Hash size={14} className="text-gray-400 mr-1 shrink-0" />
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
  );
}
