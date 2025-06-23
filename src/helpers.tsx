import { chunk } from "@std/collections/chunk";
import { Fragment } from "preact";
import { getGithubReadmeStatsUrl } from "./github_readme_stats.ts";
import { Project, Repo } from "./template.ts";

function getPinImageUrl(username: string, repo: string) {
  return getGithubReadmeStatsUrl("./pin/", { username, repo });
}

export function createTopUserLanguagesImage(username: string) {
  return getGithubReadmeStatsUrl("./top-langs/", {
    username,
    langs_count: "6",
    layout: "compact",
  }).href;
}

export function createUserStatsImage(username: string) {
  return getGithubReadmeStatsUrl(".", { username, show_icons: "true" }).href;
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
