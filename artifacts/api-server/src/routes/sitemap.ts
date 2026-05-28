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

router.get("/sitemap.xml", (_req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const staticUrls = [
    urlEntry(`${SITE_ORIGIN}/`, { priority: "1.0", changefreq: "weekly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/services`, { priority: "0.9", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/service-areas`, { priority: "0.9", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/projects`, { priority: "0.8", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/gallery`, { priority: "0.7", changefreq: "monthly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/contact`, { priority: "0.8", changefreq: "yearly", lastmod: today }),
    urlEntry(`${SITE_ORIGIN}/estimate`, { priority: "0.8", changefreq: "yearly", lastmod: today }),
  ];

  const serviceUrls = SERVICE_SLUGS.map((slug) =>
    urlEntry(`${SITE_ORIGIN}/services/${slug}`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: today,
    }),
  );

  const cityUrls = CITY_SLUGS.map((slug) =>
    urlEntry(`${SITE_ORIGIN}/service-areas/${slug}`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: today,
    }),
  );

  const serviceCityUrls: string[] = [];
  for (const citySlug of CITY_SLUGS) {
    for (const serviceSlug of SERVICE_CITY_SERVICE_SLUGS) {
      serviceCityUrls.push(
        urlEntry(`${SITE_ORIGIN}/service-areas/${citySlug}/${serviceSlug}`, {
          priority: "0.8",
          changefreq: "monthly",
          lastmod: today,
        }),
      );
    }
  }

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...staticUrls,
    ...serviceUrls,
    ...cityUrls,
    ...serviceCityUrls,
    `</urlset>`,
  ].join("\n");

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

export default router;
