import { Router } from "express";
import { CONTENT_DATES } from "../content-dates.js";
import { getPortfolioLastmod } from "../lib/portfolioDate.js";

const router = Router();

const SITE_ORIGIN = "https://spconstructiondfw.com";

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

function sitemapXml(entries: string[]): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries,
    `</urlset>`,
  ].join("\n");
}

// YYYY-MM-DD strings sort lexicographically, so plain string comparison gives
// the chronologically later date.
function maxDate(a: string, b: string | null): string {
  return b && b > a ? b : a;
}

/**
 * Last-modified date for the portfolio pages (`/projects`). The page combines
 * static layout (dated by `staticPages`) with the live, admin-managed portfolio,
 * so its <lastmod> is the later of the two. The portfolio date is persisted on
 * every project mutation (see `lib/portfolioDate.ts`); when unavailable we fall
 * back to `staticPages`.
 */
async function resolvePortfolioLastmod(): Promise<string> {
  let portfolio: string | null = null;
  try {
    portfolio = await getPortfolioLastmod();
  } catch {
    portfolio = null;
  }
  return maxDate(CONTENT_DATES.staticPages, portfolio);
}

function buildStaticEntries(portfolioLastmod: string): string[] {
  const lastmod = CONTENT_DATES.staticPages;
  return [
    urlEntry(`${SITE_ORIGIN}/`, { priority: "1.0", changefreq: "weekly", lastmod }),
    urlEntry(`${SITE_ORIGIN}/services`, { priority: "0.9", changefreq: "monthly", lastmod }),
    urlEntry(`${SITE_ORIGIN}/service-areas`, { priority: "0.9", changefreq: "monthly", lastmod }),
    urlEntry(`${SITE_ORIGIN}/projects`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: portfolioLastmod,
    }),
    urlEntry(`${SITE_ORIGIN}/gallery`, { priority: "0.7", changefreq: "monthly", lastmod }),
    urlEntry(`${SITE_ORIGIN}/contact`, { priority: "0.8", changefreq: "yearly", lastmod }),
    urlEntry(`${SITE_ORIGIN}/estimate`, { priority: "0.8", changefreq: "yearly", lastmod }),
  ];
}

function buildServiceEntries(): string[] {
  const lastmod = CONTENT_DATES.servicePages;
  return SERVICE_SLUGS.map((slug) =>
    urlEntry(`${SITE_ORIGIN}/services/${slug}`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod,
    }),
  );
}

function buildCityEntries(): string[] {
  const lastmod = CONTENT_DATES.cityPages;
  return CITY_SLUGS.map((slug) =>
    urlEntry(`${SITE_ORIGIN}/service-areas/${slug}`, {
      priority: "0.8",
      changefreq: "monthly",
      lastmod,
    }),
  );
}

function buildServiceCityEntries(): string[] {
  const lastmod = CONTENT_DATES.serviceCityPages;
  const entries: string[] = [];
  for (const citySlug of CITY_SLUGS) {
    for (const serviceSlug of SERVICE_CITY_SERVICE_SLUGS) {
      entries.push(
        urlEntry(`${SITE_ORIGIN}/service-areas/${citySlug}/${serviceSlug}`, {
          priority: "0.8",
          changefreq: "monthly",
          lastmod,
        }),
      );
    }
  }
  return entries;
}

router.get("/sitemap-index.xml", async (_req, res) => {
  const portfolioLastmod = await resolvePortfolioLastmod();
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-static.xml</loc>`,
    `    <lastmod>${portfolioLastmod}</lastmod>`,
    `  </sitemap>`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-services.xml</loc>`,
    `    <lastmod>${CONTENT_DATES.servicePages}</lastmod>`,
    `  </sitemap>`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-cities.xml</loc>`,
    `    <lastmod>${CONTENT_DATES.cityPages}</lastmod>`,
    `  </sitemap>`,
    `  <sitemap>`,
    `    <loc>${SITE_ORIGIN}/sitemap-service-cities.xml</loc>`,
    `    <lastmod>${CONTENT_DATES.serviceCityPages}</lastmod>`,
    `  </sitemap>`,
    `</sitemapindex>`,
  ].join("\n");

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

router.get("/sitemap-static.xml", async (_req, res) => {
  const portfolioLastmod = await resolvePortfolioLastmod();
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildStaticEntries(portfolioLastmod)));
});

router.get("/sitemap-services.xml", (_req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildServiceEntries()));
});

router.get("/sitemap-cities.xml", (_req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildCityEntries()));
});

router.get("/sitemap-service-cities.xml", (_req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml(buildServiceCityEntries()));
});

router.get("/sitemap.xml", async (_req, res) => {
  const portfolioLastmod = await resolvePortfolioLastmod();
  const xml = sitemapXml([
    ...buildStaticEntries(portfolioLastmod),
    ...buildServiceEntries(),
    ...buildCityEntries(),
    ...buildServiceCityEntries(),
  ]);

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

export default router;
