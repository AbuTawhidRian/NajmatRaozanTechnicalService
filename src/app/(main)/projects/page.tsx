import ProjectGallery from "@/components/ProjectGallery";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Our Projects | Najmat Raozan Technical Service",
  description: "View our portfolio of rolling shutter and sunshade installations in Dubai.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectGallery />
      <CTASection />
    </div>
  );
}
