import { createContext, useCallback, useContext, useEffect, useState } from "react";

const KEY = "airglide-theme";
const ThemeContext = createContext({ theme: "light", choice: "system", setChoice: () => {} });

const systemDark = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;

function readChoice() {
  try {
    return localStorage.getItem(KEY) || "system";
  } catch {
    return "system";
  }
}

export function ThemeProvider({ children }) {
  const [choice, setChoiceState] = useState(readChoice);
  const [sysDark, setSysDark] = useState(systemDark);

  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const on = (e) => setSysDark(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const theme = choice === "system" ? (sysDark ? "dark" : "light") : choice;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setChoice = useCallback((next) => {
    setChoiceState(next);
    try {
      if (next === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, choice, setChoice }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
