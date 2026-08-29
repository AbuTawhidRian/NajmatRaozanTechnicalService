import prisma from "@/lib/prisma";
import { Users, Mail, Phone, MapPin, ClipboardList } from "lucide-react";

export const metadata = { title: "Customers | Admin" };

export default async function CustomersAdminPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      _count: {
        select: { requests: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage registered customers and their service requests.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-xs font-medium text-blue-700">
          <Users className="w-3.5 h-3.5" />
          {customers.length} total
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Users className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-base font-medium text-slate-600">No customers yet</p>
            <p className="text-sm mt-1">Registered customers will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 rounded-tl-xl">Customer</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Address</th>
                  <th className="p-4 text-center rounded-tr-xl">Requests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                          {customer.name ? customer.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {customer.name || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">ID: {customer.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {customer.email ? (
                          <a href={`mailto:${customer.email}`} className="hover:text-blue-600 hover:underline">{customer.email}</a>
                        ) : (
                          <span className="text-slate-400 italic">No email</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {customer.phone ? (
                          <a href={`tel:${customer.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 hover:underline">{customer.phone}</a>
                        ) : (
                          <span className="text-slate-400 italic">No phone</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-start gap-2 text-sm text-slate-600 max-w-[250px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">
                          {customer.address || <span className="text-slate-400 italic">No address provided</span>}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-top text-center">
                      <div className="inline-flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                        <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                        {customer._count.requests}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
