"use client";

import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteServiceFormProps {
  id: string;
  title: string;
  action: (payload: FormData) => void;
}

export default function DeleteServiceForm({ id, title, action }: DeleteServiceFormProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Delete"
        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
