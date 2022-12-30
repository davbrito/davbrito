import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";

export function createTopUserLanguagesImage(username: string) {
  return getGithubReadmeStatsUrl("./top-langs/", {
    username,
    langs_count: "6",
    layout: "compact",
  }).href;
}
