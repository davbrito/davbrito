import { createImage } from "./markdown.tsx";

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
      return createImage({
        src: iconUrls[tech as keyof typeof iconUrls],
        alt: tech,
        style: {
          width: "1em",
          height: "1em",
          verticalAlign: "middle",
        },
      });
    }

    if (tech in emojis) return emojis[tech as keyof typeof emojis];

    return original;
  });
}
