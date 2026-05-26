import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import estimatorRouter from "./estimator";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(estimatorRouter);

export default router;
