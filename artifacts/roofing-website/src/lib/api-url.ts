const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

/**
 * Build an absolute API URL when VITE_API_BASE_URL is set (production split-origin),
 * or return the relative path as-is for same-origin development.
 *
 * Usage:  fetch(getApiUrl("/api/some-route"), ...)
 */
export function getApiUrl(path: string): string {
  if (!API_BASE) return path;
  return `${API_BASE}${path}`;
}

/**
 * Resolve a stored storage object path to a usable image URL.
 *
 * Storage objects are stored in the DB as canonical "/objects/<key>" paths.
 * In a split-origin deployment (Cloudflare Pages + Railway) the browser must
 * fetch these from the Railway API origin, not the Pages origin, so we
 * prepend the API base URL + the storage route prefix.
 *
 * Legacy paths starting with "/api/storage/..." are also handled so that
 * older records continue to resolve correctly.
 *
 * Any other URL (external https://, static assets, etc.) is returned as-is.
 */
export function resolveStorageUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("/objects/")) {
    return getApiUrl(`/api/storage${url}`);
  }
  if (url.startsWith("/api/storage/")) {
    return getApiUrl(url);
  }
  return url;
}
