"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import {
  QrCode,
  Sparkles,
  Fingerprint,
  Share2,
  Download,
  ShieldCheck,
  Edit2,
  Save,
  X,
  FileText,
  Plus,
  Trash2,
  Layout,
  Image as ImageIcon,
  Eye,
  User,
  Ghost,
  LogOut,
} from "lucide-react";
import UserAvatar from "@/components/userAvatar";

const UserProfile: React.FC = () => {
  const { user, isLoading, logoutMutate, isLoggingOut } = useAuth();
  const router = useRouter();

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editQuote, setEditQuote] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"identity" | "blog">("identity");

  // Blog Management State (Mock)
  const [isCreating, setIsCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      title: "Kenapa Gue Suka Koding?",
      date: "20 Oct 2023",
      status: "Published",
      category: "Tech & Coding",
    },
    {
      id: 2,
      title: "Draft: Ide Startup Kucing",
      date: "22 Oct 2023",
      status: "Draft",
      category: "Random Stuff",
    },
  ]);
  const [postForm, setPostForm] = useState({
    title: "",
    category: "Curhat Gen Z",
    content: "",
    isAnonymous: false,
  });
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const categoryPresets = [
    "Curhat Gen Z",
    "Tech & Coding",
    "Random Stuff",
    "Digital Life",
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPostId) {
      // Update existing post
      setUserPosts(
        userPosts.map((post) =>
          post.id === editingPostId
            ? { ...post, title: postForm.title, category: postForm.category }
            : post,
        ),
      );
      setEditingPostId(null);
    } else {
      // Create new post
      const newPost = {
        id: Date.now(),
        title: postForm.title,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "Published",
        category: postForm.category,
      };
      setUserPosts([newPost, ...userPosts]);
    }

    setIsCreating(false);
    setPostForm({
      title: "",
      category: "Curhat Gen Z",
      content: "",
      isAnonymous: false,
    });
    setIsCustomCategory(false);
  };

  const handleEditPost = (post: any) => {
    setPostForm({
      title: post.title,
      category: post.category,
      content: post.content || "",
      isAnonymous: post.isAnonymous || false,
    });
    setEditingPostId(post.id);
    setIsCreating(true);
    setIsCustomCategory(!categoryPresets.includes(post.category));
  };

  const handleDeletePost = (id: number) => {
    setUserPosts(userPosts.filter((p) => p.id !== id));
  };

  // Initialize state when user loads
  // And redirect if user is not logged in
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditQuote(user.quote || "Belum ada kata-kata mutiara.");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    // Return a loading state or null while redirecting
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  // const handleSave = () => {
  //   updateUser({
  //     name: editName,
  //     quote: editQuote,
  //   });
  //   setIsEditing(false);
  // };

  const handleCancel = () => {
    setEditName(user.name);
    setEditQuote(user.quote || "");
    setIsEditing(false);
  };

  // Random Generate "Vibe" based on name length
  const vibes = [
    "Main Character Energy",
    "Lowkey Genius",
    "Professional Overthinker",
    "Certified Slay",
    "Chaos Coordinator",
  ];
  const userVibe = vibes[user.name.length % vibes.length];
  // console.log(userVibe);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">
          {activeTab === "identity" ? "IDENTITY CARD" : "MY STUDIO"}
        </h1>
        <p className="text-gray-500">
          {activeTab === "identity"
            ? "Ini bukti valid kalo lo bagian dari circle ini."
            : "Ruang kreasi lo. Tulis apa aja, bebas."}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex p-1.5 bg-gray-100 rounded-full mb-10 border border-gray-200 relative">
        <button
          onClick={() => setActiveTab("identity")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "identity" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black"}`}
        >
          <Fingerprint size={16} /> Identity
        </button>
        <button
          onClick={() => setActiveTab("blog")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "blog" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black"}`}
        >
          <Layout size={16} /> Manage Blog
        </button>
      </div>

      {activeTab === "identity" ? (
        <>
          {/* Control Bar (Only for Identity) */}
          <div className="mb-6 flex gap-4 animate-in fade-in zoom-in duration-300">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-black hover:text-white transition-colors"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                <button
                  // onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition-colors"
                >
                  <Save size={14} /> Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 rounded-full font-bold text-sm hover:bg-red-200 transition-colors"
                >
                  <X size={14} /> Batal
                </button>
              </div>
            )}
          </div>

          {/* THE ID CARD */}
          <div className="relative group perspective-1000 animate-in slide-in-from-bottom-8 duration-500">
            <div
              className={`w-[350px] md:w-[450px] bg-white rounded-[2rem] p-6 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transition-transform duration-500 ${!isEditing && "hover:rotate-1 hover:scale-[1.02]"}`}
            >
              {/* Holographic/Gradient Background Overlay */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-linear-to-br from-gen-purple/40 via-gen-blue/40 to-transparent rounded-full blur-3xl z-0 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

              {/* Header Card */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <Sparkles size={16} className="text-gen-yellow" />
                  </div>
                  <span className="font-display font-bold text-lg tracking-tight">
                    VibeHub<span className="text-purple-600">.ID</span>
                  </span>
                </div>
                <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-800">
                  Official Member
                </div>
              </div>

              {/* Photo & Main Info */}
              <div className="flex gap-6 items-center mb-6 relative z-10">
                <div className="relative">
                  <UserAvatar src={user?.avatar} size={96} />
                  <div className="absolute -bottom-2 -right-2 bg-gen-mint border-2 border-black rounded-full p-1.5">
                    <ShieldCheck size={14} className="text-black" />
                  </div>
                </div>
                <div className="grow">
                  {isEditing ? (
                    <div className="mb-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        Edit Nama
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-gray-50 border-b-2 border-black focus:outline-none font-display font-black text-xl px-1"
                      />
                    </div>
                  ) : (
                    <h2 className="font-display font-black text-2xl leading-none mb-1">
                      {user.name}
                    </h2>
                  )}

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {user.role}
                  </p>
                  <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold border border-purple-200">
                    {userVibe} ✨
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6 relative z-10 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">
                    Email Address
                  </p>
                  <p className="font-bold truncate">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">
                    Joined Date
                  </p>
                  <p className="font-bold">Oct 2023</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">
                    ID Number
                  </p>
                  <p className="font-mono font-bold">{user.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold mb-1 uppercase text-[10px]">
                    Status
                  </p>
                  <p className="font-bold text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                    Active
                  </p>
                </div>
              </div>

              {/* NEW: Quote of The Day Section */}
              <div className="mb-6 relative z-10">
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl p-3 relative transform -rotate-1">
                  <div className="absolute -top-3 left-4 bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
                    Kata-kata Hari Ini
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editQuote}
                      onChange={(e) => setEditQuote(e.target.value)}
                      className="w-full bg-transparent border-b border-yellow-300 focus:outline-none text-sm font-medium italic text-gray-800 resize-none h-16 leading-relaxed"
                      placeholder="Tulis sesuatu yang bijak (atau receh)..."
                      maxLength={80}
                    />
                  ) : (
                    <p className="font-display font-bold text-lg leading-tight text-gray-800 italic">
                      "
                      {user.quote ||
                        "Hidup itu random, yang penting outfit cakep."}
                      "
                    </p>
                  )}
                </div>
              </div>

              {/* Footer / Barcode */}
              <div className="flex justify-between items-end border-t-2 border-dashed border-gray-200 pt-4 relative z-10">
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-gray-400 font-medium max-w-[150px] leading-tight">
                    Kartu ini sah digunakan untuk flexing di sosial media.
                  </p>
                </div>
                <div className="opacity-80">
                  <QrCode size={40} />
                </div>
              </div>

              {/* Fingerprint Decoration */}
              <div className="absolute bottom-4 right-16 opacity-5 rotate-12 pointer-events-none">
                <Fingerprint size={120} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
              <Share2 size={18} /> Pamerin (Share)
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-black rounded-full font-bold hover:bg-gray-50 transition-colors">
              <Download size={18} /> Simpan
            </button>
          </div>
        </>
      ) : (
        /* BLOG MANAGEMENT TAB */
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {!isCreating ? (
            // List View
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center bg-gen-yellow p-6 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_black] gap-4">
                <div className="text-center md:text-left">
                  <h2 className="font-display font-bold text-2xl">
                    Tulisan Gue
                  </h2>
                  <p className="text-sm font-medium opacity-80">
                    Total {userPosts.length} artikel published.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingPostId(null);
                    setPostForm({
                      title: "",
                      category: "Curhat Gen Z",
                      content: "",
                      isAnonymous: false,
                    });
                    setIsCustomCategory(false);
                  }}
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                >
                  <Plus size={18} /> Tulis Baru
                </button>
              </div>

              <div className="grid gap-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white p-5 rounded-2xl border-2 border-gray-100 hover:border-black transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                    >
                      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex shrink-0 items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                          <FileText size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg leading-tight group-hover:text-purple-600 transition-colors line-clamp-1">
                            {post.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs font-bold text-gray-400 mt-1">
                            <span className="whitespace-nowrap">
                              {post.date}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md whitespace-nowrap ${post.status === "Published" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
                            >
                              {post.status}
                            </span>
                            <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md whitespace-nowrap">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                          // onClick={() => handleEditPost(post)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold">
                      Belum ada tulisan. Mulai berkarya!
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Create Form
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="font-display font-bold text-2xl">
                  {editingPostId ? "Edit Artikel" : "Tulis Artikel Baru"}
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Kasih judul yang clickbait dikit..."
                    value={postForm.title}
                    onChange={(e) =>
                      setPostForm({ ...postForm, title: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Cover Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 font-bold text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer focus:outline-none focus:border-black focus:bg-white transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ImageIcon size={20} />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Kategori</label>
                  {!isCustomCategory ? (
                    <div className="flex flex-wrap gap-2">
                      {categoryPresets.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() =>
                            setPostForm({ ...postForm, category: cat })
                          }
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${postForm.category === cat ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-black"}`}
                        >
                          {cat}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(true);
                          setPostForm({ ...postForm, category: "" });
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2 border-gray-200 bg-white text-gray-500 hover:border-black hover:text-black transition-all flex items-center gap-1"
                      >
                        <Plus size={14} /> Lainnya
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                      <input
                        type="text"
                        placeholder="Ketik nama kategori baru..."
                        value={postForm.category}
                        onChange={(e) =>
                          setPostForm({ ...postForm, category: e.target.value })
                        }
                        className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 font-bold focus:outline-none focus:border-black focus:bg-white transition-all"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(false);
                          setPostForm({
                            ...postForm,
                            category: categoryPresets[0],
                          });
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2 border-gray-200 hover:bg-gray-100 transition-all"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Isi Konten</label>
                  <textarea
                    required
                    placeholder="Tumpahkan semua di sini..."
                    value={postForm.content}
                    onChange={(e) =>
                      setPostForm({ ...postForm, content: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 py-4 font-medium min-h-[200px] focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300 resize-y"
                  />
                </div>

                {/* Anonymous Option */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Mode Posting</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setPostForm({ ...postForm, isAnonymous: false })
                      }
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all ${
                        !postForm.isAnonymous
                          ? "bg-black text-white border-black shadow-md"
                          : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          !postForm.isAnonymous ? "bg-white/20" : "bg-gray-100"
                        }`}
                      >
                        <User size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-sm">
                          Gunakan Nama Asli
                        </span>
                        <span className="block text-[10px] opacity-70">
                          Posting sebagai {user.name}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setPostForm({ ...postForm, isAnonymous: true })
                      }
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all ${
                        postForm.isAnonymous
                          ? "bg-black text-white border-black shadow-md"
                          : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          postForm.isAnonymous ? "bg-white/20" : "bg-gray-100"
                        }`}
                      >
                        <Ghost size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-sm">
                          Mode Anonim
                        </span>
                        <span className="block text-[10px] opacity-70">
                          Identitas disembunyikan
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gen-purple text-white border-2 border-black py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[4px_4px_0px_0px_black] hover:shadow-none translate-y-0 hover:translate-y-1"
                  >
                    {editingPostId ? "Simpan Perubahan" : "Publish Sekarang"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200 w-full max-w-lg">
        <button
          onClick={() => logoutMutate()}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
               text-sm font-semibold text-red-600 
               bg-red-50 hover:bg-red-100 
               transition-all duration-200
               disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut size={16} />
          {isLoggingOut ? "Logging out..." : "Log Out dari Sini"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
