"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Plus } from "lucide-react";

interface SubmitButtonProps {
  label?: string;
  loadingLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function SubmitButton({ 
  label = "Add Project", 
  loadingLabel = "Saving...",
  icon = <Plus className="w-4 h-4" />,
  className = "w-full"
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A2540] hover:bg-[#173A5E] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}
