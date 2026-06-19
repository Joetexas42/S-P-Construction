# R2 cutover verification runbook

How to run the **real** media migration and confirm the live project photo
gallery loads end-to-end after the Cloudflare R2 / Railway cutover.

The agent could not do this automatically: it runs in the Replit **dev**
container, which has no R2 credentials, no Railway API URL, and (right now) no
real photos — the source Object Storage bucket holds only a directory
placeholder and the `projects` table has 0 rows. So this is a runbook for **you,
the owner**, to execute where the real data and credentials live.

---

## How the pieces fit together

- **Legacy media** lives in **Replit Object Storage** (Google Cloud Storage),
  readable only via the Replit sidecar **inside the Replit environment that owns
  that bucket**. That is why the migration must run from Replit, not from Railway.
- **Cloudflare R2** is the new home for media. The Railway API serves it through
  `/api/storage/objects/*` (private) and `/api/storage/public-objects/*` (public).
- `migrate-object-storage.mjs` does two things in one pass:
  1. Copies every object from the GCS source bucket into R2 (skips ones that
     already exist unless `--force`).
  2. Rewrites `projects.image_url` in the database: absolute GCS URLs become
     canonical `/objects/<key>` (private) or `/api/storage/public-objects/<rel>`
     (public) paths so the frontend's `resolveStorageUrl()` resolves them
     through the Railway API.

**Key consequence:** the migration rewrites whatever database `DATABASE_URL`
points at, and writes R2 keys under whatever prefixes `PRIVATE_OBJECT_DIR` /
`PUBLIC_OBJECT_SEARCH_PATHS` define. For the cutover you therefore want
`DATABASE_URL` = **production** DB and the object-dir vars = the **same R2 paths
your Railway deployment reads from**, so the migration writes keys exactly where
the live server looks for them.

---

## Phase 0 — Preconditions (do these first)

1. Run this **inside the Replit environment that owns the legacy GCS bucket**.
   Confirm the sidecar + bucket are reachable and actually contain the legacy
   media (not just a placeholder):

   ```bash
   pnpm --filter @workspace/api-server run migrate-storage -- --dry-run
   ```

   - Look at `Found N object(s) in the source bucket.` If `N` is only the
     placeholder (and `0 copied`), **stop** — the real media is in a different
     Replit environment/bucket. Switch to that environment before continuing.
   - The dry-run also prints the planned `src → dest` key mapping and every
     `projects.image_url` rewrite. Review it.

2. Have the **Cloudflare R2** credentials and bucket ready:
   `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`.

3. Know your **R2 path layout** — these must match what Railway uses at runtime,
   e.g. `PRIVATE_OBJECT_DIR=/sp-construction-media/uploads` and
   `PUBLIC_OBJECT_SEARCH_PATHS=/sp-construction-media/public`.

   > ⚠️ In the Replit dev container these vars currently point at the GCS bucket
   > (`/replit-objstore-…/.private`, `/replit-objstore-…/public`). If you leave
   > them like that, the migration writes R2 keys under `.private/…` and
   > `public/…` instead of `uploads/…`, and Railway may not find them. Override
   > them with the R2 values for the run.

4. Decide the DB target. To rewrite the **production** photo URLs, set
   `DATABASE_URL` to the production connection string for the run. **Back up the
   `projects` table first** (e.g. `pg_dump … -t projects`) so the URL rewrite is
   reversible.

---

## Phase 1 — Real migration run

From the Replit environment, with all the env vars above exported (R2 creds,
R2 object dirs, production `DATABASE_URL`):

```bash
# Dry run one more time with the FINAL env to confirm the mapping + DB rewrites
pnpm --filter @workspace/api-server run migrate-storage -- --dry-run

# Real run
pnpm --filter @workspace/api-server run migrate-storage
```

Read the final summary line:

```
✔ Done. objects: <copied> copied, <skipped> skipped; db rows: <updated> updated, <unchanged> unchanged.
```

- `objects copied` should match the real media count from the dry run.
- `db rows updated` should match the number of GCS URLs you saw rewritten.
- Re-running is safe/idempotent: already-copied objects are skipped and
  already-canonical URLs count as `unchanged`. Use `--force` only if you need to
  overwrite existing R2 objects.

---

## Phase 2 — Verify the live gallery on Railway

1. Open the live site's projects page (Railway-served frontend), e.g.
   `https://<your-domain>/projects`.

2. Confirm the **"Recent Projects"** portfolio section renders (it only appears
   when the DB has project rows) and **every** card image loads — no broken
   images, no gray placeholders.

3. Spot-check the image URLs in the browser devtools **Network** tab. Each photo
   request should:
   - go to your **Railway API origin** (the `VITE_API_BASE_URL` base), not the
     Pages/static origin;
   - hit `/api/storage/objects/…` (private uploads) or
     `/api/storage/public-objects/…` (public assets);
   - return **HTTP 200** with an image content-type.

4. Direct-fetch one of each type to confirm the serving routes resolve against
   R2 (replace host + key with real values):

   ```bash
   # private upload
   curl -I "https://<railway-api-host>/api/storage/objects/<key>"
   # public asset
   curl -I "https://<railway-api-host>/api/storage/public-objects/<rel>"
   ```

   Both should return `200` and an `image/*` content type. A `404` means the R2
   key prefix written by the migration doesn't match what the server reads —
   recheck `PRIVATE_OBJECT_DIR` / `PUBLIC_OBJECT_SEARCH_PATHS` consistency
   between the migration run and the Railway runtime.

---

## Done looks like

- [ ] Dry run shows the real legacy media (not just the placeholder).
- [ ] Real run reports the expected `copied` / `updated` counts.
- [ ] `/projects` on the live Railway site shows the portfolio section with
      every photo loading.
- [ ] A private (`/api/storage/objects/…`) and a public
      (`/api/storage/public-objects/…`) asset each return 200 from the Railway
      API.

## Rollback

- **DB:** restore the `projects` table from the backup taken in Phase 0.
- **R2:** the migration only adds objects; delete the copied keys from the R2
  bucket if you need a clean slate.
