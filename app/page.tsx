import Link from "next/link";
import Reveal from "@/components/Reveal";
import Chrome from "@/components/Chrome";
import Projects from "@/components/Projects";
import GitHubActivity from "@/components/GitHubActivity";
import { ModeToggle as EngineerModeToggle, EngineerBlock } from "@/components/EngineerMode";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, WhatsAppIcon, MailIcon, ArrowUpRight } from "@/components/Icons";
import { EMAIL, LINKEDIN, GITHUB, LEETCODE, PROOFLY, WHATSAPP } from "@/lib/links";

const flow = [
  { n: "01", t: "Profile", d: "A user signs up and builds a profile." },
  { n: "02", t: "Challenge", d: "The AI generates a skill challenge for them." },
  { n: "03", t: "Submission", d: "They submit an answer. AI evaluates it." },
  { n: "04", t: "Evidence", d: "The result is stored as evidence of the skill." },
];

const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "TypeScript"] },
  { group: "AI / ML", items: ["TensorFlow", "OpenCV", "faster-whisper"] },
  { group: "Web", items: ["Next.js", "React", "Node.js", "Express", "Tailwind"] },
  { group: "Data", items: ["MongoDB", "PostgreSQL"] },
  { group: "Automation & tooling", items: ["n8n", "FFmpeg", "Vercel", "Git"] },
];

function SocialRow({ large = false }: { large?: boolean }) {
  const items = [
    { href: GITHUB, label: "GitHub", Icon: GitHubIcon },
    { href: LINKEDIN, label: "LinkedIn", Icon: LinkedInIcon },
    { href: LEETCODE, label: "LeetCode", Icon: LeetCodeIcon },
    { href: WHATSAPP, label: "WhatsApp", Icon: WhatsAppIcon },
    { href: `mailto:${EMAIL}`, label: "Email", Icon: MailIcon },
  ];
  return (
    <>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`flex items-center justify-center rounded-full border border-border transition duration-300 hover:-translate-y-0.5 hover:border-text-primary hover:bg-text-primary hover:text-background ${
            large ? "h-14 w-14" : "h-11 w-11"
          }`}
        >
          <Icon className={large ? "h-6 w-6" : "h-5 w-5"} />
        </a>
      ))}
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">{children}</p>;
}

