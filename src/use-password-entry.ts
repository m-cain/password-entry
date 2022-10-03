import { useCallback, useEffect, useMemo, useState } from "react";

type PasswordValidation = {};

type UsePasswordEntryBasicOpts = {
  inputDebounceMs?: number;
};

type UsePasswordEntryVerboseOpts = {
  passwordInputDebounceMs?: number;
  confirmationInputDebounceMs?: number;
};

type UsePasswordEntryOpts =
  | UsePasswordEntryBasicOpts
  | UsePasswordEntryVerboseOpts;

export type UsePasswordEntry = {
  password: string;
  passwordConfirmation: PasswordValidation;
  setPassword: (value: string) => void;
  setPasswordConfirmation: (value: string) => void;
  isValid: boolean;
  isConfirmed: boolean;
  validations: PasswordValidation[];
};

export function usePasswordEntry(opts: UsePasswordEntryOpts): UsePasswordEntry {
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  // validate on value change -- todo: debounce the input change
  useEffect(() => {}, [value]);

  const setPassword = useCallback((value: string) => {
    setValue(value);
  }, []);

  const setPasswordConfirmation = useCallback((value: string) => {
    setConfirmValue(value);
  }, []);

  const isValid = useMemo(() => false, []);

  const isConfirmed = false;

  return {
    password: value,
    passwordConfirmation: confirmValue,
    setPassword,
    setPasswordConfirmation,
    isValid,
    validations: [],
    isConfirmed,
  };
}
