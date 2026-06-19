# S&P Construction

Lead-generation website for S&P Construction, a commercial roofing contractor serving the DFW metroplex — featuring geo-targeted SEO pages, a satellite roof estimator, before/after project gallery, and inline quote forms.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/roofing-website run prerender:projects` — re-prerender only the portfolio-dependent pages (`/projects`, `/case-studies`) after editing projects in the admin dashboard, instead of a full rebuild. Requires an existing `dist/public` build and the API server running (the prerender proxies `/api` to the shared proxy on `:80`). Publish the site afterwards so the refreshed static HTML/SEO snapshot goes live. The underlying script also supports `PRERENDER_GROUP=<name>` (named route groups), `PRERENDER_ROUTES=<substring,...>`, and `PRERENDER_SHARD=<i/n>` for other targeted runs.
- `pnpm --filter @workspace/api-server run migrate-storage [--dry-run] [--force]` — one-time migration of existing media from Replit Object Storage (GCS) to Cloudflare R2, plus rewriting absolute GCS photo URLs in the `projects` table to canonical `/objects/...` paths. Run inside the Replit environment that owns the source bucket; `--dry-run` needs no R2 creds, a real run needs the `R2_*` and object-path env vars.
- `pnpm --filter @workspace/api-server run bump-date <key|all>` — update a content-date key in `content-dates.ts` to today; run after publishing content changes so sitemap `<lastmod>` stays accurate. Keys: `staticPages`, `servicePages`, `cityPages`, `serviceCityPages`, `all`. **This runs automatically via the pre-commit hook** when the relevant data files are staged — no need to run it manually.
- Required env: `DATABASE_URL` — Postgres connection string

## CI (GitHub Actions)

`.github/workflows/ci.yml` runs on every push and pull request: `pnpm install --frozen-lockfile`, then `pnpm run typecheck`, then `pnpm run build`. A failing typecheck or build fails the run, so type/compile problems are caught before merge — the same gate the `.githooks/pre-commit` hook enforces locally, now enforced server-side even when local hooks aren't installed.

- The build step sets `SKIP_PRERENDER=1` so the roofing-website build verifies compilation (`vite build`) without running the Puppeteer prerender, which needs Chromium + a running API and is a deploy-time concern. Production deploys leave `SKIP_PRERENDER` unset, so Cloudflare Pages still prerenders.
- It also sets placeholder `PORT`/`BASE_PATH` because the Vite configs require them at build time.
- **To gate deploys on green CI:** enable branch protection on the deploy branch in GitHub (Settings → Branches) and mark the `Typecheck & build` check as required. Cloudflare Pages / Railway then only deploy commits that passed CI.

## Deployment (Railway API + Cloudflare Pages frontend)

The frontend (static, prerendered SPA) deploys to **Cloudflare Pages**; the API deploys to **Railway**. Cloudflare Pages settings:

- **Build command:** `pnpm --filter @workspace/roofing-website run build`
- **Build output directory:** `artifacts/roofing-website/dist/public`
- **Root directory:** repo root (the build filter targets the workspace package)
- **Environment variables (build-time):**
  - `VITE_API_BASE_URL` — the Railway API origin, e.g. `https://api.spconstructiondfw.com` (read in `vite.config.ts`, applied via `setBaseUrl()` in `src/main.tsx`). The prerender also proxies its `/api/*` calls here by default (see below), so prerendered SEO pages embed live project data from the Railway API.
  - A **Deploy Hook** must exist on the Cloudflare Pages project so the API can auto-rebuild the static site when projects change (see "Auto-refresh on project changes" below)
  - `GOOGLE_MAPS_BROWSER_API_KEY` — browser-safe Google Maps key (HTTP-referrer-restricted)
  - `PRERENDER_API_ORIGIN` *(optional)* — explicit upstream origin the prerender proxies `/api/*` to. When unset, the prerender falls back to `VITE_API_BASE_URL`, and finally to `http://127.0.0.1:80` (the local Replit shared proxy). Set this only if the prerender must hit a different API origin than the client bundle. The existing 502 → client-hydration fallback still applies if the upstream is unreachable.
  - `CHROMIUM_PATH` *(optional)* — path to a Chrome/Chromium binary. **Not required on Cloudflare:** the build is self-contained — when no system Chromium is on `PATH`, the prerender automatically downloads a pinned Chrome build (via `@puppeteer/browsers`) into `artifacts/roofing-website/.cache/puppeteer` and launches `puppeteer-core` against it. Set `CHROMIUM_PATH` only to force a specific binary (locally on Replit the Nix-provided `chromium` on `PATH` is used automatically). `CHROMIUM_CHANNEL` (default `stable`) and `PUPPETEER_CACHE_DIR` further tune the download.
  - **Build dependencies:** `tsx` (the prerender runner) is a devDependency of `@workspace/roofing-website`, so `pnpm install` puts it on the package's `node_modules/.bin` — no global `tsx` needed. The downloaded Chrome (Ubuntu/glibc build) launches on Cloudflare's standard build image; if a future minimal image lacks the shared libs Chrome needs, provide `CHROMIUM_PATH` instead.
- **SPA routing:** `artifacts/roofing-website/public/_redirects` provides the `/* /index.html 200` fallback so non-prerendered routes (e.g. `/admin`, dynamic paths, trailing-slash variants) resolve. Prerendered static files are still served directly (Pages serves matching files before applying the catch-all).
- **Asset caching:** `artifacts/roofing-website/public/_headers` sets long-lived immutable cache on the hashed `/assets/*` bundles.

### Auto-refresh on project changes

When a project is created, updated, or deleted in the admin dashboard, the API server (`artifacts/api-server/src/lib/deployHook.ts`) POSTs to a Cloudflare Pages **deploy hook** to kick off a fresh Pages build (which re-runs the prerender) and republish — so the live portfolio pages (`/projects`, `/case-studies`) refresh automatically with no manual `prerender:projects` step. Set these env vars on the **API server** (Railway):

- `DEPLOY_HOOK_URL` — the Cloudflare Pages deploy-hook URL (Pages project → Settings → Builds & deployments → Deploy hooks). When unset (e.g. local dev), the trigger is skipped with a logged warning and mutations still succeed.
- `DEPLOY_HOOK_DEBOUNCE_MS` *(optional)* — coalesce bursts of mutations into one rebuild after this quiet period (default `10000`; set `0` to fire on every mutation). Trigger failures are logged (`error`), never swallowed.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- **Portfolio sitemap `<lastmod>` is DB-driven, not bump-script-driven.** Most sitemap dates come from `content-dates.ts` (bumped via the pre-commit hook / `bump-date`). But the `/projects` page also renders the live, admin-managed portfolio, whose edits never run that script. So every project create/update/delete persists `now()` into the `site_meta` table (key `portfolio`) via `lib/portfolioDate.ts`, and the dynamically-served sitemap uses the later of that timestamp and `staticPages` for the `/projects` entry (and the static sub-sitemap's index `<lastmod>`). A dedicated persisted row is used rather than `MAX(created_at)` so deletions are reflected too.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
