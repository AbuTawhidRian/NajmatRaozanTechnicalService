"use client";

import { useTransition } from "react";

export function StatusForm({
  id,
  initialStatus,
  updateAction,
}: {
  id: string;
  initialStatus: string;
  updateAction: (formData: FormData) => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={updateAction}
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        // We use useTransition to avoid blocking the UI while the action runs
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
          updateAction(formData);
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <label className="text-xs font-semibold text-slate-500">Status</label>
      <select
        name="status"
        defaultValue={initialStatus}
        onChange={(e) => e.target.form?.requestSubmit()}
        disabled={isPending}
        className={`text-sm font-medium px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-colors ${
          initialStatus === "PENDING"
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : initialStatus === "COMPLETED"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
        } ${isPending ? "opacity-50" : ""}`}
      >
        <option value="PENDING">🔴 Pending</option>
        <option value="IN_PROGRESS">🟡 Contacted / In Progress</option>
        <option value="COMPLETED">🟢 Completed</option>
        <option value="CANCELLED">⚫ Cancelled</option>
      </select>
    </form>
  );
}
