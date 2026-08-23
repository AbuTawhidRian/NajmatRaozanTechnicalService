import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  href: string;
  index?: number;
}

export default function ServiceCard({ title, description, icon, imageUrl, href, index = 0 }: ServiceCardProps) {
  const delayClass = `fade-up-delay-${(index % 8) + 1}`;
  return (
    <Link
      href={href}
      className={`fade-up ${delayClass} group relative rounded-2xl overflow-hidden flex flex-col h-72 shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer`}
    >
      {/* Full-bleed background image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark gradient overlay — stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />

      {/* Gold shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/0 to-brand-accent/0 group-hover:from-brand-accent/10 group-hover:to-transparent transition-all duration-500 z-10" />

      {/* Icon badge top-left */}
      <div className="absolute top-4 left-4 z-20">
        <div className="w-9 h-9 bg-brand-accent/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-primary shadow-md group-hover:scale-110 transition-transform duration-300">
          <div className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-brand-primary">
            {icon}
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        {/* Gold slide-in accent bar */}
        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-brand-accent to-yellow-300 transition-all duration-500 mb-3 rounded-full" />

        <h3 className="text-base font-bold text-white mb-1.5 tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          {description}
        </p>
        <div className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold text-brand-accent tracking-widest uppercase">
          Learn More
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
