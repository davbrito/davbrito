import { createImage } from "./markdown.ts";

const iconUrls = {
  vite: "https://vitejs.dev/logo.svg",
  postcss:
    "https://github.com/postcss/brand/raw/master/dist/postcss-logo-symbol.svg",
  node: "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/nodejs-icon.svg",
  ts: "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/typescript-icon-round.svg",
  react: "https://github.com/gilbarbara/logos/raw/main/logos/react.svg",
  js: "https://github.com/gilbarbara/logos/blob/main/logos/javascript.svg",
  nextjs: "https://github.com/gilbarbara/logos/raw/main/logos/nextjs-icon.svg",
};

const emojis = {
  deno: "🦕",
  python: "🐍",
  cpp: "🟣",
  c: "🟤",
  cs: "🟡",
  "styled-components": "💅",
};

const pattern = new RegExp(
  `:(${[...Object.keys(emojis), ...Object.keys(iconUrls)].join("|")}):`,
  "ig"
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
