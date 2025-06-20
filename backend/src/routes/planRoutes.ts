import { Router } from "express";
import {
  allPlans,
  filteredPlans,
  planSearch,
  recommendPlansHandler
} from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/filtered", filteredPlans);
router.get("/search", planSearch);
router.post("/recommend", recommendPlansHandler);

export default router;
