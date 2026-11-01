// INDEX ROUTER
import { Router } from "express";
import portfolioRouter from "./portfolio";

const router = Router();

router.use(portfolioRouter);

export default router;
