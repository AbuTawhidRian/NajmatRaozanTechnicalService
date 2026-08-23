import ServiceAreas from "@/components/ServiceAreas";
import MapSection from "@/components/MapSection";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Service Areas | Najmat Raozan Technical Service",
  description: "We provide rolling shutter and sunshade services across all Dubai areas.",
};

export default function AreasPage() {
  return (
    <div className="pt-16">
      <ServiceAreas />
      <MapSection />
      <CTASection />
    </div>
  );
}
