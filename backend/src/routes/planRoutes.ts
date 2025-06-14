import { Router } from "express";
import { handleThing } from "../controllers/planController";

const router = Router();

router.get("/", handleThing);

export default router;
