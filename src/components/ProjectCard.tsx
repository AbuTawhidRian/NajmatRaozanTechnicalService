import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  subtitle?: string;
  imageUrl: string;
  href: string;
}

export default function ProjectCard({ title, location, category, subtitle, imageUrl, href }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top Right Category Tag */}
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-block px-3 py-1 bg-[#f59e0b] text-gray-900 text-[0.65rem] font-bold uppercase tracking-wider rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Bottom Gradient for Text Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
        
        {/* Overlaid Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end">
          <h3 className="text-lg font-bold text-white mb-1 leading-tight tracking-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-300 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="p-4 bg-white">
        <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest">
          {subtitle || "INSTALLATION & REPAIR"}
        </p>
      </div>
    </div>
  );
}
