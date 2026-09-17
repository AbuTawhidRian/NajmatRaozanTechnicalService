"use client";

import { useRef, ReactNode } from "react";
import toast from "react-hot-toast";

interface ClientActionFormProps {
  action: (formData: FormData) => Promise<any> | void;
  children: ReactNode;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
}

export default function ClientActionForm({
  action,
  children,
  className,
  successMessage = "Success!",
  errorMessage = "Something went wrong.",
  resetOnSuccess = false,
}: ClientActionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className={className}
      action={async (formData) => {
        try {
          await action(formData);
          toast.success(successMessage);
          if (resetOnSuccess) {
            formRef.current?.reset();
          }
        } catch (error: any) {
          toast.error(error.message || errorMessage);
        }
      }}
    >
      {children}
    </form>
  );
}
