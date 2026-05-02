import { createStrictContext, useStrictContext } from "../../lib/react";

export type Theme = "light" | "dark";

export type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const themeContext = createStrictContext<ThemeContext>();

export function useTheme() {
  return useStrictContext(themeContext);
}
