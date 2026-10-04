"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEngineerMode } from "./EngineerModeProvider";
import { projects } from "@/lib/projects";
import { EMAIL, GITHUB, LINKEDIN, WHATSAPP } from "@/lib/links";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isEngineerMode, toggleEngineerMode } = useEngineerMode();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Lock background scroll properly integrated with Lenis
  useEffect(() => {
    if (open) {
      window.dispatchEvent(new Event("lock-scroll"));
    } else {
      window.dispatchEvent(new Event("unlock-scroll"));
    }
    return () => {
      if (open) {
        window.dispatchEvent(new Event("unlock-scroll"));
      }
    };
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const handleNav = (id: string) => {
    runCommand(() => {
      if (window.location.pathname !== "/") {
        router.push(`/#${id}`);
      } else {
        const element = document.getElementById(id);
        if (element) {
          // Fallback scroll, but Lenis intercepts anchor links anyway if we pushed hash, but since we are preventing default, we scroll manually.
          window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
        }
      }
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-50 w-full max-w-[640px] overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl mx-4"
          >
            <Command.Input
              autoFocus
              placeholder="Search or run command..."
              className="w-full bg-transparent px-6 py-5 text-lg outline-none placeholder:text-text-secondary text-text-primary border-b border-border font-mono"
            />
            <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-smooth">
              <Command.Empty className="py-6 text-center text-sm text-text-secondary">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-xs text-text-secondary font-mono tracking-widest px-2 py-2">
                {["work", "projects", "activity", "skills", "contact"].map((id) => (
                  <Command.Item
                    key={id}
                    onSelect={() => handleNav(id)}
                    className="flex cursor-pointer items-center rounded-lg px-4 py-3 text-sm text-text-primary aria-selected:bg-accent/10 aria-selected:text-accent transition-colors"
                  >
                    → {id === "activity" ? "Recent GitHub Activity" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Projects" className="text-xs text-text-secondary font-mono tracking-widest px-2 py-2">
                {projects.map((p) => (
                  <Command.Item
                    key={p.slug}
                    onSelect={() => runCommand(() => router.push(`/projects/${p.slug}`))}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm text-text-primary aria-selected:bg-accent/10 aria-selected:text-accent transition-colors"
                  >
                    <span>→ {p.name}</span>
                    <span className="font-mono text-[10px] uppercase opacity-50">{p.year}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Actions" className="text-xs text-text-secondary font-mono tracking-widest px-2 py-2">
                <Command.Item
                  onSelect={() => runCommand(() => window.dispatchEvent(new Event("open-ai-assistant")))}
                  className="flex cursor-pointer items-center rounded-lg px-4 py-3 text-sm text-text-primary aria-selected:bg-accent/10 aria-selected:text-accent transition-colors"
                >
                  → Ask Deep's AI
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(toggleEngineerMode)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm text-text-primary aria-selected:bg-accent/10 aria-selected:text-accent transition-colors"
                >
                  <span>→ Toggle Engineer Mode</span>
                  <span className="font-mono text-[10px] uppercase opacity-50">{isEngineerMode ? "ON" : "OFF"}</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => navigator.clipboard.writeText(EMAIL))}
                  className="flex cursor-pointer items-center rounded-lg px-4 py-3 text-sm text-text-primary aria-selected:bg-accent/10 aria-selected:text-accent transition-colors"
                >
                  → Copy Email
                </Command.Item>
              </Command.Group>

              <Command.Group heading="External" className="text-xs text-text-secondary font-mono tracking-widest px-2 py-2">
                {[
                  { label: "GitHub", href: GITHUB },
                  { label: "LinkedIn", href: LINKEDIN },
                  { label: "WhatsApp", href: WHATSAPP },
                ].map((ext) => (
                  <Command.Item
                    key={ext.label}
                    onSelect={() => runCommand(() => window.open(ext.href, "_blank"))}
                    className="flex cursor-pointer items-center rounded-lg px-4 py-3 text-sm text-text-primary aria-selected:bg-accent/10 aria-selected:text-accent transition-colors"
                  >
                    → {ext.label} ↗
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
            
            <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-3 font-mono text-[10px] text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="flex h-5 items-center justify-center rounded border border-border bg-background px-1.5">↑↓</span> to navigate
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 items-center justify-center rounded border border-border bg-background px-1.5">↵</span> to select
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 items-center justify-center rounded border border-border bg-background px-1.5">esc</span> to close
              </div>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
