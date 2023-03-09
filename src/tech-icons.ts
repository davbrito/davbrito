import { createImage } from "./markdown.ts";

const iconUrls = {
  vite: "https://vitejs.dev/logo.svg",
  postcss:
    "https://github.com/postcss/brand/raw/master/dist/postcss-logo-symbol.svg",
  node: "https://github.com/gilbarbara/logos/blob/1f372be75689d73cae89b6de808149b606b879e1/logos/nodejs-icon.svg",
  ts: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
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
