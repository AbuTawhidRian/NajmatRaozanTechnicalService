"use client";

import { useRef } from "react";
import toast from "react-hot-toast";

export default function SettingsClientForm({
  action,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        try {
          await action(formData);
          toast.success("Settings saved successfully!");
        } catch (error) {
          toast.error("Failed to save settings.");
        }
      }}
      className="p-6"
    >
      {children}
    </form>
  );
}
