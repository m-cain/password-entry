import { ChangeEvent, useCallback } from "react";
import { usePasswordEntryContext } from "./use-password-entry-context";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordConfirmationInput(inputProps: Props) {
  const usePasswordEntry = usePasswordEntryContext();

  if (!usePasswordEntry) {
    throw new Error(
      "PasswordConfirmationInput must be used within a PasswordEntryProvider"
    );
  }

  const { passwordConfirmation, setPasswordConfirmation } = usePasswordEntry;

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.currentTarget.value);
  }, []);

  return (
    <input
      {...inputProps}
      type="password"
      value={passwordConfirmation}
      onChange={onChange}
    />
  );
}
