import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { extname, join, basename } from "node:path";

const WIDTHS = [480, 800, 1280] as const;
const QUALITY = 82;

const projectRoot = new URL("../../", import.meta.url).pathname;
const imagesDir = join(
  projectRoot,
  "artifacts/roofing-website/public/images/projects",
);

function isOriginal(file: string): boolean {
  if (extname(file).toLowerCase() !== ".webp") return false;
  return !/-\d+w\.webp$/i.test(file);
}

function main() {
  const files = readdirSync(imagesDir).filter(isOriginal);
  if (files.length === 0) {
    console.log("No original .webp files found in", imagesDir);
    return;
  }

  for (const file of files) {
    const input = join(imagesDir, file);
    const stem = basename(file, ".webp");

    const dims = execFileSync("magick", [
      "identify",
      "-format",
      "%w",
      input,
    ])
      .toString()
      .trim();
    const srcWidth = parseInt(dims, 10);

    for (const w of WIDTHS) {
      const targetWidth = Math.min(w, srcWidth);
      const output = join(imagesDir, `${stem}-${w}w.webp`);
      execFileSync("magick", [
        input,
        "-resize",
        `${targetWidth}x>`,
        "-strip",
        "-quality",
        String(QUALITY),
        "-define",
        "webp:method=6",
        output,
      ]);
      const size = statSync(output).size;
      console.log(
        `  ${stem}-${w}w.webp  (${targetWidth}w, ${(size / 1024).toFixed(1)} KB)`,
      );
    }
  }
}

main();
