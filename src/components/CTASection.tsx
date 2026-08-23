import Image from "next/image";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-brand-primary rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row relative shadow-2xl">
          {/* Left Image */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
              alt="Automatic Rolling Shutter Repair"
              fill
              className="object-cover"
            />
            {/* Overlay gradient for smoother blend on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary lg:bg-gradient-to-r lg:from-transparent lg:to-brand-primary via-transparent to-transparent opacity-80" />
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 p-10 md:p-16 lg:p-20 relative z-10 flex flex-col justify-center">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-max mb-6">
              <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">
                Fast & Reliable Service
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Need Rolling Shutter Repair?
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Don't let a broken shutter compromise your security. Our expert technicians provide fast, professional emergency repair services for all types of manual and automatic rolling shutters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="tel:+971501234567" 
                className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors premium-shadow"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-brand-primary rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors premium-shadow"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-400 font-medium">
              <MapPin className="w-5 h-5 text-brand-accent" />
              <span>Available across all Dubai areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
