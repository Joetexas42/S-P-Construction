import { buildResponsiveSources } from "@/lib/responsiveImage";

interface ResponsiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image path or stem, e.g. `/images/hero-bg.webp` or `/images/cities/dallas`. */
  base: string;
  sizes: string;
  /** Responsive widths to advertise; defaults to 480/800/1280. */
  widths?: readonly number[];
  /** Which width the non-supporting `<img>` falls back to. Defaults to 800. */
  fallbackWidth?: number;
}

/**
 * Renders a `<picture>` that serves AVIF first, then WebP, then a plain WebP
 * `<img>` fallback — all from the same responsive variant set. The wrapping
 * `<picture>` uses `display: contents` so the inner `<img>` keeps participating
 * in the parent layout exactly as a bare `<img>` would (object-cover, absolute
 * positioning, group-hover, clip-path, etc. all behave unchanged).
 */
export function ResponsiveImage({
  base,
  sizes,
  widths,
  fallbackWidth,
  ...imgProps
}: ResponsiveImageProps) {
  const { avifSrcSet, webpSrcSet, fallbackSrc } = buildResponsiveSources(base, {
    widths,
    fallbackWidth,
  });
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img src={fallbackSrc} sizes={sizes} {...imgProps} />
    </picture>
  );
}
