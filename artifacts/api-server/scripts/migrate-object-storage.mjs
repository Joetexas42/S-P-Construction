#!/usr/bin/env node
/**
 * migrate-object-storage.mjs — one-time migration of existing media from
 * Replit Object Storage (Google Cloud Storage, via the Replit sidecar) into
 * the Cloudflare R2 bucket used by the Railway deployment.
 *
 * What it does:
 *   1. Lists every object in the source Replit Object Storage bucket.
 *   2. Copies each object into R2 under the matching key prefix
 *      (Replit ".private/..." → R2 private prefix, "public/..." → R2 public
 *      prefix). Existing R2 objects are skipped unless --force is given.
 *   3. Rewrites project photo URLs in the database (projects.image_url): any
 *      absolute GCS URL is converted to the canonical "/objects/<key>" path so
 *      it resolves through the Railway "/api/storage/..." serving routes.
 *
 * Usage:
 *   pnpm --filter @workspace/api-server run migrate-storage [--dry-run] [--force]
 *
 * Flags:
 *   --dry-run   Report what would happen without copying objects or writing to
 *               the database. Does NOT require R2 credentials.
 *   --force     Overwrite objects that already exist in R2 (default: skip).
 *
 * Required environment:
 *   DATABASE_URL                     Postgres connection string
 *   (Replit sidecar at 127.0.0.1:1106 — present in the Replit environment)
 *   DEFAULT_OBJECT_STORAGE_BUCKET_ID Source bucket id (auto-set by Replit), or
 *                                    pass SOURCE_BUCKET to override.
 *
 * Required environment for a real run (omit only with --dry-run):
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 *   PRIVATE_OBJECT_DIR               e.g. /sp-construction-media/uploads
 *   PUBLIC_OBJECT_SEARCH_PATHS       e.g. /sp-construction-media/public
 */

import pg from "pg";
import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const { Pool } = pg;

// ── Constants ────────────────────────────────────────────────────────────────
const SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
const GCS_API = "https://storage.googleapis.com";
// Fixed Replit Object Storage key conventions.
const SOURCE_PRIVATE_PREFIX = ".private/";
const SOURCE_PUBLIC_PREFIX = "public/";

// ── CLI flags ────────────────────────────────────────────────────────────────
const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const FORCE = args.has("--force");

// ── Helpers ──────────────────────────────────────────────────────────────────
function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

function requireEnv(key) {
  const val = process.env[key];
  if (!val) fail(`Missing required environment variable: ${key}`);
  return val;
}

/** Parse a virtual path "/<bucket>/<keyPrefix...>" into its parts. */
function parseObjectPath(path) {
  let p = path.startsWith("/") ? path : `/${path}`;
  const parts = p.split("/").filter(Boolean);
  if (parts.length < 1) fail(`Invalid path: ${path}`);
  return { bucket: parts[0], keyPrefix: parts.slice(1).join("/") };
}

function joinKey(...segs) {
  return segs
    .filter((s) => s != null && s !== "")
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}

/** Fetch a short-lived GCS access token from the Replit sidecar. */
async function getGcsToken() {
  const res = await fetch(`${SIDECAR_ENDPOINT}/token`, { method: "POST" });
  if (!res.ok) {
    fail(
      `Could not get a GCS token from the Replit sidecar (${res.status}). ` +
        `This script must run inside the Replit environment that owns the ` +
        `source Object Storage bucket.`,
    );
  }
  const json = await res.json();
  if (!json.access_token) fail("Sidecar returned no access_token");
  return json.access_token;
}

/** List every object in the source GCS bucket (handles pagination). */
async function listSourceObjects(token, bucket) {
  const objects = [];
  let pageToken;
  do {
    const url = new URL(`${GCS_API}/storage/v1/b/${bucket}/o`);
    url.searchParams.set("maxResults", "1000");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const body = await res.text();
      fail(`Failed to list source bucket (${res.status}): ${body.slice(0, 300)}`);
    }
    const json = await res.json();
    for (const item of json.items ?? []) objects.push(item);
    pageToken = json.nextPageToken;
  } while (pageToken);
  return objects;
}

