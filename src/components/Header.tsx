"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, Clock, Mail } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Areas", href: "/areas" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-300">
        {/* Top Bar - Hidden on scroll for a cleaner look, or kept. Let's keep it based on standard practice, or hide on scroll. We'll keep it static for now */}
        <div className={`w-full bg-brand-primary text-gray-300 text-xs py-2 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
          <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brand-accent" />
              <span>Open daily 8:00 - 22:00 - 24/7 emergency</span>
            </div>
            <div className="flex items-center gap-4 font-medium">
              <a href="mailto:info@najmatraozan.com" className="hover:text-white transition-colors">info@najmatraozan.com</a>
              <span className="text-gray-600">|</span>
              <a href="tel:+971565882185" className="text-brand-accent hover:text-brand-accent-hover transition-colors">+971 56 588 2185</a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-white py-2 md:py-3 shadow-sm"
        }`}>
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-20 h-10 md:w-28 md:h-12">
                <Image
                  src="/images/logo.png"
                  alt="Najmat Raozan Technical Service Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-bold text-sm uppercase tracking-wide transition-colors ${
                    isActive 
                      ? "text-brand-accent" 
                      : "text-brand-primary hover:text-brand-accent"
                  }`}
                >
                  {link.name}
                </Link>
                );
              })}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/971565882185"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd5a] text-white px-4 py-2.5 rounded font-bold transition-colors flex items-center gap-2 text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+971565882185"
                className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2.5 rounded font-bold transition-colors flex items-center gap-2 text-sm shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-brand-primary"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
