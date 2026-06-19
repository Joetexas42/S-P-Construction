/**
 * storage-key-mapping.mjs — pure helpers describing how the object-storage
 * migration maps a source Replit Object Storage (GCS) key to its destination
 * Cloudflare R2 key, and to the canonical stored path that the frontend's
 * resolveStorageUrl() and the server's storage routes expect.
 *
 * Extracted from migrate-object-storage.mjs so the mapping can be unit-tested
 * independently (see src/storage-url-roundtrip.test.ts) without running the
 * full migration. The migration and the test are the only consumers.
 */

// Fixed Replit Object Storage key conventions.
export const SOURCE_PRIVATE_PREFIX = ".private/";
export const SOURCE_PUBLIC_PREFIX = "public/";

/** Join path segments into a clean key, trimming stray slashes. */
export function joinKey(...segs) {
  return segs
    .filter((s) => s != null && s !== "")
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}

/**
 * Build the key/path mapping functions for a given pair of destination
 * prefixes (derived at runtime from PRIVATE_OBJECT_DIR / PUBLIC_OBJECT_SEARCH_PATHS).
 *
 * Returns:
 *   mapKey(srcKey)               → destination R2 key
 *   canonicalPath(srcKey, dest)  → canonical stored path ("/objects/<key>"
 *                                  for private uploads, "/api/storage/
 *                                  public-objects/<rel>" for public assets)
 */
export function createStorageKeyMapper(destPrivatePrefix, destPublicPrefix) {
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

  return { mapKey, canonicalPath };
}
