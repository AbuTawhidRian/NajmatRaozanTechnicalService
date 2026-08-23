import { Users, Clock, ShieldCheck, Ruler, ClipboardList, Map } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Experienced Technicians",
      description: "A trained in-house team, not subcontractors, on every job.",
      icon: <Users className="w-4 h-4 text-gray-800" />,
    },
    {
      title: "Fast Response",
      description: "Most call-outs attended the same day, emergencies within hours.",
      icon: <Clock className="w-4 h-4 text-gray-800" />,
    },
    {
      title: "Quality Materials",
      description: "Galvanised slats, branded motors and UV-stable fabrics only.",
      icon: <ShieldCheck className="w-4 h-4 text-gray-800" />,
    },
    {
      title: "Professional Installation",
      description: "Clean fitting, aligned guides and a tested finish before we leave.",
      icon: <Ruler className="w-4 h-4 text-gray-800" />,
    },
    {
      title: "Transparent Pricing",
      description: "Written quotation after the site visit. No surprise charges.",
      icon: <ClipboardList className="w-4 h-4 text-gray-800" />,
    },
    {
      title: "Dubai-Wide Coverage",
      description: "From Deira to Dubai Marina, our vans cover the whole city.",
      icon: <Map className="w-4 h-4 text-gray-800" />,
    },
  ];

  return (
    <section className="py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="THE DIFFERENCE" 
          heading="Why Choose Us?" 
          subtitle="Ten years of shutter and shading work in Dubai, done by our own technicians with materials that survive the summer."
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="w-10 h-10 bg-[#faecc9] rounded-md flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-[1.1rem] font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
