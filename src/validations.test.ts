import {
  PasswordValidationCondition,
  validatePassword,
  validatePasswordConfirmation,
} from "./validations";

describe("validatePasswordConfirmation", () => {
  test("returns true if password and confirmation match", () => {
    const password = "password";
    const confirmation = "password";

    const result = validatePasswordConfirmation(password, confirmation);

    expect(result).toBe(true);
  });

  test("returns false if password and confirmation do not match", () => {
    const password = "password";
    const confirmation = "password1";

    const result = validatePasswordConfirmation(password, confirmation);

    expect(result).toBe(false);
  });
});

describe("validatePassword", () => {
  // TODO: these cases can be made more exhaustive or constructed generatively. Enumeration below is mostly for demonstration.
  const validCases = ["Password1!", "passWordlonger2@", "&pASSWORD1"];
  const invalidDigitCases = ["Password!", "Password!"];
  const invalidLowerCases = ["PASSWORD!1"];
  const invalidUpperCases = ["password!1"];
  const invalidLengthCases = ["Pas!1"];
  const invalidSpecialCharCases = ["passworD1"];
  const invalidDigitAndLengthCases = ["Pasw@"];
  const invalidDigitAndLowerCases = ["PASSWORD@"];
  const invalidDigitAndUpperCases = ["password@"];
  const invalidDigitAndSpecialCases = ["Password"];
  const invalidSpecialAndLengthCases = ["Pas1"];
  const invalidSpecialAndLowerCases = ["PASSWORD1"];
  const invalidSpecialAndUpperCases = ["password1"];
  const invalidUpperAndLengthCases = ["p#2"];
  const invalidUpperAndLowerCases = ["1234%^"];
  const invalidUpperAndSpecialCases = ["password1"];
  const invalidLowAndLengthCases = ["PA1@"];
  const invalidUpperAndLowerAndSpecialCases = ["1234567"];
  const invalidUpperAndLowerAndDigitCases = ["#%&*$@"];
  const invalidUpperAndLowerAndLengthCases = ["2$"];
  const invalidSpecialAndLowerAndDigitCases = ["PASSWORD"];
  const invalidSpecialAndLengthAndDigitCases = ["Pa$"];

  test.each(validCases)(
    'validatePassword("%s") should return true for valid passwords',
    (pw) => {
      expect(validatePassword(pw).isValid).toBe(true);
      expect(validatePassword(pw).errors).toBeUndefined();
    }
  );

  test.each(invalidDigitCases)(
    'validatePassword("%s") should return false with invalid digit errors',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        errors: [PasswordValidationCondition.Digit],
      });
    }
  );

  test.each(invalidLowerCases)(
    'validatePassword("%s") should return false with invalid lowercase errors',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        errors: [PasswordValidationCondition.Lowercase],
      });
    }
  );

  test.each(invalidUpperCases)(
    'validatePassword("%s") should return false with invalid uppercase errors',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        errors: [PasswordValidationCondition.Uppercase],
      });
    }
  );

  test.each(invalidLengthCases)(
    'validatePassword("%s") should return false with invalid length errors',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        errors: [PasswordValidationCondition.Length],
      });
    }
  );

  test.each(invalidSpecialCharCases)(
    'validatePassword("%s") should return false with invalid special char errors',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        errors: [PasswordValidationCondition.SpecialChar],
      });
    }
  );
});
