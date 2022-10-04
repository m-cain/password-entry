const alphabet = [
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
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function randomAlphabetIndex() {
  return Math.floor(Math.random() * alphabet.length);
}

// see: src/validation.ts
function isDigit(char) {
  return char >= "0" && char <= "9";
}

function averageExecutionTime(fn, argsFactory, iterations = 1e6) {
  const iters = [];

  for (let i = 0; i < iterations; i++) {
    const args = argsFactory();

    const start = process.hrtime.bigint();

    fn.apply(null, args);

    const end = process.hrtime.bigint();

    iters.push(end - start);
  }

  console.log(
    `Average execution time for ${fn.name}:`,
    iters.reduce((a, b) => a + b) / BigInt(iters.length),
    "ns"
  );
}

function randomChar() {
  return alphabet[randomAlphabetIndex()];
}

averageExecutionTime(isDigit, () => [randomChar()]);

// jQuery implementation
function isNumeric(char) {
  return !isNaN(parseInt(char));
}

averageExecutionTime(isNumeric, () => [randomChar()]);

function isDigitRexExp(char) {
  return /^\d$/.test(char);
}

averageExecutionTime(isDigitRexExp, () => [randomChar()]);

// see: src/validation.ts
function isSpecialChar(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 33 && code <= 47) ||
    (code >= 58 && code <= 64) ||
    (code >= 91 && code <= 96) ||
    (code >= 123 && code <= 126)
  );
}

averageExecutionTime(isSpecialChar, () => [randomChar()]);

function isSpecialCharRegex(char) {
  return /^[!@#$%^&*()\-_+=[\]{}|;:'",<.>0-9]$/.test(char);
}

averageExecutionTime(isSpecialCharRegex, () => [randomChar()]);

// see: src/validation.ts # isUpperCase
function isUppercaseCodePoint(char) {
  return char >= "A" && char <= "Z";
}

averageExecutionTime(isUppercaseCodePoint, () => [randomChar()]);

function isUpperCase(char) {
  return char === char.toUpperCase();
}

averageExecutionTime(isUpperCase, () => [randomChar()]);
