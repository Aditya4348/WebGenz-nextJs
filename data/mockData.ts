
import { BlogPost, Category, Quote, CreatorProfile, Contributor, Menfess } from '../types/types';

export const quotes: Quote[] = [
  { text: "Hidup itu random, tapi outfit harus tetap on point.", author: "Unknown Gen Z", bgColor: "bg-purple-300" },
  { text: "Your anxiety is lying to you, bestie.", author: "Mental Health Daily", bgColor: "bg-mint-300" },
  { text: "Touch grass, drink water, code later.", author: "Senior Dev", bgColor: "bg-blue-300" },
  { text: "Do it for the plot.", author: "Life Motto", bgColor: "bg-gen-pink" },
  { text: "Manifesting clear skin and bug-free code.", author: "Portorin", bgColor: "bg-yellow-300" },
];

export const creator: CreatorProfile = {
  name: "Alex 'Portorin' Kai",
  role: "Chief Vibe Officer & Frontend Dev",
  bio: "Just a 22yo living on the internet. Suka kopi gula aren, ngetik kode di React, dan overthinking di jam 3 pagi.",
  image: "https://picsum.photos/seed/alex/400/400",
  skills: ["React", "UI/UX", "Memes", "Vibe Curation", "TypeScript"],
  socials: {
    instagram: "@portorin.id",
    twitter: "@alex_codes",
    linkedin: "in/alexkai"
  },
  philosophy: "Portorin dibuat karena aku capek sama internet yang terlalu serius. Kita butuh space buat napas, ketawa, dan belajar hal random tanpa pressure."
};

export const contributors: Contributor[] = [
  { id: "1", name: "Sarah Dev", role: "Tech Writer", avatar: "https://picsum.photos/seed/sarah/100/100", articlesCount: 5, topBadge: "🔥 MVP", xp: 2500 },
  { id: "2", name: "Rina Zen", role: "Life Coach", avatar: "https://picsum.photos/seed/rina/100/100", articlesCount: 3, xp: 1200 },
  { id: "3", name: "Book Worm", role: "Reviewer", avatar: "https://picsum.photos/seed/book/100/100", articlesCount: 2, xp: 800 },
  { id: "4", name: "Dhani Kopi", role: "Barista", avatar: "https://picsum.photos/seed/dhani/100/100", articlesCount: 1, xp: 300 },
  { id: "5", name: "Anonim123", role: "Overthinker", avatar: "https://picsum.photos/seed/anon/100/100", articlesCount: 10, topBadge: "👑 King", xp: 5000 },
];

