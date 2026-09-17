import prisma from "@/lib/prisma";
import Link from "next/link";
import { User, Plus, Trash2, Mail, Shield, Pencil } from "lucide-react";
import { deleteUser } from "./actions";
import ClientActionForm from "../components/ClientActionForm";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { email: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage who has access to the admin dashboard.
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#E59819] hover:bg-[#c78210] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Admin
        </Link>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">User</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Email</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Role</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all duration-300 hover:scale-[1.01] bg-white group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <span className="font-medium text-slate-900">{user.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                      <Shield className="w-3.5 h-3.5" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="p-2 text-slate-400 hover:text-[#E59819] hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <ClientActionForm 
                        action={deleteUser.bind(null, user.id)}
                        successMessage="Admin user deleted successfully"
                        errorMessage="Failed to delete admin user"
                      >
                        <button 
                          type="submit"
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                          disabled={users.length <= 1} // Don't allow deleting the last admin
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </ClientActionForm>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No admin users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
