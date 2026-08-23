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
    <Link href={href} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-hover transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10" />
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Icon Badge */}
          <div className="absolute bottom-0 right-6 translate-y-1/2 z-20">
            <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col pt-10">
          <h3 className="text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">
            {title}
          </h3>
          <p className="text-brand-gray flex-1 leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-brand-primary font-semibold group-hover:text-brand-accent transition-colors mt-auto">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
