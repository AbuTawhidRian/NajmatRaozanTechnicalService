import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function EmergencyBanner() {
  return (
    <section className="bg-brand-primary text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Emergency Rolling Shutter Repair?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl">
              Our team is ready to respond quickly across Dubai. Available 24/7 for all types of manual and automatic shutter emergencies.
            </p>
          </div>

          <div className="md:w-2/5 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="tel:+971503463150" 
              className="flex-1 px-6 py-4 bg-white text-brand-primary rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a 
              href="https://wa.me/971503463150" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-green-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg"
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
