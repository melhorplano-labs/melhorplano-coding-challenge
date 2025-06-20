export interface PlanPreferences {
  id: number;
  userId: number;
  minPrice: number | null;
  maxPrice: number | null;
  minDataCap: number | null;
  maxDataCap: number | null;
  operator: string | null;
  city: string | null;
}

/**
 * Indica quais propriedades de um plano são consideradas pelas preferências
 */
export type PlanPreferencesFields = "city" | "operator" | "dataCap" | "price";
