import { getRecentRepos, getRecentCommits } from "@/lib/github";
import Reveal from "@/components/Reveal";
import { GitHubIcon, ArrowUpRight } from "@/components/Icons";
import { EngineerBlock } from "@/components/EngineerMode";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function GitHubActivity() {
  const repos = await getRecentRepos(4);

  if (!repos || repos.length === 0) {
    return null; // Graceful fallback: hide section if API fails or no repos
  }

  // Fetch commits for the most recently updated repo to show activity efficiently
  const recentCommits = await getRecentCommits(repos[0].name, 3);

  return (
    <section id="activity" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <EngineerBlock
            normal={
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                Engineering Activity
              </p>
            }
            engineer={
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                [ BUILD_ACTIVITY_LOG ]
              </p>
            }
          />
          <h2 className="mt-6 max-w-3xl font-sans font-semibold tracking-tight text-4xl leading-[1.05] md:text-6xl">
            What I am actively <span className="italic text-accent">building.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Real-time public activity directly from GitHub. I write code consistently and push updates publicly.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal delay={100}>
              <EngineerBlock
                normal={<h3 className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-6">Recently Updated Repositories</h3>}
                engineer={<h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6 border-b border-border pb-2">GITHUB_REPOSITORIES</h3>}
              />
              <div className="grid gap-4">
                {repos.map((repo, i) => (
                  <Reveal key={repo.id} delay={150 + i * 50}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl border border-border bg-surface p-5 transition hover:border-text-secondary hover:bg-surface-elevated"
                    >
                      <EngineerBlock
                        normal={
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-sans text-xl font-semibold text-text-primary transition-colors group-hover:text-white">
                                  {repo.name}
                                </h4>
                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                                  {repo.description || "No description provided."}
                                </p>
                              </div>
                              <ArrowUpRight className="h-4 w-4 shrink-0 text-text-secondary transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                            </div>
                            <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-text-secondary">
                              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent opacity-75"></span>{repo.language}</span>
                              <span>Updated {formatDate(repo.updated_at)}</span>
                            </div>
                          </div>
                        }
                        engineer={
                          <div className="font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-border pb-3">
                              <span className="text-accent">{repo.name.toUpperCase()}</span>
                              <span className="text-text-secondary">[{repo.language}]</span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-y-2 text-text-secondary">
                              <div>UPDATED: <span className="text-text-primary">{formatDate(repo.updated_at)}</span></div>
                              <div>STARS: <span className="text-text-primary">{repo.stargazers_count}</span></div>
                              <div>FORKS: <span className="text-text-primary">{repo.forks_count}</span></div>
                              <div>VISIBILITY: <span className="text-text-primary">PUBLIC</span></div>
                            </div>
                          </div>
                        }
                      />
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4">
            {recentCommits.length > 0 && (
              <Reveal delay={200}>
                <EngineerBlock
                  normal={<h3 className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-6">Recent Commits ({repos[0].name})</h3>}
                  engineer={<h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6 border-b border-border pb-2">RECENT_COMMITS</h3>}
                />
                <div className="relative border-l border-border pl-6">
                  {recentCommits.map((commit, i) => (
                    <Reveal key={commit.sha} delay={250 + i * 50}>
                      <div className="relative mb-8 last:mb-0">
                        <span className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                        <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="group block">
                          <EngineerBlock
                            normal={
                              <>
                                <p className="font-mono text-[10px] text-text-secondary">{formatDate(commit.commit.author.date)}</p>
                                <p className="mt-1 text-sm leading-relaxed text-text-primary transition group-hover:text-accent">
                                  {commit.commit.message.split("\n")[0]}
                                </p>
                              </>
                            }
                            engineer={
                              <div className="font-mono text-xs text-text-secondary">
                                <span className="text-accent">[{formatDate(commit.commit.author.date)}]</span>
                                <p className="mt-1 text-text-primary line-clamp-2 transition group-hover:text-white">
                                  {commit.commit.message.split("\n")[0]}
                                </p>
                                <p className="mt-1 opacity-50 text-[10px]">{commit.sha.substring(0, 7)}</p>
                              </div>
                            }
                          />
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
        
        <Reveal delay={300} className="mt-12">
          <a
            href="https://github.com/Deep-2308"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-background focus:outline-none focus:ring-2 focus:ring-white"
          >
            <GitHubIcon className="h-4 w-4" /> View full GitHub profile
          </a>
        </Reveal>
      </div>
    </section>
  );
}
