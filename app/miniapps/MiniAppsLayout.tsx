"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Smile,
  Lightbulb,
  Palette,
  Clock,
  HelpCircle,
  CheckCircle,
  RefreshCcw,
  Play,
  Pause,
  Ghost,
  XCircle,
  Heart,
  Type,
  Copy,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- SUB-COMPONENTS FOR APPS ---

// 1. Mood Checker
const MoodChecker = () => {
  const [mood, setMood] = useState<string | null>(null);

  const advice: Record<string, string> = {
    "😭": "It's okay to cry, bestie. Air mata itu skincare alami. Abis ini minum air putih ya.",
    "😤": "Tarik napas... Tahan... Buang. Masalah lo valid, tapi jangan sampe ngerusak hari lo.",
    "😴": "Lo butuh tidur, bukan kopi lagi. Matiin HP, touch some pillow.",
    "🤩": "Slay! Keep that energy, tularin ke orang lain.",
    "😐": "Bosen? Coba lakuin hal random. Kayak belajar bahasa bebek.",
  };

  return (
    <div className="text-center p-4">
      <h3 className="font-bold text-2xl mb-6">Apa mood lo hari ini?</h3>
      <div className="flex justify-center gap-4 text-4xl mb-8">
        {Object.keys(advice).map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className="hover:scale-125 transition-transform p-2"
          >
            {m}
          </button>
        ))}
      </div>
      {mood && (
        <div className="bg-white p-6 rounded-2xl border-2 border-black animate-in zoom-in duration-300">
          <p className="font-bold text-lg">"{advice[mood]}"</p>
        </div>
      )}
    </div>
  );
};

// 2. Random Inspiration
const Inspiration = () => {
  const prompts = [
    "Pergi ke cafe baru, pesen menu yang belum pernah lo cobain.",
    "Tulis surat buat diri lo 5 tahun lagi.",
    "Hapus 5 aplikasi di HP yang gak pernah lo pake.",
    "Chat temen lama yang udah setahun gak ngobrol.",
    "Jalan kaki keliling komplek tanpa bawa HP.",
    "Bikin playlist lagu jadul 2000-an.",
    "Belajar masak menu simple dari TikTok.",
  ];
  const [text, setText] = useState("Klik tombol di bawah buat dapet ide.");

  const generate = () => {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setText(random);
  };

  return (
    <div className="text-center p-4 flex flex-col items-center">
      <div className="bg-gen-purple/20 p-8 rounded-[2rem] mb-8 min-h-[150px] flex items-center justify-center w-full max-w-md">
        <p className="font-display font-bold text-xl">{text}</p>
      </div>
      <button
        onClick={generate}
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
      >
        <RefreshCcw size={18} /> Generate Ide
      </button>
    </div>
  );
};

// 3. Color Palette
const ColorPalette = () => {
  const [colors, setColors] = useState([
    "#E9D5FF",
    "#D9F99D",
    "#FECDD3",
    "#BAE6FD",
  ]);

  const generateColors = () => {
    const newColors = Array(4)
      .fill(0)
      .map(() => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 90%)`;
      });
    setColors(newColors);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 h-40">
        {colors.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl h-full relative group cursor-pointer flex items-end justify-center pb-4"
            style={{ backgroundColor: c }}
          >
            <span className="bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {c}
            </span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={generateColors}
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
        >
          <Palette size={18} /> Ganti Warna
        </button>
      </div>
    </div>
  );
};

// 4. Study Timer
const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center p-8">
      <div className="font-display font-black text-7xl md:text-9xl mb-8 tabular-nums tracking-tighter">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggle}
          className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
            isActive ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"
          }`}
        >
          {isActive ? (
            <>
              <Pause size={20} /> Pause
            </>
          ) : (
            <>
              <Play size={20} /> Start
            </>
          )}
        </button>
        <button
          onClick={reset}
          className="px-8 py-3 rounded-full font-bold bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          Reset
        </button>
      </div>
      <p className="mt-8 text-sm text-gray-400">
        Fokus 25 menit, istirahat 5 menit. Jangan curang buka TikTok!
      </p>
    </div>
  );
};

