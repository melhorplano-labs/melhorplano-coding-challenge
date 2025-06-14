import { Router } from "express";
import { getPlans, highlightPlan } from "../controllers/planController";

const router = Router();

router.get("/", getPlans);
router.patch(":id/highlight", highlightPlan);

export default router;
