import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { getActiveServices } from "@/lib/services";

export default async function ProjectGallery() {
  // Fetch the 6 most recent services from the database
  const services = await getActiveServices(6, true);

  // Map the database Service format to the ProjectCard format
  const projects = services.map((service) => ({
    id: service.id,
    title: service.title,
    location: "Dubai, UAE",
    category: "PROJECT",
    subtitle: service.title.toUpperCase(),
    imageUrl: service.imageUrl,
    href: `/services/${service.slug}`
  }));

  return (
    <section className="py-12 md:py-16 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="PORTFOLIO" 
          heading="Our Recent Projects" 
          subtitle="Shutters, sunshades and outdoor curtains delivered across Dubai — from Deira shopfronts to Jumeirah villas."
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
