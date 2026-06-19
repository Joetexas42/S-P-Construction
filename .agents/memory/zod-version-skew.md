---
name: zod version skew with @hookform/resolvers
description: Why a single pinned zod version is required across the workspace for zodResolver typechecks to pass.
---

# zod version skew breaks zodResolver typechecks

`@hookform/resolvers/zod` has no direct zod dependency — it imports `zod` and
resolves it via hoisting. When a second zod copy exists in the tree (e.g.
`puppeteer-core` → `chromium-bidi` pulled zod 3.23.8 while the artifact used the
catalog's 3.25.76), the resolver's `z.Schema` type comes from a *different* zod
copy than the schema you pass it. Result: TS2345 errors at every `zodResolver(...)`
call site, with messages comparing `zod/v3/ZodError` against a `Zod.*` namespace.

**Why:** two physical zod copies = two incompatible sets of nominal types.

**How to apply:** keep a single zod version across the whole workspace. There is a
pnpm `overrides` entry pinning `zod` in the root `package.json` (alongside react /
react-dom). If you bump zod, update the catalog pin(s) in `pnpm-workspace.yaml` and
the override together, then `pnpm install` and run `pnpm run typecheck`. Don't let a
transitive dep silently introduce a second zod.
