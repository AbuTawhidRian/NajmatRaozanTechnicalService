"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Hammer, Clock, MapPin } from "lucide-react";

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ icon, number, suffix, label, index }: { icon: React.ReactNode; number: number | string; suffix?: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const isNumeric = typeof number === "number";
  const count = useCountUp(isNumeric ? number : 0, 1800, started);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const delayClass = `fade-up-delay-${index + 1}`;

  return (
    <div
      ref={ref}
      className={`fade-up ${delayClass} shimmer flex-1 p-8 md:p-10 flex flex-col items-start relative overflow-hidden border-l-[3px] border-brand-accent/0 hover:border-brand-accent transition-all duration-300 group cursor-default`}
      style={{ borderLeftColor: "transparent" }}
      onMouseEnter={e => (e.currentTarget.style.borderLeftColor = "#E59819")}
      onMouseLeave={e => (e.currentTarget.style.borderLeftColor = "transparent")}
    >
      {/* Divider (between items) */}
      <div className="absolute right-0 top-6 bottom-6 w-px bg-gray-100 last:hidden" />

      <div className="w-11 h-11 bg-gradient-to-br from-[#fdf3dc] to-[#faecc9] rounded-lg flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-1.5 tracking-tight tabular-nums">
        {isNumeric ? `${count}${suffix ?? ""}` : number}
      </h3>
      <p className="text-[0.68rem] font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

export default function TrustStats() {
  const stats = [
    { icon: <ShieldCheck className="w-5 h-5 text-amber-700" />, number: 10, suffix: "+", label: "Years Experience" },
    { icon: <Hammer className="w-5 h-5 text-amber-700" />, number: 500, suffix: "+", label: "Projects Completed" },
    { icon: <Clock className="w-5 h-5 text-amber-700" />, number: "24/7", label: "Emergency Support" },
    { icon: <MapPin className="w-5 h-5 text-amber-700" />, number: "Dubai", label: "Wide Coverage" },
  ];

  return (
    <section className="bg-brand-light pt-8 pb-16 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col md:flex-row overflow-hidden -mt-16 relative divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
