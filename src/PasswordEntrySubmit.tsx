import {
  ButtonHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  useCallback,
} from "react";
import { usePasswordEntryContext } from "./use-password-entry-context";

type Props = {
  action?: (e?: MouseEvent) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PasswordEntrySubmit({
  action,
  children,
  ...attributes
}: PropsWithChildren<Props>) {
  const usePasswordEntry = usePasswordEntryContext();

  if (!usePasswordEntry) {
    throw new Error(
      "PasswordEntrySubmit must be used within a PasswordEntryProvider"
    );
  }

  const { validate } = usePasswordEntry;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      validate(() => {
        if (action) {
          action(e);
        }
      });
    },
    [action, validate]
  );

  return (
    <button {...attributes} onClick={onClick}>
      {children}
    </button>
  );
}
