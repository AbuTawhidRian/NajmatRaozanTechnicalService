import AboutSection from "@/components/AboutSection";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us | Dubai Shutter",
  description: "Learn more about our rolling shutter and sunshade services in Dubai.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      <TrustStats />
      <Testimonials />
      <CTASection />
    </div>
  );
}
