import { MapPin } from "lucide-react";

export default function MapSection() {
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
        src="https://maps.google.com/maps?q=78G5%2B8VG%20-%2018th%20St%20-%20Al%20Murar%20-%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
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
        <div className="bg-white px-4 py-2 rounded-lg font-bold text-brand-primary shadow-xl mb-2 flex flex-col items-center gap-1">
          <span>Najmat Raozan Technical Service</span>
          <a 
            href="https://www.google.com/maps?rlz=1C1PNBB_enAE1171AE1171&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzINCAEQABiRAhiABBiKBTIGCAIQRRg5MgYIAxBFGD0yBggEEEUYPTIGCAUQRRg9MgYIBhBFGDwyBggHEEUYPNIBCDE1NTNqMGo0qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=KY_vHb43Q18-MeEKUfpfIk9K&daddr=78G5%2B8VG+-+18th+St+-+Al+Murar+-+Dubai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-brand-accent hover:underline flex items-center gap-1"
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
