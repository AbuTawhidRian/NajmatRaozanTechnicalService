"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, MessageCircle } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="font-bold text-xl text-brand-primary">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-brand-gray hover:text-brand-primary transition-colors bg-gray-50 rounded-full"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={`text-xl font-medium flex items-center justify-between group transition-colors ${
                isActive ? "text-brand-accent" : "text-brand-primary hover:text-brand-accent"
              }`}
            >
              {link.name}
              <span className={`transition-opacity ${isActive ? "opacity-100 text-brand-accent" : "opacity-0 group-hover:opacity-100 text-brand-accent"}`}>→</span>
            </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
          <a
            href="https://wa.me/971565882185"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>
          <a
            href="tel:+971565882185"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold bg-brand-primary text-white hover:bg-brand-secondary transition-colors"
          >
            <Phone className="w-5 h-5 text-brand-accent" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}
