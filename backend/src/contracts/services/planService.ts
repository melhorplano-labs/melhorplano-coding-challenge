import { Plan } from "../../models/plan";
import { PlanPreferences } from "../../models/planPreferences";
import { RecommendedPlan } from "../../models/recommendedPlan";
import { Paginated } from "../../utils";

export interface PlanFilter {
  minPrice?: number;
  maxPrice?: number;
  minDataCap?: number;
  maxDataCap?: number;
  operator?: string;
  city?: string;
  name?: string;
  minSpeed?: number;
}

export interface PlanService {
  findPlans(args: {
    filter?: PlanFilter;

    /**
     * @default 1
     */
    page?: number;

    /**
     * @default 5
     */
    pageSize?: number;
  }): Promise<Paginated<Plan>>;

  findRecommendedPlans(args: {
    preferences: PlanPreferences | null;

    /** @default 1 */
    page?: number;

    /** @default 3 */
    pageSize?: number;
  }): Promise<Paginated<RecommendedPlan>>;
}
