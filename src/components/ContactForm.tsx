"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsContext";
import { createQuoteRequest } from "@/lib/quote";

export default function ContactForm() {
  const settings = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to database via server action
      await createQuoteRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        location: formData.location,
        message: formData.message,
      });

      // 2. Prepare WhatsApp message
      const text = [
        `*Hello Najmat Raozan Technical Service!*`,
        `I'd like to request a free quotation.`,
        ``,
        `---------------------------`,
        `*Name:*        ${formData.name}`,
        formData.email ? `*Email:*       ${formData.email}` : null,
        `*Phone:*       ${formData.phone}`,
        `*Service:*     ${formData.service}`,
        `*Area:*          ${formData.location}`,
        formData.message ? `*Message:*   ${formData.message}` : null,
        ``,
      ].filter(Boolean).join("\n");

      const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
      
      // 3. Open WhatsApp
      window.open(waUrl, "_blank");

      // 4. Show success state
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", service: "", location: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error("Failed to submit form", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          
          {/* Left: Contact Info */}
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold tracking-wide uppercase mb-6">
              <Sparkles className="w-4 h-4" /> Let's Connect
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 leading-tight">
              Get Your Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-600">Quotation</span> Today
            </h2>
            
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Tell us what you need and our expert team will contact you within 30 minutes to provide a quotation or schedule a free site visit anywhere in Dubai.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white transition-all duration-300 group hover:shadow-xl hover:shadow-brand-accent/5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-brand-accent transition-all duration-500">
                  <Phone className="w-6 h-6 text-brand-accent group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Call Us Directly</h4>
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-brand-primary font-bold text-xl hover:text-brand-accent transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white transition-all duration-300 group hover:shadow-xl hover:shadow-green-500/5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-green-500 transition-all duration-500">
                  <MessageCircle className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Chat on WhatsApp</h4>
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-brand-primary font-bold text-xl hover:text-green-600 transition-colors">
                    +{settings.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-500">
                  <Mail className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Email Address</h4>
                  <a href={`mailto:${settings.email}`} className="text-brand-primary font-bold text-xl hover:text-blue-600 transition-colors break-all">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white transition-all duration-300 group hover:shadow-xl hover:shadow-brand-primary/5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-500">
                  <MapPin className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Office Location</h4>
                  <p className="text-brand-primary font-bold text-lg leading-snug">
                    {settings.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-7/12 w-full">
            <div className="relative rounded-3xl p-8 md:p-10 shadow-2xl shadow-brand-primary/5 border border-white/60 bg-white/70 backdrop-blur-xl overflow-hidden group">
              
              {/* Animated decorative blobs */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-brand-accent/20 to-transparent rounded-full blur-3xl group-hover:bg-brand-accent/30 transition-all duration-700 ease-in-out pointer-events-none"></div>
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700 ease-in-out pointer-events-none"></div>

              {isSubmitted ? (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-black text-brand-primary mb-4 tracking-tight">Request Received!</h3>
                  <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                    Thank you for reaching out. Our team has received your details and will contact you shortly with your free quotation.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="name" className="text-sm font-bold text-brand-primary ml-1">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200/80 bg-white/80 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400 font-medium text-brand-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="phone" className="text-sm font-bold text-brand-primary ml-1">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200/80 bg-white/80 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400 font-medium text-brand-primary"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="email" className="text-sm font-bold text-brand-primary ml-1">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200/80 bg-white/80 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400 font-medium text-brand-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="location" className="text-sm font-bold text-brand-primary ml-1">Area in Dubai <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      id="location" 
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200/80 bg-white/80 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400 font-medium text-brand-primary"
                      placeholder="e.g. Al Quoz, Business Bay..."
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="service" className="text-sm font-bold text-brand-primary ml-1">Required Service <span className="text-red-500">*</span></label>
                  <select 
                    id="service" 
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200/80 bg-white/80 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 hover:border-gray-300 font-medium text-brand-primary appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Rolling Shutter Repair">Rolling Shutter Repair</option>
                    <option value="Rolling Shutter Installation">Rolling Shutter Installation</option>
                    <option value="Automatic Shutter Upgrade">Automatic Shutter Upgrade</option>
                    <option value="Sunshade / Car Parking">Sunshade / Car Parking</option>
                    <option value="Outdoor Curtains">Outdoor Curtains</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="message" className="text-sm font-bold text-brand-primary ml-1">Message Details</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200/80 bg-white/80 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 hover:border-gray-300 placeholder:text-gray-400 font-medium text-brand-primary resize-none"
                    placeholder="Briefly describe your requirements or the issue with your shutter..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-brand-primary to-[#1a3855] hover:to-[#22486d] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-brand-accent" />
                      Request Free Quotation
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
