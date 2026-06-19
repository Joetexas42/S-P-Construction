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

- **Wait on `#root` having children, not `networkidle2`.** The Maps-backed
  estimate page never reaches network idle. Use `domcontentloaded` +
  `waitForFunction(root.childElementCount>0)` + a short settle for the SEO
  useEffect. Do NOT gate the wait on JSON-LD presence — several pages
  (About, Contact, Estimate, Privacy, Terms) have no JSON-LD, and admin/404
  have no SEO at all.

## Environment quirk: can't observe a >120s run

A full 91-route run exceeds the bash-tool 120s cap, and backgrounded/`setsid`
processes get reaped when the tool returns (log stalls, process dies). To verify
a full clean run, use `PRERENDER_SHARD="<i>/<n>"` to run observable foreground
chunks (e.g. 3 shards). Piping to `tail` buffers until EOF — redirect to a file
and read the file instead. `PRERENDER_ROUTES` (substring filter) is for
debugging/targeted re-prerender. CPU-bound parsing of the ~1MB bundle is the
per-route bottleneck, so higher concurrency gives diminishing returns.
