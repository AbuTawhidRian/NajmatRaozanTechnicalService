import { CheckCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Experienced Technicians",
      description: "Our team consists of highly trained professionals with years of experience in rolling shutter and sunshade installation.",
    },
    {
      title: "Fast Response Time",
      description: "We understand emergencies. Our team is ready to respond quickly to your repair needs across all areas of Dubai.",
    },
    {
      title: "Quality Materials",
      description: "We use only premium, durable materials designed to withstand Dubai's harsh climate and heavy usage.",
    },
    {
      title: "Professional Installation",
      description: "Precision installation ensures your shutters and sunshades operate smoothly and last longer.",
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees. We provide clear, upfront quotations before starting any work.",
    },
    {
      title: "Dubai-Wide Coverage",
      description: "From Deira to Dubai Marina, we serve all residential and commercial areas across Dubai.",
    },
  ];

  return (
    <section className="py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="WHY CHOOSE US" 
          heading="The Dubai Shutter Advantage" 
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl premium-shadow hover:premium-shadow-hover transition-all duration-300 transform hover:-translate-y-1 border border-gray-50"
            >
              <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-brand-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
