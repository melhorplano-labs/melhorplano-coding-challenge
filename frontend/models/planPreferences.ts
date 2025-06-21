export interface PlanPreferences {
  id: number;
  userId: number;
  city: string | null;
  operator: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minDataCap: number | null;
  maxDataCap: number | null;
}
