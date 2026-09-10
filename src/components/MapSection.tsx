import { MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";
import { unstable_cache } from "next/cache";

// We cache this resolution so it only happens when settings change, preventing slow page loads
const resolveMapEmbedUrl = unstable_cache(
  async (mapLink: string | undefined, locationText: string) => {
    let query = locationText;
    
    if (mapLink) {
      // 1. If it's already an embed URL or iframe, use it directly
      if (mapLink.includes('<iframe')) {
        const match = mapLink.match(/src="([^"]+)"/);
        if (match) return match[1];
      }
      if (mapLink.includes('/embed')) {
        return mapLink;
      }
      
      // 2. Resolve shortlinks (goo.gl) to get the real URL
      try {
        let finalUrl = mapLink;
        if (mapLink.includes('goo.gl') || mapLink.includes('maps.app.goo.gl')) {
          // Fetch without following redirects to grab the Location header
          const res = await fetch(mapLink, { redirect: 'manual', cache: 'no-store' });
          if (res.status >= 300 && res.status < 400) {
            finalUrl = res.headers.get('location') || mapLink;
          }
        }
        
        const url = new URL(finalUrl);
        
        // 3. Extract query (?q=...)
        const q = url.searchParams.get('q') || url.searchParams.get('query');
        if (q) {
          query = q;
        } else {
          // 4. Extract coordinates from /@lat,lng
          const coordMatch = finalUrl.match(/@(-?\d+\.\d+,-?\d+\.\d+)/);
          if (coordMatch) {
            query = coordMatch[1];
          } else {
             // 5. Extract place name from /place/Name/
             const placeMatch = finalUrl.match(/\/place\/([^\/]+)/);
             if (placeMatch) {
               query = placeMatch[1].replace(/\+/g, ' ');
             }
          }
        }
      } catch (e) {
        console.error("Failed to parse map link", e);
      }
    }

    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  },
  ['map-embed-resolver'],
  { tags: ['settings'] } // Purged when settings are updated
);

export default async function MapSection() {
  const settings = await getSiteSettings();
  const embedUrl = await resolveMapEmbedUrl(settings.mapLink, settings.location);

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
        src={embedUrl}
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
            href={settings.mapLink || `https://www.google.com/maps?q=${encodeURIComponent(settings.location)}`} 
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
