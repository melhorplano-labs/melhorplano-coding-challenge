import { Router } from "express";
import { allPlans, filteredPlans } from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/filtered", filteredPlans);

export default router;
