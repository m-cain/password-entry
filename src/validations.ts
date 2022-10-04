function throwIfNotChar(input: string) {
  if (input.length !== 1) {
    throw new Error("Expected a single character");
  }
}

/**
 *
 * @param char
 * @returns
 */
function isDigit(char: string): boolean {
  throwIfNotChar(char);
  return char >= "0" && char <= "9";
}

/**
 * Allowed special characters:
 * ! => 33
 * @ => 64
 * # => 35
 * $ => 36
 * % => 37
 * ^ => 94
 * & => 38
 * * => 42
 * ( => 40
 * ) => 41
 * - => 45
 * _ => 95
 * + => 43
 * = => 61
 * [ => 91
 * ] => 93
 * { => 123
 * } => 125
 * | => 124
 * ; => 59
 * : => 58
 * ' => 39
 * " => 34
 * , => 44
 * . => 46
 * < => 60
 * > => 62
 * @param char
 * @returns
 */
function isSpecialChar(char: string): boolean {
  throwIfNotChar(char);
  const code = char.charCodeAt(0);
  return (
    (code >= 33 && code <= 47) ||
    (code >= 58 && code <= 64) ||
    (code >= 91 && code <= 96) ||
    (code >= 123 && code <= 126)
  );
}

function isLowercase(char: string): boolean {
  throwIfNotChar(char);
  return char >= "a" && char <= "z";
}

function isUppercase(char: string): boolean {
  throwIfNotChar(char);
  return char >= "A" && char <= "Z";
}

export enum PasswordValidationCondition {
  Digit = "DIGIT",
  SpecialChar = "SPECIAL_CHAR",
  Lowercase = "LOWER_CASE",
  Uppercase = "UPPER_CASE",
  Length = "LENGTH",
}

type ValidatePasswordResult = {
  isValid: boolean;
  validations?: PasswordValidationCondition[];
};

export function validatePassword(password: string): ValidatePasswordResult {
  let hasDigit = false;
  let hasSpecialChar = false;
  let hasUppercase = false;
  let hasLowercase = false;

  if (password.length < 6) {
    return {
      isValid: false,
      validations: [PasswordValidationCondition.Length],
    };
  }

  for (const c of password) {
    if (isDigit(c)) {
      hasDigit = true;
    } else if (isSpecialChar(c)) {
      hasSpecialChar = true;
    } else if (isLowercase(c)) {
      hasLowercase = true;
    } else if (isUppercase(c)) {
      hasUppercase = true;
    }
  }

  if (hasDigit && hasSpecialChar && hasLowercase && hasUppercase) {
    return { isValid: true };
  }

  const errors: PasswordValidationCondition[] = [];

  if (!hasDigit) {
    errors.push(PasswordValidationCondition.Digit);
  }

  if (!hasSpecialChar) {
    errors.push(PasswordValidationCondition.SpecialChar);
  }

  if (!hasLowercase) {
    errors.push(PasswordValidationCondition.Lowercase);
  }

  if (!hasUppercase) {
    errors.push(PasswordValidationCondition.Uppercase);
  }

  return { isValid: false, validations: errors };
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): boolean {
  return password === confirmation;
}

if (import.meta.vitest) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // requirements: !@#$%^&*()_-+={[}]|:;"'<,>.
  const specialChars = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "[",
    "{",
    "]",
    "}",
    "|",
    ";",
    ":",
    "'",
    '"',
    "<",
    ",",
    ">",
    ".",
  ];
  const lowercase = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const uppercase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  test("isDigit should throw an error if the input is not a single character", () => {
    expect(() => isDigit("")).toThrowError();
    expect(() => isDigit("12")).toThrowError();
  });

  test.each(digits)("isDigit(%s) should return true for digits", (digit) => {
    expect(isDigit(digit)).toBe(true);
  });

  test.each([...lowercase, ...uppercase, ...specialChars])(
    "isDigit(%s) should return false for non-digits",
    (char) => {
      expect(isDigit(char)).toBe(false);
    }
  );

  test.each(specialChars)(
    'isSpecialChar("%s") should return true for special chars',
    (char) => {
      expect(isSpecialChar(char)).toBe(true);
    }
  );

  test.each([...lowercase, ...uppercase, ...digits])(
    'isSpecialChar("%s") should return false for non-special chars',
    (char) => {
      expect(isSpecialChar(char)).toBe(false);
    }
  );

  test.each(lowercase)(
    'isLowercase("%s") should return true for lowercase',
    (char) => {
      expect(isLowercase(char)).toBe(true);
    }
  );

  test.each([...uppercase, ...digits, ...specialChars])(
    'isLowercase("%s") should return false for non-lowercase',
    (char) => {
      expect(isLowercase(char)).toBe(false);
    }
  );

  test.each(uppercase)(
    'isUppercase("%s") should return true for uppercase',
    (char) => {
      expect(isUppercase(char)).toBe(true);
    }
  );

  test.each([...lowercase, ...digits, ...specialChars])(
    'isUppercase("%s") should return false for non-uppercase',
    (char) => {
      expect(isUppercase(char)).toBe(false);
    }
  );
}
