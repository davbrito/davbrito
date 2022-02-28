export function createImage({ src, alt }: { src: string; alt: string }) {
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
