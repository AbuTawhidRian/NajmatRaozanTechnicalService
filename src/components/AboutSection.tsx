import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  const highlights = [
    "Professional & Certified Team",
    "High-Quality Materials",
    "On-Time Service Delivery",
    "100% Customer Satisfaction",
  ];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Images */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden premium-shadow max-w-lg mx-auto lg:mr-auto lg:ml-0">
              <Image 
                src="https://vijayshutterenterprises.com/wp-content/uploads/2026/01/automatic-shutter-control-system-1.jpg" 
                alt="Expert Shutter Repair Team" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-primary/10" />
            </div>
            
            {/* Experience Badge Floating */}
            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-8 bg-white p-6 rounded-2xl premium-shadow border border-gray-100 max-w-[200px] hidden sm:block">
              <div className="text-4xl font-black text-brand-accent mb-1">10+</div>
              <div className="text-sm font-bold text-brand-primary leading-tight">
                Years of Excellence in Dubai
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2">
            <SectionHeading 
              title="ABOUT OUR COMPANY" 
              heading="Reliable Rolling Shutter & Sunshade Services in Dubai" 
            />
            
            <div className="mt-8 space-y-6 text-brand-gray text-lg leading-relaxed">
              <p>
                Najmat Raozan Technical Service is a premier installation and repair company serving residential, commercial, and industrial clients across Dubai. We specialize in providing high-quality rolling shutters, automatic doors, sunshades, and outdoor curtains.
              </p>
              <p>
                With over a decade of experience, our professional team is equipped to handle everything from emergency motor repairs to large-scale warehouse shutter installations. We take pride in our fast response times, quality workmanship, and customer-focused approach.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
                  <span className="font-semibold text-brand-primary">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg font-bold text-lg transition-colors premium-shadow"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
