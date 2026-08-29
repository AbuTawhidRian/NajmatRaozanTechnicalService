"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { SettingsType } from "../lib/settings";

const SettingsContext = createContext<SettingsType | undefined>(undefined);

export function SettingsProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: SettingsType;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