/** Download a single object's bytes from GCS. */
async function downloadSourceObject(token, bucket, key) {
  const url = `${GCS_API}/storage/v1/b/${bucket}/o/${encodeURIComponent(
    key,
  )}?alt=media`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    fail(`Failed to download ${key} (${res.status})`);
  }
  return Buffer.from(await res.arrayBuffer());
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(
    `▶ Object storage migration (Replit → Cloudflare R2)${
      DRY_RUN ? "  [DRY RUN]" : ""
    }`,
  );

  requireEnv("DATABASE_URL");
  const sourceBucket =
    process.env.SOURCE_BUCKET ?? requireEnv("DEFAULT_OBJECT_STORAGE_BUCKET_ID");

  // Destination prefixes are derived from the R2 path config. These are only
  // strictly required for a real run; in dry-run we still try to read them so
  // the planned key mapping can be displayed.
  const r2Bucket = DRY_RUN
    ? process.env.R2_BUCKET_NAME ?? "<R2_BUCKET_NAME>"
    : requireEnv("R2_BUCKET_NAME");
  const privateDir = DRY_RUN
    ? process.env.PRIVATE_OBJECT_DIR
    : requireEnv("PRIVATE_OBJECT_DIR");
  const publicPaths = DRY_RUN
    ? process.env.PUBLIC_OBJECT_SEARCH_PATHS
    : requireEnv("PUBLIC_OBJECT_SEARCH_PATHS");

  const destPrivatePrefix = privateDir
    ? parseObjectPath(privateDir).keyPrefix
    : "uploads";
  const destPublicPrefix = publicPaths
    ? parseObjectPath(publicPaths.split(",")[0].trim()).keyPrefix
    : "public";

  /** Map a source GCS key to its destination R2 key. */
  function mapKey(srcKey) {
    if (srcKey.startsWith(SOURCE_PRIVATE_PREFIX)) {
      return joinKey(destPrivatePrefix, srcKey.slice(SOURCE_PRIVATE_PREFIX.length));
    }
    if (srcKey.startsWith(SOURCE_PUBLIC_PREFIX)) {
      return joinKey(destPublicPrefix, srcKey.slice(SOURCE_PUBLIC_PREFIX.length));
    }
    // Unknown prefix — keep the key as-is so nothing is silently dropped.
    return srcKey;
  }

  /**
   * Canonical stored path for a destination key, matching the frontend's
   * resolveStorageUrl() expectations:
   *   private uploads → "/objects/<key>"
   *   public assets   → "/api/storage/public-objects/<rel>"
   */
  function canonicalPath(srcKey, destKey) {
    if (srcKey.startsWith(SOURCE_PUBLIC_PREFIX)) {
      const rel = destKey.startsWith(`${destPublicPrefix}/`)
        ? destKey.slice(destPublicPrefix.length + 1)
        : destKey;
      return `/api/storage/public-objects/${rel}`;
    }
    return `/objects/${destKey}`;
  }

  console.log(`  source bucket : ${sourceBucket}`);
  console.log(`  target bucket : ${r2Bucket}`);
  console.log(`  private prefix: .private/ → ${destPrivatePrefix}/`);
  console.log(`  public prefix : public/ → ${destPublicPrefix}/`);
  console.log("");

  // ── 1. Copy objects ─────────────────────────────────────────────────────────
  const token = await getGcsToken();
  const sourceObjects = await listSourceObjects(token, sourceBucket);

  let copied = 0;
  let skipped = 0;
  const r2 = DRY_RUN
    ? null
    : new S3Client({
        region: "auto",
        endpoint: `https://${requireEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
          secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
        },
      });

  console.log(`Found ${sourceObjects.length} object(s) in the source bucket.`);
  for (const obj of sourceObjects) {
    const srcKey = obj.name;
    // Skip "directory placeholder" objects (zero-byte keys ending in "/").
    if (srcKey.endsWith("/")) {
      skipped++;
      continue;
    }
    const destKey = mapKey(srcKey);

    if (DRY_RUN) {
      console.log(`  would copy  ${srcKey}  →  ${r2Bucket}/${destKey}`);
      copied++;
      continue;
    }

    if (!FORCE) {
      try {
        await r2.send(new HeadObjectCommand({ Bucket: r2Bucket, Key: destKey }));
        console.log(`  skip (exists)  ${destKey}`);
        skipped++;
        continue;
      } catch (err) {
        const name = err?.name;
        if (name !== "NotFound" && name !== "NoSuchKey") throw err;
      }
    }

    const body = await downloadSourceObject(token, sourceBucket, srcKey);
    const isPublic = srcKey.startsWith(SOURCE_PUBLIC_PREFIX);
    await r2.send(
      new PutObjectCommand({
        Bucket: r2Bucket,
        Key: destKey,
        Body: body,
        ContentType: obj.contentType ?? "application/octet-stream",
        Metadata: {
          "acl-policy": JSON.stringify({
            owner: "migration",
            visibility: isPublic ? "public" : "private",
          }),
        },
      }),
    );
    console.log(`  copied  ${srcKey}  →  ${destKey}`);
    copied++;
  }
  console.log("");

  // ── 2. Rewrite database URLs ────────────────────────────────────────────────
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let updated = 0;
  let unchanged = 0;
  try {
    const { rows } = await pool.query("SELECT id, image_url FROM projects");
    console.log(`Found ${rows.length} project row(s).`);

    // Match an absolute GCS URL for the source bucket and capture the object key.
    const gcsHost = new RegExp(
      `^https?://(?:storage\\.googleapis\\.com|storage\\.cloud\\.google\\.com)/${sourceBucket}/(.+)$`,
    );

    for (const row of rows) {
      const current = row.image_url ?? "";
      let next = current;

      const m = current.match(gcsHost);
      if (m) {
        const srcKey = decodeURIComponent(m[1]);
        next = canonicalPath(srcKey, mapKey(srcKey));
      }

      if (next === current) {
        unchanged++;
        continue;
      }

      console.log(`  project ${row.id}: ${current}  →  ${next}`);
      if (!DRY_RUN) {
        await pool.query("UPDATE projects SET image_url = $1 WHERE id = $2", [
          next,
          row.id,
        ]);
      }
      updated++;
    }
  } finally {
    await pool.end();
  }

  console.log("");
  console.log(
    `✔ Done${DRY_RUN ? " (dry run — no changes written)" : ""}. ` +
      `objects: ${copied} copied, ${skipped} skipped; ` +
      `db rows: ${updated} updated, ${unchanged} unchanged.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
