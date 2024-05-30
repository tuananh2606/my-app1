import { Dispatch, SetStateAction, createContext } from "react";

export const LocaleContext = createContext({
  // Defaults that we'll override in a moment.
  locale: "",
  setLocale: () => {},
} as {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
});
