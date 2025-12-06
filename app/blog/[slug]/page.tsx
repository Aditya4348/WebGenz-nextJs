import { ButtonBack } from "@/components/buttonBack";
import { blogPosts } from "@/data/mockData";
import BlogContent from "./BlogContent";
import { use } from "react";
import CommentSection from "./ComenntSection";
import RangkingNetizen from "./RankingNetizen";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((post) => post.slug === slug);
  const comments = post?.comments || [];




  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">404 - Artikel Tidak Ditemukan</h1>
        <p className="text-gray-500">Maaf, artikel yang kamu cari tidak ada.</p>
      </div>
    );
  }

  return (
    <main className="pb-12 animate-in fade-in duration-500 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <ButtonBack linkTo="blog" />

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <section className="w-full lg:w-2/3">
          <BlogContent post={post} />

          <CommentSection post={post} />
        </section>

        <RangkingNetizen user={post.author} post={post} relatedPosts={blogPosts}/>

      </div>
    </main>
  );
}
