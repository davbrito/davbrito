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
  style?: preact.CSSProperties;
}) {
  return (
    <picture>
      {sources.map(({ srcset, media }, index) => (
        <source srcSet={srcset} media={media} key={index} />
      ))}
      {fallback || alt || style ? (
        <img src={fallback} alt={alt} style={style} />
      ) : null}
    </picture>
  );
}

export function createImageHtml({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style: preact.CSSProperties;
}) {
  if (style) {
    return <img src={src} alt={alt} style={style} />;
  }

  return createImageMd({ alt, src });
}

export function createImageMd({ alt, src }: { alt: string; src: string }) {
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
  return `[${createImageMd({ alt: altText, src: imageSrc })}](${linkHref})`;
}
