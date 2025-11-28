import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar, Quote as QuoteIcon, Hash } from 'lucide-react';
import { BlogPost, Quote } from '../types/types';

export const CategoryTag: React.FC<{ category: string; isActive?: boolean; onClick?: () => void }> = ({ category, isActive, onClick }) => {
  const baseClasses = "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border-2 cursor-pointer select-none flex items-center gap-2";
  const activeClasses = "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transform -translate-y-1";
  const inactiveClasses = "bg-white text-gray-500 border-gray-100 hover:border-black hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Hash size={14} className={isActive ? "text-gen-yellow" : "text-gray-400"} />
      {category}
    </button>
  );
};

export const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link href={`/blog/${post.id}`} className="group block h-full relative">
      <div className="bg-white rounded-4xl p-4 border-2 border-gray-100 shadow-sm group-hover:border-black group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full flex flex-col relative z-10">
        <div className="relative overflow-hidden rounded-3xl aspect-16/10 mb-5 border border-gray-100">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10"></div>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute top-4 left-4 z-20">
             <span className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-100 shadow-sm flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  post.category.includes('Tech') ? 'bg-blue-400' : 
                  post.category.includes('Curhat') ? 'bg-purple-400' : 'bg-green-400'
                }`}></div>
                {post.category}
             </span>
          </div>
        </div>
        
        <div className="px-2 grow flex flex-col">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">
             <span className="flex items-center gap-1.5"><Calendar size={12}/> {post.date}</span>
             <span className="flex items-center gap-1.5"><Clock size={12}/> {post.readingTime}</span>
          </div>
          
          <h3 className="font-display font-bold text-xl md:text-2xl mb-3 group-hover:text-purple-600 transition-colors leading-tight line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed grow">
            {post.excerpt}
          </p>
          
          <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-gray-100" />
              <span className="text-xs font-bold text-gray-900">{post.author.name}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const QuoteCard: React.FC<{ quote: Quote }> = ({ quote }) => {
  return (
    <div className={`rounded-[2.5rem] p-8 md:p-12 ${quote.bgColor} relative overflow-hidden transition-all duration-500 group border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1`}>
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <QuoteIcon size={120} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block transform -rotate-2">
            Daily Wisdom
        </div>
        <p className="font-display font-bold text-3xl md:text-5xl leading-tight mb-8 text-gray-900">
          "{quote.text}"
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-1 bg-black rounded-full mb-2"></div>
          <p className="text-sm font-bold uppercase tracking-widest text-black">
            {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; link?: string }> = ({ title, subtitle, link }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <h2 className="font-display font-black text-4xl md:text-5xl relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-1/2 h-4 bg-gen-yellow/60 -z-10 rounded-full transform -rotate-1"></span>
        </h2>
        {subtitle && <p className="text-gray-500 mt-3 text-lg font-medium max-w-lg">{subtitle}</p>}
      </div>
      {link && (
        <Link href={link} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 font-bold text-sm hover:bg-black hover:text-white transition-all group">
          Lihat Semua <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
        </Link>
      )}
    </div>
  );
};