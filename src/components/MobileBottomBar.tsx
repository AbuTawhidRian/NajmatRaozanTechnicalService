"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { useSettings } from "./SettingsContext";

export default function MobileBottomBar() {
  const settings = useSettings();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
      <a 
        href={`https://wa.me/${settings.whatsapp}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center w-1/3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
      >
        <MessageCircle className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
      </a>
      
      <Link 
        href="/quote"
        className="flex flex-col items-center justify-center w-1/3 py-2 -mt-6 bg-brand-accent text-brand-primary rounded-xl shadow-lg border-2 border-white hover:bg-brand-accent-hover transition-colors"
      >
        <Calendar className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Book Now</span>
      </Link>
      
      <a 
        href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
        className="flex flex-col items-center justify-center w-1/3 py-2 text-brand-primary hover:bg-brand-light rounded-lg transition-colors"
      >
        <Phone className="w-5 h-5 mb-1 text-brand-accent" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Call Us</span>
      </a>
    </div>
  );
}
