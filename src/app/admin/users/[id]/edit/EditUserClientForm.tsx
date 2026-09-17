"use client";

import { useState } from "react";
import { updateUser } from "../../actions";
import { User, Mail, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditUserClientForm({ user }: { user: any }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await updateUser(formData);
      toast.success("Admin user updated successfully!");
    } catch (e: any) {
      toast.error(e.message || "Failed to update user");
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="p-6 md:p-8 space-y-6">
      <input type="hidden" name="id" value={user.id} />
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <User className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={user.name}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] transition-colors"
            placeholder="Admin Name"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={user.email}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] transition-colors"
            placeholder="admin@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          New Password (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            minLength={6}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] transition-colors"
            placeholder="Leave blank to keep current password"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0A2540] hover:bg-[#173A5E] disabled:opacity-70 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
