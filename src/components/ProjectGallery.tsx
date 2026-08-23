"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    "All",
    "Rolling Shutter",
    "Sunshade",
    "Outdoor Curtain",
    "Villa",
    "Commercial"
  ];

  const projects = [
    {
      id: 1,
      title: "Automatic Shop Shutter",
      location: "Al Quoz, Dubai",
      category: "Rolling Shutter",
      type: "Commercial",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      href: "/projects/automatic-shop-shutter"
    },
    {
      id: 2,
      title: "Luxury Villa Sunshade",
      location: "Jumeirah, Dubai",
      category: "Sunshade",
      type: "Villa",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/luxury-villa-sunshade"
    },
    {
      id: 3,
      title: "Warehouse Security Shutter",
      location: "Dubai Investment Park",
      category: "Rolling Shutter",
      type: "Commercial",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/warehouse-security-shutter"
    },
    {
      id: 4,
      title: "Patio Outdoor Curtains",
      location: "Dubai Marina",
      category: "Outdoor Curtain",
      type: "Commercial",
      imageUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/patio-outdoor-curtains"
    },
    {
      id: 5,
      title: "Garage Door Installation",
      location: "Al Barsha, Dubai",
      category: "Rolling Shutter",
      type: "Villa",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      href: "/projects/garage-door"
    },
    {
      id: 6,
      title: "Commercial Car Parking",
      location: "Business Bay, Dubai",
      category: "Sunshade",
      type: "Commercial",
      imageUrl: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?q=80&w=2070&auto=format&fit=crop",
      href: "/projects/commercial-car-parking"
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === "All") return true;
    if (activeTab === "Villa" || activeTab === "Commercial") {
      return project.type === activeTab;
    }
    return project.category === activeTab;
  });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="OUR RECENT PROJECTS" 
          heading="View Our Latest Work in Dubai" 
          centered={true}
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === category
                  ? "bg-brand-primary text-white premium-shadow"
                  : "bg-gray-50 text-brand-gray hover:bg-gray-100 hover:text-brand-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 min-h-[400px]">
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