export const menfessData: Menfess[] = [
  { id: "m1", to: "Crush Semester 5", from: "Si Paling Belakang", message: "Lo kalo senyum tolong dikondisikan, jantung gue lembur nih.", color: "bg-pink-200", createdAt: "2m ago", reactions: 12, sticker: '❤️' },
  { id: "m2", to: "Dosen Kiler", from: "Pejuang Skripsi", message: "Pak, revisi ke-7 ini tolong di-acc ya, saya mau nikah.", color: "bg-blue-200", createdAt: "15m ago", reactions: 45, sticker: '😭' },
  { id: "m3", to: "Myself", from: "Me", message: "Jangan boros woy! Gopay udah minus.", color: "bg-yellow-200", createdAt: "1h ago", reactions: 8, sticker: '🤡' },
  { id: "m4", to: "Anak IT", from: "Human", message: "Cara benerin printer error gimana sih? Udah dipukul tetep ga bisa.", color: "bg-green-200", createdAt: "3h ago", reactions: 2, sticker: '✨' },
  { id: "m5", to: "Semesta", from: "Anon", message: "Manifesting duit kaget 1M hari ini. Thanks.", color: "bg-purple-200", createdAt: "5h ago", reactions: 99, sticker: '🔥' },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "quarter-life-crisis-valid-gak-sih",
    title: "Quarter Life Crisis: Valid Gak Sih?",
    excerpt: "Bingung arah hidup pas umur 20-an itu wajar banget. Yuk bedah kenapa kita semua ngerasa ketinggalan.",
    content: `
      <p class="mb-4">Jujur deh, siapa yang tiap buka LinkedIn langsung kena mental breakdown? Liat temen udah jadi Manager di umur 23, sedangkan kita masih struggle milih menu makan siang.</p>
      <p class="mb-4">Quarter Life Crisis itu <strong>real</strong>, bestie. Tapi bukan berarti lo gagal. Ini tanda kalo lo lagi bertumbuh.</p>
      <h3 class="text-xl font-bold font-display mb-2">Stop Bandingin Diri</h3>
      <p class="mb-4">Timeline hidup orang itu beda-beda. Obama pensiun di umur 55, Trump baru mulai di umur 70. (Contoh random, tapi you get the point).</p>
      <blockquote class="p-4 bg-yellow-100 rounded-xl border-l-4 border-yellow-400 my-6 italic">
        "Comparison is the thief of joy." - Theodore Roosevelt
      </blockquote>
      <p>Fokus aja sama progress lo sendiri. 1% better everyday itu better daripada 0%.</p>
    `,
    coverImage: "https://picsum.photos/seed/crisis/800/400",
    category: Category.CURHAT,
    author: { name: "Alex Kai", avatar: "https://picsum.photos/seed/alex/100/100" },
    date: "12 Oct 2023",
    readingTime: "5 min read",
    tags: ["Mental Health", "Adulting", "Life"],
    comments: [
      { id: "c1", author: "Budi Santuy", avatar: "https://picsum.photos/seed/budi/100/100", text: "Relate parah min! Gue umur 24 masih bingung mau jadi apa.", date: "1 hour ago", replies: [], userXp: 150, badge: "Newbie" },
      { id: "c2", author: "Siti React", avatar: "https://picsum.photos/seed/siti/100/100", text: "Makasih insightnya, jadi agak tenang dikit.", date: "2 hours ago", replies: [], userXp: 850, badge: "Active" }
    ]
  },
  {
    id: "2",
    slug: "belajar-react-jangan-langsung-loncat-ke-nextjs",
    title: "Belajar React: Jangan Langsung Loncat ke Next.js!",
    excerpt: "Fundamental itu kunci. Jangan fomo pake framework meta kalo `useEffect` aja masih bikin infinite loop.",
    content: `
      <p class="mb-4">Hype train teknologi emang kenceng banget. Tiba-tiba semua orang ngomongin Server Components, Turbopack, blablabla.</p>
      <p class="mb-4">Tapi, pondasi lo udah kuat belum? Coba cek checklist ini:</p>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li>Paham JavaScript ES6+ (Arrow function, destructuring, spread operator)?</li>
        <li>Ngerti konsep Virtual DOM?</li>
        <li>Paham lifecycle component dan hooks dasar (useState, useEffect)?</li>
      </ul>
      <p>Kalo belum, <em>please</em> jangan siksa diri lo langsung loncat ke framework yang kompleks. Build strong foundations first!</p>
    `,
    coverImage: "https://picsum.photos/seed/react/800/400",
    category: Category.TECH,
    author: { name: "Sarah Dev", avatar: "https://picsum.photos/seed/sarah/100/100" },
    date: "10 Oct 2023",
    readingTime: "7 min read",
    tags: ["React", "JavaScript", "Learning"],
    comments: [
        { id: "c3", author: "Dev Pemula", avatar: "https://picsum.photos/seed/dev/100/100", text: "Valid. Gue loncat ke NextJS malah pusing sendiri wkwk.", date: "1 day ago", replies: [], userXp: 20, badge: "Newbie" }
    ]
  },
  {
    id: "3",
    slug: "digital-detox-24-jam-tanpa-sosmed",
    title: "Digital Detox: 24 Jam Tanpa Sosmed",
    excerpt: "Gimana rasanya seharian gak scroll TikTok? Ternyata dunia nyata lebih HD daripada layar HP.",
    content: `
      <p class="mb-4">Kemarin gue nyoba tantangan gila: 24 jam tanpa Instagram, TikTok, dan Twitter. Cuma WA buat kerjaan.</p>
      <h3 class="text-xl font-bold font-display mb-2">Jam 1-3: Sakaw</h3>
      <p class="mb-4">Jari gue otomatis ngetap posisi icon IG, padahal udah gue uninstall. Serem banget refleknya.</p>
      <h3 class="text-xl font-bold font-display mb-2">Jam 12: Ketenangan</h3>
      <p class="mb-4">Gue akhirnya baca buku fisik. Masak mie instan dengan penuh penghayatan. Ternyata bengong liatin langit itu therapeutic.</p>
    `,
    coverImage: "https://picsum.photos/seed/detox/800/400",
    category: Category.DIGITAL_LIFE,
    author: { name: "Rina Zen", avatar: "https://picsum.photos/seed/rina/100/100" },
    date: "05 Oct 2023",
    readingTime: "4 min read",
    tags: ["Minimalism", "Health", "Social Media"],
    comments: []
  },
  {
    id: "4",
    slug: "kenapa-kucing-adalah-bos-sebenarnya",
    title: "Kenapa Kucing Adalah Bos Sebenarnya",
    excerpt: "Analisis mendalam kenapa kita rela jadi babu buat makhluk berbulu yang judes ini.",
    content: `<p>Meow. Itu aja sih intinya. Kita semua diperbudak keimutan.</p>`,
    coverImage: "https://picsum.photos/seed/cat/800/400",
    category: Category.RANDOM,
    author: { name: "Alex Kai", avatar: "https://picsum.photos/seed/alex/100/100" },
    date: "01 Oct 2023",
    readingTime: "2 min read",
    tags: ["Cats", "Humor"],
    comments: []
  },
  {
    id: "5",
    slug: "atomic-habits-versi-gen-z",
    title: "Atomic Habits: Versi Gen Z",
    excerpt: "Gak perlu perubahan besar. Cukup 1% tapi konsisten, kayak naikin rank Mobile Legends.",
    content: `<p>Mulai dari ngerapiin tempat tidur. Abis itu minum air. Kelar.</p>`,
    coverImage: "https://picsum.photos/seed/habit/800/400",
    category: Category.SELF_DEV,
    author: { name: "Book Worm", avatar: "https://picsum.photos/seed/book/100/100" },
    date: "28 Sep 2023",
    readingTime: "6 min read",
    tags: ["Books", "Productivity"],
    comments: []
  }
];
