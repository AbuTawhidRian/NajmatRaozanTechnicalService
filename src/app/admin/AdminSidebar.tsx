"use client";

import { useState } from "react";
import { LogOut, Wrench, Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import { signOut } from "next-auth/react";

export default function AdminSidebar({
  userName,
  userInitial,
  userEmail,
}: {
  userName: string;
  userInitial: string;
  userEmail?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0A2540] p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E59819] flex items-center justify-center flex-shrink-0">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Admin Panel</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-64 bg-[#0A2540] text-white flex-shrink-0 shadow-2xl md:min-h-screen`}
      >
        {/* Logo / Brand (Desktop) */}
        <div className="hidden md:block px-6 py-5 border-b border-white/10">
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
        <div className="flex-1">
          <NavLinks />
        </div>

        {/* User footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#E59819] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-slate-400 truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
