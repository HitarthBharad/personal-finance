import { createContext, useState, useMemo, useEffect, ReactNode } from "react";

// Create a context for theme
export const ThemeContext = createContext({
  toggleThemeMode: () => {},
});

const ThemeContextProvider = ({ children }: {children: ReactNode }) => {
  const [mode, setMode] = useState("light");

  // Check system preference on initial load
  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (systemPreference) setMode("dark");
  }, []);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    // Apply the Tailwind dark mode class to the <html> element
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={themeMode}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
