import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  imageUrl: string;
  href: string;
}

export default function ProjectCard({ title, location, category, imageUrl, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] premium-shadow">
        {/* Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider rounded-md mb-2">
              {category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {/* Hover Reveal CTA */}
          <div className="flex items-center gap-2 text-brand-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span>View Project</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
