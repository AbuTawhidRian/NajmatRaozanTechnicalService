import { auth } from "../../auth";
import { ClipboardList, Clock, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  const userName = session?.user?.name || "Admin";

  const stats = [
    {
      label: "Total Service Requests",
      value: "0",
      icon: ClipboardList,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      trend: null,
    },
    {
      label: "Pending Requests",
      value: "0",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: null,
    },
    {
      label: "Completed Jobs",
      value: "0",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      trend: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, {userName}! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl p-6 border ${stat.border} shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
                  <p className={`text-4xl font-extrabold mt-2 ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              {stat.trend && (
                <div className="flex items-center gap-1 mt-4">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">{stat.trend}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Welcome card */}
      <div className="bg-gradient-to-br from-[#0A2540] to-[#173A5E] rounded-2xl p-8 text-white relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-12 -right-4 w-56 h-56 bg-[#E59819]/10 rounded-full" />

        <div className="relative z-10">
          <h2 className="text-xl font-bold">Rolling Shutter Repair — Admin</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-md">
            This is your central hub for managing service requests, contact settings, and business operations.
          </p>
          <a
            href="/admin/settings"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[#E59819] hover:bg-[#C78210] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Go to Settings
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/admin/settings"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-[#E59819]/40 hover:bg-amber-50/50 transition-all group"
          >
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <ClipboardList className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">Update Contact Info</p>
              <p className="text-xs text-slate-400">Phone, email, location</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 ml-auto transition-colors" />
          </a>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">Preview Website</p>
              <p className="text-xs text-slate-400">See live frontend</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 ml-auto transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
