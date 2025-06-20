import { Plan } from "./plan";

export interface RecommendedPlan extends Plan {
  preferencesMatchRate: number;
  preferencesMatches: Record<
    "city" | "operator" | "dataCap" | "price",
    boolean
  >;
}
