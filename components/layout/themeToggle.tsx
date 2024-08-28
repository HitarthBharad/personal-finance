import React from "react";
import useTheme from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { toggleThemeMode } = useTheme();

  return (
    <button
      onClick={toggleThemeMode}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