export default function Home() {
  return (
    <main>
      <Chrome />
      {/* nav */}
      <Reveal delay={0}>
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
          <a href="#top" className="font-sans font-semibold tracking-tight text-lg">
            Deep Kabariya
          </a>
          <nav className="flex items-center gap-6 text-sm text-text-secondary">
            <a href="#work" className="link-u hover:text-text-primary hidden sm:inline">Work</a>
            <a href="#projects" className="link-u hover:text-text-primary hidden sm:inline">Projects</a>
            <a href="#skills" className="link-u hover:text-text-primary hidden sm:inline">Skills</a>
            <a href="#contact" className="link-u hover:text-text-primary hidden sm:inline">Contact</a>
            <EngineerModeToggle />
            <ThemeToggle />
          </nav>
        </header>
      </Reveal>

      {/* hero */}
      <section id="top" className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-10 md:pb-36 md:pt-28">
        <div aria-hidden className="hidden pointer-events-none absolute -right-20 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-accent/25 blur-3xl md:h-[560px] md:w-[560px]" />
        
        <Reveal delay={150}>
          <Label>Computer engineering student · Gujarat, India · Open to freelance work</Label>
        </Reveal>
        
        <Reveal delay={300}>
          <EngineerBlock 
            normal={
              <h1 className="mt-8 max-w-5xl font-sans font-semibold tracking-tight text-[2.9rem] leading-[1.02] md:text-8xl">
                I build AI and automation that saves small businesses{" "}
                <span className="italic text-accent">real hours.</span>
              </h1>
            }
            engineer={
              <div className="mt-8 space-y-6 max-w-5xl">
                <h1 className="font-sans font-semibold tracking-tight text-[2.9rem] leading-[1.02] md:text-8xl">
                  DEEP KABARIYA
                </h1>
                <div className="font-mono text-sm text-text-secondary tracking-widest leading-loose">
                  <p>SYSTEM_FOCUS: [AI, AUTOMATION, WEB, SOFTWARE]</p>
                  <p>ENGINEERING: [COMPUTER_ENGINEERING, FULL_STACK]</p>
                </div>
              </div>
            }
          />
        </Reveal>
        
        <Reveal delay={450}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-text-secondary">
            The follow-ups nobody has time for, the inquiries that sit unanswered, the copy-paste work between tools.
            I build the thing that does it for you, and I can explain every line of it.
          </p>
        </Reveal>
        
        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Email me
            </a>
            <a href="#work" className="link-u px-2 py-3 text-sm font-medium">
              See the work ↓
            </a>
          </div>
        </Reveal>
        
        <Reveal delay={750}>
          <div className="mt-12 flex items-center gap-3">
            <SocialRow />
          </div>
        </Reveal>
      </section>

      {/* work */}
      <section id="work" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-baseline justify-between">
            <Label>Selected work</Label>
            <Label>01 / 03</Label>
          </div>

          {/* Proofly */}
          <article className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-sans font-semibold tracking-tight text-5xl md:text-7xl">Proofly</h2>
              <div className="flex items-center gap-5">
              <a
                href={PROOFLY}
                target="_blank"
                rel="noopener noreferrer"
                className="link-u font-mono text-sm"
              >
                prooflly.vercel.app ↗
              </a>
              <a href="https://github.com/Deep-2308/Proofly" target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-2 font-mono text-sm"><GitHubIcon className="h-4 w-4" /> Code</a>
              </div>
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
              Flagship · Solo build · Next.js, MongoDB, Tailwind, Vercel
            </p>
            <div className="mt-6">
              <Link href="/projects/proofly" className="link-u font-mono text-sm font-medium text-accent hover:text-text-primary">
                Read case study →
              </Link>
            </div>

            <div className="mt-10 grid gap-12 md:grid-cols-12">
              <div className="space-y-6 text-lg leading-relaxed md:col-span-7">
                <p>
                  Proofly is a web platform where people prove what they can do instead of just listing it. Users create a
                  profile, take AI-generated skill challenges, submit their answers for AI evaluation, and build up
                  evidence around their skills.
                </p>
                <p>
                  It also works as a place to build with other people. Users can create projects, find or apply for project
                  roles, and work with teammates through project and workspace features.
                </p>
                <p className="text-text-secondary">
                  The AI generates the challenges, evaluates the submissions, and helps with project-related analysis.
                  Authentication, user data, projects, applications, and skill results are all stored on the platform.
                </p>
              </div>

              <aside className="md:col-span-5">
                <div className="rounded-2xl border border-border bg-surface-elevated p-6">
                  <Label>The core loop</Label>
                  <ol className="mt-5 space-y-0">
                    {flow.map((s, i) => (
                      <li key={s.n} className="relative flex gap-4 pb-6 last:pb-0">
                        {i < flow.length - 1 && (
                          <span className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-border" aria-hidden />
                        )}
                        <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-[11px]">
                          {s.n}
                        </span>
                        <div>
                          <p className="font-medium leading-8">{s.t}</p>
                          <p className="text-sm leading-relaxed text-text-secondary">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {[
                ["The idea", "A skill claim that comes with something you can look at: the challenge, the answer, and the evaluation."],
                ["What I did", "I built it myself, start to finish, and deployed it on Vercel. It started as SkillSync, then I renamed it and redeployed after a round of bug fixes."],
                ["Status", "Live. Next up: more features, planned but not built yet."],
              ].map(([h, b]) => (
                <div key={h} className="bg-surface p-6">
                  <Label>{h}</Label>
                  <p className="mt-3 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </article>

          {/* AI clipper */}
          <Reveal className="mt-28 border-t border-border pt-16"><article>
            <div className="flex items-baseline justify-between">
              <Label>Side project</Label>
              <Label>02 / 03</Label>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="font-sans font-semibold tracking-tighter text-[7rem] leading-none text-accent md:text-[10rem]">
                  V13<span className="text-text-primary">.3</span>
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">and still iterating</p>
              </div>
              <div className="md:col-span-7">
                <h2 className="font-sans font-semibold tracking-tight text-4xl md:text-5xl">AI video clipper</h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed">
                  <p>
                    A tool that takes long-form video and turns it into short vertical clips. It is the project I have
                    iterated on the most, well past thirteen versions.
                  </p>
                  <p>
                    The goal is not automated cropping. It is clips that look edited by a person: the right moment, a
                    strong start, clean cuts. I compare every version against the one before it and keep only what
                    actually looks better.
                  </p>
                  <p className="text-text-secondary">Built in Python, with FFmpeg, faster-whisper, OpenCV and YOLO11. Subject-aware framing is planned for V14. Before and after clips are coming to this page.</p>
                  <div className="flex gap-6">
                    <Link href="/projects/ai-clipping" className="link-u font-mono text-sm font-medium text-accent hover:text-text-primary">
                      Read case study →
                    </Link>
                    <a href="https://github.com/Deep-2308/AI-Clipping" target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-2 font-mono text-sm"><GitHubIcon className="h-4 w-4" /> View the code <ArrowUpRight /></a>
                  </div>
                </div>
              </div>
            </div>
          </article></Reveal>

          {/* internship */}
          <Reveal className="mt-28 border-t border-border pt-16"><article>
            <div className="flex items-baseline justify-between">
              <Label>Experience</Label>
              <Label>03 / 03</Label>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <h2 className="font-sans font-semibold tracking-tight text-4xl md:text-5xl">Personifwy</h2>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                  AI course + 1 month internship
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-lg leading-relaxed">
                  A one-month internship after an AI course. Hands-on machine learning with TensorFlow:
                </p>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {["Object detection", "Landmark detection", "Text classification"].map((x) => (
                    <li key={x} className="flex items-center justify-between py-4">
                      <span className="text-lg">{x}</span>
                      <span className="font-mono text-xs text-text-secondary">TensorFlow</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article></Reveal>
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <Label>All projects</Label>
            <h2 className="mt-6 max-w-3xl font-sans font-semibold tracking-tight text-4xl leading-[1.05] md:text-6xl">
              Everything I have built, <span className="italic text-accent">in my own repos.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              No forks, no copied templates. Descriptions come from the READMEs. Open any repo and read the code.
            </p>
          </Reveal>
          <Reveal className="mt-12" delay={80}>
            <Projects />
          </Reveal>
        </div>
      </section>

      {/* github activity */}
      <GitHubActivity />

      {/* skills */}
      <section id="skills" className="border-t border-border bg-surface-elevated text-text-primary">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <Label>
            <span className="text-text-secondary">Tools I have actually used</span>
          </Label>
          <EngineerBlock
            normal={
              <div className="mt-10 grid gap-10 md:grid-cols-5">
                {skills.map((g) => (
                  <div key={g.group}>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{g.group}</p>
                    <ul className="mt-4 space-y-2 text-lg">
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            }
            engineer={
              <div className="mt-10 grid gap-10 md:grid-cols-5 border border-border p-8 rounded-xl bg-background">
                {skills.map((g) => (
                  <div key={g.group}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-primary border-b border-border pb-3 mb-4">{g.group}</p>
                    <ul className="space-y-3 font-mono text-xs text-text-secondary">
                      {g.items.map((i) => (
                        <li key={i}>→ {i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            }
          />
          <Reveal>
            <a
              href={LEETCODE}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-14 flex items-center justify-between gap-6 rounded-2xl border border-border p-6 transition hover:border-accent md:p-8"
            >
              <span className="flex items-center gap-5">
                <LeetCodeIcon className="h-9 w-9 text-accent" />
                <span>
                  <span className="block font-sans font-semibold tracking-tight text-2xl">Problem solving on LeetCode</span>
                  <span className="mt-1 block text-sm text-text-secondary">I practice data structures and algorithms in Python and Java. Profile: Deep_2308</span>
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-text-secondary">
            B.E. Computer Engineering, SSASIT (GTU), Gujarat, India. CGPA 7.85.
          </p>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="mt-8 max-w-4xl font-sans font-semibold tracking-tight text-5xl leading-[1.05] md:text-7xl">
              Got a repetitive process eating your week?{" "}
              <span className="italic text-accent">Tell me about it.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
              Customer inquiries, follow-ups, intake forms, data moving between tools. Send me a few lines about how it works
              today and I will tell you honestly whether I can help.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <EngineerBlock
              normal={
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-text-primary px-7 py-4 text-base font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f9d55] hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Message me on WhatsApp
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-text-primary hover:bg-text-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-text-primary"
                  >
                    <MailIcon className="h-5 w-5" />
                    Email
                  </a>
                </div>
              }
              engineer={
                <div className="mt-10 rounded-xl border border-border bg-background p-6 font-mono text-xs text-text-secondary leading-loose max-w-lg">
                  <div className="grid grid-cols-[100px_1fr] gap-4">
                    <span className="text-text-primary">EMAIL:</span>
                    <a href={`mailto:${EMAIL}`} className="hover:text-text-primary transition">{EMAIL}</a>
                    
                    <span className="text-text-primary">GITHUB:</span>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">{GITHUB}</a>
                    
                    <span className="text-text-primary">LINKEDIN:</span>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">{LINKEDIN}</a>
                    
                    <span className="text-text-primary">WHATSAPP:</span>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition">Available</a>
                  </div>
                </div>
              }
            />
            <p className="mt-6 font-mono text-sm text-text-secondary">{EMAIL}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <SocialRow large />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl justify-between px-6 py-6 font-mono text-xs text-text-secondary md:px-10">
          <span>© 2026 Deep Kabariya</span>
          <span>Built with Next.js and Tailwind</span>
        </div>
      </footer>
    </main>
  );
}
