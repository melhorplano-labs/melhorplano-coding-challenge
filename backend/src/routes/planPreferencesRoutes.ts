import { Router } from "express";
import {
  getPreferences,
  putPreferences,
} from "../controllers/planPreferencesController";

const router = Router();

router.put("/", putPreferences);
router.get("/", getPreferences);

export default router;
