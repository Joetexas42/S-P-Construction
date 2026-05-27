import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import estimatorRouter from "./estimator";
import sitemapRouter from "./sitemap";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(estimatorRouter);
router.use(sitemapRouter);

export default router;
