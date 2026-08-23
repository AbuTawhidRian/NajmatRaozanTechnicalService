import { ShieldCheck, Hammer, Clock, MapPin } from "lucide-react";

export default function TrustStats() {
  const stats = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#8c6b22]" />,
      number: "10+",
      label: "YEARS EXPERIENCE",
    },
    {
      icon: <Hammer className="w-5 h-5 text-[#8c6b22]" />,
      number: "500+",
      label: "PROJECTS COMPLETED",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#8c6b22]" />,
      number: "24/7",
      label: "EMERGENCY SUPPORT",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#8c6b22]" />,
      number: "Dubai",
      label: "WIDE SERVICE COVERAGE",
    },
  ];

  return (
    <section className="bg-brand-light pt-8 pb-16 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden -mt-16 relative">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex-1 p-8 md:p-10 flex flex-col items-start ${index !== stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}
            >
              <div className="w-10 h-10 bg-[#f8f5ea] rounded-md flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-brand-primary mb-2 tracking-tight">
                {stat.number}
              </h3>
              <p className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
