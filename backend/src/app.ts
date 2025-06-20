import cors from "cors";
import express from "express";
import planPreferencesRoutes from "./routes/planPreferencesRoutes";
import planRoutes from "./routes/planRoutes";

export const makeApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/plans", planRoutes);
  app.use("/plan-preferences", planPreferencesRoutes);

  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
};
