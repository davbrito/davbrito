import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";

export function getPinImageUrl(username: string, repo: string) {
  return getGithubReadmeStatsUrl("./pin/", { username, repo });
}
