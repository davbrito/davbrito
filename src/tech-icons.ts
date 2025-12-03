import { createImageHtml } from "./markdown.tsx";

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

export const ICON_REGEXP = /:([a-z0-9-_]+):/gi;

export function renderIcon(name: string) {
  if (name in iconUrls) {
    return createImageHtml({
      src: iconUrls[name as keyof typeof iconUrls],
      alt: name,
      style: {
        width: "1em",
        height: "1em",
        verticalAlign: "middle",
      },
    });
  }

  if (name in emojis) return emojis[name as keyof typeof emojis];

  return undefined;
}
