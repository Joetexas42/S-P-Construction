---
name: Vitest setup & pre-existing typecheck red
description: How tests run in this monorepo, and a pre-existing typecheck failure that is NOT yours to fix.
---

# Vitest in this monorepo

- `vitest` is a root devDependency (root `test` script = `vitest run`); no per-repo
  vitest config — relies on defaults (node env, `**/*.test.ts`).
- Workspace libs export SOURCE (`exports: "./src/index.ts"`), so vitest resolves
  `@workspace/*` from source with no build step. A package that imports a lib only
  in a test still needs the `workspace:*` dep declared so pnpm links it.
- Test files are excluded from `tsc` (`api-server/tsconfig.json` has
  `exclude: ["**/*.test.ts"]`), so tests are run, not typechecked.

# Pre-existing typecheck failure (do not blame your change)

`pnpm run typecheck` fails in `roofing-website` at `ContactForm.tsx` and
`Estimate.tsx` with a zod / `@hookform/resolvers` `ZodType` mismatch (zod 3.25's
`zod/v3` compat subpath vs root `zod`). This predates the storage-test work
(confirmed: adding vitest produced an additions-only lockfile diff, no zod/hookform
resolution change). It is unrelated to the storage path contract.
