import Image from "next/image";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-brand-light overflow-hidden relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-brand-primary rounded-2xl overflow-hidden flex flex-col lg:flex-row relative">
          {/* Left Image */}
          <div className="lg:w-[45%] relative min-h-[300px] lg:min-h-full">
            <Image
              src="/images/technician-repair.jpg"
              alt="Rolling Shutter Repair Technician"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="lg:w-[55%] p-10 md:p-14 lg:p-16 relative z-10 flex flex-col justify-center bg-[#111827]">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1f2937] w-max mb-6">
              <span className="text-[0.65rem] font-bold tracking-wider text-brand-accent uppercase">
                Fast & Reliable Service
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Need Rolling Shutter Repair?
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              Jammed shutters, broken springs, bent slats or a motor that stopped responding — our emergency team attends the same day, with common spare parts already in the van. Most repairs are finished in one visit so your shop or garage is secure again fast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="tel:+971503463150" 
                className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-primary rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a 
                href="https://wa.me/971503463150" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent hover:bg-white/5 border border-gray-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              <span>Available across Dubai</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
