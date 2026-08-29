"use client";

import { Trash2, AlertTriangle, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { useFormStatus } from "react-dom";

interface DeleteServiceFormProps {
  id: string;
  title: string;
  action: (payload: FormData) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Deleting...
        </>
      ) : (
        "Yes, Delete Service"
      )}
    </button>
  );
}

export default function DeleteServiceForm({ id, title, action }: DeleteServiceFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        type="button"
        title="Delete"
        onClick={() => setIsOpen(true)}
        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Delete Service</h3>
                    <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                      Are you sure you want to delete <strong className="text-slate-800">{title}</strong>? 
                      This action cannot be undone and will permanently delete all associated images.
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
                action={(formData) => {
                  action(formData);
                  setIsOpen(false);
                }}
              >
                <input type="hidden" name="id" value={id} />
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
