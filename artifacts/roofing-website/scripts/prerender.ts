import puppeteer from "puppeteer-core";
import { createServer } from "http";
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
        const urlPath = new URL(req.url ?? "/", `http://localhost:${PORT}`).pathname;
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
  const routes = allRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  const { server, url } = await startStaticServer();

  const browser = await puppeteer.launch({
    executablePath: CHROMIUM,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const route of routes) {
    const pageUrl = `${url}${route}`;
    try {
      await page.goto(pageUrl, { waitUntil: "networkidle2", timeout: 30000 });

      const html = await page.content();
      writePrerendered(route, html);
    } catch (err) {
      console.error(`  FAILED ${route}: ${err}`);
    }
  }

  await browser.close();
  server.close();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
