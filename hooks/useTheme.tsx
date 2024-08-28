import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const useTheme = () => {
  const { toggleThemeMode } = useContext(ThemeContext);

  return { toggleThemeMode };
};

export default useTheme;
