import { Plan } from "./plan";
import { PlanPreferencesFields } from "./planPreferences";

export type PreferencesMatches = Record<PlanPreferencesFields, boolean>;

export interface RecommendedPlan extends Plan {
  preferencesMatchRate: number;
  preferencesMatches: PreferencesMatches;
}
