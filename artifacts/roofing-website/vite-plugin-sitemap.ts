import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/service-areas", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

function readCitySlugs(citiesFile: string): string[] {
  const src = fs.readFileSync(citiesFile, "utf8");
  const slugs: string[] = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

function buildSitemap(siteUrl: string, citiesFile: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const slugs = readCitySlugs(citiesFile);

  const urls: string[] = [];
  for (const route of STATIC_ROUTES) {
    urls.push(
      `  <url>\n    <loc>${base}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
    );
  }
  for (const slug of slugs) {
    urls.push(
      `  <url>\n    <loc>${base}/service-areas/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function sitemapPlugin(options: { siteUrl: string }): Plugin {
  const citiesFile = path.resolve(
    import.meta.dirname,
    "src/data/cities.ts",
  );

  return {
    name: "roofing-sitemap",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const url = req.url.split("?")[0];
        if (url.endsWith("/sitemap.xml")) {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(buildSitemap(options.siteUrl, citiesFile));
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(options.siteUrl, citiesFile),
      });
    },
  };
}
