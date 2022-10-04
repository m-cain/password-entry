import { usePasswordEntry } from "./use-password-entry";

describe("usePasswordEntry", () => {
  it("should return a password entry hook", () => {
    const {
      password,
      passwordConfirmation,
      setPassword,
      setPasswordConfirmation,
      validations,
      isValid,
      isConfirmed,
    } = usePasswordEntry();
    expect(password).toBe("");
    expect(passwordConfirmation).toBe("");
    expect(setPassword).toBeInstanceOf(Function);
    expect(setPasswordConfirmation).toBeInstanceOf(Function);
    expect(validations).toBe([]);
    expect(isValid).toBe(false);
    expect(isConfirmed).toBe(false);
  });
});
