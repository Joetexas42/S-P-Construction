import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/service-areas", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "monthly", priority: "0.8" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

function readSlugs(file: string): string[] {
  const src = fs.readFileSync(file, "utf8");
  const slugs: string[] = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04",
  may: "05", june: "06", july: "07", august: "08",
  september: "09", october: "10", november: "11", december: "12",
};

function parseCompletedDate(s: string): string | null {
  const m = s.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
  if (!m) return null;
  const mm = MONTHS[m[1]];
  if (!mm) return null;
  return `${m[2]}-${mm}-01`;
}

function readCaseStudies(
  file: string,
): { slug: string; lastmod: string | null }[] {
  const src = fs.readFileSync(file, "utf8");
  const out: { slug: string; lastmod: string | null }[] = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?completed:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    out.push({ slug: m[1], lastmod: parseCompletedDate(m[2]) });
  }
  return out;
}

const SERVICE_CITY_SERVICE_SLUGS = [
  "repair",
  "replacement",
  "tpo-epdm-pvc",
  "emergency-leak-repair",
];

function buildSitemap(
  siteUrl: string,
  citiesFile: string,
  servicesFile: string,
  caseStudiesFile: string,
): string {
  const base = siteUrl.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const citySlugs = readSlugs(citiesFile);
  const serviceSlugs = readSlugs(servicesFile);
  const studies = readCaseStudies(caseStudiesFile);

  const urls: string[] = [];
  for (const route of STATIC_ROUTES) {
    urls.push(
      `  <url>\n    <loc>${base}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
    );
  }
  for (const slug of citySlugs) {
    urls.push(
      `  <url>\n    <loc>${base}/service-areas/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    );
  }
  for (const slug of serviceSlugs) {
    urls.push(
      `  <url>\n    <loc>${base}/services/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    );
  }
  for (const citySlug of citySlugs) {
    for (const serviceSlug of SERVICE_CITY_SERVICE_SLUGS) {
      urls.push(
        `  <url>\n    <loc>${base}/service-areas/${citySlug}/${serviceSlug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
      );
    }
  }
  for (const s of studies) {
    const lastmod = s.lastmod ?? today;
    urls.push(
      `  <url>\n    <loc>${base}/case-studies/${s.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function sitemapPlugin(options: { siteUrl: string }): Plugin {
  const citiesFile = path.resolve(
    import.meta.dirname,
    "src/data/cities.ts",
  );
  const servicesFile = path.resolve(
    import.meta.dirname,
    "src/data/services.ts",
  );
  const caseStudiesFile = path.resolve(
    import.meta.dirname,
    "src/data/caseStudies.ts",
  );

  return {
    name: "roofing-sitemap",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const url = req.url.split("?")[0];
        if (url.endsWith("/sitemap.xml")) {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(
            buildSitemap(
              options.siteUrl,
              citiesFile,
              servicesFile,
              caseStudiesFile,
            ),
          );
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(
          options.siteUrl,
          citiesFile,
          servicesFile,
          caseStudiesFile,
        ),
      });
    },
  };
}
