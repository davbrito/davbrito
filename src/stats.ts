import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";

export function createUserStatsImage(username: string) {
  const url = getGithubReadmeStatsUrl(".", { username, show_icons: "true" });

  return url.href;
}
