// INDEX ROUTER
import { Router } from "express";
import portfolioRouter from "./portfolio";
import contactRouter from "./contact";

const router = Router();

router.use(portfolioRouter);
router.use("/contact", contactRouter);

export default router;
