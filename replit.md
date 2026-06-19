# S&P Construction

Lead-generation website for S&P Construction, a commercial roofing contractor serving the DFW metroplex — featuring geo-targeted SEO pages, a satellite roof estimator, before/after project gallery, and inline quote forms.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run migrate-storage [--dry-run] [--force]` — one-time migration of existing media from Replit Object Storage (GCS) to Cloudflare R2, plus rewriting absolute GCS photo URLs in the `projects` table to canonical `/objects/...` paths. Run inside the Replit environment that owns the source bucket; `--dry-run` needs no R2 creds, a real run needs the `R2_*` and object-path env vars.
- `pnpm --filter @workspace/api-server run bump-date <key|all>` — update a content-date key in `content-dates.ts` to today; run after publishing content changes so sitemap `<lastmod>` stays accurate. Keys: `staticPages`, `servicePages`, `cityPages`, `serviceCityPages`, `all`. **This runs automatically via the pre-commit hook** when the relevant data files are staged — no need to run it manually.
- Required env: `DATABASE_URL` — Postgres connection string

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

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
