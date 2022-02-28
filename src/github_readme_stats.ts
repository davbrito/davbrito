export const GITHUB_README_STATS_URL =
  "https://github-readme-stats.vercel.app/api/";

export function getGithubReadmeStatsUrl(
  path: string,
  params: Record<string, string>,
) {
  const url = new URL(path, GITHUB_README_STATS_URL);
  url.search = new URLSearchParams(params).toString();
  return url;
}
