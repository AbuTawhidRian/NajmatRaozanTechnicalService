import { Users, Clock, ShieldCheck, Ruler, ClipboardList, Map } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "Experienced Technicians",
    description: "A trained in-house team, not subcontractors, on every job.",
    icon: <Users className="w-5 h-5 text-amber-700" />,
  },
  {
    title: "Fast Response",
    description: "Most call-outs attended the same day, emergencies within hours.",
    icon: <Clock className="w-5 h-5 text-amber-700" />,
  },
  {
    title: "Quality Materials",
    description: "Galvanised slats, branded motors and UV-stable fabrics only.",
    icon: <ShieldCheck className="w-5 h-5 text-amber-700" />,
  },
  {
    title: "Professional Installation",
    description: "Clean fitting, aligned guides and a tested finish before we leave.",
    icon: <Ruler className="w-5 h-5 text-amber-700" />,
  },
  {
    title: "Transparent Pricing",
    description: "Written quotation after the site visit. No surprise charges.",
    icon: <ClipboardList className="w-5 h-5 text-amber-700" />,
  },
  {
    title: "Dubai-Wide Coverage",
    description: "From Deira to Dubai Marina, our vans cover the whole city.",
    icon: <Map className="w-5 h-5 text-amber-700" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="fade-up">
          <SectionHeading 
            title="The Difference" 
            heading="Why Choose Us?" 
            subtitle="Ten years of shutter and shading work in Dubai, done by our own technicians with materials that survive the summer."
            centered={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {features.map((feature, index) => {
            const delayClass = `fade-up-delay-${(index % 6) + 1}`;
            return (
              <div 
                key={index} 
                className={`fade-up ${delayClass} group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-accent/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Gold gradient icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 group-hover:from-amber-100 group-hover:to-amber-200 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                
                {/* Gold accent line */}
                <div className="w-0 group-hover:w-8 h-0.5 bg-brand-accent transition-all duration-400 mb-4 rounded-full" />

                <h3 className="text-[1.05rem] font-bold text-brand-primary mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
