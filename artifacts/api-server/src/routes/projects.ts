import { Router, type Request, type Response } from "express";
import { db, projectsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import {
  CreateProjectBody,
  UpdateProjectParams,
  UpdateProjectBody,
  DeleteProjectParams,
} from "@workspace/api-zod";
import { ObjectStorageService } from "../lib/objectStorage";
import { requireAdminKey } from "../middleware/requireAdminKey";
import { triggerSiteRebuild, getSiteRefreshState } from "../lib/deployHook";
import { touchPortfolioDate } from "../lib/portfolioDate";

const objectStorage = new ObjectStorageService();

const router = Router();

router.post("/admin/verify", requireAdminKey, (req, res): void => {
  res.status(200).json({ ok: true });
});

router.get("/projects", async (req, res): Promise<void> => {
  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(desc(projectsTable.createdAt));

  req.log.info({ count: projects.length }, "Projects listed");
  res.json(projects);
});

router.get("/projects/site-refresh-status", requireAdminKey, (req, res): void => {
  res.json(getSiteRefreshState());
});

router.post("/projects", requireAdminKey, async (req, res): Promise<void> => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [project] = await db
    .insert(projectsTable)
    .values(parsed.data)
    .returning();

  req.log.info({ id: project.id }, "Project created");
  await markPortfolioChanged(req);
  const siteRefresh = triggerSiteRebuild(`project:create:${project.id}`);
  res.status(201).json({ ...project, siteRefresh });
});

router.patch("/projects/:id", requireAdminKey, async (req, res): Promise<void> => {
  const params = UpdateProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateProjectBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  if (Object.keys(body.data).length === 0) {
    res.status(400).json({ error: "At least one field must be provided to update" });
    return;
  }

  const existing = await db
    .select({ imageUrl: projectsTable.imageUrl })
    .from(projectsTable)
    .where(eq(projectsTable.id, params.data.id))
    .limit(1);

  if (existing.length === 0) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const oldImageUrl = existing[0].imageUrl;

  const [project] = await db
    .update(projectsTable)
    .set(body.data)
    .where(eq(projectsTable.id, params.data.id))
    .returning();

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  if (body.data.imageUrl !== undefined && body.data.imageUrl !== oldImageUrl && oldImageUrl) {
    try {
      await objectStorage.deleteObjectEntity(oldImageUrl);
      req.log.info({ id: project.id }, "Replaced project photo deleted from object storage");
    } catch (err) {
      req.log.warn({ id: project.id, err }, "Failed to delete replaced project photo from object storage");
    }
  }

  req.log.info({ id: project.id }, "Project updated");
  await markPortfolioChanged(req);
  const siteRefresh = triggerSiteRebuild(`project:update:${project.id}`);
  res.json({ ...project, siteRefresh });
});

router.delete("/projects/:id", requireAdminKey, async (req, res): Promise<void> => {
  const params = DeleteProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db
    .delete(projectsTable)
    .where(eq(projectsTable.id, params.data.id))
    .returning();

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  try {
    await objectStorage.deleteObjectEntity(project.imageUrl);
    req.log.info({ id: params.data.id }, "Project photo deleted from object storage");
  } catch (err) {
    req.log.warn({ id: params.data.id, err }, "Failed to delete project photo from object storage");
  }

  req.log.info({ id: params.data.id }, "Project deleted");
  await markPortfolioChanged(req);
  const siteRefresh = triggerSiteRebuild(`project:delete:${params.data.id}`);
  res.status(200).json({ siteRefresh });
});

/**
 * Persist the portfolio's last-changed instant so the sitemap <lastmod> for the
 * portfolio pages stays accurate. Best-effort: a failure here must never break
 * the originating mutation (which already succeeded).
 */
async function markPortfolioChanged(req: Request): Promise<void> {
  try {
    await touchPortfolioDate();
  } catch (err) {
    req.log.warn({ err }, "Failed to record portfolio change date for sitemap lastmod");
  }
}

export default router;
