import BlogList from "@/components/blog/BlogList";
import { blogPosts } from "@/data/mockData";

export default async function BlogPage() {
//   const response = await fetch("/api/blog", { cache: "no-store" });
//   const data = await response.json();

  return <BlogList posts={blogPosts} />;
}
