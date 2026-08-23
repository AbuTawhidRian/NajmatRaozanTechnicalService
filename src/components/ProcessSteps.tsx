import SectionHeading from "./SectionHeading";
import { MessageSquare, ClipboardList, Ruler, FileText, Wrench, CheckCircle } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      num: "01",
      title: "Contact Us",
      description: "Reach out via WhatsApp or call us directly.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      num: "02",
      title: "Share Requirement",
      description: "Tell us about your project or repair needs.",
      icon: <ClipboardList className="w-6 h-6" />,
    },
    {
      num: "03",
      title: "Free Site Visit",
      description: "Our experts visit your location for inspection.",
      icon: <Ruler className="w-6 h-6" />,
    },
    {
      num: "04",
      title: "Receive Quotation",
      description: "Get a transparent, no-obligation quote.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      num: "05",
      title: "Professional Installation",
      description: "Our team executes the work with precision.",
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      num: "06",
      title: "Job Completed",
      description: "We ensure everything works perfectly.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-light rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading 
          title="HOW IT WORKS" 
          heading="Our Service Process" 
          centered={true}
        />
        
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
            
            {/* Connecting line (Desktop) */}
            <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-gray-100 -z-10" />

            {steps.map((step, index) => (
              <div key={index} className="flex flex-row lg:flex-col items-start lg:items-center relative group">
                
                {/* Connecting line (Mobile/Tablet) */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-16 bottom-0 left-8 w-0.5 bg-gray-100 -z-10" />
                )}

                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 premium-shadow flex items-center justify-center text-brand-primary mb-0 lg:mb-6 shrink-0 group-hover:border-brand-accent group-hover:text-brand-accent transition-colors duration-300 relative bg-clip-padding">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {step.num}
                  </div>
                </div>

                <div className="ml-6 lg:ml-0 text-left lg:text-center pt-2 lg:pt-0">
                  <h3 className="text-lg font-bold text-brand-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
