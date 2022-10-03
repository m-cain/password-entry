function isDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}

/**
 * Required characters:
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
  const code = char.charCodeAt(0);
  return (
    (code >= 33 && code <= 47) ||
    (code >= 58 && code <= 64) ||
    (code >= 91 && code <= 96) ||
    (code >= 123 && code <= 126)
  );
}

function isLowercase(char: string): boolean {
  return char >= "a" && char <= "z";
}

function isUppercase(char: string): boolean {
  return char >= "A" && char <= "Z";
}

export enum PasswordValidationCondition {
  Digit,
  SpecialChar,
  Lowercase,
  Uppercase,
  Length,
}

type ValidatePasswordResult =
  | {
      isValid: true;
    }
  | { isValid: false; errors: PasswordValidationCondition[] };

export function validatePassword(password: string): ValidatePasswordResult {
  let hasDigit = false;
  let hasSpecialChar = false;
  let hasUppercase = false;
  let hasLowercase = false;

  if (password.length < 6) {
    return {
      isValid: false,
      errors: [PasswordValidationCondition.Length],
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

  return { isValid: false, errors };
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): boolean {
  return password === confirmation;
}
