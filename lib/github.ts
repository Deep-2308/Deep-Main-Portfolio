import "server-only";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
};

export type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

const USERNAME = "Deep-2308";
const API_BASE = "https://api.github.com";

// Only require token if provided (e.g. for higher rate limits)
const getHeaders = () => {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export async function getRecentRepos(count = 5): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`${API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=20`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos: any[] = await res.json();
    
    // Filter out forks and return the most recent
    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "",
        html_url: repo.html_url,
        language: repo.language || "Unknown",
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
      }))
      .slice(0, count);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export async function getRecentCommits(repoName: string, count = 3): Promise<GitHubCommit[]> {
  try {
    const res = await fetch(`${API_BASE}/repos/${USERNAME}/${repoName}/commits?per_page=${count}`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const commits: any[] = await res.json();
    return commits.map((c) => ({
      sha: c.sha,
      html_url: c.html_url,
      commit: {
        message: c.commit.message,
        author: {
          date: c.commit.author.date,
        },
      },
    }));
  } catch (error) {
    console.error(`Failed to fetch commits for ${repoName}:`, error);
    return [];
  }
}
