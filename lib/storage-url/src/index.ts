/**
 * Canonical contract for turning a stored object path into a fetchable URL.
 *
 * Storage objects are stored in the DB as canonical "/objects/<key>" paths
 * (or legacy "/api/storage/..." paths). The browser must fetch them from the
 * API origin via the storage serving routes, which live under
 * "/api/storage/objects/*" and "/api/storage/public-objects/*".
 *
 * This pure helper is the single source of truth for that rewrite. The
 * roofing-website frontend wraps it with the configured API base URL; the
 * storage round-trip test imports it directly so the frontend's resolution
 * stays in sync with the migration's canonical paths and the server routes.
 */

/** Route prefix under which the API serves storage objects (after the mount). */
export const STORAGE_ROUTE_PREFIX = "/api/storage";

/**
 * Resolve a stored storage object path to a usable image URL.
 *
 * - "/objects/<key>"        → "<apiBase>/api/storage/objects/<key>"
 * - "/api/storage/<...>"    → "<apiBase>/api/storage/<...>" (already prefixed)
 * - anything else           → returned as-is (external URLs, static assets)
 *
 * When `apiBase` is empty (same-origin development) the path is returned
 * relative.
 */
export function resolveStorageUrl(url: string, apiBase = ""): string {
  if (!url) return url;
  const withBase = (path: string): string => (apiBase ? `${apiBase}${path}` : path);
  if (url.startsWith("/objects/")) {
    return withBase(`${STORAGE_ROUTE_PREFIX}${url}`);
  }
  if (url.startsWith(`${STORAGE_ROUTE_PREFIX}/`)) {
    return withBase(url);
  }
  return url;
}
