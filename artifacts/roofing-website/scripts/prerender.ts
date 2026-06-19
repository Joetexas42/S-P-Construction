import puppeteer from "puppeteer-core";
import { createServer, request as httpRequest } from "http";
import { readFileSync } from "fs";
import { resolve, dirname, join, extname } from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";

import { execSync } from "child_process";

function findChromium(): string {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;

  const candidates = [
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
    "chrome",
  ];
  for (const bin of candidates) {
    try {
      const resolved = execSync(`which ${bin}`, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }).trim();
      if (resolved) return resolved;
    } catch { /* ignore */ }
  }

  throw new Error(
    "Chromium not found. Set CHROMIUM_PATH to the Chrome/Chromium binary, or install chromium via your package manager.",
  );
}

// Allow CI builds to verify compilation (vite build) without running the
// Puppeteer prerender, which needs Chromium + a running API server. The real
// deploy build (Cloudflare Pages) leaves this unset so prerendering still runs.
if (process.env.SKIP_PRERENDER === "1" || process.env.SKIP_PRERENDER === "true") {
  console.log(
    "[prerender] SKIP_PRERENDER is set — skipping prerender step (compile-only build).",
  );
  process.exit(0);
}

const CHROMIUM = findChromium();

const DIST_DIR = resolve(import.meta.dirname, "..", "dist", "public");
const PORT = Number(process.env.PRERENDER_PORT ?? 3456);

const STATIC_ROUTES = [
  "/",
  "/services",
  "/service-areas",
  "/projects",
  "/case-studies",
  "/contact",
  "/estimate",
  "/about",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/built-by",
  "/admin",
  "/gallery",
];

const CITY_SLUGS = ["dallas", "fort-worth", "frisco", "plano", "mckinney", "arlington"];

const SERVICE_SLUGS = [
  "inspection",
  "repair",
  "installation",
  "replacement",
  "maintenance",
  "storm-damage",
  "emergency-leak-repair",
  "coatings-restoration",
  "flat-roofing",
  "metal-roofing",
  "tpo-epdm-pvc",
];

const SERVICE_CITY_SERVICES = [
  "repair",
  "replacement",
  "tpo-epdm-pvc",
  "emergency-leak-repair",
  "maintenance",
  "coatings-restoration",
  "flat-roofing",
  "metal-roofing",
];

const PROJECT_SLUGS = [
  "frisco-retail-tpo-replacement",
  "fort-worth-industrial-standing-seam",
  "plano-office-hail-restoration",
  "dallas-warehouse-pvc-replacement",
  "mckinney-medical-tpo-recover",
  "arlington-school-pvc-replacement",
];

// Named route groups for targeted re-prerendering. When the team edits the
// portfolio through the admin dashboard, only the DB-backed listing pages go
// stale — re-prerender just those instead of the full ~90-route build.
const ROUTE_GROUPS: Record<string, string[]> = {
  // Pages that render live project data from /api/projects (the "Recent
  // Projects" gallery section). The /projects/:slug and /case-studies/:slug
  // detail pages render static case-study data, so they don't need a refresh
  // when portfolio projects change.
  projects: ["/projects", "/case-studies"],
};

function allRoutes(): string[] {
  const routes: string[] = [...STATIC_ROUTES];

  for (const slug of CITY_SLUGS) {
    routes.push(`/service-areas/${slug}`);
  }
  for (const slug of SERVICE_SLUGS) {
    routes.push(`/services/${slug}`);
  }
  for (const slug of PROJECT_SLUGS) {
    routes.push(`/projects/${slug}`);
    routes.push(`/case-studies/${slug}`);
  }
  for (const citySlug of CITY_SLUGS) {
    for (const serviceSlug of SERVICE_CITY_SERVICES) {
      routes.push(`/service-areas/${citySlug}/${serviceSlug}`);
    }
  }

  return routes;
}

