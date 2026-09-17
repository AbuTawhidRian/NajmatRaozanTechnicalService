import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about rolling shutters and sunshades.",
};

export default function FAQPage() {
  return (
    <div className="pt-16">
      <FAQ />
      <ContactForm />
    </div>
  );
}
