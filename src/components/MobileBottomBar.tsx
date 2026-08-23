"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex items-center h-16">
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center h-full text-green-600 hover:bg-green-50 transition-colors border-r border-gray-100"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </a>
        
        <Link
          href="/quote"
          className="flex-1 flex flex-col items-center justify-center h-full text-brand-primary hover:bg-gray-50 transition-colors border-r border-gray-100"
        >
          <FileText className="w-5 h-5 mb-1 text-brand-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Get Quote</span>
        </Link>

        <a
          href="tel:+971501234567"
          className="flex-[1.2] flex flex-col items-center justify-center h-full bg-brand-primary text-white hover:bg-brand-secondary transition-colors"
        >
          <Phone className="w-5 h-5 mb-1 text-brand-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call Now</span>
        </a>
      </div>
    </div>
  );
}
