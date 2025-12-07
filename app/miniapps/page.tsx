import MiniAppsLayout from "./MiniAppsLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Apps & Fun Tools | Portorin",
  description: "Eksplor mini apps unik dari Portorin: cek mood, delulu calculator, inspirasi harian, dan tools gabut lainnya untuk hiburan sekaligus produktifitas ringan.",
  keywords: [
    "mini apps",
    "fun tools",
    "Portorin",
    "generator online",
    "kalkulator lucu",
    "mood checker",
    "delulu calculator",
    "tools kreatif",
    "hiburan Gen Z",
    "aplikasi ringan"
  ],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Mini Apps & Fun Tools | Portorin",
    description: "Eksplor mini apps unik dari Portorin: cek mood, delulu calculator, inspirasi harian, dan tools gabut lainnya.",
    url: "/miniapps",
    images: [
      {
        url: "https://picsum.photos/seed/miniapps/1200/630",
        width: 1200,
        height: 630,
        alt: "Mini Apps Portorin",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Apps & Fun Tools | Portorin",
    description: "Eksplor mini apps unik dari Portorin: cek mood, delulu calculator, inspirasi harian, dan tools gabut lainnya.",
    images: ["https://picsum.photos/seed/miniapps/1200/630"],
  },
  alternates: {
    canonical: "/miniapps",
  },
};

const MiniAppsPage = () => {
  return (
    <div className="pb-12 pt-4 min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
          MINI APPS
        </h1>
        <p className="text-gray-500">Tools gabut tapi berguna (dikit).</p>
      </div>
      <MiniAppsLayout />
    </div>
  );
};

export default MiniAppsPage;
