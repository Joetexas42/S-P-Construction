export const RESPONSIVE_IMAGE_WIDTHS = [480, 800, 1280] as const;

export function buildImageSrcSet(src: string): string | undefined {
  if (!src.endsWith(".webp")) return undefined;
  const stem = src.slice(0, -".webp".length);
  return RESPONSIVE_IMAGE_WIDTHS.map((w) => `${stem}-${w}w.webp ${w}w`).join(
    ", ",
  );
}

export const SIZES_HALF_COLUMN_GRID =
  "(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw";

export const SIZES_FULL_VIEWPORT = "100vw";

export const SIZES_CONTENT_MAX_1280 =
  "(min-width: 1280px) 1280px, 100vw";
