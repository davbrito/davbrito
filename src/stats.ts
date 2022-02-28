import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";
import { fetchAndSaveImage } from "./images.ts";

export function createUserStatsImage(username: string) {
  const url = getGithubReadmeStatsUrl("./stats/", {
    username,
    show_icons: "true",
  });

  return fetchAndSaveImage(url, `${username}-stats.svg`);
}
