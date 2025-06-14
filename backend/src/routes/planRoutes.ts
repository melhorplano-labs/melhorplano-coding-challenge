import { Router } from "express";
import { handle } from "../controllers/planController";

const router = Router();

router.get("/", handle);

export default router;
