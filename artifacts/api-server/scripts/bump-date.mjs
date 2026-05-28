#!/usr/bin/env node
/**
 * bump-date.mjs — update one or all keys in content-dates.ts to today's date.
 *
 * Usage:
 *   pnpm --filter @workspace/api-server run bump-date <key|all>
 *
 * Keys:
 *   staticPages       — homepage, /services index, /service-areas, /projects, /gallery, /contact, /estimate
 *   servicePages      — /services/<slug>
 *   cityPages         — /service-areas/<city-slug>
 *   serviceCityPages  — /service-areas/<city-slug>/<service-slug>
 *   all               — update every key to today
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const VALID_KEYS = ["staticPages", "servicePages", "cityPages", "serviceCityPages"];

const key = process.argv[2];

if (!key) {
  console.error("Error: provide a key or 'all'.");
  console.error(`  Usage: pnpm --filter @workspace/api-server run bump-date <${VALID_KEYS.join("|")}|all>`);
  process.exit(1);
}

if (key !== "all" && !VALID_KEYS.includes(key)) {
  console.error(`Error: unknown key "${key}".`);
  console.error(`Valid keys: ${VALID_KEYS.join(", ")}, all`);
  process.exit(1);
}

const keysToUpdate = key === "all" ? VALID_KEYS : [key];
const today = new Date().toISOString().slice(0, 10);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(scriptDir, "..", "src", "content-dates.ts");

let src = readFileSync(filePath, "utf8");

for (const k of keysToUpdate) {
  src = src.replace(
    new RegExp(`(${k}:\\s*)"[0-9]{4}-[0-9]{2}-[0-9]{2}"`),
    `$1"${today}"`
  );
}

writeFileSync(filePath, src, "utf8");

const updated = keysToUpdate.join(", ");
console.log(`bumped ${updated} → ${today}`);
