import { chunk } from "@std/collections/chunk";
import { getPinImageUrl } from "./pin.ts";
import { Project, Repo } from "./template.ts";

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
    <table>
      {projects.map(({ name, url, description }, index) => (
        <tr key={index}>
          <th style="vertical-align: top">
            <span>
              {name} <a href={url}>🔗</a>
            </span>
          </th>
          <td>{description}</td>
        </tr>
      ))}
    </table>
  );
}
