import { Settings, Wrench, Zap, Store, Warehouse, Sun, Tent } from "lucide-react";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";

export default function ServicesGrid() {
  const services = [
    {
      title: "Rolling Shutter Installation",
      description: "Professional installation of manual and automatic rolling shutters for shops, garages, and commercial spaces.",
      icon: <Settings className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      href: "/services/installation"
    },
    {
      title: "Rolling Shutter Repair",
      description: "Fast and reliable repair services for stuck, damaged, or noisy rolling shutters. 24/7 emergency response.",
      icon: <Wrench className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1540573934394-06180fc545a9?q=80&w=2070&auto=format&fit=crop",
      href: "/services/repair"
    },
    {
      title: "Automatic Rolling Shutter",
      description: "Upgrade your manual shutter to a motorized automatic system with remote control access for ultimate convenience.",
      icon: <Zap className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
      href: "/services/automatic"
    },
    {
      title: "Motor Repair & Replacement",
      description: "Expert troubleshooting, repair, and replacement of rolling shutter motors and control panels.",
      icon: <Settings className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      href: "/services/motor-repair"
    },
    {
      title: "Shop & Garage Shutter",
      description: "Heavy-duty security shutters designed specifically for retail shops and residential garage doors.",
      icon: <Store className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      href: "/services/shop-garage"
    },
    {
      title: "Warehouse Shutter",
      description: "Industrial-grade large rolling shutters for warehouses and factories. Built for maximum security and durability.",
      icon: <Warehouse className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      href: "/services/warehouse"
    },
    {
      title: "Sunshade Installation",
      description: "Premium sunshades and car parking shades for villas and commercial buildings. Protects from harsh Dubai sun.",
      icon: <Sun className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      href: "/services/sunshade"
    },
    {
      title: "Outdoor Curtains",
      description: "Elegant and durable outdoor curtains for patios, balconies, and restaurants to create comfortable shaded areas.",
      icon: <Tent className="w-6 h-6" />,
      imageUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2070&auto=format&fit=crop",
      href: "/services/outdoor-curtains"
    },
  ];

  return (
    <section className="py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="OUR SERVICES" 
          heading="Complete Rolling Shutter & Sunshade Solutions" 
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
