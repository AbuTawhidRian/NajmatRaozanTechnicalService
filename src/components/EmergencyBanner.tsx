import { Phone, MessageCircle } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
      {/* Radial glow from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#173A5E_0%,_#0A2540_65%)] pointer-events-none" />

      {/* Top & bottom gold borders */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />

      {/* Decorative dots */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 opacity-10 hidden md:grid">
        {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-accent" />)}
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 opacity-10 hidden md:grid">
        {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-accent" />)}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="md:w-3/5 text-center md:text-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-xs font-bold text-red-400 tracking-widest uppercase">24/7 Emergency Response</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Need Emergency Rolling Shutter Repair?
            </h2>
            <p className="text-gray-300 text-base max-w-2xl leading-relaxed">
              Our team is ready to respond quickly across Dubai. Available 24/7 for all types of manual and automatic shutter emergencies.
            </p>
          </div>

          <div className="md:w-2/5 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="tel:+971565882185" 
              className="flex-1 px-6 py-4 bg-white text-brand-primary rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 text-brand-primary" />
              Call Now
            </a>
            <a 
              href="https://wa.me/971565882185" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#1ebd5a] transition-all shadow-xl hover:shadow-[0_0_30px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
