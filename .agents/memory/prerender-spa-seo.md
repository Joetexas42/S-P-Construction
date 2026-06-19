---
name: SPA prerendering for SEO (roofing-website)
description: Non-obvious constraints when prerendering the React SPA to static HTML via Puppeteer
---

# Prerendering the roofing-website SPA

The build runs `vite build && tsx scripts/prerender.ts`. The prerender script
launches headless chromium against a local static server and snapshots each
route's HTML after the SEO `useEffect` injects head tags.

## Hard-won constraints

- **One Puppeteer page per route.** Reusing a single shared page across routes
  causes "Attempted to use detached Frame" failures under any navigation/timing
  pressure. Use a fresh page per route + retry.
  **Why:** detached-frame errors only showed up at scale (62/91), not on a
  single test route.

- **Do not serve the SPA index.html for `/api/*` requests.** The pages fetch
  `/api/projects` (relative, same origin). If the prerender static server falls
  back to index.html for unknown paths, fetch() receives HTML and pages that map
  over the response crash ("l.map is not a function" — a string has no .map,
  and `data && data.length > 0` passes for a string). Proxy `/api/*` to the
  running API server (shared proxy on :80) so real data renders; on upstream
  error return a non-2xx empty body so react-query degrades gracefully.
  **Why:** the page guard checks `.length > 0`, which a poisoned HTML string
  passes, so the crash is silent until you capture `pageerror`.

- **Wait on `#root` containing an `<h1>`, not just any children.** The
  Maps-backed estimate page never reaches network idle, so don't use
  `networkidle2`. A bare `root.childElementCount>0` is too weak once a route is
  `React.lazy`: the Layout chrome (Navbar) satisfies it while the lazy page
  chunk + Suspense fallback are still resolving, snapshotting incomplete HTML.
  Gate on `root.querySelector("h1")` — every page (all 17 page components +
  admin login/dashboard) renders a hero `<h1>`. Then a short settle for the SEO
  useEffect. Do NOT gate on JSON-LD/canonical presence — several pages (About,
  Contact, Estimate, Privacy, Terms) have neither.

## Critical-CSS inlining (Beasties) requires a pristine prerender shell

- Critical CSS is inlined per route with **Beasties** in `prerender.ts`
  (`preload: "swap"`, `pruneSource: false`): each snapshot gets a `<style>` of
  the CSS it uses, and the full hashed stylesheets load async (preload→swap +
  `<noscript>` fallback). `pruneSource:false` keeps the original CSS files whole
  for content that mounts client-side (dialogs, the map, toasts).
- **The prerender static server must serve a PRISTINE shell for every page
  navigation — never a previously-prerendered file.** Beasties' swap links flip
  `rel="preload"`→`rel="stylesheet"` in the browser via `onload`; if that
  already-inlined HTML is fed back in as the shell, `page.content()` captures the
  flipped links and Beasties re-processes them, duplicating `<link>` tags every
  pass (and reintroducing a blocking sheet). Fix: capture the vite-built
  `index.html` once and serve it (in memory) for all HTML routes; serve only
  real on-disk assets from `dist/public`.
- **Incremental runs** (`PRERENDER_GROUP=projects`) don't re-render `/`, so the
  on-disk `index.html` is already Beasties-processed. A full build (route list
  includes `/`) writes a pristine `dist/__prerender-shell.html` sidecar (outside
  `dist/public`, so not deployed); incremental runs read that sidecar as the
  shell. Run a full build before any incremental prerender.

## Code-splitting is SEO-safe IF the lazy route uses `fallback={null}`

- The bundle is split via `manualChunks` (vendor groups) plus `React.lazy`
  routes for `/admin` AND `/estimate`. `manualChunks` is always safe — chunks
  stay statically imported, so the prerender renders complete pages.
- `/estimate` is lazy specifically so the Google Maps loader
  (`@googlemaps/js-api-loader` → its own `maps-vendor` chunk) and the estimator
  code only ship when a visitor opens `/estimate`, not modulepreloaded on every
  page. The actual Maps JS already loaded lazily via `importLibrary` on mount;
  this also keeps the wrapper chunk off other pages.
- For `React.lazy`, wrap in `<Suspense fallback={null}>`, NOT a loader/spinner —
  otherwise the prerender wait latches onto the spinner. With `fallback={null}`,
  `#root` has no `<h1>` until the lazy chunk loads (fast on the local static
  server), so the h1-gated wait resolves on real content.
- **Why:** verified `/admin` (login form) and `/estimate` (hero h1 + Step-1
  address UI + SEO title/description) still prerender complete HTML.

## Targeted re-prerender after admin content edits

- Only the `/projects` and `/case-studies` listing routes render DB-backed
  project data (both mount the `Projects` component; the `:slug` detail pages
  use static case-study data). So a portfolio edit in the admin dashboard only
  staleness-affects those two routes — no need for a full ~90-route rebuild.
- The script exposes a `PRERENDER_GROUP=<name>` registry (`ROUTE_GROUPS`) for
  named, exact-match route sets; `projects` is the group for the above. npm
  script `prerender:projects` wraps it. A targeted refresh still needs an
  existing `dist/public` build + the API server reachable on `:80`.
- **Why:** production is split-origin (static site + separate API), so there is
  no in-prod auto-trigger; the documented on-demand command is the refresh path.

## Environment quirk: can't observe a >120s run

A full 91-route run exceeds the bash-tool 120s cap, and backgrounded/`setsid`
processes get reaped when the tool returns (log stalls, process dies). To verify
a full clean run, use `PRERENDER_SHARD="<i>/<n>"` to run observable foreground
chunks (e.g. 3 shards). Piping to `tail` buffers until EOF — redirect to a file
and read the file instead. `PRERENDER_ROUTES` (substring filter) is for
debugging/targeted re-prerender. CPU-bound parsing of the ~1MB bundle is the
per-route bottleneck, so higher concurrency gives diminishing returns.
