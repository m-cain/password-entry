# Password Entry

A React library for managing password constraints and validation.

## Getting Started

### Installation

```sh
yarn install
```

### Building the package

The demo app in `example/` links to the root package as a dependency, so you'll need to build it before running the demo.

```sh
yarn build
```

### Running the demo

```sh
yarn --cwd example dev
```

## Usage

### Hook

The hook `usePasswordEntry` (`src/use-password-entry.ts`) provides a set of stateful values and functions for managing password entry, and can be used standalone to construct custom UI components, or in conjunction with the convenience components provided by the library.

### Components

To get the most out of having components to abstract the password, password confirmation, and submit button, we create a context around the password entry state to allow for deep nesting and the ability to ignore what data each component needs from the password entry state.

e.g.

```tsx
import {
  PasswordInput,
  PasswordEntryProvider,
  usePasswordEntry,
  PasswordConfirmationInput,
  PasswordEntrySubmit,
  PasswordValidationCondition,
} from "password-entry";

function PasswordForm() {
  const passwordEntry = usePasswordEntry();

  return (
    <PasswordEntryProvider {...passwordEntry}>
      <PasswordInput />
      <PasswordConfirmationInput />
      <PasswordEntrySubmit />
    </PasswordEntryProvider>
  );
}
```

We can use the validation state fields to show feedback to the user.

## Testing

The libary currently has minimal test coverage, focusing only on ensuring the validation logic meets the system requirements. The tests are written using Vitest, which has an API compatible with Jest.

```sh
yarn test
```

## Design Considerations

- To satisfy the requirement that valdation is triggered on submit, we expose a `validate` function which is the only way to trigger validation. Since we'll likely want to do something with the validation result, and are explictly validating on user action, we provide the option to pass a callback to `validate` that fires only when validation is successful. (Rather than waiting for state to change and having to do messy things with effects, or having to handle it upstream.)
- When validating passwords, we check for every required condition and return all errors. If we were validating as we received input, we choose to fail fast on the minimum length requirement, but since we're validating on submit, we can afford to check all conditions and return all errors.
- The validation functions all rely on checking char codes to determine if a character is a number, letter, or special character. There are other good solutions, such as using a regex, or string methods like `a.toUpperCase() === a`, but I think this is a good case for being explict about what we're checking for and clear about the intent of the code. The performance differences are negligible (see `bin/perf.js` for a quick, non-rigorous test).
