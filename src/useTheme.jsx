// hooks/useTheme.js
import { useState, useEffect, useCallback } from "react";

export default function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || defaultTheme;
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
