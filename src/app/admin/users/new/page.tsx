"use client";

import { useState } from "react";
import { createUser } from "../actions";
import { ArrowLeft, Save, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewAdminUserPage() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await createUser(formData);
      toast.success("Admin user created successfully!");
    } catch (e: any) {
      toast.error(e.message || "Failed to create user");
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/users"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Admin</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create a new administrator account to access the dashboard.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <form action={handleSubmit} className="p-6 md:p-8 space-y-6">

          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
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
                className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] transition-colors"
                placeholder="Admin Name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
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
                className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] transition-colors"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E59819]/40 focus:border-[#E59819] transition-colors"
                placeholder="Min. 6 characters"
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
              {isPending ? "Saving..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
