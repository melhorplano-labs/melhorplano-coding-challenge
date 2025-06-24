import { Router } from "express";
import { allProfiles } from "../controllers/profileController";

const router = Router();

router.get("/", allProfiles);

export default router;
