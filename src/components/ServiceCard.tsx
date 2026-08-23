import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  href: string;
}

export default function ServiceCard({ title, description, icon, imageUrl, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Top Left Icon Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="w-8 h-8 bg-[#1f2937] rounded flex items-center justify-center text-brand-accent shadow-sm">
            {/* The icon from lucide-react passed in usually needs specific sizing, but we'll assume it handles it or we scale it. Let's wrap icon to ensure size */}
            <div className="[&>svg]:w-4 [&>svg]:h-4">
              {icon}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-[1.1rem] font-bold text-brand-primary mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {description}
        </p>
        
        <Link href={href} className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 tracking-wider uppercase mt-auto group/link">
          Learn More
          <ArrowRight className="w-3.5 h-3.5 text-brand-accent group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
