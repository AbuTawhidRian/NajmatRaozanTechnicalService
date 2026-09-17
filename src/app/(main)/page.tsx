import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/FeatureCard";
import BeforeAfter from "@/components/BeforeAfter";
import ProjectGallery from "@/components/ProjectGallery";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import ServiceAreas from "@/components/ServiceAreas";
import AboutSection from "@/components/AboutSection";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <ServicesGrid limit={8} latest={true} />
      <WhyChooseUs />
      <BeforeAfter />
      <ProjectGallery limit={6} />
      <ProcessSteps />
      <CTASection />
      <ServiceAreas />
      <AboutSection />
      <FAQ />
      <ContactForm />
      <MapSection />
    </>
  );
}
