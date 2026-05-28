import { Router } from "express";

const router = Router();

const SITE_ORIGIN = "https://scottcommercialroofing.com";

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

const SERVICE_CITY_SERVICE_SLUGS = [
  "repair",
  "replacement",
  "tpo-epdm-pvc",
  "emergency-leak-repair",
  "maintenance",
  "coatings-restoration",
  "flat-roofing",
  "metal-roofing",
];

const SERVICE_CITY_LASTMOD = "2026-05-28";

function urlEntry(
  loc: string,
  opts: { priority?: string; changefreq?: string; lastmod?: string } = {},
): string {
  const parts = [`  <url>`, `    <loc>${loc}</loc>`];
  if (opts.lastmod) parts.push(`    <lastmod>${opts.lastmod}</lastmod>`);
  if (opts.changefreq) parts.push(`    <changefreq>${opts.changefreq}</changefreq>`);
  if (opts.priority) parts.push(`    <priority>${opts.priority}</priority>`);
  parts.push(`  </url>`);
  return parts.join("\n");
}

function sitemapXml(entries: string[]): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries,
    `</urlset>`,
  ].join("\n");
}

function buildStaticEntries(today: string): string[] {
  return [
    urlEntry(`${SITE_ORIGIN}/`, { priority: "1.0", changefreq: "weekly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/services`, { priority: "0.9", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/service-areas`, { priority: "0.9", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/projects`, { priority: "0.8", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/gallery`, { priority: "0.7", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/contact`, { priority: "0.8", changefreq: "yearly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/estimate`, { priority: "0.8", changefreq: "yearly", lastmod: today }),
  ];
}

function buildServiceEntries(today: string): string[] {
  return SERVICE_SLUGS.map((slug) =>
    urlEntry(`${SITE_ORIGIN}/services/${slug}`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: today,
    }),
  );
}

function buildCityEntries(today: string): string[] {
  return CITY_SLUGS.map((slug) =>
    urlEntry(`${SITE_ORIGIN}/service-areas/${slug}`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: today,
    }),
  );
}

function buildServiceCityEntries(): string[] {
  const entries: string[] = [];
  for (const citySlug of CITY_SLUGS) {
    for (const serviceSlug of SERVICE_CITY_SERVICE_SLUGS) {
      entries.push(
        urlEntry(`${SITE_ORIGIN}/service-areas/${citySlug}/${serviceSlug}`, {
          priority: "0.8",
          changefreq: "monthly",
          lastmod: SERVICE_CITY_LASTMOD,
        }),
      );
    }
  }
  return entries;
}

router.get("/sitemap-index.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-static.xml</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `  </sitemap>`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-services.xml</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `  </sitemap>`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-cities.xml</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `  </sitemap>`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-service-cities.xml</loc>`,
    `    <lastmod>${SERVICE_CITY_LASTMOD}</lastmod>`,
    `  </sitemap>`,
    `</sitemapindex>`,
  ].join("\n");

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

router.get("/sitemap-static.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildStaticEntries(today)));
});

router.get("/sitemap-services.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildServiceEntries(today)));
});

router.get("/sitemap-cities.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildCityEntries(today)));
});

router.get("/sitemap-service-cities.xml", (_req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildServiceCityEntries()));
});

router.get("/sitemap.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const xml = sitemapXml([
    ...buildStaticEntries(today),
    ...buildServiceEntries(today),
    ...buildCityEntries(today),
    ...buildServiceCityEntries(),
  ]);

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

export default router;
