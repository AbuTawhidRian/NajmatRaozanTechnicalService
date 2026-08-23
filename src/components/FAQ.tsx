"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can you provide a site visit?",
      answer: "We offer same-day site visits across most areas in Dubai. For emergencies, our technicians can typically arrive within 1-2 hours depending on your exact location and traffic conditions."
    },
    {
      question: "Do you repair automatic rolling shutters?",
      answer: "Yes, we specialize in both manual and automatic rolling shutter repairs. Our technicians are trained to diagnose and fix motor issues, sensor problems, control box failures, and remote control programming."
    },
    {
      question: "Do you provide emergency repair?",
      answer: "Yes, we provide 24/7 emergency repair services throughout Dubai for situations where your shutter is stuck open or closed, compromising your property's security."
    },
    {
      question: "Do you install sunshade curtains for villas?",
      answer: "Absolutely. We design and install custom sunshades, outdoor curtains, and car parking shades tailored specifically for residential villas to protect against the harsh Dubai sun."
    },
    {
      question: "Do you serve all areas of Dubai?",
      answer: "Yes, we cover all major areas in Dubai including Deira, Bur Dubai, Al Quoz, Al Barsha, Jumeirah, Business Bay, Dubai Marina, JVC, and surrounding neighborhoods."
    },
    {
      question: "Can I send photos through WhatsApp?",
      answer: "Yes! Sending photos or videos of your damaged shutter or sunshade via WhatsApp is highly recommended. It helps our technicians understand the issue faster and often allows us to provide an immediate estimated quotation."
    },
    {
      question: "Do you provide free quotations?",
      answer: "Yes, we provide free, no-obligation quotations. For most repairs, we can give an estimate via WhatsApp. For new installations, we provide a free site visit to take accurate measurements before quoting."
    },
    {
      question: "How long does installation take?",
      answer: "A standard shop or garage rolling shutter typically takes 1-2 days to install from the time of order. Custom sunshades or large industrial shutters may take 3-5 days depending on the specifications."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-brand-light relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="FAQ" 
          heading="Frequently Asked Questions" 
          centered={true}
        />
        
        <div className="max-w-3xl mx-auto mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                openIndex === index ? 'border-brand-accent shadow-md' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-bold text-lg pr-8 ${
                  openIndex === index ? 'text-brand-accent' : 'text-brand-primary'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-brand-accent' : 'text-gray-400'
                  }`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-brand-gray leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
