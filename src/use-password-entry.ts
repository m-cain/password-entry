import { useCallback, useState } from "react";
import { PasswordValidationCondition, validatePassword } from "./validations";

export type UsePasswordEntry = {
  password: string;
  passwordConfirmation: string;
  setPassword: (value: string) => void;
  setPasswordConfirmation: (value: string) => void;
  isConfirmed: boolean;
  validations: PasswordValidationCondition[];
  validate: () => void;
  isValid: boolean;
};

export function usePasswordEntry(): UsePasswordEntry {
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validations, setValidations] = useState<PasswordValidationCondition[]>(
    []
  );
  const [isConfirmed, setIsConfirmed] = useState(false);

  const setPassword = useCallback((value: string) => {
    setValue(value);
  }, []);

  const setPasswordConfirmation = useCallback((value: string) => {
    setConfirmValue(value);
  }, []);

  const validate = useCallback(() => {
    const { isValid, validations } = validatePassword(value);
    setIsValid(isValid);
    setValidations(validations ?? []);

    setIsConfirmed(value === confirmValue);
  }, [value, confirmValue]);

  return {
    password: value,
    passwordConfirmation: confirmValue,
    setPassword,
    setPasswordConfirmation,
    validations,
    isConfirmed,
    validate,
    isValid,
  };
}
