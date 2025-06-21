import { PlanPreferences } from "../../models/planPreferences";

export interface PlanPreferencesService {
  createOrUpdatePreferences(
    userId: number,
    preferences: Omit<PlanPreferences, "id" | "userId">
  ): Promise<PlanPreferences>;

  findPreferences(userId: number): Promise<PlanPreferences | null>;
}
