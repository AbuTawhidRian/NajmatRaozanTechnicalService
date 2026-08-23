import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";
import EmergencyBanner from "@/components/EmergencyBanner";

export const metadata = {
  title: "Contact Us | Najmat Raozan Technical Service",
  description: "Get in touch for rolling shutter repair and installation in Dubai.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactForm />
      <MapSection />
      <EmergencyBanner />
    </div>
  );
}
