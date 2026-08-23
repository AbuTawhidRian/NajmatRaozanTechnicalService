import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-light pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Company Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block relative w-48 h-24 md:w-56 md:h-28 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 m-3">
                <Image
                  src="/images/logo.png"
                  alt="Najmat Raozan Technical Service Logo"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-brand-gray leading-relaxed">
              Premium rolling shutter and sunshade installation, repair, and maintenance across all areas of Dubai, UAE. Fast, reliable, and professional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Our Services</h3>
            <ul className="flex flex-col gap-3">
              {[
                'Rolling Shutter Repair',
                'Rolling Shutter Install',
                'Automatic Shutter',
                'Sunshade Installation',
                'Outdoor Curtain'
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:+971565882185" className="flex items-start gap-3 text-brand-gray hover:text-brand-accent transition-colors">
                  <Phone className="w-5 h-5 text-brand-accent mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white">Phone</span>
                    <span>+971 56 588 2185</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://wa.me/971565882185" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-brand-gray hover:text-green-500 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white">WhatsApp</span>
                    <span>+971 56 588 2185</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@najmatraozan.com" className="flex items-start gap-3 text-brand-gray hover:text-brand-accent transition-colors">
                  <Mail className="w-5 h-5 text-brand-accent mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white">Email</span>
                    <span>info@najmatraozan.com</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-brand-gray">
                <MapPin className="w-5 h-5 text-brand-accent mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-medium text-white">Location</span>
                  <span>78G5+8VG - 18th St - Al Murar, Dubai</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-brand-gray text-sm">
          <p>© {new Date().getFullYear()} Najmat Raozan Technical Service & Sunshade Repair. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
