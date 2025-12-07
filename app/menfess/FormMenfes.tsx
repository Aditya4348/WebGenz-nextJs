"use client";

import { Menfess } from "@/types/types";
import { Plus, Send } from "lucide-react";
import React, { useState } from "react";

interface FormMenfessProps {
  addMessage: (message: Menfess) => void;
}

export default function FormMenfess({ addMessage }: FormMenfessProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Form States
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-yellow-200");
  const [selectedSticker, setSelectedSticker] = useState<
    "❤️" | "🔥" | "😭" | "🤡" | "✨" | undefined
  >(undefined);

  const colors = [
    { class: "bg-yellow-200", label: "Yellow" },
    { class: "bg-pink-200", label: "Pink" },
    { class: "bg-blue-200", label: "Blue" },
    { class: "bg-green-200", label: "Green" },
    { class: "bg-purple-200", label: "Purple" },
  ];

  const stickers = ["❤️", "🔥", "😭", "🤡", "✨"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !msg) return;

    const newMessage: Menfess = {
      id: Date.now().toString(),
      to,
      from: from || `Anonim ${Math.floor(Math.random() * 100)}`,
      message: msg,
      color: selectedColor,
      createdAt: "Just now",
      reactions: 0,
      sticker: selectedSticker,
    };

    addMessage(newMessage);

    // Reset Form
    setTo("");
    setFrom("");
    setMsg("");
    setSelectedSticker(undefined);
    setIsFormOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mt-8 mb-6 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-xl"
      >
        {isFormOpen ? "Tutup Form" : "Tulis Menfess Baru"} <Plus size={20} />
      </button>

      {/* Form Area */}
      {isFormOpen && (
        <div className="max-w-xl mx-auto mb-16 animate-in slide-in-from-top-10 fade-in duration-300">
          <div
            className={`rounded-[2rem] border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${selectedColor} transition-colors duration-300`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1 block">
                    To:
                  </label>
                  <input
                    type="text"
                    placeholder="Siapa nih?"
                    className="w-full bg-white/50 border-b-2 border-black/20 focus:border-black px-2 py-1 font-bold text-lg placeholder:text-black/30 focus:outline-none"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1 block">
                    From (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="Anonim"
                    className="w-full bg-white/50 border-b-2 border-black/20 focus:border-black px-2 py-1 font-bold text-lg placeholder:text-black/30 focus:outline-none "
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1 block">
                  Message:
                </label>
                <textarea
                  className="w-full bg-white/50 rounded-xl p-4 font-medium text-lg placeholder:text-black/30 focus:outline-none min-h-[120px] resize-none border border-black/5 focus:border-black/20"
                  placeholder="Tulis unek-unek lo di sini..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                  maxLength={200}
                />
                <div className="text-right text-xs font-bold opacity-40 mt-1">
                  {msg.length}/200
                </div>
              </div>

              {/* Customization */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-black/10 pt-4">
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.class}
                      type="button"
                      onClick={() => setSelectedColor(c.class)}
                      className={`w-8 h-8 rounded-full border-2 border-black/20 ${
                        c.class
                      } ${
                        selectedColor === c.class
                          ? "scale-125 border-black shadow-sm"
                          : "hover:scale-110"
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
                <div className="flex gap-2 bg-white/40 p-1 rounded-full">
                  {stickers.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSticker(s as any)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60 transition-colors ${
                        selectedSticker === s ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Tempel di Tembok <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
