"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Globe, Layers, ClipboardList } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/requests", label: "Requests", icon: ClipboardList, exact: false },
  { href: "/admin/services", label: "Services", icon: Layers, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];


export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-5 space-y-1">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
        Menu
      </p>

      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              isActive
                ? "bg-white/15 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon
              className={`w-4 h-4 transition-colors ${
                isActive
                  ? "text-[#E59819]"
                  : "text-slate-400 group-hover:text-[#E59819]"
              }`}
            />
            {label}
          </Link>
        );
      })}

      <div className="pt-4">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Site
        </p>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all group"
        >
          <Globe className="w-4 h-4 text-slate-400 group-hover:text-[#E59819] transition-colors" />
          View Website
        </a>
      </div>
    </nav>
  );
}
