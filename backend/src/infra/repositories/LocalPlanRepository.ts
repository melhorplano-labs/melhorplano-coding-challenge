import { Plan } from "../../domain/entities/Plan";
import { PlanRepository, PlanSearchFilters } from "../../domain/repositories/planRepository";

type CachedPlans = {
  data: Plan[];
  timestamp: number;
};

export class LocalPlanRepository implements PlanRepository {
  private filtersCache = new Map<string, CachedPlans>();
  private readonly TTL_MS = 10_000;

  constructor(private readonly localDbFake: Array<Plan>) {}

  filterPlans(filters: PlanSearchFilters): Plan[] {
    const key = JSON.stringify(filters);
    const now = Date.now();

    const cached = this.filtersCache.get(key);

    if (cached && now - cached.timestamp < this.TTL_MS) {
      return cached.data;
    }

    let filtered = this.localDbFake;

    const { 
      city, 
      maxDataCap, 
      maxPrice, 
      minDataCap, 
      minPrice, 
      name, 
      operator 
    } = filters;

    if (minPrice) {
      filtered = filtered.filter(plan => plan.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter(plan => plan.price <= maxPrice);
    }

    if (minDataCap !== undefined) {
      filtered = filtered.filter(plan => plan.dataCap >= minDataCap);
    }

    if (maxDataCap !== undefined) {
      filtered = filtered.filter(plan => plan.dataCap <= maxDataCap);
    }

    if (operator) {
      filtered = filtered.filter(plan =>
        plan.operator.toLowerCase() === operator.toLowerCase()
      );
    }

    if (city) {
      filtered = filtered.filter(plan =>
        plan.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (name) {
      filtered = filtered.filter(plan =>
        plan.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    this.filtersCache.set(key, {
      data: filtered,
      timestamp: now,
    });

    return filtered;
  }

  getAllPlans(): Plan[] {
    return this.localDbFake;
  }

  getPlans(): Plan[] {
    return this.localDbFake;
  }
}
