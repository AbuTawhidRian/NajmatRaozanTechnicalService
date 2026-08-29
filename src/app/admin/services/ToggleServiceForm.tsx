"use client";

import { ToggleLeft, ToggleRight, Eye, EyeOff, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { useFormStatus } from "react-dom";

interface ToggleServiceFormProps {
  id: string;
  title: string;
  isActive: boolean;
  action: (payload: FormData) => Promise<void> | void;
}

function SubmitButton({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-2 ${
        isActive ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {pending ? (
        <>
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {isActive ? "Hiding..." : "Showing..."}
        </>
      ) : (
        isActive ? "Yes, Hide Service" : "Yes, Show Service"
      )}
    </button>
  );
}

export default function ToggleServiceForm({ id, title, isActive, action }: ToggleServiceFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        type="button"
        title={isActive ? "Hide" : "Show"}
        onClick={() => setIsOpen(true)}
        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
      >
        {isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isActive ? 'bg-amber-100' : 'bg-green-100'}`}>
                    {isActive ? <EyeOff className="w-5 h-5 text-amber-600" /> : <Eye className="w-5 h-5 text-green-600" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{isActive ? "Hide Service" : "Show Service"}</h3>
                    <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                      Are you sure you want to {isActive ? "hide" : "show"} <strong className="text-slate-800">{title}</strong>? 
                      {isActive ? " It will no longer be visible to customers on the public website." : " It will become visible to customers on the public website."}
                    </p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 transition-colors -mr-2 -mt-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <form 
                ref={formRef} 
                action={async (formData) => {
                  await action(formData);
                  setIsOpen(false);
                }}
              >
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="current" value={String(isActive)} />
                <SubmitButton isActive={isActive} />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
