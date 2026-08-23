import Image from "next/image";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-brand-light overflow-hidden relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative bg-brand-primary rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_30px_80px_rgba(10,37,64,0.4)]">

          {/* Left Image */}
          <div className="lg:w-[45%] relative min-h-[300px] lg:min-h-full overflow-hidden">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2z4TZPQIrssREWXr895jxdxeGhPiNFX77MtKOuXFuOozgESQgCSJsySoD&s=10"
              alt="Rolling Shutter Repair Technician"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Right fade for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-primary/60 lg:to-brand-primary/80" />
          </div>

          {/* Right Content — dark with radial glow */}
          <div className="lg:w-[55%] p-10 md:p-14 lg:p-16 relative z-10 flex flex-col justify-center bg-[#0d1b2e]">
            {/* Radial background glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Decorative dots top-right */}
            <div className="absolute top-6 right-6 grid grid-cols-3 gap-1.5 opacity-20">
              {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-brand-accent" />)}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 w-max mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
                </span>
                <span className="text-[0.65rem] font-bold tracking-wider text-brand-accent uppercase">
                  Same-Day Emergency Service
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Need Rolling Shutter Repair?
              </h2>
              
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
                Jammed shutters, broken springs, bent slats or a motor that stopped responding — our emergency team attends the same day, with common spare parts already in the van.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="tel:+971565882185" 
                  className="group px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(229,152,25,0.3)] hover:shadow-[0_0_35px_rgba(229,152,25,0.5)] hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://wa.me/971565882185" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                <span>Available across all areas of Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
