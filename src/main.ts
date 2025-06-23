import { FormatTransform } from "./format.ts";
import { renderFavRepos, renderPersonalProjects } from "./helpers.tsx";
import { createImage } from "./markdown.tsx";
import { createUserStatsImage } from "./stats.ts";
import { ICON_REGEXP, renderIcon } from "./tech-icons.ts";
import { Template } from "./template.ts";
import { createTopUserLanguagesImage } from "./top_langs.ts";

addEventListener("unhandledrejection", (event) => {
  console.error(event.reason);
  Deno.exit(1);
});

const template = new Template(new URL("./template.md", import.meta.url));

const final = await template.produce(async (attrs, replace) => {
  const { username, favRepos, personal } = attrs;
  const [favReposContent, topLanguages, userStats] = await Promise.all([
    renderFavRepos(favRepos),
    createTopUserLanguagesImage(username),
    createUserStatsImage(username),
  ]);

  replace(/\{\s*([a-zA-Z0-9_]+)\s*\}/g, {
    userStats: createImage({
      alt: "David's github stats",
      src: userStats,
    }),
    favRepos: favReposContent,
    topLanguages: createImage({ src: topLanguages, alt: "Top Langs" }),
    personalProjects: renderPersonalProjects(personal),
  });

  replace(ICON_REGEXP, renderIcon);
});

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
