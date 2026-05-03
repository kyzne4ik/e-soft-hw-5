import type { HTMLAttributes } from "react";
import { useTheme } from "./theme-context";

export function ThemeSwitcherButton(props: HTMLAttributes<HTMLButtonElement>) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button {...props} onClick={toggleTheme}>
      Текущая тема: {theme === "light" ? "светлая" : "тёмная"}
    </button>
  );
}
