import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const themeVersion = localStorage.getItem("portfolio_theme_mode");
      if (themeVersion !== "v2_light_mode") {
        localStorage.setItem("portfolio_theme_mode", "v2_light_mode");
        localStorage.setItem("theme", "light");
        return "light";
      }
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Sync meta theme-color with theme
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#06070a' : '#FAFAFA');
    }

    // Sync body style directly for instantaneous transition
    if (document.body) {
      document.body.style.backgroundColor = theme === 'dark' ? '#06070a' : '#FAFAFA';
      document.body.style.color = theme === 'dark' ? '#f8fafc' : '#0A0A0A';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
