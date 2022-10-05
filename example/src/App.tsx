import {
  PasswordInput,
  PasswordEntryProvider,
  usePasswordEntry,
  PasswordConfirmationInput,
  PasswordEntrySubmit,
  PasswordValidationCondition,
} from "password-entry";
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";

const validationMessages: Record<PasswordValidationCondition, string> = {
  [PasswordValidationCondition.Digit]: "Must contain at least one digit",
  [PasswordValidationCondition.Lowercase]:
    "Must contain at least one lowercase letter",
  [PasswordValidationCondition.Uppercase]:
    "Must contain at least one uppercase letter",
  [PasswordValidationCondition.Length]: "Must be at least 6 characters long",
  [PasswordValidationCondition.SpecialChar]: "Must contain a special character",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordEntry = usePasswordEntry();

  const { validations, isConfirmed, touched } = passwordEntry;

  async function handleValidSubmit() {
    setLoading(true);
    async function doSomethingAsync() {
      return new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    }

    await doSomethingAsync();

    setLoggedIn(true);
    setLoading(false);
  }

  return (
    <PasswordEntryProvider {...passwordEntry}>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                {loggedIn ? "Setup complete" : "Sign in to your account"}
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {loggedIn ? (
                  <a href="/" className="text-indigo-500 font-bold">
                    Go to your dashboard
                  </a>
                ) : (
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          readOnly
                          value="user@passwordentry.com"
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <PasswordInput
                          id="password"
                          name="password"
                          autoComplete="current-password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <ul className="list-disc list-inside">
                        {validations.map((validation) => {
                          return (
                            <li
                              key={validation}
                              className="text-red-500 text-sm"
                            >
                              {validationMessages[validation]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Password confirmation */}
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <PasswordConfirmationInput
                          id="confirm-password"
                          name="confirm-password"
                          autoComplete="false"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      {!isConfirmed && touched && (
                        <span className="text-red-500 text-sm">
                          Password does not match
                        </span>
                      )}
                    </div>

                    <div>
                      <PasswordEntrySubmit
                        disabled={loggedIn || loading}
                        action={handleValidSubmit}
                        type="submit"
                        className="disabled:opacity-75 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Register
                      </PasswordEntrySubmit>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={loading}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-gray-900">
                      Expensive account creation
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </PasswordEntryProvider>
  );
}

export default App;
