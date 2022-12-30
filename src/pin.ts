import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";

function getPinImageUrl(username: string, repo: string) {
  return getGithubReadmeStatsUrl("./pin/", { username, repo });
}

export function getPins(
  pins: { username: string; repo: string; name: string }[]
) {
  return pins.map(({ repo, username, name }) => {
    const imageUrl = getPinImageUrl(username, repo);

    return {
      name,
      repoUrl: `https://github.com/${username}/${repo}`,
      imagePath: imageUrl.href,
    };
  });
}
