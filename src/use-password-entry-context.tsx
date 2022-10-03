import React from "react";
import { UsePasswordEntry } from "./use-password-entry";

const PasswordEntryContext = React.createContext<UsePasswordEntry | null>(null);

export const usePasswordEntryContext = () =>
  React.useContext(PasswordEntryContext);

export function PasswordEntryProvider({
  children,
  ...props
}: React.PropsWithChildren<UsePasswordEntry>) {
  return (
    <PasswordEntryContext.Provider value={props}>
      {children}
    </PasswordEntryContext.Provider>
  );
}
