"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, GitHubIcon } from "./Icons";
import { projects } from "@/lib/projects";
import { useEngineerMode } from "./EngineerModeProvider";

const filters = ["All", "AI", "Full-stack"] as const;

export default function Projects() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) => f === "All" || p.tags.includes(f as "AI" | "Full-stack"));
  const { isEngineerMode } = useEngineerMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((x) => (
          <button
            key={x}
            role="tab"
            aria-selected={f === x}
            onClick={() => setF(x)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-all duration-300 ${
              f === x ? "border-text-primary bg-text-primary text-background" : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {x}
          </button>
        ))}
        <span className="ml-2 font-mono text-xs text-text-secondary">{list.length} projects</span>
      </div>

      <ul className="mt-8 border-t border-border">
        {list.map((p, i) => (
          <li key={p.slug} className="group relative border-b border-border transition-all duration-300 hover:bg-surface-elevated hover:border-text-secondary">
            <Link href={`/projects/${p.slug}`} className="absolute inset-0 z-10" aria-label={`Read case study for ${p.name}`} />
            <div className="absolute left-0 top-0 h-full w-[2px] bg-accent scale-y-0 origin-top transition-transform duration-300 ease-out group-hover:scale-y-100" aria-hidden />
            
            <div className="grid gap-4 px-4 py-8 md:grid-cols-12 md:gap-8 md:px-6 relative z-0">
              <span className="font-mono text-xs text-text-secondary md:col-span-1 md:pt-2">{String(i + 1).padStart(2, "0")}</span>
              
              <div className="md:col-span-6">
                <h3 className="font-sans text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-4xl text-text-primary">
                  {p.name}
                </h3>
                <div className="mt-2 mb-3 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/30 rounded px-1.5 py-0.5">{p.live ? "LIVE" : "COMPLETED"}</span>
                  <span className="font-mono text-[10px] text-text-secondary">{p.year}</span>
                </div>
                
                {/* Normal Mode */}
                <div className={!mounted || !isEngineerMode ? "block" : "hidden"}>
                  <p className="max-w-prose leading-relaxed text-text-secondary">{p.blurb}</p>
                </div>
                
                {/* Engineer Mode */}
                <div className={mounted && isEngineerMode ? "block" : "hidden"}>
                  <div className="mt-6 space-y-4 font-mono text-xs text-text-secondary">
                    {p.architecture && (
                      <div>
                        <span className="text-text-primary mb-1 block">ARCHITECTURE:</span>
                        <div className="pl-4 border-l border-border">{p.architecture.nodes.join(" → ")}</div>
                      </div>
                    )}
                    {p.stack && (
                      <div>
                        <span className="text-text-primary mb-1 block">STACK:</span>
                        <div className="pl-4 border-l border-border">{p.stack.join(" / ")}</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-sm font-medium text-accent">
                    [VIEW CASE STUDY]
                  </div>
                </div>
              </div>
              
              <ul className={`flex flex-wrap content-start gap-2 md:col-span-3 md:pt-2 ${mounted && isEngineerMode ? "opacity-0" : "opacity-100"}`}>
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-secondary">
                    {s}
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4 md:col-span-2 md:justify-end md:pt-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
