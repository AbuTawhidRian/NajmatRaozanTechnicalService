interface SectionHeadingProps {
  title: string;
  heading: string;
  centered?: boolean;
}

export default function SectionHeading({ title, heading, centered = false }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}>
      <span className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-3">
        {title}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary leading-tight max-w-3xl">
        {heading}
      </h2>
    </div>
  );
}
