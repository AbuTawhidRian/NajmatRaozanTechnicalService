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
      
      {/* Embed Google Map iframe (using a generic Dubai view as placeholder) */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.29592731265!2d55.1453939!3d25.0750095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
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
        <div className="bg-white px-4 py-2 rounded-lg font-bold text-brand-primary shadow-xl mb-2 flex items-center gap-2">
          <span>Dubai Shutter & Sunshade Repair</span>
        </div>
        <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] border-4 border-white animate-bounce">
          <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>
    </section>
  );
}
