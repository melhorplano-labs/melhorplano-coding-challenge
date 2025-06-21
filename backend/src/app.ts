import cors from "cors";
import express from "express";
import { PlanController } from "./contracts/controllers/planController";
import planPreferencesRoutes from "./routes/planPreferencesRoutes";
import { createPlanRoutes } from "./routes/planRoutes";

export const createApp = (planController: PlanController) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/plans", createPlanRoutes(planController));
  app.use("/plan-preferences", planPreferencesRoutes);

  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
};
