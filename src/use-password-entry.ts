import { useCallback, useState } from "react";
import { PasswordValidationCondition, validatePassword } from "./validations";

export type UsePasswordEntry = {
  password: string;
  passwordConfirmation: string;
  setPassword: (value: string) => void;
  setPasswordConfirmation: (value: string) => void;
  isConfirmed: boolean;
  validations: PasswordValidationCondition[];
  validate: (cb?: () => void) => void;
  isValid: boolean;
  touched: boolean;
};

export function usePasswordEntry(): UsePasswordEntry {
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validations, setValidations] = useState<PasswordValidationCondition[]>(
    []
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [touched, setTouched] = useState(false);

  const setPassword = (value: string) => {
    setValue(value);
  };

  const setPasswordConfirmation = (value: string) => {
    setConfirmValue(value);
  };

  const validate = useCallback(
    (cb?: () => void) => {
      const { isValid, validations } = validatePassword(value);
      const isConfirmed = value === confirmValue;

      setIsValid(isValid);
      setValidations(validations ?? []);
      setIsConfirmed(isConfirmed);
      setTouched(true);

      if (cb && isValid && isConfirmed) {
        cb();
      }
    },
    [value, confirmValue]
  );

  return {
    password: value,
    passwordConfirmation: confirmValue,
    setPassword,
    setPasswordConfirmation,
    validations,
    isConfirmed,
    validate,
    isValid,
    touched,
  };
}
