import { renderToString } from "preact-render-to-string";
import { JSX } from "preact";

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
  style?: JSX.CSSProperties;
}) {
  return renderToString(
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

export function createImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: JSX.CSSProperties;
}) {
  if (style) {
    return renderToString(<img src={src} alt={alt} style={style} />);
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
