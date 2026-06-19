import { db, siteMetaTable } from "@workspace/db";
import { eq } from "drizzle-orm";

// Key in the `site_meta` table that tracks when the live portfolio (the
// DB-backed projects rendered on /projects, /case-studies) last changed.
const PORTFOLIO_KEY = "portfolio";

/**
 * Record that the portfolio changed "now". Called on every project
 * create/update/delete so the sitemap can emit an accurate <lastmod> for the
 * portfolio pages — even though those edits happen through the admin dashboard,
 * which never runs the content-date bump script.
 */
export async function touchPortfolioDate(): Promise<void> {
  const now = new Date();
  await db
    .insert(siteMetaTable)
    .values({ key: PORTFOLIO_KEY, updatedAt: now })
    .onConflictDoUpdate({ target: siteMetaTable.key, set: { updatedAt: now } });
}

/**
 * Return the portfolio's last-changed date as a `YYYY-MM-DD` string (UTC), or
 * `null` if the portfolio has never been touched (e.g. fresh DB).
 */
export async function getPortfolioLastmod(): Promise<string | null> {
  const [row] = await db
    .select({ updatedAt: siteMetaTable.updatedAt })
    .from(siteMetaTable)
    .where(eq(siteMetaTable.key, PORTFOLIO_KEY))
    .limit(1);

  if (!row) return null;
  return row.updatedAt.toISOString().slice(0, 10);
}
