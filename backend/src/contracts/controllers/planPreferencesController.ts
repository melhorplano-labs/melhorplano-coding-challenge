import { Request } from "express";
import { PlanPreferences } from "../../models/planPreferences";

export interface PlanPreferencesController {
  put(req: Request): Promise<PlanPreferences>;

  get(req: Request): Promise<PlanPreferences | null>;
}
