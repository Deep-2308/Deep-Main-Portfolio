"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme | null;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: null, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Read initial theme from HTML class (set by our blocking script)
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      // Ignore localStorage errors (e.g., incognito mode)
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Blocking script to prevent hydration flash
export const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        try {
          let isDark = false;
          const stored = localStorage.getItem('theme');
          if (stored === 'dark' || stored === 'light') {
            isDark = stored === 'dark';
          } else {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          }
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      `,
    }}
  />
);
