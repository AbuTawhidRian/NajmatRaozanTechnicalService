import { getActiveServices } from "@/lib/services";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";
import {
  Settings,
  Wrench,
  Zap,
  Store,
  Warehouse,
  Sun,
  Tent,
  Layers,
  type LucideIcon,
} from "lucide-react";

// Map slug → icon so icons don't need to be stored in the DB
const slugIconMap: Record<string, LucideIcon> = {
  installation: Settings,
  repair: Wrench,
  automatic: Zap,
  "motor-repair": Settings,
  "shop-garage": Store,
  warehouse: Warehouse,
  sunshade: Sun,
  "outdoor-curtains": Tent,
};

function getIcon(slug: string): React.ReactNode {
  const Icon = slugIconMap[slug] ?? Layers;
  return <Icon className="w-6 h-6" />;
}

interface ServicesGridProps {
  limit?: number;
  latest?: boolean;
}

export default async function ServicesGrid({ limit, latest }: ServicesGridProps = {}) {
  let services: any[] = [];
  try {
    services = await getActiveServices(limit, latest);
  } catch (error) {
    console.error("Failed to fetch services during build:", error);
  }

  return (
    <section className="py-16 md:py-24 bg-white relative z-10 dot-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-up">
          <SectionHeading
            title="Our Services"
            heading="Complete Rolling Shutter & Sunshade Solutions"
            subtitle="One team for installation, repair, motorisation and shading — for shops, villas, garages and warehouses across Dubai."
            centered={true}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              href={`/services/${service.slug}`}
              icon={getIcon(service.slug)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
