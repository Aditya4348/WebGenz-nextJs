"use client";

import React, { useState, useMemo } from 'react';
// import { blogPosts } from '@/data/mockData';
import { Category } from '@/types/types';
import { BlogCard, CategoryTag, SectionHeader } from '@/components/UI';
import { Search } from 'lucide-react';

// interface BlogListProps {
//   posts: blogPosts[];
// }

const BlogList: React.FC<{ posts: any[] }> = ({posts}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Object.values(Category)];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="pb-12 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <SectionHeader 
        title="The Blog" 
        subtitle="Kumpulan tulisan random untuk menemani overthinking kamu." 
      />

      {/* Controls Area */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between sticky top-24 z-30 bg-white/90 backdrop-blur-xl p-4 rounded-3xl border border-gray-100 shadow-sm">
        {/* Categories (Scrollable) */}
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex gap-2">
            {categories.map(cat => (
              <CategoryTag 
                key={cat} 
                category={cat} 
                isActive={selectedCategory === cat} 
                onClick={() => setSelectedCategory(cat)} 
              />
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari topik..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          {filteredPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">Wah, artikelnya gak ketemu nih.</p>
          <button 
            onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
            className="mt-4 text-black font-semibold underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;