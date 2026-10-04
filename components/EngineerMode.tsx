"use client";
import { useEngineerMode } from "./EngineerModeProvider";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { isEngineerMode, toggleEngineerMode } = useEngineerMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="font-mono text-[10px] uppercase tracking-widest text-text-secondary opacity-0" aria-hidden="true">[ ENGINEER MODE ○ ]</button>;
  }

  return (
    <button
      onClick={toggleEngineerMode}
      aria-pressed={isEngineerMode}
      className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${isEngineerMode ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
    >
      [ ENGINEER MODE {isEngineerMode ? '●' : '○'} ]
    </button>
  );
}

export function EngineerBlock({ normal, engineer }: { normal: React.ReactNode; engineer: React.ReactNode }) {
  const { isEngineerMode } = useEngineerMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="opacity-0">{normal}</div>;
  }

  return (
    <div className="transition-opacity duration-300">
      {isEngineerMode ? engineer : normal}
    </div>
  );
}
