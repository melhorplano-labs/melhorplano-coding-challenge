import cors from "cors";
import express from "express";
import { PlanController } from "./contracts/controllers/planController";
import { PlanPreferencesController } from "./contracts/controllers/planPreferencesController";
import { createPlanPreferencesRoutes } from "./routes/planPreferencesRoutes";
import { createPlanRoutes } from "./routes/planRoutes";

export const createApp = (
  planController: PlanController,
  planPreferencesController: PlanPreferencesController
) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/plans", createPlanRoutes(planController));
  app.use(
    "/plan-preferences",
    createPlanPreferencesRoutes(planPreferencesController)
  );

  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
};
