import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

export default function ServiceAreas() {
  const areas = [
    "Deira",
    "Bur Dubai",
    "Al Quoz",
    "Al Barsha",
    "Jumeirah",
    "Business Bay",
    "Dubai Marina",
    "JVC",
    "Al Nahda",
    "Al Qusais",
    "International City",
    "Muhaisnah"
  ];

  return (
    <section className="py-12 md:py-16 bg-brand-light relative overflow-hidden">
      {/* Abstract Map Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1e293b 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/3">
            <SectionHeading 
              title="DUBAI WIDE SERVICE" 
              heading="Serving Customers Across Dubai" 
            />
            <p className="text-brand-gray mt-6 mb-8 leading-relaxed">
              We provide fast and reliable rolling shutter and sunshade services to all major residential, commercial, and industrial areas across Dubai. Our mobile teams are always ready to respond to your emergencies.
            </p>
            <Link 
              href="/areas"
              className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-accent transition-colors group"
            >
              <span>View All Service Areas</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {areas.map((area, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:border-brand-accent hover:shadow-md transition-all duration-300 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <MapPin className="w-4 h-4 text-brand-primary group-hover:text-white" />
                  </div>
                  <span className="font-semibold text-brand-primary text-sm group-hover:text-brand-accent transition-colors">
                    {area}
                  </span>
                </div>
              ))}
            </div>
            
            {/* CTA Card inside the grid area */}
            <div className="mt-8 bg-brand-primary rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
              <div>
                <h4 className="text-white font-bold text-xl mb-2">Not sure if we cover your area?</h4>
                <p className="text-gray-400 text-sm">Contact us to confirm availability in your location.</p>
              </div>
              <a 
                href="https://wa.me/971565882185" 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-bold transition-colors whitespace-nowrap"
              >
                Check Availability
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
