import { Plan } from "../entities/Plan"

export interface PlanSearchFilters {
  minPrice?: number;
  maxPrice?: number;
  minDataCap?: number;
  maxDataCap?: number;
  operator?: string;
  city?: string;
  name?: string;
}

export interface PlanRepository {
  getPlans(): Plan[] 
  getAllPlans(): Plan[]
  filterPlans(filters: PlanSearchFilters): Plan[]
}