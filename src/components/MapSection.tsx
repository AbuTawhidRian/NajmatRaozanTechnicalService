import { MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export default async function MapSection() {
  const settings = await getSiteSettings();
  const encodedLocation = encodeURIComponent(settings.location);

  return (
    <section className="bg-gray-100 relative h-[400px] w-full overflow-hidden">
      {/* Fallback pattern if map doesn't load/no API key */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#1e293b 2px, transparent 2px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Embed Google Map iframe */}
      <iframe 
        src={`https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 z-10"
      ></iframe>

      {/* Overlay to ensure the map isn't too overpowering and to add our custom pin design */}
      <div className="absolute inset-0 bg-brand-primary/10 pointer-events-none z-20" />
      
      {/* Center custom marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center">
        <div className="bg-white px-4 py-2 rounded-lg font-bold text-brand-primary shadow-xl mb-2 flex flex-col items-center gap-1 text-center min-w-[200px]">
          <span>Najmat Raozan Technical Service</span>
          <span className="text-[10px] text-slate-500 font-normal">{settings.location}</span>
          <a 
            href={settings.mapLink || `https://www.google.com/maps?q=${encodedLocation}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-brand-accent hover:underline flex items-center gap-1 mt-1 pointer-events-auto"
          >
            Get Directions
          </a>
        </div>
        <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] border-4 border-white animate-bounce">
          <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>
    </section>
  );
}
