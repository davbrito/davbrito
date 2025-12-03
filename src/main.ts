import { writeFileSync } from "node:fs";
import * as prettier from "prettier";
import {
  createTopUserLanguagesImage,
  createUserStatsImage,
  renderFavRepos,
  renderPersonalProjects,
} from "./helpers.tsx";
import { createImageMd } from "./markdown.tsx";
import { ICON_REGEXP, renderIcon } from "./tech-icons.ts";
import { processTemplate } from "./template.ts";

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

const PLACEHOLDER_REGEX = () => /\{\s*([a-zA-Z0-9_]+)\s*\}/g;

const templatePath = new URL(import.meta.resolve("./template.md"));

let result = processTemplate(templatePath, (attrs, replace) => {
  const { username, favRepos, personal } = attrs;

  replace(PLACEHOLDER_REGEX(), {
    userStats: createImageMd({
      alt: "David's github stats",
      src: createUserStatsImage(username),
    }),
    favRepos: renderFavRepos(favRepos),
    topLanguages: createImageMd({
      src: createTopUserLanguagesImage(username),
      alt: "Top Langs",
    }),
    personalProjects: renderPersonalProjects(personal),
  });

  replace(ICON_REGEXP, renderIcon);
});

result = await prettier.format(result, { parser: "markdown" });

writeFileSync("README.md", result, { encoding: "utf-8" });

console.log("README created successfully 🎉");
