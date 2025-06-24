import { Router } from "express";
import {
  allPlans,
  planRecommend,
  planSearch,
} from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/search", planSearch);
router.post("/recommend", planRecommend);

export default router;
