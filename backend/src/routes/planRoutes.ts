import { Router } from "express";
import {
  allPlans,
  filteredPlans,
  planSearch,
} from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/filtered", filteredPlans);
router.get("/search", planSearch);

export default router;
