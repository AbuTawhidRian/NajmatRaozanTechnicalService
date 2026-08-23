"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("ALL");

  const categories = [
    "ALL",
    "ROLLING SHUTTER",
    "SUNSHADE",
    "OUTDOOR CURTAIN",
    "VILLA",
    "COMMERCIAL"
  ];

  const projects = [
    {
      id: 1,
      title: "Automatic Shop Shutter",
      location: "Al Quoz, Dubai",
      category: "ROLLING SHUTTER",
      type: "COMMERCIAL",
      subtitle: "AUTOMATIC SHUTTER SUPPLY & INSTALLATION",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      href: "/projects/automatic-shop-shutter"
    },
    {
      id: 2,
      title: "Villa Terrace Sunshade",
      location: "Jumeirah, Dubai",
      category: "SUNSHADE",
      type: "VILLA",
      subtitle: "RETRACTABLE SUNSHADE INSTALLATION",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/luxury-villa-sunshade"
    },
    {
      id: 3,
      title: "Warehouse Loading Bay Shutters",
      location: "Al Qusais, Dubai",
      category: "COMMERCIAL",
      type: "COMMERCIAL",
      subtitle: "HEAVY-DUTY SHUTTER INSTALLATION",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/warehouse-security-shutter"
    },
    {
      id: 4,
      title: "Balcony Outdoor Curtains",
      location: "JVC, Dubai",
      category: "OUTDOOR CURTAIN",
      type: "VILLA",
      subtitle: "CLEAR PVC CURTAIN INSTALLATION",
      imageUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/patio-outdoor-curtains"
    },
    {
      id: 5,
      title: "Villa Garage Shutter",
      location: "Al Barsha, Dubai",
      category: "VILLA",
      type: "VILLA",
      subtitle: "GARAGE SHUTTER REPLACEMENT",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      href: "/projects/garage-door"
    },
    {
      id: 6,
      title: "Restaurant Shutter Emergency Repair",
      location: "Deira, Dubai",
      category: "ROLLING SHUTTER",
      type: "COMMERCIAL",
      subtitle: "EMERGENCY REPAIR",
      imageUrl: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/commercial-car-parking"
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === "ALL") return true;
    if (activeTab === "VILLA" || activeTab === "COMMERCIAL") {
      return project.type === activeTab || project.category === activeTab;
    }
    return project.category === activeTab;
  });

  return (
    <section className="py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="PORTFOLIO" 
          heading="Our Recent Projects" 
          subtitle="Shutters, sunshades and outdoor curtains delivered across Dubai — from Deira shopfronts to Jumeirah villas."
          centered={true}
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2 rounded-full text-[0.65rem] font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === category
                  ? "bg-[#f59e0b] text-gray-900 shadow-sm border border-[#f59e0b]"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 min-h-[400px]">
          {filteredProjects.map((project) => (
            <div key={project.id} className="animate-in fade-in zoom-in duration-500">
              <ProjectCard {...project} />
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-brand-gray">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
