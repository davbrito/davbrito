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

const markdown = `### Hi there š

<!--
**davbrito/davbrito** is a āØ _special_ āØ repository because its \`README.md\` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- š­ Iām currently working on ...
- š± Iām currently learning ...
- šÆ Iām looking to collaborate on ...
- š¤ Iām looking for help with ...
- š¬ Ask me about ...
- š« How to reach me: ...
- š Pronouns: ...
- ā” Fun fact: ...
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

> Note: Still under construction... š ļøāļø

All the stats are generated with [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
`;

await Deno.writeTextFile("README.md", markdown, { create: true });

console.log("README created successfuly š");
