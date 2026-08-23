import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Clock, MapPin, Wrench, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1621847468160-c3d55ab1c1b1?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-brand-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-8 flex flex-col items-start gap-6 pt-12 lg:pt-0">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold tracking-wider text-white uppercase">
              Trusted Rolling Shutter & Sunshade Services in Dubai
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] text-balance">
            Professional Rolling Shutter & Sunshade Solutions in <span className="text-brand-accent">Dubai</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Premium installation, fast repair, and reliable maintenance for shops, villas, warehouses, garages, and commercial properties across all Dubai areas.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <Link 
              href="/quote" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 premium-shadow-hover"
            >
              Get Free Quotation
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a 
              href="https://wa.me/971501234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300 mt-6 bg-brand-primary/40 p-4 rounded-xl backdrop-blur-sm border border-white/5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent" />
              <span>Fast Response</span>
            </div>
            <span className="hidden sm:inline text-brand-gray">•</span>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-brand-accent" />
              <span>Professional Installation</span>
            </div>
            <span className="hidden sm:inline text-brand-gray">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Free Site Visit</span>
            </div>
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="glass-panel rounded-2xl p-8 transform hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-brand-accent/30" />
            
            <h3 className="text-2xl font-bold text-brand-primary mb-2">Need Emergency Repair?</h3>
            <p className="text-brand-gray mb-6">Our technicians are available 24/7 across all Dubai areas.</p>
            
            <div className="space-y-4">
              <a href="tel:+971501234567" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-accent/50 transition-colors group/btn">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover/btn:bg-brand-primary group-hover/btn:text-brand-accent transition-colors">
                  <Phone className="w-6 h-6 text-brand-primary group-hover/btn:text-brand-accent" />
                </div>
                <div>
                  <div className="text-sm text-brand-gray font-medium mb-1">Call Us Now</div>
                  <div className="text-lg font-bold text-brand-primary">+971 50 123 4567</div>
                </div>
              </a>

              <Link href="/quote" className="block w-full py-4 text-center rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-secondary transition-colors">
                Book a Technician
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
