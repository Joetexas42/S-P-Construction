import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { eq } from "drizzle-orm";

import app from "./app";
import { CONTENT_DATES } from "./content-dates";
import { db, projectsTable, siteMetaTable } from "@workspace/db";

/**
 * Verifies the portfolio sitemap stays accurate when projects change.
 *
 * Two contracts are guarded here:
 *   1. Every project create/update/delete persists the portfolio's
 *      last-changed instant into the `site_meta` row (key "portfolio") — so the
 *      sitemap can emit an accurate <lastmod> even though those edits happen via
 *      the admin dashboard, which never runs the content-date bump script.
 *   2. The dynamically-served sitemap surfaces that date on the `/projects`
 *      entry and the static sub-sitemap index <lastmod> (using the later of the
 *      portfolio date and `staticPages`), while unrelated pages (homepage,
 *      service sub-sitemap) keep their content-date value.
 *
 * Runs against the real Express app + DB (no live deploy needed). To stay
 * independent of the wall clock, sitemap-reflection assertions drive the
 * persisted date directly; mutation assertions only check the date *advances*.
 */

const PORTFOLIO_KEY = "portfolio";
const ADMIN_SECRET = "test-admin-secret";
const SITE_ORIGIN = "https://spconstructiondfw.com";

let server: Server;
let baseUrl: string;
const createdProjectIds: number[] = [];

beforeAll(async () => {
  process.env.ADMIN_SECRET = ADMIN_SECRET;
  // Fire the (no-op, DEPLOY_HOOK_URL-less) rebuild trigger immediately instead
  // of leaving a debounce timer pending across the test run.
  process.env.DEPLOY_HOOK_DEBOUNCE_MS = "0";

  await new Promise<void>((resolve) => {
    server = app.listen(0, resolve);
  });
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  for (const id of createdProjectIds) {
    await db.delete(projectsTable).where(eq(projectsTable.id, id)).catch(() => {});
  }
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  );
});

// --- DB helpers -----------------------------------------------------------

async function setPortfolioDate(when: Date): Promise<void> {
  await db
    .insert(siteMetaTable)
    .values({ key: PORTFOLIO_KEY, updatedAt: when })
    .onConflictDoUpdate({ target: siteMetaTable.key, set: { updatedAt: when } });
}

async function clearPortfolioDate(): Promise<void> {
  await db.delete(siteMetaTable).where(eq(siteMetaTable.key, PORTFOLIO_KEY));
}

async function getPortfolioUpdatedAt(): Promise<Date | null> {
  const [row] = await db
    .select({ updatedAt: siteMetaTable.updatedAt })
    .from(siteMetaTable)
    .where(eq(siteMetaTable.key, PORTFOLIO_KEY))
    .limit(1);
  return row?.updatedAt ?? null;
}

// --- HTTP helpers ---------------------------------------------------------

async function createProject(): Promise<number> {
  const res = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-admin-key": ADMIN_SECRET },
    body: JSON.stringify({
      title: "Test Roof",
      location: "Dallas, TX",
      description: "Automated test project.",
      imageUrl: "/objects/uploads/test/roof.jpg",
      category: "flat-roofing",
    }),
  });
  expect(res.status).toBe(201);
  const project = (await res.json()) as { id: number };
  createdProjectIds.push(project.id);
  return project.id;
}

async function fetchXml(path: string): Promise<string> {
  const res = await fetch(`${baseUrl}/api${path}`);
  expect(res.status).toBe(200);
  return res.text();
}

/** Extract the <lastmod> of the entry whose <loc> equals `loc`. */
function lastmodForLoc(xml: string, tag: "url" | "sitemap", loc: string): string | null {
  for (const block of xml.split(`<${tag}>`)) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (locMatch && locMatch[1] === loc) {
      const modMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
      return modMatch ? modMatch[1]! : null;
    }
  }
  return null;
}

function ymd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// --- Tests ----------------------------------------------------------------

describe("portfolio sitemap date tracking on project changes", () => {
  it("advances the persisted portfolio date when a project is created", async () => {
    const before = new Date("2000-01-01T00:00:00.000Z");
    await setPortfolioDate(before);

    await createProject();

    const after = await getPortfolioUpdatedAt();
    expect(after).not.toBeNull();
    expect(after!.getTime()).toBeGreaterThan(before.getTime());
    // The mutation stamps roughly "now".
    expect(Date.now() - after!.getTime()).toBeLessThan(60_000);
  });

  it("advances the persisted portfolio date when a project is updated", async () => {
    const id = await createProject();
    const before = new Date("2000-01-01T00:00:00.000Z");
    await setPortfolioDate(before);

    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", "x-admin-key": ADMIN_SECRET },
      body: JSON.stringify({ title: "Updated Roof" }),
    });
    expect(res.status).toBe(200);

    const after = await getPortfolioUpdatedAt();
    expect(after!.getTime()).toBeGreaterThan(before.getTime());
    expect(Date.now() - after!.getTime()).toBeLessThan(60_000);
  });

  it("advances the persisted portfolio date when a project is deleted", async () => {
    const id = await createProject();
    const before = new Date("2000-01-01T00:00:00.000Z");
    await setPortfolioDate(before);

    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": ADMIN_SECRET },
    });
    expect(res.status).toBe(204);
    // It's gone; don't try to re-delete in cleanup.
    const idx = createdProjectIds.indexOf(id);
    if (idx !== -1) createdProjectIds.splice(idx, 1);

    const after = await getPortfolioUpdatedAt();
    expect(after!.getTime()).toBeGreaterThan(before.getTime());
    expect(Date.now() - after!.getTime()).toBeLessThan(60_000);
  });
});

describe("sitemap reflects the persisted portfolio date", () => {
  it("uses the portfolio date for /projects and the static sub-sitemap, but not unrelated pages", async () => {
    const portfolioDate = new Date("2099-06-15T00:00:00.000Z");
    await setPortfolioDate(portfolioDate);
    const expected = ymd(portfolioDate);

    const staticXml = await fetchXml("/sitemap-static.xml");
    expect(lastmodForLoc(staticXml, "url", `${SITE_ORIGIN}/projects`)).toBe(expected);
    // Unrelated static pages keep their content-date value.
    expect(lastmodForLoc(staticXml, "url", `${SITE_ORIGIN}/`)).toBe(
      CONTENT_DATES.staticPages,
    );

    const indexXml = await fetchXml("/sitemap-index.xml");
    expect(lastmodForLoc(indexXml, "sitemap", `${SITE_ORIGIN}/sitemap-static.xml`)).toBe(
      expected,
    );
    // The services sub-sitemap is unaffected by portfolio changes.
    expect(lastmodForLoc(indexXml, "sitemap", `${SITE_ORIGIN}/sitemap-services.xml`)).toBe(
      CONTENT_DATES.servicePages,
    );
  });

  it("falls back to staticPages when the portfolio date is older or missing", async () => {
    // Older portfolio date must not override the newer static content date.
    await setPortfolioDate(new Date("2000-01-01T00:00:00.000Z"));
    let staticXml = await fetchXml("/sitemap-static.xml");
    expect(lastmodForLoc(staticXml, "url", `${SITE_ORIGIN}/projects`)).toBe(
      CONTENT_DATES.staticPages,
    );

    // No portfolio row at all → same fallback.
    await clearPortfolioDate();
    staticXml = await fetchXml("/sitemap-static.xml");
    expect(lastmodForLoc(staticXml, "url", `${SITE_ORIGIN}/projects`)).toBe(
      CONTENT_DATES.staticPages,
    );
  });
});
