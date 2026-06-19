---
name: Storage path 3-layer contract
description: How a stored photo path becomes a working URL across migration, frontend resolver, and server routes — and the test that guards it.
---

# Storage path contract (R2 cutover)

A stored photo path must agree across three INDEPENDENTLY-maintained layers, or
gallery images silently 404:

1. Migration canonical-path mapping — `artifacts/api-server/scripts/storage-key-mapping.mjs`
   (extracted from `migrate-object-storage.mjs` so it's unit-testable).
   - private GCS key `.private/...` → R2 `uploads/...` → stored `/objects/uploads/...`
   - public GCS key `public/...` → R2 `public/...` → stored `/api/storage/public-objects/...`
2. Frontend resolver — pure logic lives in lib `@workspace/storage-url`
   (`resolveStorageUrl(url, apiBase)`); `artifacts/roofing-website/src/lib/api-url.ts`
   is a thin wrapper that injects the Vite API base. `/objects/<k>` → `/api/storage/objects/<k>`.
3. Server serving routes — `artifacts/api-server/src/routes/storage.ts`
   (`/storage/objects/*`, `/storage/public-objects/*`), mounted at `/api` in `app.ts`.

**Guard:** `artifacts/api-server/src/storage-url-roundtrip.test.ts` runs all three
real implementations end-to-end and asserts a private + public key land on the
server's actual route shapes (route strings read live from the Express router stack).
Changing any layer's prefix without the others fails this test.

**Why three independent pieces, not one shared constant:** the whole point is to
detect drift between separately-owned code; collapsing them into one source would
make the test vacuous.

## How to apply
- Adding/altering any storage prefix? Update all three layers and run `pnpm test`.
- The test mounts nothing and reads `storageRouter.stack`; importing the router is
  side-effect-free (R2 client is lazy via `getR2Client()`).
