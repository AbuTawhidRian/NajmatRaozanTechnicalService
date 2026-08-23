import SectionHeading from "./SectionHeading";

export default function ProcessSteps() {
  const steps = [
    {
      num: "01",
      title: "Contact Us",
      description: "Call or WhatsApp us with your requirement.",
    },
    {
      num: "02",
      title: "Share Your Requirement",
      description: "Send photos, sizes or the location of the job.",
    },
    {
      num: "03",
      title: "Free Site Visit",
      description: "We measure and inspect at no cost.",
    },
    {
      num: "04",
      title: "Receive Quotation",
      description: "A clear written price, usually within 24 hours.",
    },
    {
      num: "05",
      title: "Professional Installation",
      description: "Our team fits and tests the work on schedule.",
    },
    {
      num: "06",
      title: "Job Completed",
      description: "Site cleaned, operation demonstrated, warranty issued.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#111827] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* We use a custom header here to ensure white text on dark bg since SectionHeading assumes light bg */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-brand-accent font-bold tracking-[0.2em] uppercase text-[0.65rem] mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white leading-tight max-w-3xl tracking-tight">
            From First Call to Finished Job
          </h2>
          <div className="w-12 h-0.5 bg-brand-accent/60 mt-6 mb-6 mx-auto" />
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            A clear six-step process, so you always know what happens next.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col text-left group">
                <div className="flex items-center w-full mb-6">
                  <div className="w-10 h-10 bg-brand-accent rounded text-gray-900 font-extrabold flex items-center justify-center shrink-0 shadow-sm text-sm">
                    {step.num}
                  </div>
                  {/* Connecting Line */}
                  <div className="h-[1px] bg-gray-800 w-full ml-4" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
