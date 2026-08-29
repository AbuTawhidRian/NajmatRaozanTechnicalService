"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, FileDown, Filter } from "lucide-react";
import { useTransition } from "react";

interface ListControlsProps {
  searchPlaceholder?: string;
  filterOptions?: { label: string; value: string }[];
  filterParamName?: string;
  onExportPdf?: () => void;
  isExporting?: boolean;
}

export default function ListControls({
  searchPlaceholder = "Search...",
  filterOptions = [],
  filterParamName = "filter",
  onExportPdf,
  isExporting = false,
}: ListControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "ALL") {
      params.set(filterParamName, value);
    } else {
      params.delete(filterParamName);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={searchPlaceholder}
            defaultValue={searchParams.get("query")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        {filterOptions.length > 0 && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none bg-white text-slate-700"
              defaultValue={searchParams.get(filterParamName)?.toString() || "ALL"}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Export Button */}
      {onExportPdf && (
        <button
          onClick={onExportPdf}
          disabled={isExporting}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-70"
        >
          <FileDown className="w-4 h-4" />
          {isExporting ? "Exporting..." : "Export PDF"}
        </button>
      )}
    </div>
  );
}
