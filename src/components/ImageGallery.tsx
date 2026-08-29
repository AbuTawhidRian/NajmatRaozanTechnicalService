"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null));
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            onClick={() => setSelectedIndex(i)}
          >
            <Image 
              src={img} 
              alt={`${title} project image ${i + 1}`} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              sizes="(max-width: 768px) 50vw, 33vw" 
            />
            {/* Zoom Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <ZoomIn className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1)); }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1)); }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto p-4 md:p-8 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)} // Close when clicking outside image
          >
            <div 
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <Image 
                src={images[selectedIndex]} 
                alt={`${title} full size ${selectedIndex + 1}`} 
                fill 
                className="object-contain" 
                sizes="100vw"
                priority
              />
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-wide bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
