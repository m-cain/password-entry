import React from "react";
import { UsePasswordEntry } from "./use-password-entry";

const PasswordEntryContext = React.createContext<UsePasswordEntry | null>(null);

export const usePasswordEntryContext = () =>
  React.useContext(PasswordEntryContext);

export function PasswordEntryProvider(
  props: React.PropsWithChildren<UsePasswordEntry>
) {
  const { children, ...data } = props;

  return (
    <PasswordEntryContext.Provider value={data}>
      {children}
    </PasswordEntryContext.Provider>
  );
}
