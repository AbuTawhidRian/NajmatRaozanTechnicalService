"use client";

import { useRef, ReactNode } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ClientActionFormProps {
  action: (formData: FormData) => Promise<any> | void;
  children: ReactNode;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
  redirectTo?: string;
}

export default function ClientActionForm({
  action,
  children,
  className,
  successMessage = "Success!",
  errorMessage = "Something went wrong.",
  resetOnSuccess = false,
  redirectTo,
}: ClientActionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
          if (redirectTo) {
            router.push(redirectTo);
          }
        } catch (error: any) {
          if (error.message === "NEXT_REDIRECT" || error.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
          }
          toast.error(error.message || errorMessage);
        }
      }}
    >
      {children}
    </form>
  );
}
