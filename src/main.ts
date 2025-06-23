import { FormatTransform } from "./format.ts";
import {
  createTopUserLanguagesImage,
  createUserStatsImage,
  renderFavRepos,
  renderPersonalProjects,
} from "./helpers.tsx";
import { createImageMd } from "./markdown.tsx";
import { ICON_REGEXP, renderIcon } from "./tech-icons.ts";
import { processTemplate } from "./template.ts";

addEventListener("unhandledrejection", (event) => {
  console.error(event.reason);
  Deno.exit(1);
});

const final = await processTemplate(
  new URL("./template.md", import.meta.url),
  (attrs, replace) => {
    const { username, favRepos, personal } = attrs;

    replace(/\{\s*([a-zA-Z0-9_]+)\s*\}/g, {
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
  }
);

const file = await Deno.open("README.md", {
  create: true,
  write: true,
  truncate: true,
});

await ReadableStream.from([final])
  .pipeThrough(new TextEncoderStream())
  .pipeThrough(new FormatTransform("md"))
  .pipeTo(file.writable);

console.log("README created successfuly 🎉");
