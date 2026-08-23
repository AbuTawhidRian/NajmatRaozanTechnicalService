import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "FAQ | Dubai Shutter",
  description: "Frequently asked questions about rolling shutters and sunshades.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <FAQ />
      <ContactForm />
    </div>
  );
}
