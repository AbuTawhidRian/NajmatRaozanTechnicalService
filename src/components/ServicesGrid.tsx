import { Settings, Wrench, Zap, Store, Warehouse, Sun, Tent } from "lucide-react";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";

export default function ServicesGrid() {
  const services = [
    {
      title: "Rolling Shutter Installation",
      description: "New manual and automatic shutters measured, fabricated and fitted on site.",
      icon: <Settings className="w-6 h-6" />,
      imageUrl: "https://overheaddoor-production-assets.azureedge.net/assets/images/default-source/product-images/commercial/rolling-shutter/allura-shutter-653-powder-coat.jpg?sfvrsn=5eea7e43_1",
      href: "/services/installation"
    },
    {
      title: "Rolling Shutter Repair",
      description: "Stuck, jammed or noisy shutter? Our team gets it moving the same day.",
      icon: <Wrench className="w-6 h-6" />,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRop3j5ILrXarlU1RFWi6uGWN_qS-Z6SAN46CmrW-W2a6H7QJ6oCAQKGpFu&s=10",
      href: "/services/repair"
    },
    {
      title: "Automatic Rolling Shutter",
      description: "Motorised shutters with remote, wall switch and safety stop.",
      icon: <Zap className="w-6 h-6" />,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0t2bnHipwJrxL6sQ3WxWg-CC9VBprWhHtnNWu9_aRcT6ceT1oWCmtmHF&s=10",
      href: "/services/automatic"
    },
    {
      title: "Motor Repair & Replacement",
      description: "Motor not responding? We diagnose, rewind or replace it.",
      icon: <Settings className="w-6 h-6" />,
      imageUrl: "https://shutters4u.com.au/wp-content/uploads/2019/07/s4umanual-roller-shutter-product.png",
      href: "/services/motor-repair"
    },
    {
      title: "Shop & Garage Shutter",
      description: "Secure shopfront and villa garage shutters built to daily use.",
      icon: <Store className="w-6 h-6" />,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosqTs8iPEF7qg7b857NKfepb5MH7z6smnIKKz-wE_JnN0m_1vB41RQU0&s=10",
      href: "/services/shop-garage"
    },
    {
      title: "Warehouse Shutter",
      description: "Heavy-duty industrial shutters for large openings and loading bays.",
      icon: <Warehouse className="w-6 h-6" />,
      imageUrl: "https://vijayshutterenterprises.com/wp-content/uploads/2026/01/automatic-shutter-control-system-1.jpg",
      href: "/services/warehouse"
    },
    {
      title: "Sunshade Installation",
      description: "Fixed and retractable sunshades for villas, cafes and terraces.",
      icon: <Sun className="w-6 h-6" />,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOx9r4qX_f0UYVw_bfqRKCXIbWgCEUECTIU8r2E2azTaGgMVlCvbuLvPA&s=10",
      href: "/services/sunshade"
    },
    {
      title: "Outdoor Curtains",
      description: "Weatherproof PVC and mesh curtains for balconies and majlis areas.",
      icon: <Tent className="w-6 h-6" />,
      imageUrl: "https://i0.wp.com/www.bmpdoors.com/opt/content/media/2018/03/shutter-doors-2.jpg?fit=800%2C600&ssl=1",
      href: "/services/outdoor-curtains"
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative z-10">
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
