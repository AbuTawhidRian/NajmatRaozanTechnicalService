import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail, Lock, Save } from "lucide-react";
import EditUserClientForm from "./EditUserClientForm";

export default async function EditAdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || user.role !== "ADMIN") {
    notFound();
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
          <h1 className="text-2xl font-bold text-slate-900">Edit Admin</h1>
          <p className="text-sm text-slate-500 mt-1">
            Update administrator account details.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <EditUserClientForm user={user} />
      </div>
    </div>
  );
}
