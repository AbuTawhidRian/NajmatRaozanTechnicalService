import ServicesGrid from "@/components/ServicesGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Our Services | Najmat Raozan Technical Service",
  description: "Comprehensive rolling shutter and sunshade solutions in Dubai.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <ServicesGrid />
      <ProcessSteps />
      <CTASection />
    </div>
  );
}
