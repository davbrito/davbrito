export function createPicture({
  sources,
  fallback,
  alt,
  style,
}: {
  sources: {
    srcset: string;
    media?: string;
  }[];
  fallback?: string;
  alt?: string;
  style?: string;
}) {
  const sourcesStr = sources
    .map(({ srcset, media }) => {
      return `<source srcset="${srcset}" ${media ? `media="${media}" ` : ""}/>`;
    })
    .join("\n");

  const fallbackStr = fallback || alt || style
    ? [
      "<img",
      fallback ? `src="${fallback}"` : "",
      alt ? `alt="${alt}"` : "",
      style ? `style="${style}"` : "",
      "/>",
    ]
      .filter(Boolean)
      .join(" ")
    : "";

  return `<picture>\n\t${sourcesStr}\n\t${fallbackStr}\n</picture>`;
}

export function createImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: string;
}) {
  if (style) {
    return `<img src="${src}" alt="${alt}" style="${style}" />`;
  }

  return `![${alt}](${src})`;
}

export function createImageLink({
  imageSrc,
  linkHref,
  altText,
}: {
  imageSrc: string;
  linkHref: string;
  altText: string;
}) {
  return `[${createImage({ alt: altText, src: imageSrc })}](${linkHref})`;
}
