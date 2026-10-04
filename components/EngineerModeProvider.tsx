"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type EngineerModeContextType = {
  isEngineerMode: boolean;
  toggleEngineerMode: () => void;
};

const EngineerModeContext = createContext<EngineerModeContextType | undefined>(undefined);

export function EngineerModeProvider({ children }: { children: ReactNode }) {
  const [isEngineerMode, setIsEngineerMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("engineerMode");
    if (saved === "true") {
      setIsEngineerMode(true);
    }
    setMounted(true);
  }, []);

  const toggleEngineerMode = () => {
    setIsEngineerMode((prev) => {
      const next = !prev;
      localStorage.setItem("engineerMode", next.toString());
      return next;
    });
  };

  return (
    <EngineerModeContext.Provider value={{ isEngineerMode, toggleEngineerMode }}>
      {children}
    </EngineerModeContext.Provider>
  );
}

export function useEngineerMode() {
  const context = useContext(EngineerModeContext);
  if (context === undefined) {
    throw new Error("useEngineerMode must be used within an EngineerModeProvider");
  }
  return context;
}
