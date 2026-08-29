"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
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
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Contact Info */}
          <div className="lg:w-5/12">
            <SectionHeading 
              title="CONTACT US" 
              heading="Get Your Free Quotation" 
            />
            <p className="text-brand-gray mt-6 mb-10 text-lg leading-relaxed">
              Tell us what you need and our team will contact you within 30 minutes to provide a quotation or schedule a free site visit anywhere in Dubai.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">Phone</h4>
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-brand-gray hover:text-brand-accent transition-colors font-medium text-lg">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">WhatsApp</h4>
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-green-600 transition-colors font-medium text-lg">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">Email</h4>
                  <a href={`mailto:${settings.email}`} className="text-brand-gray hover:text-brand-accent transition-colors font-medium text-lg">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">Location</h4>
                  <p className="text-brand-gray font-medium text-lg whitespace-pre-line">
                    {settings.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-7/12">
            <div className="bg-white rounded-3xl p-8 md:p-12 premium-shadow border border-gray-100 relative overflow-hidden">
              
              {isSubmitted ? (
                <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-brand-primary mb-4">Request Sent Successfully!</h3>
                  <p className="text-brand-gray text-lg max-w-md">
                    Thank you for reaching out. Our team will contact you shortly with your free quotation.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-brand-primary">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-brand-primary">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-brand-primary">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50"
                      placeholder="+971 56 588 2185"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-bold text-brand-primary">Required Service *</label>
                    <select 
                      id="service" 
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50 appearance-none"
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
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-bold text-brand-primary">Area in Dubai *</label>
                    <input 
                      type="text" 
                      id="location" 
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50"
                      placeholder="e.g. Al Quoz, Jumeirah..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-brand-primary">Message Details</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50 resize-none"
                    placeholder="Briefly describe your requirements or the issue with your shutter..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all premium-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
