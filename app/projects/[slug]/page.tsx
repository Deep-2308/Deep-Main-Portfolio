import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { ArrowUpRight, GitHubIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { EngineerBlock } from "@/components/EngineerMode";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} | Deep Kabariya`;
  const description = project.blurb;
  const url = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function Section({ title, num, children, delay = 0 }: { title: string; num: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className="border-t border-border py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
            {num} / {title}
          </p>
        </div>
        <div className="md:col-span-8 text-lg leading-relaxed text-text-primary">
          <EngineerBlock
            normal={children}
            engineer={
              <div className="font-mono text-[13px] leading-loose text-text-secondary">
                <span className="text-accent mb-2 block">/* {title.toUpperCase().replace(/ /g, "_")} */</span>
                {children}
              </div>
            }
          />
        </div>
      </div>
    </Reveal>
  );
}

function ArchitectureVisualizer({ nodes }: { nodes: string[] }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface-elevated p-8 md:p-12">
      <div className="flex flex-col items-center gap-4">
        {nodes.map((node, i) => (
          <div key={node} className="flex flex-col items-center w-full">
            <Reveal delay={i * 150} className="w-full max-w-sm">
              <div className="flex w-full items-center justify-center rounded-lg border border-border bg-background p-4 text-center font-mono text-sm font-medium text-text-primary shadow-sm transition-all hover:border-accent hover:text-accent">
                {node}
              </div>
            </Reveal>
            {i < nodes.length - 1 && (
              <Reveal delay={(i * 150) + 75}>
                <div className="my-2 flex h-8 w-px items-center justify-center bg-border" aria-hidden>
                  <div className="h-2 w-2 translate-y-4 rotate-45 border-b border-r border-border" />
                </div>
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-24 md:px-10 md:pb-36 md:pt-32">
      <Reveal delay={0}>
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary transition hover:text-text-primary">
          ← Back to projects
        </Link>
      </Reveal>

      {/* HEADER */}
      <Reveal delay={150}>
        <header className="mt-16">
          <EngineerBlock
            normal={<h1 className="font-sans text-5xl font-semibold tracking-tight md:text-7xl">{project.name}</h1>}
            engineer={<h1 className="font-sans text-5xl font-semibold tracking-tight md:text-7xl text-accent">{project.name.toUpperCase()}_SYS</h1>}
          />
          <p className="mt-6 text-xl leading-relaxed text-text-secondary md:text-2xl">{project.blurb}</p>

          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-y border-border py-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Status</p>
              <p className="mt-2 font-medium">{project.live ? "Live" : "Completed"}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Year</p>
              <p className="mt-2 font-medium">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">Core Tech</p>
              <p className="mt-2 font-medium">{project.stack.slice(0, 3).join(", ")}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                View Live Project <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-text-primary hover:bg-text-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-text-primary"
            >
              <GitHubIcon className="h-4 w-4" /> View Source
            </a>
          </div>
        </header>
      </Reveal>

      <div className="mt-24">
        {project.problem && (
          <Section num="01" title="The Problem" delay={100}>
            <p>{project.problem}</p>
          </Section>
        )}

        {project.solution && (
          <Section num="02" title="The Solution" delay={150}>
            <p>{project.solution}</p>
          </Section>
        )}

        {project.architecture?.nodes && (
          <Section num="03" title="How It Works" delay={150}>
            <p>The core pipeline follows a strictly decoupled architecture:</p>
            <ArchitectureVisualizer nodes={project.architecture.nodes} />
          </Section>
        )}

        {project.engineeringDecisions && (
          <Section num="04" title="Engineering Decisions" delay={150}>
            <div className="space-y-10">
              {project.engineeringDecisions.map((dec) => (
                <div key={dec.title}>
                  <h3 className="font-sans text-xl font-medium">{dec.title}</h3>
                  <p className="mt-3 text-text-secondary">{dec.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section num="05" title="Technology" delay={150}>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-text-primary">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {project.challenges && (
          <Section num="06" title="Challenges" delay={150}>
            <ul className="list-inside list-disc space-y-3 text-text-secondary marker:text-accent">
              {project.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
        )}

        {project.learnings && (
          <Section num="07" title="Learnings" delay={150}>
            <ul className="list-inside list-disc space-y-3 text-text-secondary marker:text-accent">
              {project.learnings.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      <Reveal delay={150} className="mt-16 border-t border-border pt-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-sans text-2xl font-semibold">Ready to see it in action?</p>
          <div className="flex flex-wrap items-center gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm font-medium text-accent hover:underline"
              >
                View Live <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              View GitHub ↗
            </a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
