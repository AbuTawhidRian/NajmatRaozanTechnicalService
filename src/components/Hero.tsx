import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Clock, MapPin, Wrench, Phone, CheckCircle2, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/images/hero-shutter.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-brand-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-brand-primary/70" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 pt-12 lg:pt-0">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/40 bg-transparent">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
              Trusted Rolling Shutter & Sunshade Services in Dubai
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] text-balance tracking-tight">
            Professional Rolling Shutter & <span className="text-brand-accent">Sunshade Solutions</span> in Dubai
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Installation, repair and maintenance for shops, villas, warehouses, garages and commercial properties.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <Link 
              href="/quote" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-brand-primary rounded font-bold text-lg flex items-center justify-center transition-all transform hover:-translate-y-0.5"
            >
              Get Free Quotation
            </Link>
            
            <a 
              href="https://wa.me/971503463150" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-gray-400 hover:border-white rounded font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-300 mt-6 tracking-wide">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span className="uppercase">Fast Response</span>
            </div>
            <div className="hidden sm:inline w-1 h-1 rounded-full bg-gray-500"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span className="uppercase">Professional Installation</span>
            </div>
            <div className="hidden sm:inline w-1 h-1 rounded-full bg-gray-500"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span className="uppercase">Free Site Visit</span>
            </div>
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="lg:col-span-5 hidden lg:flex justify-end relative">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-brand-accent">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Rated by 200+ Dubai clients</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Shutter stuck or damaged?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Send us a photo on WhatsApp and get an indicative price today. Free site visit across Dubai.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6">
              <div>
                <div className="text-[0.65rem] text-gray-400 font-bold tracking-wider uppercase mb-1">Response</div>
                <div className="text-lg font-bold text-gray-900">Under 60 min</div>
              </div>
              <div>
                <div className="text-[0.65rem] text-gray-400 font-bold tracking-wider uppercase mb-1">Site Visit</div>
                <div className="text-lg font-bold text-gray-900">Free</div>
              </div>
            </div>

            <div className="space-y-3">
              <a href="tel:+971503463150" className="w-full flex items-center justify-center gap-2 p-3.5 rounded-lg bg-[#1a202c] hover:bg-black text-white font-bold transition-colors">
                <Phone className="w-4 h-4" />
                +971 50 346 3150
              </a>

              <a href="https://wa.me/971503463150" className="w-full flex items-center justify-center gap-2 p-3.5 rounded-lg bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold transition-colors">
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
