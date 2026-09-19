import { getSiteSettings } from "@/lib/settings";
import { revalidateTag, revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Save,
  Info,
  CheckCircle2,
  Eye,
  Zap,
  Building,
} from "lucide-react";
import SettingsClientForm from "./SettingsClientForm";
import SubmitButton from "../projects/SubmitButton";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  async function updateSettings(formData: FormData) {
    "use server";

    const companyName = formData.get("companyName") as string;
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;
    const mapLink = formData.get("mapLink") as string;
    const serviceAreasStr = formData.get("serviceAreas") as string;
    const serviceAreas = serviceAreasStr 
      ? serviceAreasStr.split(',').map(s => s.trim()).filter(Boolean) 
      : [];

    const existing = await prisma.siteSettings.findFirst();
    if (existing) {
      await prisma.siteSettings.update({
        where: { id: existing.id },
        data: { companyName, phone, whatsapp, email, location, mapLink, serviceAreas },
      });
    } else {
      await prisma.siteSettings.create({
        data: { companyName, phone, whatsapp, email, location, mapLink, serviceAreas },
      });
    }

    // Instantly purge the cache so the frontend updates immediately
    revalidateTag("settings", "max");
    revalidatePath("/admin/settings");
  }

  const fields = [
    {
      id: "companyName",
      name: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Najmat Raozan Technical Service",
      defaultValue: settings.companyName,
      icon: Building,
      hint: "Displayed on the website header, footer, and page titles.",
    },
    {
      id: "phone",
      name: "phone",
      label: "Display Phone Number",
      type: "text",
      placeholder: "+971 56 588 2185",
      defaultValue: settings.phone,
      icon: Phone,
      hint: "Shown in the site header and contact section.",
    },
    {
      id: "whatsapp",
      name: "whatsapp",
      label: "WhatsApp Number",
      type: "text",
      placeholder: "971565882185",
      defaultValue: settings.whatsapp,
      icon: MessageCircle,
      hint: "Digits only, no spaces or + prefix. Used in WhatsApp chat links.",
    },
    {
      id: "email",
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "info@example.com",
      defaultValue: settings.email,
      icon: Mail,
      hint: "Displayed in the footer and contact page.",
    },
    {
      id: "location",
      name: "location",
      label: "Physical Location",
      type: "text",
      placeholder: "Al Quoz Industrial Area, Dubai, UAE",
      defaultValue: settings.location,
      icon: MapPin,
      hint: "Full address shown on the contact page.",
    },
    {
      id: "mapLink",
      name: "mapLink",
      label: "Google Maps Link",
      type: "url",
      placeholder: "https://maps.app.goo.gl/...",
      defaultValue: settings.mapLink,
      icon: MapPin,
      hint: "Paste the 'Share' link from Google Maps. Used for 'Get Directions' buttons.",
    },
    {
      id: "serviceAreas",
      name: "serviceAreas",
      label: "Service Areas",
      type: "textarea",
      placeholder: "Deira, Bur Dubai, Al Quoz...",
      defaultValue: (settings.serviceAreas || []).join(', '),
      icon: MapPin,
      hint: "Comma separated list of areas (e.g. Deira, Bur Dubai, Al Quoz).",
    },
  ];

  const previewItems = [
    { icon: Building, label: "Company", value: settings.companyName },
    { icon: Phone, label: "Phone", value: settings.phone },
    { icon: MessageCircle, label: "WhatsApp", value: `wa.me/${settings.whatsapp}` },
    { icon: Mail, label: "Email", value: settings.email },
    { icon: MapPin, label: "Location", value: settings.location },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage contact details displayed across your website.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Live &amp; Active
        </span>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── LEFT: Form (2/3 width) ── */}
        <div className="xl:col-span-2 space-y-4">

          {/* Info banner */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Changes take effect <strong>immediately</strong>. The cache is automatically cleared
              when you save, so the frontend reflects your updates right away.
            </p>
          </div>

          {/* Settings card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Contact Information
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Header, footer, contact forms, and WhatsApp button
                </p>
              </div>
            </div>

            {/* Form */}
            <SettingsClientForm action={updateSettings}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.id} className="space-y-1.5">
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-slate-700"
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Icon className="w-4 h-4 text-slate-400" />
                        </div>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.id}
                            name={field.name}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                            required
                            rows={3}
                            className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] hover:border-slate-300 transition-colors"
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.name}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                            required
                            className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] hover:border-slate-300 transition-colors"
                          />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 pl-1">{field.hint}</p>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">All fields are required.</p>
                <div className="w-48">
                  <SubmitButton
                    label="Save Changes"
                    loadingLabel="Saving..."
                    icon={<Save className="w-4 h-4" />}
                  />
                </div>
              </div>
            </SettingsClientForm>
          </div>
        </div>

        {/* ── RIGHT: Info panel (1/3 width) ── */}
        <div className="space-y-4">

          {/* Live preview card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Current Values</p>
                <p className="text-xs text-slate-400">What visitors see right now</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {previewItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                    <p className="text-sm text-slate-800 font-medium truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips card */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#173A5E] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-amber-400" />
              <p className="text-sm font-semibold">Quick Tips</p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                WhatsApp number must be digits only — no spaces, dashes or <code className="text-amber-300">+</code> prefix.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                Phone number can include formatting like <code className="text-amber-300">+971 56 …</code> for display.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                After saving, wait 1–2 seconds for the cache to propagate before refreshing the public site.
              </li>
            </ul>
          </div>

          {/* Cache status */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-green-800">Auto Cache Clear</p>
              <p className="text-xs text-green-700 mt-0.5 leading-relaxed">
                Saving automatically invalidates the <code className="bg-green-100 px-1 rounded">settings</code> cache tag so no manual refresh is needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
