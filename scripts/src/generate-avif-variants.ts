import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";

// Transcodes every responsive WebP variant (`*-<width>w.webp`) found under the
// roofing-website public image tree into a sibling AVIF file of identical
// dimensions (`*-<width>w.avif`). AVIF is the next-gen format served first via
// <picture><source type="image/avif"> with a WebP fallback, cutting transfer
// size by roughly half on the same pixels.
//
// Working from the existing WebP variants (rather than original sources) means
// AVIF coverage always matches WebP exactly — including images whose original
// source files are not checked into the repo (services, portfolio, etc.).

const QUALITY = 50;
const SPEED = 6; // AV1 encode speed: lower = slower/smaller, higher = faster.

const force = process.argv.includes("--force");

const projectRoot = new URL("../../", import.meta.url).pathname;
const imagesRoot = join(
  projectRoot,
  "artifacts/roofing-website/public/images",
);

const VARIANT_RE = /-\d+w\.webp$/i;

function collectWebpVariants(dir: string, acc: string[]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectWebpVariants(full, acc);
    } else if (entry.isFile() && VARIANT_RE.test(entry.name)) {
      acc.push(full);
    }
  }
}

function isUpToDate(webp: string, avif: string): boolean {
  if (!existsSync(avif)) return false;
  return statSync(avif).mtimeMs >= statSync(webp).mtimeMs;
}

function main() {
  if (!existsSync(imagesRoot)) {
    console.log(`Skipping missing images dir: ${imagesRoot}`);
    return;
  }

  const variants: string[] = [];
  collectWebpVariants(imagesRoot, variants);
  variants.sort();

  if (variants.length === 0) {
    console.log(`No responsive .webp variants found in ${imagesRoot}`);
    return;
  }

  let written = 0;
  let skipped = 0;

  for (const webp of variants) {
    const avif = webp.slice(0, -".webp".length) + ".avif";
    if (!force && isUpToDate(webp, avif)) {
      skipped += 1;
      continue;
    }
    execFileSync("magick", [
      webp,
      "-strip",
      "-quality",
      String(QUALITY),
      "-define",
      `heic:speed=${SPEED}`,
      avif,
    ]);
    const size = statSync(avif).size;
    console.log(`  ${basename(avif)}  (${(size / 1024).toFixed(1)} KB)`);
    written += 1;
  }

  console.log(
    `Done. ${written} AVIF variant(s) written, ${skipped} up-to-date.`,
  );
}

main();