// 5. Personality Quiz
const PersonalityQuiz = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      q: "Kalo lagi stress, lo ngapain?",
      options: [
        { txt: "Tidur seharian", type: "Chill" },
        { txt: "Marah-marah di Twitter", type: "Chaos" },
        { txt: "Checkout Shopee", type: "Impulsive" },
      ],
    },
    {
      q: "Minuman wajib pas ngerjain tugas?",
      options: [
        { txt: "Kopi Gula Aren", type: "Chill" },
        { txt: "Energy Drink", type: "Chaos" },
        { txt: "Boba", type: "Impulsive" },
      ],
    },
  ];

  const handleAnswer = (type: string) => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const archetypes: Record<string, string> = {
        Chill:
          "Si Paling Zen 🧘‍♀️. Hidup lo santuy banget, masalah dateng lo kasih kopi.",
        Chaos:
          "Si Paling Huru-Hara 🔥. Hidup gak seru kalo gak ada drama dikit.",
        Impulsive: "Si Paling Boros 💸. Dompet lo nangis, tapi hati lo senang.",
      };
      setResult(archetypes[type] || archetypes["Chill"]);
    }
  };

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <div className="text-center p-4 max-w-md mx-auto">
      {!result ? (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <h3 className="font-bold text-2xl mb-8">{questions[step].q}</h3>
          <div className="flex flex-col gap-3">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.type)}
                className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 font-bold transition-all text-left"
              >
                {opt.txt}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Question {step + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="animate-in zoom-in duration-300">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="font-display font-black text-2xl mb-4">Hasil Lo:</h3>
          <p className="text-xl mb-8 leading-relaxed">{result}</p>
          <button onClick={reset} className="text-sm font-bold underline">
            Ulangi Quiz
          </button>
        </div>
      )}
    </div>
  );
};

