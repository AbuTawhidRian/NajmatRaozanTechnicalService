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
      <span className="text-brand-accent font-bold tracking-[0.2em] uppercase text-[0.65rem] mb-3">
        {title}
      </span>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl tracking-tight ${
        lightText ? 'text-white' : 'text-brand-primary'
      }`}>
        {heading}
      </h2>
      <div className={`w-12 h-0.5 bg-brand-accent/60 mt-6 mb-6 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`${lightText ? 'text-brand-light/80' : 'text-gray-500'} max-w-2xl leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
