import { Settings, Wrench, Zap, Store, Warehouse, Sun, Tent } from "lucide-react";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";

export default function ServicesGrid() {
  const services = [
    {
      title: "Rolling Shutter Installation",
      description: "New manual and automatic shutters measured, fabricated and fitted on site.",
      icon: <Settings className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      href: "/services/installation"
    },
    {
      title: "Rolling Shutter Repair",
      description: "Stuck, jammed or noisy shutter? Our team gets it moving the same day.",
      icon: <Wrench className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1540573934394-06180fc545a9?q=80&w=2070&auto=format&fit=crop",
      href: "/services/repair"
    },
    {
      title: "Automatic Rolling Shutter",
      description: "Motorised shutters with remote, wall switch and safety stop.",
      icon: <Zap className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
      href: "/services/automatic"
    },
    {
      title: "Motor Repair & Replacement",
      description: "Motor not responding? We diagnose, rewind or replace it.",
      icon: <Settings className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      href: "/services/motor-repair"
    },
    {
      title: "Shop & Garage Shutter",
      description: "Secure shopfront and villa garage shutters built to daily use.",
      icon: <Store className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      href: "/services/shop-garage"
    },
    {
      title: "Warehouse Shutter",
      description: "Heavy-duty industrial shutters for large openings and loading bays.",
      icon: <Warehouse className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      href: "/services/warehouse"
    },
    {
      title: "Sunshade Installation",
      description: "Fixed and retractable sunshades for villas, cafes and terraces.",
      icon: <Sun className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      href: "/services/sunshade"
    },
    {
      title: "Outdoor Curtains",
      description: "Weatherproof PVC and mesh curtains for balconies and majlis areas.",
      icon: <Tent className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2070&auto=format&fit=crop",
      href: "/services/outdoor-curtains"
    },
  ];

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="OUR SERVICES" 
          heading="Complete Rolling Shutter & Sunshade Solutions" 
          subtitle="One team for installation, repair, motorisation and shading - for shops, villas, garages and warehouses across Dubai."
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
