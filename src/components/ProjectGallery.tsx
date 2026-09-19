import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { getActiveServices } from "@/lib/services";

export default async function ProjectGallery({ limit }: { limit?: number } = {}) {
  // Fetch the recent services from the database
  let services: any[] = [];
  try {
    services = await getActiveServices(limit, true);
  } catch (error) {
    console.error("Failed to fetch services during build:", error);
  }

  // Map service records to realistic, completed project case studies across Dubai
  const projectMetadataMap: Record<string, { title: string; location: string; category: string; subtitle: string }> = {
    warehouse: {
      title: "Heavy-Duty Warehouse Shutter System",
      location: "Al Quoz Industrial Area",
      category: "INDUSTRIAL",
      subtitle: "NEW INSTALLATION",
    },
    repair: {
      title: "Emergency Slats & Motor Overhaul",
      location: "Business Bay Commercial Tower",
      category: "EMERGENCY REPAIR",
      subtitle: "SAME-DAY REPAIR",
    },
    sunshade: {
      title: "Custom UV-Resistant Villa Sunshade",
      location: "Jumeirah Park, Dubai",
      category: "SUNSHADE",
      subtitle: "CUSTOM FABRICATION",
    },
    "shop-garage": {
      title: "Perforated Security Retail Shutter",
      location: "Deira Commercial Center",
      category: "COMMERCIAL",
      subtitle: "SHOPFRONT FIT-OUT",
    },
    automatic: {
      title: "Smart Motorized Villa Garage Door",
      location: "Arabian Ranches, Dubai",
      category: "RESIDENTIAL",
      subtitle: "AUTOMATION UPGRADE",
    },
    "outdoor-curtains": {
      title: "Heavy-Duty Waterproof Balcony Curtains",
      location: "Dubai Marina Waterfront",
      category: "OUTDOOR LIVING",
      subtitle: "WEATHERPROOFING",
    },
    installation: {
      title: "Aluminium Insulated Rolling Shutter",
      location: "Al Barsha Commercial",
      category: "SECURITY",
      subtitle: "COMMERCIAL INSTALL",
    },
    "motor-repair": {
      title: "Tubular Motor Diagnostic & Rewiring",
      location: "JVC Residential Community",
      category: "MOTOR SERVICE",
      subtitle: "PRECISION REPAIR",
    },
  };

  const projects = services.map((service, index) => {
    const meta = projectMetadataMap[service.slug] || {
      title: `${service.title} Project`,
      location: index % 2 === 0 ? "Al Quoz, Dubai" : "Jumeirah, Dubai",
      category: "COMPLETED WORK",
      subtitle: "DUBAI INSTALLATION",
    };

    return {
      id: service.id,
      title: meta.title,
      location: service.location || meta.location,
      category: meta.category,
      subtitle: meta.subtitle,
      imageUrl: service.imageUrl,
      href: `/projects/${service.slug}`,
    };
  });

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="PORTFOLIO" 
          heading="Recent Completed Installations" 
          subtitle="Delivered across Dubai — from commercial warehouses in Al Quoz to luxury residences in Jumeirah."
          centered={true}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 mt-12 mb-12">
          {projects.map((project) => (
            <div key={project.id} className="animate-in fade-in zoom-in duration-500">
              <ProjectCard {...project} />
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-full py-12 text-center text-brand-gray">
              No projects available yet. Add some services in the admin dashboard!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
