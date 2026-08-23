import AboutSection from "@/components/AboutSection";
import TrustStats from "@/components/TrustStats";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us | Najmat Raozan Technical Service",
  description: "Learn more about our rolling shutter and sunshade services in Dubai.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
      <TrustStats />      <CTASection />
    </div>
  );
}
