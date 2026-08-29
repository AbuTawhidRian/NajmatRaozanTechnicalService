import { getAllServices } from "@/lib/services";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Layers,
  ToggleLeft,
  ToggleRight,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import DeleteServiceForm from "./DeleteServiceForm";
import RichTextEditor from "@/components/RichTextEditor";


export const metadata = { title: "Manage Services | Admin" };

// ─── Server Actions ────────────────────────────────────────────────────────────

async function createService(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const slug = formData.get("slug") as string;

  const last = await prisma.service.findFirst({ orderBy: { order: "desc" } });
  const order = (last?.order ?? 0) + 1;

  await prisma.service.create({
    data: { title, description, imageUrl, slug, order, isActive: true },
  });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

async function deleteService(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

async function toggleActive(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const current = formData.get("current") === "true";
  await prisma.service.update({ where: { id }, data: { isActive: !current } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

async function moveService(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const direction = formData.get("direction") as "up" | "down";
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const idx = services.findIndex((s) => s.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= services.length) return;

  await prisma.$transaction([
    prisma.service.update({ where: { id: services[idx].id }, data: { order: services[swapIdx].order } }),
    prisma.service.update({ where: { id: services[swapIdx].id }, data: { order: services[idx].order } }),
  ]);
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default async function ServicesAdminPage() {
  const services = await getAllServices();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage the services shown on the public website.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600">
          <Layers className="w-3.5 h-3.5" />
          {services.length} services
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Services Table (2/3) ── */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-sm font-semibold text-slate-800">All Services</p>
          </div>

          {services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Layers className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No services yet. Add one →</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {services.map((svc, idx) => (
                <div key={svc.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/50 transition-colors group">
                  {/* Drag handle visual */}
                  <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />

                  {/* Image thumbnail */}
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                    <Image src={svc.imageUrl} alt={svc.title} fill className="object-cover" unoptimized />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{svc.title}</p>
                    <p className="text-xs text-slate-400 truncate">/services/{svc.slug}</p>
                  </div>

                  {/* Active badge */}
                  <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${svc.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {svc.isActive ? "Active" : "Hidden"}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {/* Move up */}
                    <form action={moveService}>
                      <input type="hidden" name="id" value={svc.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button type="submit" disabled={idx === 0} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 transition-colors">
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                    </form>

                    {/* Move down */}
                    <form action={moveService}>
                      <input type="hidden" name="id" value={svc.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button type="submit" disabled={idx === services.length - 1} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 transition-colors">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </form>

                    {/* Toggle active */}
                    <form action={toggleActive}>
                      <input type="hidden" name="id" value={svc.id} />
                      <input type="hidden" name="current" value={String(svc.isActive)} />
                      <button type="submit" title={svc.isActive ? "Hide" : "Show"} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                        {svc.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                    </form>

                    {/* Edit */}
                    <Link
                      href={`/admin/services/${svc.id}/edit`}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>

                    {/* Delete */}
                    <DeleteServiceForm id={svc.id} title={svc.title} action={deleteService} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Add Service Form (1/3) ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Add New Service</p>
              <p className="text-xs text-slate-400">It will appear last on the public site</p>
            </div>
          </div>

          <form action={createService} className="p-5 space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input
                name="title"
                required
                placeholder="e.g. Fire Shutter Installation"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] placeholder:text-slate-300"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Slug</label>
              <input
                name="slug"
                required
                placeholder="e.g. fire-shutter"
                pattern="[a-z0-9\-]+"
                title="Lowercase letters, numbers and hyphens only"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] placeholder:text-slate-300"
              />
              <p className="text-xs text-slate-400">Lowercase, hyphens only. Used in the URL.</p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <RichTextEditor name="description" />
            </div>

            {/* Image */}
            <ImageUploader name="imageUrl" label="Card Image" />

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A2540] hover:bg-[#173A5E] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
