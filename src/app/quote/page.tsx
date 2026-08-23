import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Get a Free Quote | Najmat Raozan Technical Service",
  description: "Request a free quotation for your rolling shutter or sunshade project.",
};

export default function QuotePage() {
  return (
    <div className="pt-16">
      <div className="bg-brand-primary/5 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">Get a Free Quotation</h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Fill out the form below with your project details, and our team will get back to you with a competitive and comprehensive quote.
          </p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
