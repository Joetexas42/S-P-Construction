import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * site_meta — generic key/value store for site-wide "last changed" instants.
 *
 * Used to track when a body of dynamically-managed content last changed so the
 * sitemap can emit an accurate <lastmod> even though that content is edited via
 * the admin dashboard (which never runs the content-date bump script). Each row
 * is a named bucket (e.g. "portfolio") whose `updatedAt` is touched on change.
 */
export const siteMetaTable = pgTable("site_meta", {
  key: text("key").primaryKey(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SiteMeta = typeof siteMetaTable.$inferSelect;
