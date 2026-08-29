import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { 
  ClipboardList, 
  Trash2,
  Phone,
  MapPin,
  CheckCircle2,
  Mail,
  Clock
} from "lucide-react";
import { StatusForm } from "./status-form";
import { RequestsClientControls } from "./requests-client-controls";

export const metadata = { title: "Customer Requests | Admin" };

async function updateRequestStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as any;
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/requests");
}

async function deleteRequest(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath("/admin/requests");
}

export default async function RequestsAdminPage(
  props: { searchParams?: Promise<{ query?: string; status?: any }> }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const status = searchParams?.status || undefined;

  const whereClause: any = {};
  
  if (status && status !== "ALL") {
    whereClause.status = status;
  }

  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { phone: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
    ];
  }

  const requests = await prisma.quoteRequest.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Requests</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage quotation requests submitted from the public website.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-xs font-medium text-blue-700">
          <ClipboardList className="w-3.5 h-3.5" />
          {requests.length} total
        </span>
      </div>

      <RequestsClientControls requests={requests} />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <ClipboardList className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-base font-medium text-slate-600">No requests yet</p>
            <p className="text-sm mt-1">When customers submit a quote request, it will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {requests.map((req) => (
              <div key={req.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col xl:flex-row xl:items-start gap-6">
                
                {/* Left: Customer Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold flex-shrink-0">
                      {req.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{req.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <a href={`tel:${req.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium">
                          <Phone className="w-3.5 h-3.5" /> {req.phone}
                        </a>
                        {req.email && (
                          <a href={`mailto:${req.email}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium">
                            <Mail className="w-3.5 h-3.5" /> {req.email}
                          </a>
                        )}
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          <MapPin className="w-3.5 h-3.5" /> {req.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Service Requested</p>
                    <p className="text-sm font-semibold text-slate-800">{req.service}</p>
                    {req.message && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60">
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{req.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Meta & Actions */}
                <div className="xl:w-64 flex-shrink-0 flex flex-col gap-4 border-t xl:border-t-0 xl:border-l border-slate-100 pt-4 xl:pt-0 xl:pl-6">
                  
                  <div>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-1.5">
                      <Clock className="w-3.5 h-3.5" /> 
                      {req.createdAt.toLocaleDateString()} at {req.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <StatusForm 
                    id={req.id}
                    initialStatus={req.status}
                    updateAction={updateRequestStatus}
                  />

                  <div className="mt-auto pt-4 flex justify-end">
                    <form action={deleteRequest}>
                      <input type="hidden" name="id" value={req.id} />
                      <button 
                        type="submit"
                        title="Delete request"
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
