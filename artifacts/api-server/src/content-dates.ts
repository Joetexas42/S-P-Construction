/**
 * CONTENT_DATES — intentional last-modified dates per content type.
 *
 * Update the relevant key here whenever you publish content changes for that
 * section. This keeps sitemap <lastmod> values accurate without grepping
 * through route code.
 *
 * Keys map to the four sitemap sub-files:
 *   staticPages     — homepage, /services index, /service-areas, /projects, /gallery, /contact, /estimate
 *   servicePages    — /services/<slug>
 *   cityPages       — /service-areas/<city-slug>
 *   serviceCityPages — /service-areas/<city-slug>/<service-slug>
 */
export const CONTENT_DATES: Record<
  "staticPages" | "servicePages" | "cityPages" | "serviceCityPages",
  string
> = {
  staticPages: "2026-05-28",
  servicePages: "2026-05-28",
  cityPages: "2026-05-28",
  serviceCityPages: "2026-05-28",
};
