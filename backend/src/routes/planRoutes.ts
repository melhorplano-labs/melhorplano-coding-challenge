import { Router } from "express";
import {
  allPlans,
  filteredPlans,
  planSearch,
  recommendedPlans,
} from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/filtered", filteredPlans);
router.get("/search", planSearch);
router.get("/recommended", recommendedPlans);

export default router;
