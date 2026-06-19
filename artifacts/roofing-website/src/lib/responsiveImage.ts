export const RESPONSIVE_IMAGE_WIDTHS = [480, 800, 1280] as const;

/**
 * Normalizes any variant path or stem to the bare stem (no width suffix, no
 * extension). Accepts `/images/foo.webp`, `/images/foo-800w.webp`, or
 * `/images/foo` and returns `/images/foo`.
 */
export function imageStem(src: string): string {
  return src.replace(/(-\d+w)?\.(webp|avif)$/i, "");
}

function buildSrcSet(
  stem: string,
  ext: "webp" | "avif",
  widths: readonly number[],
): string {
  return widths.map((w) => `${stem}-${w}w.${ext} ${w}w`).join(", ");
}

export function buildImageSrcSet(src: string): string | undefined {
  if (!src.endsWith(".webp")) return undefined;
  return buildSrcSet(imageStem(src), "webp", RESPONSIVE_IMAGE_WIDTHS);
}

/**
 * Returns matching AVIF + WebP `srcSet` strings plus the WebP fallback `src`
 * for a given image stem/path, so callers can render a
 * `<picture><source type="image/avif"><source type="image/webp"><img></picture>`.
 */
export function buildResponsiveSources(
  src: string,
  opts: { widths?: readonly number[]; fallbackWidth?: number } = {},
): { avifSrcSet: string; webpSrcSet: string; fallbackSrc: string } {
  const widths = opts.widths ?? RESPONSIVE_IMAGE_WIDTHS;
  const stem = imageStem(src);
  const fallbackWidth = opts.fallbackWidth ?? 800;
  return {
    avifSrcSet: buildSrcSet(stem, "avif", widths),
    webpSrcSet: buildSrcSet(stem, "webp", widths),
    fallbackSrc: `${stem}-${fallbackWidth}w.webp`,
  };
}

export const SIZES_HALF_COLUMN_GRID =
  "(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw";

export const SIZES_FULL_VIEWPORT = "100vw";

export const SIZES_CONTENT_MAX_1280 =
  "(min-width: 1280px) 1280px, 100vw";
