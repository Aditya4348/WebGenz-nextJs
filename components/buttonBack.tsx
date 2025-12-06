import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ButtonBack({linkTo}: {linkTo: string}) {
  return (
    <Link
      href={`/${linkTo}`}
      className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"
    >
      <div className="p-2 bg-gray-100 rounded-full">
        <ArrowLeft size={16} />
      </div>
      <span className="font-medium text-sm">Kembali ke list</span>
    </Link>
  );
}
