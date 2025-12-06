import { BlogPost } from "@/types/types";
import { Bookmark, Share2 } from "lucide-react";

export default function BlogContent({ post }: { post: BlogPost }) {
  return (
    <article>
      {/* Article Header */}
      <header className="mb-10 text-center lg:text-left">
        <div className="inline-block px-3 py-1 bg-gen-purple/30 text-purple-900 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          {post.category}
        </div>
        <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              className="w-8 h-8 rounded-full"
              alt="Author"
            />
            <span className="font-medium text-black">{post.author.name}</span>
          </div>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Cover Image */}
      <div className="w-full aspect-video md:aspect-21/9 overflow-hidden rounded-4xl mb-12 shadow-lg">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <Share2 size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        <article
          className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-purple-600 prose-img:rounded-2xl text-gray-700 leading-relaxed max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
