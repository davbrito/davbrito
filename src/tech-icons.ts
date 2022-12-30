import { createImage } from "./markdown.ts";

const iconUrls = {
  vite: "https://vitejs.dev/logo.svg",
  postcss:
    "https://github.com/postcss/brand/raw/master/dist/postcss-logo-symbol.svg",
  node:
    "https://camo.githubusercontent.com/342d0b4d47c3c88c7542ddeb7bc8f7e4b6dbf8b496ca4f4f6c66a11659bbc180/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f66617669636f6e732f6170706c652d746f7563682d69636f6e2e706e67",
  ts:
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
};

const emojis = {
  react: "⚛️",
  js: "🟨",
  deno: "🦕",
  python: "🐍",
  cpp: "🟣",
  c: "🟤",
  cs: "🟡",
  "styled-components": "💅",
};

const pattern = new RegExp(
  `:(${[...Object.keys(emojis), ...Object.keys(iconUrls)].join("|")}):`,
  "ig",
);

export function replaceTechIcons(text: string) {
  return text.replace(pattern, (original, tech) => {
    if (tech in iconUrls) {
      const iconUrl = iconUrls[tech as keyof typeof iconUrls];
      const style = "width: 1em; height: 1em; vertical-align: middle;";

      return createImage({ src: iconUrl, alt: tech, style });
    }

    if (tech in emojis) return emojis[tech as keyof typeof emojis];

    return original;
  });
}
