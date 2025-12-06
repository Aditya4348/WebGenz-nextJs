import { Crown, Zap, Medal, MessageCircle, Ghost} from "lucide-react";

export const getBadge = (xp: number) => {
  if (xp >= 5000) return { label: 'The Sepuh', color: 'bg-yellow-400 text-black', icon: Crown };
  if (xp >= 2500) return { label: 'Suhu', color: 'bg-purple-500 text-white', icon: Zap };
  if (xp >= 1000) return { label: 'Active', color: 'bg-blue-500 text-white', icon: Medal };
  if (xp >= 100) return { label: 'Warga', color: 'bg-green-500 text-white', icon: MessageCircle };
  return { label: 'Newbie', color: 'bg-gray-200 text-gray-500', icon: Ghost };
};

// Helper for Anonymous Names
export const anonNames = ["Netizen Budiman", "Ghost Writer", "Si Paling Anonim", "Kang Komen", "Spy X Family", "Anonim Santuy"];
export const getRandomAnonName = () => anonNames[Math.floor(Math.random() * anonNames.length)];