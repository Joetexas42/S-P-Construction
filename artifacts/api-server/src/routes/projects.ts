import { Router } from "express";
import { db, projectsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/projects", async (req, res) => {
  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(desc(projectsTable.createdAt));

  req.log.info({ count: projects.length }, "Projects listed");
  res.json(projects);
});

export default router;
