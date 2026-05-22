import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env["GITHUB_TOKEN"],
});

export async function fetchRepoData(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.get({ owner, repo });
  return data;
}

export type RepoData = Awaited<ReturnType<typeof fetchRepoData>>;
