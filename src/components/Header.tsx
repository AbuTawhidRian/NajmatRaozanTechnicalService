"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import MobileMenu from "./MobileMenu"; 


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-white/90 backdrop-blur-sm py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-brand-accent font-bold text-xl group-hover:scale-105 transition-transform">
              RS
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight text-brand-primary">
                Dubai Shutter
              </span>
              <span className="text-xs text-brand-gray font-medium">
                & Sunshade Repair
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-primary font-medium hover:text-brand-accent transition-colors text-sm uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-primary font-semibold hover:text-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+971501234567"
              className="bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-md font-semibold transition-colors flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4 text-brand-accent" />
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
