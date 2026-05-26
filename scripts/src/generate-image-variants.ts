import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";

const WIDTHS = [480, 800, 1280] as const;
const QUALITY = 82;
const MAX_BASE_WIDTH = 1600;

const projectRoot = new URL("../../", import.meta.url).pathname;
const imagesRoot = join(
  projectRoot,
  "artifacts/roofing-website/public/images",
);

type Target =
  | { kind: "dir"; path: string; sourceExt: ".webp" | ".png" }
  | { kind: "file"; path: string };

const TARGETS: Target[] = [
  { kind: "dir", path: join(imagesRoot, "projects"), sourceExt: ".webp" },
  { kind: "file", path: join(imagesRoot, "hero-bg.png") },
  { kind: "file", path: join(imagesRoot, "gallery-tpo.png") },
  { kind: "file", path: join(imagesRoot, "gallery-metal.png") },
  { kind: "file", path: join(imagesRoot, "gallery-storm.png") },
];

function isOriginalVariant(file: string, ext: string): boolean {
  if (extname(file).toLowerCase() !== ext) return false;
  return !/-\d+w\.webp$/i.test(file);
}

function srcWidthOf(input: string): number {
  const dims = execFileSync("magick", ["identify", "-format", "%w", input])
    .toString()
    .trim();
  return parseInt(dims, 10);
}

function emitVariant(input: string, output: string, targetWidth: number) {
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
    `  ${basename(output)}  (${targetWidth}w, ${(size / 1024).toFixed(1)} KB)`,
  );
}

function processSource(input: string, opts: { emitBaseWebp: boolean }) {
  const ext = extname(input).toLowerCase();
  const stemPath = input.slice(0, -ext.length);
  const stem = basename(stemPath);
  const dir = stemPath.slice(0, -stem.length);
  const srcWidth = srcWidthOf(input);

  console.log(stem + ext);

  if (opts.emitBaseWebp) {
    const baseOut = join(dir, `${stem}.webp`);
    const baseWidth = Math.min(MAX_BASE_WIDTH, srcWidth);
    emitVariant(input, baseOut, baseWidth);
  }

  for (const w of WIDTHS) {
    const targetWidth = Math.min(w, srcWidth);
    const output = join(dir, `${stem}-${w}w.webp`);
    emitVariant(input, output, targetWidth);
  }
}

function main() {
  for (const target of TARGETS) {
    if (target.kind === "dir") {
      if (!existsSync(target.path)) {
        console.log(`Skipping missing dir: ${target.path}`);
        continue;
      }
      const files = readdirSync(target.path).filter((f) =>
        isOriginalVariant(f, target.sourceExt),
      );
      if (files.length === 0) {
        console.log(`No source ${target.sourceExt} files in ${target.path}`);
        continue;
      }
      for (const file of files) {
        processSource(join(target.path, file), {
          emitBaseWebp: target.sourceExt !== ".webp",
        });
      }
    } else {
      if (!existsSync(target.path)) {
        console.log(`Skipping missing file: ${target.path}`);
        continue;
      }
      const ext = extname(target.path).toLowerCase();
      processSource(target.path, { emitBaseWebp: ext !== ".webp" });
    }
  }
}

main();
