import { Router } from "express";
import { createRoute } from "../adapters";
import { PlanPreferencesController } from "../contracts/controllers/planPreferencesController";

export const createPlanPreferencesRoutes = (
  controller: PlanPreferencesController
) => {
  const router = Router();

  router.put("/", createRoute(controller.put));
  router.get("/", createRoute(controller.get));

  return router;
};
