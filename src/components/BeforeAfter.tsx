"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { ArrowLeftRight } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <section className="py-24 bg-brand-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="SEE THE DIFFERENCE" 
          heading="Professional Installation & Replacement" 
          centered={true}
        />
        <div className="text-center text-gray-300 mt-4 mb-16 max-w-2xl mx-auto">
          Slide to see how our expert repair and installation services completely transform old, damaged shutters into modern, secure systems.
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none premium-shadow group"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1541882143431-15ebff025b90?q=80&w=2070&auto=format&fit=crop"
                alt="After Installation"
                fill
                className="object-cover"
                draggable={false}
              />
              <div className="absolute bottom-4 right-4 bg-brand-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-bold tracking-wider z-10">
                AFTER
              </div>
            </div>

            {/* Before Image (Foreground, clipped) */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517581177682-a085bc7fcb10?q=80&w=2070&auto=format&fit=crop"
                alt="Before Installation"
                fill
                className="object-cover filter grayscale sepia-[0.3]"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-brand-primary px-3 py-1 rounded-md text-sm font-bold tracking-wider z-10">
                BEFORE
              </div>
            </div>

            {/* Slider Line & Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white text-brand-primary rounded-full shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
