import { Trophy, CheckCircle, Clock, Map } from "lucide-react";

export default function TrustStats() {
  const stats = [
    {
      icon: <Trophy className="w-8 h-8" />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: "500+",
      label: "Projects Completed",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: "24/7",
      label: "Emergency Support",
    },
    {
      icon: <Map className="w-8 h-8" />,
      number: "100%",
      label: "Dubai-Wide Service",
    },
  ];

  return (
    <section className="py-12 bg-white relative z-20 -mt-8 md:-mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-panel rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center px-4 group">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                {stat.number}
              </h3>
              <p className="text-sm font-semibold text-brand-gray uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
