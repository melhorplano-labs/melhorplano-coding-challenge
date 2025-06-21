import { Router } from "express";
import { createRoute } from "../adapters";
import { PlanController } from "../contracts/controllers/planController";

export const createPlanRoutes = (controller: PlanController) => {
  const router = Router();

  router.get("/", createRoute(controller.plans));
  router.get("/filtered", createRoute(controller.filtered));
  router.get("/search", createRoute(controller.search));
  router.get("/recommended", createRoute(controller.recommended));

  return router;
};