function startStaticServer(): Promise<{ server: ReturnType<typeof createServer>; url: string }> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        const reqUrl = new URL(req.url ?? "/", `http://localhost:${PORT}`);
        const urlPath = reqUrl.pathname;

        // Proxy API calls to the running API server (via the shared proxy on
        // :80) so prerendered pages can render real data. Never serve the SPA
        // index.html for /api/* — that would hand HTML to fetch() and crash
        // pages that expect JSON. On any upstream error, return a 502 with an
        // empty body so react-query degrades gracefully instead of receiving
        // HTML, and the dynamic content simply hydrates on the client.
        if (urlPath.startsWith("/api/")) {
          const proxyReq = httpRequest(
            {
              host: "127.0.0.1",
              port: 80,
              method: req.method,
              path: req.url,
              headers: { ...req.headers, host: "127.0.0.1" },
            },
            (proxyRes) => {
              res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers);
              proxyRes.pipe(res);
            },
          );
          proxyReq.on("error", () => {
            res.writeHead(502, { "Content-Type": "application/json" });
            res.end("");
          });
          req.pipe(proxyReq);
          return;
        }

        let filePath = join(DIST_DIR, urlPath);

        if (existsSync(filePath) && !extname(filePath)) {
          filePath = join(filePath, "index.html");
        }
        if (!extname(filePath)) {
          filePath = join(filePath, "index.html");
        }
        if (!existsSync(filePath)) {
          filePath = join(DIST_DIR, "index.html");
        }

        const content = readFileSync(filePath);
        const ext = extname(filePath).toLowerCase();
        let ct = "application/octet-stream";
        if (ext === ".html") ct = "text/html";
        else if (ext === ".js") ct = "application/javascript";
        else if (ext === ".css") ct = "text/css";
        else if (ext === ".json") ct = "application/json";
        else if (ext === ".svg") ct = "image/svg+xml";
        else if (ext === ".png") ct = "image/png";
        else if (ext === ".jpg" || ext === ".jpeg") ct = "image/jpeg";
        else if (ext === ".webp") ct = "image/webp";
        else if (ext === ".woff2") ct = "font/woff2";

        res.writeHead(200, { "Content-Type": ct });
        res.end(content);
      } catch (e) {
        res.writeHead(500);
        res.end(String(e));
      }
    });

    server.listen(PORT, "127.0.0.1", () => {
      const url = `http://127.0.0.1:${PORT}`;
      console.log(`Static server running at ${url}`);
      resolve({ server, url });
    });
    server.on("error", reject);
  });
}

function writePrerendered(route: string, html: string) {
  let outPath: string;
  if (route === "/") {
    outPath = join(DIST_DIR, "index.html");
  } else {
    outPath = join(DIST_DIR, route, "index.html");
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`  ${route}`);
}

async function main() {
  let routes = allRoutes();

  // Optional named group (PRERENDER_GROUP) to re-prerender a known set of
  // content-dependent routes — e.g. "projects" after editing the portfolio in
  // the admin dashboard. Matches routes exactly (not by substring) so detail
  // pages aren't pulled in unnecessarily.
  const group = process.env.PRERENDER_GROUP?.trim();
  if (group) {
    const groupRoutes = ROUTE_GROUPS[group];
    if (!groupRoutes) {
      throw new Error(
        `Unknown PRERENDER_GROUP="${group}" (known: ${Object.keys(ROUTE_GROUPS).join(", ")})`,
      );
    }
    routes = routes.filter((r) => groupRoutes.includes(r));
  }

  // Optional comma-separated substring filter (PRERENDER_ROUTES) for
  // re-prerendering or debugging a subset of routes without a full run.
  const filter = process.env.PRERENDER_ROUTES?.trim();
  if (filter) {
    const needles = filter.split(",").map((s) => s.trim()).filter(Boolean);
    routes = routes.filter((r) => needles.some((n) => r === n || r.includes(n)));
  }

  // Optional sharding (PRERENDER_SHARD="<index>/<total>", 1-based) to split a
  // full run into smaller deterministic chunks that can be run in parallel.
  const shard = process.env.PRERENDER_SHARD?.trim();
  if (shard) {
    const [idxRaw, totalRaw] = shard.split("/");
    const idx = Number(idxRaw);
    const total = Number(totalRaw);
    if (Number.isInteger(idx) && Number.isInteger(total) && total > 0 && idx >= 1 && idx <= total) {
      routes = routes.filter((_, i) => i % total === idx - 1);
    } else {
      throw new Error(`Invalid PRERENDER_SHARD="${shard}" (expected "<index>/<total>", 1-based)`);
    }
  }

  console.log(`Prerendering ${routes.length} routes...`);

  const { server, url } = await startStaticServer();

  const browser = await puppeteer.launch({
    executablePath: CHROMIUM,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  let failed = 0;

  async function renderRoute(route: string): Promise<void> {
    const pageUrl = `${url}${route}`;
    let lastErr: unknown;

    for (let attempt = 1; attempt <= 2; attempt++) {
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

        // Wait for the React app to mount. Content is rendered from local
        // static data, so this settles quickly without relying on network idle
        // (which never settles on the map-enabled estimate page).
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            return !!root && root.childElementCount > 0;
          },
          { timeout: 30000 },
        );

        // Give the SEO component's useEffect a moment to inject title, meta
        // description, canonical, and JSON-LD into <head> after mount.
        await new Promise((r) => setTimeout(r, 400));

        const html = await page.content();
        writePrerendered(route, html);
        return;
      } catch (err) {
        lastErr = err;
      } finally {
        await page.close().catch(() => {});
      }
    }

    failed++;
    console.error(`  FAILED ${route}: ${lastErr}`);
  }

  const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY ?? 4);
  const queue = [...routes];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const route = queue.shift();
      if (route === undefined) break;
      await renderRoute(route);
    }
  });
  await Promise.all(workers);

  await browser.close();
  server.close();

  console.log(`\nDone. ${routes.length - failed}/${routes.length} routes prerendered.`);
  if (failed > 0) {
    throw new Error(`${failed} route(s) failed to prerender.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
