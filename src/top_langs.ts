import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";
import { fetchAndSaveImage } from "./images.ts";

export function createTopUserLanguagesImage(username: string) {
  const url = getGithubReadmeStatsUrl("./top-langs/", {
    username,
    langs_count: "6",
    layout: "compact",
  });

  return fetchAndSaveImage(url, `${username}-top-langs.svg`);
}
