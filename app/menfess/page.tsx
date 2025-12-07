import React from 'react';
import { menfessData } from '@/data/mockData';
import { StickyNote } from 'lucide-react';
import MenfessWall from './MenfessWall';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Menfess & Confession Wall | Tembok Curhat Portorin",
  description:
    "Tulis pesan rahasia atau curhat anonim di Tembok Menfess Portorin. Kirim ke crush, teman, atau diri sendiri. 100% anonim untuk komunitas Gen Z.",
  keywords: [
    "menfess",
    "confession wall",
    "pesan anonim",
    "curhat online",
    "komunitas Gen Z",
    "Portorin menfess",
    "curhat rahasia",
    "tembok curhat"
  ],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Menfess & Confession Wall | Tembok Curhat Portorin",
    description:
      "Tulis pesan rahasia atau curhat anonim di Tembok Menfess Portorin. Kirim ke crush, teman, atau diri sendiri. 100% anonim.",
    url: "/menfess",
    images: [
      {
        url: "https://picsum.photos/seed/menfess/1200/630",
        width: 1200,
        height: 630,
        alt: "Tembok Menfess Portorin",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menfess & Confession Wall | Tembok Curhat Portorin",
    description:
      "Tulis pesan rahasia atau curhat anonim di Tembok Menfess Portorin. Kirim ke crush, teman, atau diri sendiri. 100% anonim.",
    images: ["https://picsum.photos/seed/menfess/1200/630"],
  },
  alternates: {
    canonical: "/menfess",
  },
};


const MenfessPage = () => {
  // Data fetching (from mockData) happens on the server.
  const initialMessages = menfessData;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-bounce">
            <StickyNote size={14} /> Confession Wall
        </div>
        <h1 className="font-display font-black text-5xl md:text-7xl mb-4 leading-tight">
          TEMBOK <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-500">MENFESS</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Spill tehnya di sini. Kirim pesan rahasia buat crush, dosen, atau diri sendiri. 
          Tenang, identitas lo aman (kalau lo pinter milih nama samaran).
        </p>

        <MenfessWall initialMessages={initialMessages} />
      </div>
    </div>
  );
};

export default MenfessPage;
