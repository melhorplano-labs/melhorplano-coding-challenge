import { Router } from "express";
import {
  allPlans,
  filteredPlans,
  planRecommend,
  planSearch,
} from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/filtered", filteredPlans);
router.get("/search", planSearch);
router.post("/recommend", planRecommend);

export default router;
