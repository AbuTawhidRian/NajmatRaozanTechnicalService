"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, ChevronRight, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-light pt-16 pb-24 md:pb-8 relative overflow-hidden">
      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />

      {/* Background subtle radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#173A5E22_0%,_transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Company Info */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block relative w-44 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 m-3">
                <Image
                  src="/images/logo.png"
                  alt="Najmat Raozan Technical Service Logo"
                  fill
                  sizes="(max-width: 768px) 176px, 176px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-brand-gray leading-relaxed text-sm">
              Premium rolling shutter and sunshade installation, repair, and maintenance across all areas of Dubai, UAE. Fast, reliable, and professional service.
            </p>
            {/* Social-style contact pills */}
            <div className="flex gap-3">
              <a href="tel:+971565882185" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent/20 border border-white/10 hover:border-brand-accent/40 flex items-center justify-center transition-all" title="Call us">
                <Phone className="w-4 h-4 text-brand-accent" />
              </a>
              <a href="https://wa.me/971565882185" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/40 flex items-center justify-center transition-all" title="WhatsApp">
                <MessageCircle className="w-4 h-4 text-green-400" />
              </a>
              <a href="mailto:info@najmatraozan.com" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent/20 border border-white/10 hover:border-brand-accent/40 flex items-center justify-center transition-all" title="Email">
                <Mail className="w-4 h-4 text-brand-accent" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.18em] border-b border-white/10 pb-3">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Projects", href: "/projects" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight className="w-3.5 h-3.5 text-brand-accent/50 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.18em] border-b border-white/10 pb-3">Our Services</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                "Rolling Shutter Repair",
                "Rolling Shutter Install",
                "Automatic Shutter",
                "Sunshade Installation",
                "Outdoor Curtain"
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight className="w-3.5 h-3.5 text-brand-accent/50 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.18em] border-b border-white/10 pb-3">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:+971565882185" className="flex items-start gap-3 text-brand-gray hover:text-brand-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                    <Phone className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-white/80 text-xs uppercase tracking-wider mb-0.5">Phone</span>
                    <span>+971 56 588 2185</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@najmatraozan.com" className="flex items-start gap-3 text-brand-gray hover:text-brand-accent transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-white/80 text-xs uppercase tracking-wider mb-0.5">Email</span>
                    <span>info@najmatraozan.com</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-brand-gray">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-white/80 text-xs uppercase tracking-wider mb-0.5">Location</span>
                  <span>78G5+8VG - 18th St - Al Murar, Dubai</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-brand-gray text-xs">
          <p>© {new Date().getFullYear()} Najmat Raozan Technical Service &amp; Sunshade Repair. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-accent transition-colors">Terms &amp; Conditions</Link>
            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 text-brand-gray hover:text-brand-accent transition-colors group"
              aria-label="Back to top"
            >
              <div className="w-7 h-7 rounded-lg border border-white/15 group-hover:border-brand-accent/40 flex items-center justify-center transition-colors">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
