import { chunk } from "@std/collections/chunk";
import { extract } from "jsr:@std/front-matter/yaml";
import process from "node:process";
import { z } from "npm:zod";
import { FormatTransform } from "./format.ts";
import { createImage } from "./markdown.tsx";
import { getPins } from "./pin.ts";
import { createUserStatsImage } from "./stats.ts";
import { replaceTechIcons } from "./tech-icons.ts";
import { createTopUserLanguagesImage } from "./top_langs.ts";

addEventListener("unhandledrejection", (event) => {
  console.error(event.reason);
  Deno.exit(1);
});

const { username, favRepos, body } = await parseTemplate();

const [pinImages, topLanguages, userStats] = await Promise.all([
  Promise.all(getPins(favRepos)),
  createTopUserLanguagesImage(username),
  createUserStatsImage(username),
]);

const templateContext = {
  userStats: createImage({
    alt: "David's github stats",
    src: userStats,
  }),
  favRepos: `<table>${chunk(pinImages, 3)
    .map((row) => {
      return `<tr>${row
        .map(({ imagePath, repoUrl, name }) => {
          return (
            `<td>` +
            `<a href="${repoUrl}">` +
            `<img src="${imagePath}" alt="${name}" />` +
            `</a>` +
            `</td>`
          );
        })
        .join("")}</tr>`;
    })
    .join("")}</table>`,
  topLanguages: createImage({ src: topLanguages, alt: "Top Langs" }),
};

function replaceTemlateContext(text: string) {
  return text.replace(/\{\s*([a-zA-Z0-9_]+)\s*\}/g, (str, key) => {
    if (!(key in templateContext)) return str;
    return String(templateContext[key as keyof typeof templateContext]);
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

async function parseTemplate() {
  const templateFile = await Deno.readTextFile(
    new URL("./template.md", import.meta.url)
  );

  const { attrs, body } = extract(templateFile);

  const attributes = z
    .object({
      username: z.string(),
      favRepos: z.array(
        z.object({
          name: z.string(),
          username: z.string(),
          repo: z.string(),
        })
      ),
    })
    .parse(attrs);

  return { ...attributes, body };
}
