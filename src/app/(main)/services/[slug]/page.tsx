import CTASection from "@/components/CTASection";
import { getServiceBySlug } from "@/lib/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, CheckCircle2, ArrowLeft, Clock, MapPin, ShieldCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  const plain = service.description.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return {
    title: `${service.title} | Najmat Raozan Technical Service`,
    description: plain.slice(0, 160),
  };
}

const WHY_US = [
  { icon: Clock, text: "Same-day emergency response" },
  { icon: MapPin, text: "All Dubai areas covered" },
  { icon: ShieldCheck, text: "1-year workmanship warranty" },
  { icon: CheckCircle2, text: "Free site visit & quotation" },
  { icon: CheckCircle2, text: "Certified expert technicians" },
  { icon: CheckCircle2, text: "Genuine spare parts only" },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="pt-16 bg-[#F8FAFC] min-h-screen">

      {/* ── HERO ── */}
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
        {service.imageUrl && (
          <Image src={service.imageUrl} alt={service.title} fill priority className="object-cover" sizes="100vw" />
        )}
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content pinned to bottom-left */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-16">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/90 text-xs mb-5 transition-colors group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              All Services
            </Link>
            <p className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-3">Rolling Shutter Services</p>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-2xl">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── STICKY CTA STRIP ── */}
      <div className="bg-brand-primary/95 backdrop-blur-sm sticky top-16 z-30 border-b border-white/10 shadow-md">
        <div className="container mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5 flex-wrap">
            {[{ icon: Clock, t: "Same-day service" }, { icon: MapPin, t: "All Dubai areas" }, { icon: ShieldCheck, t: "Warranty included" }].map(({ icon: Icon, t }) => (
              <span key={t} className="flex items-center gap-1.5 text-white/60 text-xs">
                <Icon className="w-3.5 h-3.5 text-brand-accent" />
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href={`https://wa.me/971565882185?text=${encodeURIComponent(`Hello, I'm interested in your ${service.title} service. Please provide more details.`)}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all shadow-sm">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <a href="tel:+971565882185"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all">
              <Phone className="w-3.5 h-3.5" /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ────────── MAIN CONTENT ────────── */}
          <div className="w-full lg:w-[calc(100%-340px)]">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

              {/* Card header */}
              <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="w-1 h-7 rounded-full bg-brand-accent" />
                <h2 className="text-xl font-bold text-slate-900">Service Details</h2>
              </div>

              {/* Rich text body */}
              <div className="px-8 py-8">
                <div
                  className="
                    text-slate-600 leading-relaxed
                    [&_p]:mb-4 [&_p]:text-[15px] [&_p]:leading-[1.9] [&_p]:text-slate-600
                    [&_strong]:font-semibold [&_strong]:text-slate-800
                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mb-3 [&_h1]:mt-8
                    [&_h2]:text-xl  [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-3 [&_h2]:mt-8
                    [&_h3]:text-lg  [&_h3]:font-semibold [&_h3]:text-slate-800 [&_h3]:mb-2 [&_h3]:mt-6
                    [&_ul]:mb-5 [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-2
                    [&_ol]:mb-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2
                    [&_li]:text-[15px] [&_li]:text-slate-600 [&_li]:relative [&_li]:pl-6 [&_li]:leading-relaxed
                    [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[9px] [&_ul>li]:before:w-2.5 [&_ul>li]:before:h-2.5 [&_ul>li]:before:bg-brand-accent/30 [&_ul>li]:before:rounded-full
                    [&_a]:text-brand-accent [&_a]:no-underline [&_a]:font-medium [&_a]:hover:underline
                    [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_blockquote]:my-6 [&_blockquote]:bg-brand-accent/5 [&_blockquote]:py-3 [&_blockquote]:rounded-r-lg
                  "
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            </div>
          </div>

          {/* ────────── SIDEBAR ────────── */}
          <div className="w-full lg:w-[320px] flex-shrink-0 space-y-5 lg:sticky lg:top-[112px]">

            {/* Service image */}
            {service.imageUrl && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image src={service.imageUrl} alt={service.title} fill className="object-cover" sizes="320px" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/50 to-transparent" />
              </div>
            )}

            {/* Contact card */}
            <div className="bg-brand-primary rounded-2xl p-6 shadow-xl overflow-hidden relative">
              {/* Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-10 h-10 bg-brand-accent/15 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-white font-bold text-base mb-1">Get a Free Quote</h3>
                <p className="text-white/50 text-xs mb-5">We respond within minutes, 7 days a week.</p>
                <a href={`https://wa.me/971565882185?text=${encodeURIComponent(`Hello, I'm interested in your ${service.title} service. Please provide more details.`)}`} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-bold transition-colors mb-2.5 shadow-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
                </a>
                <a href="tel:+971565882185"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-bold transition-colors">
                  <Phone className="w-4 h-4" /> +971 56 588 2185
                </a>
              </div>
            </div>

            {/* Why us */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-1 h-5 bg-brand-accent rounded-full" />
                <h3 className="text-slate-900 font-bold text-sm">Why Choose Us</h3>
              </div>
              <ul className="space-y-3.5">
                {WHY_US.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-brand-accent" />
                    </span>
                    <span className="text-slate-600 text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          {/* ── end sidebar ── */}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
