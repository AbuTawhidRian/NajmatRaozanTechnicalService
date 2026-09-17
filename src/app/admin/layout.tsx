import { redirect } from "next/navigation";
import { auth, signOut } from "../../auth";
import { LogOut, Wrench } from "lucide-react";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const userName = session.user?.name || "Admin";
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = session.user?.email;

  return (
    <div className="min-h-screen relative bg-[#F0F4F8] flex flex-col md:flex-row font-sans">
      <Toaster position="top-center" />
      <AdminSidebar userName={userName} userInitial={userInitial} userEmail={userEmail} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Logged in as</span>
            <span className="text-xs font-semibold text-slate-700">{userName}</span>
            <div className="w-7 h-7 rounded-full bg-[#E59819] flex items-center justify-center text-xs font-bold text-white">
              {userInitial}
            </div>
          </div>
        </header>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
