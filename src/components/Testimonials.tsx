"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Ahmed Al Maktoum",
      location: "Jumeirah",
      service: "Automatic Shutter Installation",
      review: "Excellent service! The team arrived on time, was very professional, and installed our villa's sunshades perfectly. Highly recommended for anyone in Dubai.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Williams",
      location: "Dubai Marina",
      service: "Emergency Motor Repair",
      review: "Our shop shutter got stuck halfway at 10 PM. I called them and they sent a technician within 45 minutes. They fixed the motor quickly and saved our night.",
      rating: 5
    },
    {
      id: 3,
      name: "Mohammed Khan",
      location: "Al Quoz",
      service: "Warehouse Shutters",
      review: "We contracted them for 5 large warehouse shutters. Very competitive pricing, transparent communication, and top-quality industrial shutters. Will use again.",
      rating: 5
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      location: "Arabian Ranches",
      service: "Outdoor Curtains",
      review: "The outdoor curtains they installed in our patio are beautiful and withstand the wind perfectly. The installation team was polite and left everything clean.",
      rating: 5
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-12 md:py-16 bg-brand-light relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeading 
            title="TESTIMONIALS" 
            heading="What Our Customers Say" 
          />
          
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-brand-primary border border-brand-primary flex items-center justify-center text-white hover:bg-brand-secondary transition-all shadow-md"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl premium-shadow relative">
                  <Quote className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 text-gray-100 rotate-180" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-brand-primary font-medium leading-relaxed mb-8 italic relative z-10">
                    "{review.review}"
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                    <div>
                      <h4 className="font-bold text-lg text-brand-primary">{review.name}</h4>
                      <p className="text-brand-gray text-sm">{review.location}</p>
                    </div>
                    <div className="text-sm font-semibold text-brand-accent bg-brand-accent/10 px-4 py-2 rounded-lg">
                      {review.service}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
