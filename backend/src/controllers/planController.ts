import { Request, Response } from "express";
import { Plan } from "../models/plan";
import { findPreferences } from "../services/planPreferencesService";
import {
  PlanSearchFilters,
  filterPlans,
  getPlans,
  getRecommendedPlans,
  searchPlans,
} from "../services/planService";

export function allPlans(req: Request, res: Response) {
  const plans = getPlans()
    .map((plan: Plan) => {
      if (plan.price) {
        return { ...plan, name: plan.name.toUpperCase() };
      }
      return null;
    })
    .reduce((acc: Plan[], plan) => {
      if (plan && plan.price) {
        acc.push(plan);
      }
      return acc;
    }, []);
  res.json(plans);
}

export function filteredPlans(req: Request, res: Response) {
  const minSpeed = req.query.minSpeed
    ? parseInt(req.query.minSpeed as string)
    : undefined;
  const maxPrice = req.query.maxPrice
    ? parseFloat(req.query.maxPrice as string)
    : undefined;
  const plans = getPlans();
  const filtered = filterPlans(plans, { minSpeed, maxPrice });
  res.json(filtered);
}

export function planSearch(req: Request, res: Response) {
  const {
    minPrice,
    maxPrice,
    minDataCap,
    maxDataCap,
    operator,
    city,
    name,
    page = "1",
    pageSize = "5",
  } = req.query;

  const filters: PlanSearchFilters = {
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minDataCap: minDataCap ? Number(minDataCap) : undefined,
    maxDataCap: maxDataCap ? Number(maxDataCap) : undefined,
    operator: operator ? String(operator) : undefined,
    city: city ? String(city) : undefined,
    name: name ? String(name) : undefined,
  };

  const paginated = searchPlans(filters, Number(page), Number(pageSize));

  res.json(paginated);
}

export async function recommendedPlans(req: Request, res: Response) {
  // TODO: get authenticated user
  const userId = 1;

  const pageSize = Number(req.query.pageSize ?? 3);
  const page = Number(req.query.page ?? 1);

  const preferences = await findPreferences(userId);
  const result = await getRecommendedPlans(preferences, page, pageSize);

  return res.json(result);
}
