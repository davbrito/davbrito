import { chunk } from "@std/collections/chunk";
import { Fragment } from "preact";
import type { Project, Repo } from "./template.ts";
import { ASSETS_DIR } from "./constants.ts";
import { fetchRepoData } from "./github_readme_stats.ts";
import { renderRepoPinCard } from "./svg_cards.tsx";
import { writeFileSync } from "node:fs";

export type RepoWithImagePath = Repo & { imagePath: string };

export function createTopUserLanguagesImage(username: string) {
  return `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=github`;
}

export function createUserStatsImage(username: string) {
  return `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=github`;
}

export async function renderFavRepos(favRepos: Repo[]) {
  const pinReposData = await Promise.all(
    favRepos.map(({ username: u, repo }) => fetchRepoData(u, repo)),
  );

  const pinImages = favRepos.map((r, i) => {
    const repoData = pinReposData[i]!;
    const filePath = `${ASSETS_DIR}/pin-${r.username}-${r.repo}.svg`;
    writeFileSync(filePath, renderRepoPinCard(repoData), "utf-8");
    return { ...r, imagePath: filePath };
  });

  return (
    <table>
      {chunk(pinImages, 3).map((row, rindex) => {
        return (
          <tr key={rindex}>
            {row.map(({ name, username, repo, imagePath }, cindex) => {
              const repoUrl = `https://github.com/${username}/${repo}`;
              return (
                <td key={cindex}>
                  {name}
                  <a href={repoUrl}>
                    <img src={imagePath} alt={name} />
                  </a>
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
}

export function renderPersonalProjects(projects: Project[]) {
  return (
    <>
      <dl>
        {projects.map(({ name, url, description }, index) => (
          <Fragment key={index}>
            <dt>
              <a href={url}>{name}</a>
            </dt>
            <dd>{description}</dd>
          </Fragment>
        ))}
      </dl>
    </>
  );
}
