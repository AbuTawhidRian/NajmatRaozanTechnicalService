import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Clock, MapPin, Phone, CheckCircle2, ChevronDown } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export default async function Hero() {
  const settings = await getSiteSettings();
  return (
    <section className="relative min-h-[92vh] flex items-center pt-16 overflow-hidden">
      {/* Background Image with rich layered overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: 'url("https://overheaddoor-production-assets.azureedge.net/assets/images/default-source/product-images/commercial/rolling-shutter/allura-shutter-653-powder-coat.jpg?sfvrsn=5eea7e43_1")',
        }}
      />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-primary/95 via-brand-primary/80 to-brand-primary/40" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-brand-primary/80 via-transparent to-brand-primary/30" />

      {/* Subtle animated radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] z-[2] rounded-full bg-brand-accent/5 blur-[120px] animate-pulse" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center py-16">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          
          {/* Badge with pulsing dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 backdrop-blur-sm fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
            </span>
            <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
              Trusted Rolling Shutter &amp; Sunshade Services in Dubai
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] text-balance tracking-tight fade-up fade-up-delay-1">
            Professional Rolling Shutter &amp;{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent bg-clip-text text-transparent">
                Sunshade Solutions
              </span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />
            </span>{" "}
            in Dubai
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed fade-up fade-up-delay-2">
            Installation, repair and maintenance for shops, villas, warehouses, garages and commercial properties.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 fade-up fade-up-delay-3">
            <Link 
              href="/quote" 
              className="group w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-brand-primary rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(229,152,25,0.3)] hover:shadow-[0_0_40px_rgba(229,152,25,0.5)] hover:-translate-y-0.5"
            >
              Get Free Quotation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust bullets */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-gray-300 mt-2 fade-up fade-up-delay-4">
            {["Fast Response", "Professional Installation", "Free Site Visit"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span className="uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="lg:col-span-5 hidden lg:flex justify-end">
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] w-full max-w-md border border-white/20 fade-up fade-up-delay-2">
            {/* Gold top accent */}
            <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent rounded-full" />

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-brand-accent">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">Rated by 200+ Dubai clients</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Shutter stuck or damaged?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Send us a photo on WhatsApp and get an indicative price today. Free site visit across Dubai.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6">
              <div className="bg-brand-light rounded-lg p-3">
                <div className="text-[0.65rem] text-gray-400 font-bold tracking-wider uppercase mb-1">Response</div>
                <div className="text-lg font-bold text-brand-primary">Under 60 min</div>
              </div>
              <div className="bg-brand-light rounded-lg p-3">
                <div className="text-[0.65rem] text-gray-400 font-bold tracking-wider uppercase mb-1">Site Visit</div>
                <div className="text-lg font-bold text-brand-primary">Free</div>
              </div>
            </div>

            <div className="space-y-3">
              <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-bold transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                <Phone className="w-4 h-4" />
                {settings.phone}
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50 hover:opacity-80 transition-opacity">
        <span className="text-white text-[0.6rem] tracking-[0.2em] uppercase font-bold">Scroll</span>
        <ChevronDown className="w-4 h-4 text-brand-accent" style={{ animation: "bounce-down 1.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
