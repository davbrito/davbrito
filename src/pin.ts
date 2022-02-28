import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";
import { fetchAndSaveImage } from "./images.ts";

function getPinImageUrl(username: string, repo: string) {
  return getGithubReadmeStatsUrl("./pin/", { username, repo });
}

export function getPins(
  pins: { username: string; repo: string; name: string }[],
) {
  return pins.map(async ({ repo, username, name }) => {
    const imagePath = await fetchAndSaveImage(
      getPinImageUrl(username, repo),
      `${username}_${repo}-pin.svg`,
    );

    return {
      name,
      repoUrl: `https://github.com/${username}/${repo}`,
      imagePath,
    };
  });
}
