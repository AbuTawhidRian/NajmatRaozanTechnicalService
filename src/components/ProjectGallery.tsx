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
      title: "Commercial Shutter Installation",
      location: "Business Bay, Dubai",
      category: "Installation",
      type: "COMMERCIAL",
      subtitle: "AUTOMATIC SHUTTER SUPPLY & INSTALLATION",
      imageUrl: "https://overheaddoor-production-assets.azureedge.net/assets/images/default-source/product-images/commercial/rolling-shutter/allura-shutter-653-powder-coat.jpg?sfvrsn=5eea7e43_1",
      href: "/projects/automatic-shop-shutter"
    },
    {
      id: 2,
      title: "Villa Sunshade System",
      location: "Palm Jumeirah",
      category: "Sunshade",
      type: "VILLA",
      subtitle: "RETRACTABLE SUNSHADE INSTALLATION",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRop3j5ILrXarlU1RFWi6uGWN_qS-Z6SAN46CmrW-W2a6H7QJ6oCAQKGpFu&s=10",
      href: "/projects/luxury-villa-sunshade"
    },
    {
      id: 3,
      title: "Warehouse Loading Bay",
      location: "Jebel Ali Free Zone",
      category: "Installation",
      type: "COMMERCIAL",
      subtitle: "HEAVY-DUTY SHUTTER INSTALLATION",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0t2bnHipwJrxL6sQ3WxWg-CC9VBprWhHtnNWu9_aRcT6ceT1oWCmtmHF&s=10",
      href: "/projects/warehouse-security-shutter"
    },
    {
      id: 4,
      title: "Restaurant PVC Curtains",
      location: "Dubai Marina",
      category: "Curtains",
      type: "VILLA",
      subtitle: "CLEAR PVC CURTAIN INSTALLATION",
      imageUrl: "https://shutters4u.com.au/wp-content/uploads/2019/07/s4umanual-roller-shutter-product.png",
      href: "/projects/patio-outdoor-curtains"
    },
    {
      id: 5,
      title: "Shopfront Security Shutter",
      location: "Deira",
      category: "Repair",
      type: "VILLA",
      subtitle: "GARAGE SHUTTER REPLACEMENT",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosqTs8iPEF7qg7b857NKfepb5MH7z6smnIKKz-wE_JnN0m_1vB41RQU0&s=10",
      href: "/projects/garage-door"
    },
    {
      id: 6,
      title: "Automatic Parking Shutter",
      location: "Al Barsha",
      category: "Repair",
      type: "COMMERCIAL",
      subtitle: "EMERGENCY REPAIR",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOx9r4qX_f0UYVw_bfqRKCXIbWgCEUECTIU8r2E2azTaGgMVlCvbuLvPA&s=10",
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
    <section className="py-12 md:py-16 bg-brand-light">
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
