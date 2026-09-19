import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "../../ImageUploader";
import MultiImageUploader from "../../MultiImageUploader";
import SubmitButton from "../../SubmitButton";
import RichTextEditor from "@/components/RichTextEditor";
import ClientActionForm from "../../../components/ClientActionForm";

export const metadata = { title: "Edit Project | Admin" };

import { deleteLocalFile } from "@/lib/file";

async function updateProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const slug = formData.get("slug") as string;
  const location = formData.get("location") as string;
  const gallery = formData.getAll("gallery") as string[];

  // Fetch the old service to see if any images were removed
  const oldProject = await prisma.project.findUnique({ where: { id } });

  await prisma.project.update({
    where: { id },
    data: { title, description, imageUrl, slug, location, gallery },
  });

  // If update succeeded, delete orphaned files
  if (oldProject) {
    if (oldProject.imageUrl && oldProject.imageUrl !== imageUrl) {
      await deleteLocalFile(oldProject.imageUrl);
    }
    if (oldProject.gallery) {
      for (const oldUrl of oldProject.gallery) {
        if (!gallery.includes(oldUrl)) {
          await deleteLocalFile(oldUrl);
        }
      }
    }
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
          <p className="text-sm text-slate-500 mt-0.5">Updating: {project.title}</p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ClientActionForm 
          action={updateProject} 
          successMessage="Project updated successfully"
          errorMessage="Failed to update project"
          className="p-6 space-y-5"
          redirectTo="/admin/projects"
        >
          <input type="hidden" name="id" value={project.id} />

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <input
              name="title"
              required
              defaultValue={project.title}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819]"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Slug</label>
            <input
              name="slug"
              required
              defaultValue={project.slug}
              pattern="[a-z0-9\-]+"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819]"
            />
            <p className="text-xs text-slate-400">Changing the slug will break existing /services/[slug] links.</p>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Location (Optional)</label>
            <input
              name="location"
              defaultValue={project.location || ""}
              placeholder="e.g. Al Quoz, Dubai"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819]"
            />
          </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <RichTextEditor name="description" defaultValue={project.description} />
            </div>

          {/* Main Image */}
          <ImageUploader name="imageUrl" defaultUrl={project.imageUrl} label="Card Image" />

          {/* Gallery Images */}
          <MultiImageUploader name="gallery" defaultUrls={project.gallery} label="Project Gallery Images" />

          {/* Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <Link href="/admin/projects" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
              Cancel
            </Link>
            <SubmitButton 
              label="Save Changes" 
              loadingLabel="Saving Changes..." 
              icon={<Save className="w-4 h-4" />} 
              className=""
            />
          </div>
        </ClientActionForm>
      </div>
    </div>
  );
}
