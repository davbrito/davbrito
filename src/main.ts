import { mkdirSync, writeFileSync } from "node:fs";
import * as prettier from "prettier";
import { ASSETS_DIR } from "./constants.ts";
import {
  createTopUserLanguagesImage,
  createUserStatsImage,
  renderFavRepos,
  renderPersonalProjects,
} from "./helpers.tsx";
import { createPicture } from "./markdown.tsx";
import { ICON_REGEXP, renderIcon } from "./tech-icons.ts";
import { processTemplate } from "./template.ts";

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

const PLACEHOLDER_REGEX = () => /\{\s*([a-zA-Z0-9_]+)\s*\}/g;

const templatePath = new URL(import.meta.resolve("./template.md"));

mkdirSync(ASSETS_DIR, { recursive: true });

let result = await processTemplate(templatePath, async (attrs, replace) => {
  const { username, favRepos, personal } = attrs;

  replace(PLACEHOLDER_REGEX(), {
    userStats: createPicture({
      alt: "David's github stats",
      fallback: createUserStatsImage(username, "github_dark"),
      sources: [
        {
          media: "(prefers-color-scheme: dark)",
          srcset: createUserStatsImage(username, "github_dark"),
        },
        {
          media: "(prefers-color-scheme: light)",
          srcset: createUserStatsImage(username, "github"),
        },
      ],
    }),
    favRepos: await renderFavRepos(favRepos),
    topLanguages: createPicture({
      alt: "Top Langs",
      fallback: createTopUserLanguagesImage(username, "github_dark"),
      sources: [
        {
          media: "(prefers-color-scheme: dark)",
          srcset: createTopUserLanguagesImage(username, "github_dark"),
        },
        {
          media: "(prefers-color-scheme: light)",
          srcset: createTopUserLanguagesImage(username, "github"),
        },
      ],
    }),
    personalProjects: renderPersonalProjects(personal),
  });

  replace(ICON_REGEXP, renderIcon);
});

result = await prettier.format(result, { parser: "markdown" });

writeFileSync("README.md", result, { encoding: "utf-8" });

console.log("README created successfully 🎉");
