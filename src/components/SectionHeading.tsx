interface SectionHeadingProps {
  title: string;
  heading: string;
  subtitle?: string;
  centered?: boolean;
  lightText?: boolean;
}

export default function SectionHeading({ title, heading, subtitle, centered = false, lightText = false }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}>
      {/* Eyebrow label */}
      <div className={`inline-flex items-center gap-2 mb-4 ${centered ? 'justify-center' : ''}`}>
        <div className="w-5 h-px bg-brand-accent" />
        <span className="text-brand-accent font-bold tracking-[0.25em] uppercase text-[0.65rem]">
          {title}
        </span>
        <div className="w-5 h-px bg-brand-accent" />
      </div>

      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl tracking-tight ${
        lightText ? 'text-white' : 'text-brand-primary'
      }`}>
        {heading}
      </h2>

      {subtitle && (
        <p className={`mt-5 ${lightText ? 'text-brand-light/70' : 'text-gray-500'} max-w-2xl leading-relaxed text-base`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
