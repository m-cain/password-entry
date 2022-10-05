import { ChangeEvent, useCallback } from "react";
import { usePasswordEntryContext } from "./use-password-entry-context";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput(inputProps: Props) {
  const usePasswordEntry = usePasswordEntryContext();

  if (!usePasswordEntry) {
    throw new Error(
      "PasswordInput must be used within a PasswordEntryProvider"
    );
  }

  const { password, setPassword } = usePasswordEntry;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <input
      {...inputProps}
      type="password"
      value={password}
      onChange={onChange}
    />
  );
}
