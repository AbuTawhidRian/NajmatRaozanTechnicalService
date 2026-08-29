import { redirect } from "next/navigation";
import { auth, signOut } from "../../auth";
import { LogOut, Wrench } from "lucide-react";
import NavLinks from "./NavLinks";

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

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2540] text-white flex flex-col flex-shrink-0 shadow-2xl">
        {/* Logo / Brand */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E59819] flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400 leading-none">Rolling Shutter</p>
              <p className="text-sm font-bold text-white leading-tight mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <NavLinks />

        {/* User footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#E59819] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

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
