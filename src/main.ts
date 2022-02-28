// @ts-check
import { ASSETS_DIR } from "./constants.ts";
import { createImage, createImageLink } from "./markdown.ts";
import { createTopUserLanguagesImage } from "./top_langs.ts";
import { emptyDir } from "fs/empty_dir.ts";
import { getPins } from "./pin.ts";
import { createUserStatsImage } from "./stats.ts";
import readmeData from "./data.json" assert { type: "json" };

const USERNAME = "davbrito";

await emptyDir(ASSETS_DIR);

const [pinImages, topLanguages, userStats] = await Promise.all([
  Promise.all(getPins(readmeData.favRepos)),
  createTopUserLanguagesImage(USERNAME),
  createUserStatsImage(USERNAME),
]);

const markdown = `### Hi there 👋

<!--
**davbrito/davbrito** is a ✨ _special_ ✨ repository because its \`README.md\` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->

${
  createImage({
    alt: "David's github stats",
    src: userStats,
  })
}

### My fav repos

${
  pinImages
    .map(({ imagePath, repoUrl, name }) => {
      return createImageLink({
        imageSrc: imagePath,
        linkHref: repoUrl,
        altText: name,
      });
    })
    .join("\n\n")
}

### Top languages on GitHub 

${createImage({ src: topLanguages, alt: "Top Langs" })}

> Note: Still under construction... 🛠️⚙️

All the stats are generated with [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
`;

await Deno.writeTextFile("README.md", markdown, { create: true });

console.log("README created successfuly 🎉");
