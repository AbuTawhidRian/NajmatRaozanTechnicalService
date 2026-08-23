import CTASection from "@/components/CTASection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${title} | Najmat Raozan Technical Service`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-16">
      <div className="bg-brand-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6">{title}</h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Professional and reliable {title.toLowerCase()} services in Dubai.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 text-center min-h-[30vh]">
        <p className="text-xl text-brand-gray">Content for {title} will go here.</p>
      </div>
      <CTASection />
    </div>
  );
}
