import ProjectGallery from "@/components/ProjectGallery";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Our Projects | Najmat Raozan Technical Service",
  description: "View our portfolio of rolling shutter and sunshade installations in Dubai.",
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ServicesGrid />
      <ProjectGallery />
      <ProcessSteps />
      <CTASection />
    </div>
  );
}
