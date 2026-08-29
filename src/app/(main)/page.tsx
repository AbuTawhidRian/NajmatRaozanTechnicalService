import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/FeatureCard";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectGallery from "@/components/ProjectGallery";
import BeforeAfter from "@/components/BeforeAfter";
import ServiceAreas from "@/components/ServiceAreas";
import AboutSection from "@/components/AboutSection";
import EmergencyBanner from "@/components/EmergencyBanner";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <ServicesGrid limit={8} latest={true} />
      <CTASection />
      <WhyChooseUs />
      <ProcessSteps />
      <ProjectGallery />
      <BeforeAfter />
      <ServiceAreas />
      <AboutSection />      <EmergencyBanner />
      <FAQ />
      <ContactForm />
      <MapSection />
    </>
  );
}
