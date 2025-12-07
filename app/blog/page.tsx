import BlogList from "@/components/blog/BlogList";
import { blogPosts } from "@/data/mockData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Portorin – Tips, Tutorial & Artikel Random untuk Gen Z",
  description:
    "Jelajahi kumpulan artikel Portorin tentang teknologi, gaya hidup, pengembangan diri, dan hal-hal random yang menarik untuk Gen Z.",
  keywords: [
    "blog portorin",
    "artikel teknologi",
    "tips coding",
    "pengembangan diri",
    "gaya hidup",
    "kesehatan mental",
    "Gen Z",
    "tutorial web development",
    "artikel random"
  ],
  metadataBase: new URL("https://yourdomain.com"), // base URL untuk canonical & OG
  openGraph: {
    title: "Blog Portorin – Tips, Tutorial & Artikel Random untuk Gen Z",
    description:
      "Jelajahi kumpulan artikel Portorin tentang teknologi, gaya hidup, pengembangan diri, dan hal-hal random yang menarik untuk Gen Z.",
    url: "/blog",
    images: [
      {
        url: "https://picsum.photos/seed/blog/1200/630",
        width: 1200,
        height: 630,
        alt: "Portorin Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Portorin – Tips, Tutorial & Artikel Random untuk Gen Z",
    description:
      "Jelajahi kumpulan artikel Portorin tentang teknologi, gaya hidup, pengembangan diri, dan hal-hal random yang menarik untuk Gen Z.",
    images: ["https://picsum.photos/seed/blog/1200/630"],
  },
  alternates: {
    canonical: "/blog", // pastikan canonical URL
  },
};

export default async function BlogPage() {
//   const response = await fetch("/api/blog", { cache: "no-store" });
//   const data = await response.json();

  return <BlogList posts={blogPosts} />;
}
