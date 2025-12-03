import { chunk } from "@std/collections/chunk";
import { Fragment } from "preact";
import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";
import type { Project, Repo } from "./template.ts";

function getPinImageUrl(username: string, repo: string) {
  return getGithubReadmeStatsUrl("./pin/", { username, repo });
}

export function createTopUserLanguagesImage(username: string) {
  return `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=github`;
}

export function createUserStatsImage(username: string) {
  return `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=github`;
}

export function renderFavRepos(pinImages: Repo[]) {
  return (
    <table>
      {chunk(pinImages, 3).map((row, rindex) => {
        return (
          <tr key={rindex}>
            {row.map(({ name, username, repo }, cindex) => {
              const imageUrl = getPinImageUrl(username, repo);
              const repoUrl = `https://github.com/${username}/${repo}`;
              const imagePath = imageUrl.href;

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
