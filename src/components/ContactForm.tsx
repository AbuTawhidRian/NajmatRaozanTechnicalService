"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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
                  <a href="tel:+971565882185" className="text-brand-gray hover:text-brand-accent transition-colors font-medium text-lg">
                    +971 56 588 2185
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">WhatsApp</h4>
                  <a href="https://wa.me/971565882185" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-green-600 transition-colors font-medium text-lg">
                    +971 56 588 2185
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:info@najmatraozan.com" className="text-brand-gray hover:text-brand-accent transition-colors font-medium text-lg">
                    info@najmatraozan.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-brand-primary font-bold text-lg mb-1">Location</h4>
                  <p className="text-brand-gray font-medium text-lg">
                    Al Quoz Industrial Area<br />Dubai, UAE
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
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-brand-primary">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
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
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-gray-50/50 appearance-none"
                    >
                      <option value="" disabled selected>Select a service</option>
                      <option value="repair">Rolling Shutter Repair</option>
                      <option value="install">Rolling Shutter Installation</option>
                      <option value="automatic">Automatic Shutter Upgrade</option>
                      <option value="sunshade">Sunshade / Car Parking</option>
                      <option value="curtains">Outdoor Curtains</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-bold text-brand-primary">Area in Dubai *</label>
                    <input 
                      type="text" 
                      id="location" 
                      required
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
