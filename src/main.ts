import { isValidElement } from "preact";
import { render } from "preact-render-to-string";
import { FormatTransform } from "./format.ts";
import { renderFavRepos, renderPersonalProjects } from "./helpers.tsx";
import { createImage } from "./markdown.tsx";
import { createUserStatsImage } from "./stats.ts";
import { replaceTechIcons } from "./tech-icons.ts";
import { parseTemplate } from "./template.ts";
import { createTopUserLanguagesImage } from "./top_langs.ts";

addEventListener("unhandledrejection", (event) => {
  console.error(event.reason);
  Deno.exit(1);
});

const { username, favRepos, body, personal } = await parseTemplate();

const [favReposContent, topLanguages, userStats] = await Promise.all([
  renderFavRepos(favRepos),
  createTopUserLanguagesImage(username),
  createUserStatsImage(username),
]);

const templateContext = {
  userStats: createImage({
    alt: "David's github stats",
    src: userStats,
  }),
  favRepos: favReposContent,
  topLanguages: createImage({ src: topLanguages, alt: "Top Langs" }),
  personalProjects: renderPersonalProjects(personal),
};

function replaceTemlateContext(text: string) {
  return text.replace(/\{\s*([a-zA-Z0-9_]+)\s*\}/g, (str, key) => {
    if (!(key in templateContext)) return str;
    const value = templateContext[key as keyof typeof templateContext];

    if (isValidElement(value)) {
      return render(value);
    }

    return String(value);
  });
}

const final = [replaceTechIcons, replaceTemlateContext].reduce(
  (acc, fn) => fn(acc),
  body
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
