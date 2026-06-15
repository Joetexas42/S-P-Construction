import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import estimatorRouter from "./estimator";
import sitemapRouter from "./sitemap";
import projectsRouter from "./projects";
import storageRouter from "./storage";
import paperStreetContactRouter from "./paper-street-contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(estimatorRouter);
router.use(sitemapRouter);
router.use(projectsRouter);
router.use(storageRouter);
router.use(paperStreetContactRouter);

export default router;
