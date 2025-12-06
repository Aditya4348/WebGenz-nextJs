
export enum Category {
  CURHAT = 'Curhat Gen Z',
  DIGITAL_LIFE = 'Digital Life',
  TECH = 'Tech & Coding',
  RANDOM = 'Random Stuff',
  SELF_DEV = 'Self Development',
}

export interface Author {
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  replies?: Comment[];
  isAnonymous?: boolean;
  userXp?: number; // Visual XP for the commenter
  badge?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for simplicity
  coverImage: string;
  category: Category;
  author: Author;
  date: string;
  readingTime: string;
  tags: string[];
  comments?: Comment[];
}

export interface Quote {
  text: string;
  author: string;
  bgColor: string;
}

export interface CreatorProfile {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  socials: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  philosophy: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  articlesCount: number;
  topBadge?: string;
  xp: number; // For leaderboard
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  quote?: string; 
  xp: number; // Gamification
  badges: string[];
}

export interface Menfess {
  id: string;
  to: string;
  from: string;
  message: string;
  color: string; // Tailwind bg class
  createdAt: string;
  reactions: number;
  sticker?: '❤️' | '🔥' | '😭' | '🤡' | '✨'; 
}
