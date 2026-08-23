import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Rolling Shutter Repair in ${title} | Dubai Shutter`,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-20">
      <div className="bg-brand-primary py-24 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Rolling Shutter Services in {title}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fast, reliable, and professional rolling shutter repair and installation in {title}, Dubai.
          </p>
        </div>
      </div>
      <ServicesGrid />
      <Testimonials />
      <CTASection />
    </div>
  );
}
