import { describe, it, expect } from "vitest";

import storageRouter from "./routes/storage";
import { resolveStorageUrl } from "@workspace/storage-url";
import {
  createStorageKeyMapper,
  SOURCE_PRIVATE_PREFIX,
  SOURCE_PUBLIC_PREFIX,
} from "../scripts/storage-key-mapping.mjs";

/**
 * Guards the R2 cutover contract: a stored photo path must travel through three
 * independently-maintained layers and still resolve to a working URL —
 *   1. the migration's canonical-path mapping (storage-key-mapping.mjs),
 *   2. the frontend's resolveStorageUrl() (via @workspace/storage-url),
 *   3. the server's storage serving routes (routes/storage.ts).
 *
 * If any layer changes its prefix convention without the others, a private or
 * public key will resolve to a URL the server doesn't serve — silent 404s and
 * broken gallery images. This test fails the moment those layers disagree.
 */

// Mount prefix applied in app.ts: `app.use("/api", router)`.
const API_MOUNT = "/api";

// Representative destination prefixes, mirroring the production env config
// (PRIVATE_OBJECT_DIR=/<bucket>/uploads, PUBLIC_OBJECT_SEARCH_PATHS=/<bucket>/public).
const DEST_PRIVATE_PREFIX = "uploads";
const DEST_PUBLIC_PREFIX = "public";

/** Collect the path strings registered on an Express router. */
function registeredRoutePaths(router: unknown): string[] {
  const stack = (router as { stack?: Array<{ route?: { path?: unknown } }> }).stack ?? [];
  const paths: string[] = [];
  for (const layer of stack) {
    const path = layer?.route?.path;
    if (Array.isArray(path)) {
      for (const p of path) if (typeof p === "string") paths.push(p);
    } else if (typeof path === "string") {
      paths.push(path);
    }
  }
  return paths;
}

/** The literal prefix of a route path, up to its first `:param` or `*wildcard`. */
function staticPrefix(routePath: string): string {
  const wildcardIdx = routePath.search(/[:*]/);
  const prefix = wildcardIdx === -1 ? routePath : routePath.slice(0, wildcardIdx);
  return prefix.replace(/\/+$/, "");
}

describe("storage URL round-trip (migration ⇄ resolveStorageUrl ⇄ server routes)", () => {
  const { mapKey, canonicalPath } = createStorageKeyMapper(
    DEST_PRIVATE_PREFIX,
    DEST_PUBLIC_PREFIX,
  );

  const routePaths = registeredRoutePaths(storageRouter);
  const privateRoutePath = routePaths.find(
    (p) => p.includes("/objects") && !p.includes("public-objects"),
  );
  const publicRoutePath = routePaths.find((p) => p.includes("public-objects"));

  it("registers the expected server storage routes", () => {
    expect(privateRoutePath, "private /storage/objects route not found").toBeDefined();
    expect(publicRoutePath, "public /storage/public-objects route not found").toBeDefined();
  });

  it("resolves a migrated PRIVATE key to the server's /api/storage/objects/* route", () => {
    const privateRouteBase = API_MOUNT + staticPrefix(privateRoutePath!);

    const srcKey = `${SOURCE_PRIVATE_PREFIX}2024/roof-after.jpg`;
    const stored = canonicalPath(srcKey, mapKey(srcKey));
    const resolved = resolveStorageUrl(stored);

    // Migration stores the canonical "/objects/<key>" path …
    expect(stored).toBe("/objects/uploads/2024/roof-after.jpg");
    // … which the frontend resolves onto the server's private serving route.
    expect(resolved).toBe(`${privateRouteBase}/uploads/2024/roof-after.jpg`);
    expect(resolved.startsWith(`${privateRouteBase}/`)).toBe(true);
  });

  it("resolves a migrated PUBLIC key to the server's /api/storage/public-objects/* route", () => {
    const publicRouteBase = API_MOUNT + staticPrefix(publicRoutePath!);

    const srcKey = `${SOURCE_PUBLIC_PREFIX}brand/logo.png`;
    const stored = canonicalPath(srcKey, mapKey(srcKey));
    const resolved = resolveStorageUrl(stored);

    // Public assets are stored already prefixed with the serving route …
    expect(stored).toBe("/api/storage/public-objects/brand/logo.png");
    // … and resolveStorageUrl passes them through unchanged.
    expect(resolved).toBe(`${publicRouteBase}/brand/logo.png`);
    expect(resolved.startsWith(`${publicRouteBase}/`)).toBe(true);
  });

  it("keeps private and public keys on distinct routes", () => {
    const privateRouteBase = API_MOUNT + staticPrefix(privateRoutePath!);
    const publicRouteBase = API_MOUNT + staticPrefix(publicRoutePath!);

    const privUrl = resolveStorageUrl(
      canonicalPath(`${SOURCE_PRIVATE_PREFIX}a.jpg`, mapKey(`${SOURCE_PRIVATE_PREFIX}a.jpg`)),
    );
    const pubUrl = resolveStorageUrl(
      canonicalPath(`${SOURCE_PUBLIC_PREFIX}b.jpg`, mapKey(`${SOURCE_PUBLIC_PREFIX}b.jpg`)),
    );

    expect(privUrl.startsWith(`${publicRouteBase}/`)).toBe(false);
    expect(pubUrl.startsWith(`${privateRouteBase}/`)).toBe(false);
  });
});