// 6. Decision Maker
const DecisionMaker = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = () => {
    setLoading(true);
    setAnswer(null);
    setTimeout(() => {
      const opts = [
        "GAS KEUN! 🔥",
        "SKIP DULU ❌",
        "PIKIR LAGI 🤔",
        "TANYA IBU 👩",
      ];
      setAnswer(opts[Math.floor(Math.random() * opts.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="text-center p-4">
      <h3 className="font-bold text-xl mb-2">Should I do it?</h3>
      <p className="text-gray-400 text-sm mb-8">
        Biar semesta (algoritma) yang menentukan nasib lo.
      </p>

      {answer && !loading && (
        <div className="mb-8 animate-bounce">
          <span className="font-display font-black text-4xl md:text-5xl">
            {answer}
          </span>
        </div>
      )}

      <button
        onClick={ask}
        disabled={loading}
        className="w-40 h-40 rounded-full bg-black text-white font-bold text-xl hover:scale-110 active:scale-95 transition-transform shadow-xl flex items-center justify-center mx-auto"
      >
        {loading ? "..." : "TEKAN"}
      </button>
    </div>
  );
};

// 7. Cek Khodam
const CekKhodam = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const khodams = [
    "Kulkas 2 Pintu",
    "Naga Indosiar",
    "Seblak Ceker",
    "Mewing Cat",
    "Tutup Botol Marjan",
    "Vario Geber",
    "Ambatron",
    "Si Imut (Padahal Garang)",
    "Pocong Mumet",
    "Kuntilanak Merah",
    "Barbel Melayang",
    "Kosong (Lo NPC)",
  ];

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const index =
        (name.length + Math.floor(Math.random() * 5)) % khodams.length;
      setResult(khodams[index]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="text-center p-4 max-w-md mx-auto">
      <h3 className="font-bold text-2xl mb-2">Cek Khodam Online</h3>
      <p className="text-gray-400 text-sm mb-6">
        Siapa sosok yang mendampingi lo selama ini?
      </p>

      <form onSubmit={check} className="mb-8 relative">
        <input
          type="text"
          placeholder="Ketik Nama Lo..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-50 border-2 border-black rounded-xl px-4 py-3 font-bold text-center focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !name}
          className="w-full mt-4 bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-300"
        >
          {loading ? "Menerawang..." : "CEK SEKARANG"}
        </button>
      </form>

      {result && (
        <div className="animate-in zoom-in duration-300 bg-black text-white p-6 rounded-2xl border-2 border-purple-500 shadow-[4px_4px_0px_0px_#A855F7]">
          <p className="text-sm text-gray-400 mb-2">Khodam {name} adalah:</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
            {result}
          </h2>
        </div>
      )}
    </div>
  );
};

// 8. Excuse Generator
const ExcuseGenerator = () => {
  const [excuse, setExcuse] = useState<string | null>(null);

  const excuses = [
    "Sorry, kucing gue mau lahiran.",
    "Mendadak sakit perut estetik.",
    "Energi sosial gue abis, butuh charge 3 hari.",
    "Disuruh nyokap jagain lilin.",
    "Ban motor gue bocor alus.",
    "Gue lagi di metaverse, sinyal jelek.",
    "Lagi overthinking, gak bisa diganggu.",
    "Hujan nih, mager (padahal cerah).",
    "Dompet gue lagi diet ketat.",
  ];

  const generate = () => {
    const random = excuses[Math.floor(Math.random() * excuses.length)];
    setExcuse(random);
  };

  return (
    <div className="text-center p-4">
      <h3 className="font-bold text-2xl mb-2">Generator Alasan Batal</h3>
      <p className="text-gray-400 text-sm mb-8">
        Buat lo yang diajak nongkrong tapi mager parah.
      </p>

      <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2rem] mb-8 min-h-[120px] flex items-center justify-center relative">
        {excuse ? (
          <p className="font-display font-bold text-xl text-red-500 animate-in fade-in slide-in-from-bottom-2">
            "{excuse}"
          </p>
        ) : (
          <p className="text-gray-300 font-bold">Klik tombol di bawah...</p>
        )}
      </div>

      <button
        onClick={generate}
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
      >
        <XCircle size={18} /> Cari Alasan
      </button>
    </div>
  );
};

// 9. Delulu Calculator
const DeluluCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1 || !name2) return;
    setLoading(true);

    setTimeout(() => {
      // "Random" percentage
      const percentage = Math.floor(Math.random() * 101);
      setResult(percentage);
      setLoading(false);
    }, 2000);
  };

  const getComment = (p: number) => {
    if (p > 90) return "NIKAH SEKARANG! UNDANG GUE!";
    if (p > 70) return "Gas terus, dikit lagi luluh.";
    if (p > 40) return "Hmm... friendzone vibes.";
    if (p > 10) return "Mending lo fokus karir deh.";
    return "Sadar diri bestie. Dia spek dewa.";
  };

  return (
    <div className="text-center p-4 max-w-md mx-auto">
      <h3 className="font-bold text-2xl mb-2">Delulu Calculator 💘</h3>
      <p className="text-gray-400 text-sm mb-6">
        Cek kecocokan lo sama crush (pake logika ngawur).
      </p>

      {!result && !loading && (
        <form onSubmit={calculate} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lo"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            className="w-full bg-pink-50 border-2 border-pink-200 rounded-xl px-4 py-3 font-bold text-center focus:border-pink-500 focus:outline-none"
          />
          <div className="text-xl">❤️</div>
          <input
            type="text"
            placeholder="Nama Crush"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            className="w-full bg-pink-50 border-2 border-pink-200 rounded-xl px-4 py-3 font-bold text-center focus:border-pink-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!name1 || !name2}
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition-colors mt-4"
          >
            CALCULATE LOVE
          </button>
        </form>
      )}

      {loading && (
        <div className="py-10 animate-pulse text-pink-500 font-bold">
          <Heart
            className="mx-auto mb-4 animate-bounce"
            size={48}
            fill="currentColor"
          />
          Menghitung restu semesta...
        </div>
      )}

      {result !== null && !loading && (
        <div className="animate-in zoom-in duration-300">
          <div className="w-40 h-40 rounded-full border-[6px] border-pink-500 flex items-center justify-center mx-auto mb-6 bg-pink-50">
            <span className="font-display font-black text-5xl text-pink-600">
              {result}%
            </span>
          </div>
          <h3 className="font-bold text-xl mb-2">
            {name1} + {name2}
          </h3>
          <p className="bg-black text-white p-4 rounded-xl font-medium inline-block transform rotate-1">
            "{getComment(result)}"
          </p>
          <button
            onClick={() => setResult(null)}
            className="block w-full mt-8 text-sm font-bold text-gray-400 hover:text-black"
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
};

// 10. Aesthetic Text
const AestheticText = () => {
  const [input, setInput] = useState("");

  // Simple converters
  const toSpaced = (s: string) => s.split("").join(" ");
  const toFullWidth = (s: string) =>
    s.replace(/[!-~]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0));
  const toUpsideDown = (s: string) => {
    const map: Record<string, string> = {
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ",
      n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
      A: "∀", B: "q", C: "Ɔ", D: "p", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W",
      N: "N", O: "O", P: "d", Q: "b", R: "ɹ", S: "S", T: "┴", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
      "?": "¿", "!": "¡", ".": "˙", ",": "'", _: "‾",
    };
    return s.split("").reverse().map((c) => map[c] || c).join("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="max-w-md mx-auto p-2">
      <h3 className="font-bold text-2xl mb-2 text-center">Aesthetic Text ✨</h3>
      <p className="text-gray-400 text-sm mb-6 text-center">
        Biar bio Instagram lo makin estetik.
      </p>

      <input
        type="text"
        placeholder="Ketik sesuatu..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-gray-50 border-2 border-black rounded-xl px-4 py-3 font-bold mb-8 focus:outline-none"
      />

      <div className="space-y-4">
        {[
          { label: "S P A C E D", val: toSpaced(input) },
          { label: "Ｆｕｌｌｗｉｄｔｈ", val: toFullWidth(input) },
          { label: "uʍop ǝpısdn", val: toUpsideDown(input) },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 p-4 rounded-xl flex justify-between items-center group hover:border-black transition-colors"
          >
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                {item.label}
              </p>
              <p className="font-medium truncate max-w-[200px]">
                {item.val || "..."}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(item.val)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const apps = [
    { id: "mood", label: "Mood Checker", icon: Smile, color: "text-yellow-500", bg: "bg-yellow-50", component: MoodChecker },
    { id: "inspiration", label: "Inspo Gen", icon: Lightbulb, color: "text-purple-500", bg: "bg-purple-50", component: Inspiration },
    { id: "palette", label: "Palette", icon: Palette, color: "text-pink-500", bg: "bg-pink-50", component: ColorPalette },
    { id: "timer", label: "Timer", icon: Clock, color: "text-blue-500", bg: "bg-blue-50", component: StudyTimer },
    { id: "quiz", label: "Quiz", icon: HelpCircle, color: "text-green-500", bg: "bg-green-50", component: PersonalityQuiz },
    { id: "decision", label: "Decision", icon: CheckCircle, color: "text-red-500", bg: "bg-red-50", component: DecisionMaker },
    { id: "khodam", label: "Cek Khodam", icon: Ghost, color: "text-purple-800", bg: "bg-purple-100", component: CekKhodam },
    { id: "excuse", label: "Excuse Gen", icon: XCircle, color: "text-orange-500", bg: "bg-orange-50", component: ExcuseGenerator },
    { id: "delulu", label: "Delulu Calc", icon: Heart, color: "text-pink-600", bg: "bg-pink-100", component: DeluluCalculator },
    { id: "text", label: "Aesthetic Txt", icon: Type, color: "text-indigo-500", bg: "bg-indigo-50", component: AestheticText },
];

const MiniAppsLayout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read searchParams directly in the Client Component
  const activeAppId = searchParams.get("app") || "mood";

  const handleAppChange = (appId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("app", appId);
    router.push(`${pathname}?${current.toString()}`);
  };

  const ActiveComponent = apps.find((a) => a.id === activeAppId)?.component || MoodChecker;

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm sticky top-28">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppChange(app.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all w-full text-left shrink-0 md:shrink ${
                  activeAppId === app.id
                    ? "bg-black text-white shadow-lg transform scale-105"
                    : "hover:bg-gray-50 text-gray-500 hover:text-black"
                }`}
              >
                <div
                  className={`p-1.5 rounded-full ${
                    activeAppId === app.id ? "bg-white/20" : app.bg
                  } ${activeAppId === app.id ? "text-white" : app.color}`}
                >
                  <app.icon size={16} />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">
                  {app.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main App Area */}
      <div className="grow">
        <div className="bg-white rounded-5xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden transition-all">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl z-0 opacity-50"></div>

          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500" key={activeAppId}>
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniAppsLayout;
