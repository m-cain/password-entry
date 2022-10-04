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

// note: in the case invalid length, we don't care about the other conditions.
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
  const invalidLowerAndLengthCases = ["PA1@"];
  const invalidUpperAndLowerAndSpecialCases = ["1234567"];
  const invalidUpperAndLowerAndDigitCases = ["#%&*$@"];
  const invalidUpperAndLowerAndLengthCases = ["2$"];
  const invalidSpecialAndLowerAndDigitCases = ["PASSWORD"];
  const invalidSpecialAndLengthAndDigitCases = ["Pa$"];

  test.each(validCases)(
    'validatePassword("%s") should return true for valid passwords',
    (pw) => {
      expect(validatePassword(pw).isValid).toBe(true);
      expect(validatePassword(pw).validations).toBeUndefined();
    }
  );

  test.each(invalidDigitCases)(
    'validatePassword("%s") should return false with invalid digit validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Digit,
        ]),
      });
    }
  );

  test.each(invalidLowerCases)(
    'validatePassword("%s") should return false with invalid lowercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Lowercase,
        ]),
      });
    }
  );

  test.each(invalidUpperCases)(
    'validatePassword("%s") should return false with invalid uppercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Uppercase,
        ]),
      });
    }
  );

  test.each(invalidLengthCases)(
    'validatePassword("%s") should return false with invalid length validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );

  test.each(invalidSpecialCharCases)(
    'validatePassword("%s") should return false with invalid special char validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.SpecialChar,
        ]),
      });
    }
  );

  test.each(invalidDigitAndLengthCases)(
    'validatePassword("%s") should return false with invalid digit and length validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );

  test.each(invalidDigitAndLowerCases)(
    'validatePassword("%s") should return false with invalid digit and lowercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Digit,
          PasswordValidationCondition.Lowercase,
        ]),
      });
    }
  );

  test.each(invalidDigitAndUpperCases)(
    'validatePassword("%s") should return false with invalid digit and uppercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Digit,
          PasswordValidationCondition.Uppercase,
        ]),
      });
    }
  );

  test.each(invalidDigitAndSpecialCases)(
    'validatePassword("%s") should return false with invalid digit and special char validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Digit,
          PasswordValidationCondition.SpecialChar,
        ]),
      });
    }
  );

  test.each(invalidSpecialAndLengthCases)(
    'validatePassword("%s") should return false with invalid special char and length validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );

  test.each(invalidSpecialAndLowerCases)(
    'validatePassword("%s") should return false with invalid special char and lowercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.SpecialChar,
          PasswordValidationCondition.Lowercase,
        ]),
      });
    }
  );

  test.each(invalidSpecialAndUpperCases)(
    'validatePassword("%s") should return false with invalid special char and uppercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.SpecialChar,
          PasswordValidationCondition.Uppercase,
        ]),
      });
    }
  );

  test.each(invalidUpperAndLengthCases)(
    'validatePassword("%s") should return false with invalid uppercase and length validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );

  test.each(invalidUpperAndLowerCases)(
    'validatePassword("%s") should return false with invalid uppercase and lowercase validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Uppercase,
          PasswordValidationCondition.Lowercase,
        ]),
      });
    }
  );

  test.each(invalidUpperAndSpecialCases)(
    'validatePassword("%s") should return false with invalid uppercase and special char validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Uppercase,
          PasswordValidationCondition.SpecialChar,
        ]),
      });
    }
  );

  test.each(invalidLowerAndLengthCases)(
    'validatePassword("%s") should return false with invalid lowercase and length validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );

  test.each(invalidUpperAndLowerAndSpecialCases)(
    'validatePassword("%s") should return false with invalid uppercase, lowercase and special char validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Uppercase,
          PasswordValidationCondition.Lowercase,
          PasswordValidationCondition.SpecialChar,
        ]),
      });
    }
  );

  test.each(invalidUpperAndLowerAndLengthCases)(
    'validatePassword("%s") should return false with invalid uppercase, lowercase and length validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );

  test.each(invalidUpperAndLowerAndDigitCases)(
    'validatePassword("%s") should return false with invalid uppercase, lowercase and digit validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Uppercase,
          PasswordValidationCondition.Lowercase,
          PasswordValidationCondition.Digit,
        ]),
      });
    }
  );

  test.each(invalidSpecialAndLowerAndDigitCases)(
    'validatePassword("%s") should return false with invalid special char, lowercase and digit validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.SpecialChar,
          PasswordValidationCondition.Lowercase,
          PasswordValidationCondition.Digit,
        ]),
      });
    }
  );

  test.each(invalidSpecialAndLengthAndDigitCases)(
    'validatePassword("%s") should return false with invalid special char, length and digit validations',
    (pw) => {
      expect(validatePassword(pw)).toEqual({
        isValid: false,
        validations: expect.arrayContaining([
          PasswordValidationCondition.Length,
        ]),
      });
    }
  );
});
