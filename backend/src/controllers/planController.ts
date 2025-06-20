import { Request, Response } from "express";
import {
  getPlans,
  handleThing,
  searchPlans,
  recommendPlans,
  PlanSearchFilters,
  PlanRecommendationResult,
  PlanRecommendationPreferences,
} from "../services/planService";
import { Plan } from "../models/plan";

export function allPlans(req: Request, res: Response) {
  const plans = getPlans()
    .map((plan: Plan) => {
      if (plan.price) {
        return { ...plan, name: plan.name.toUpperCase() };
      }
      return null;
    })
    .reduce((acc: Plan[], plan) => {
      if (plan && !plan.price) {
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
  const filtered = handleThing(plans, minSpeed, maxPrice);
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

export function recommendPlansHandler(req: Request, res: Response) {
  try {
    const preferences: PlanRecommendationPreferences = req.body;
    if (!preferences.city) {
      res.status(400).json({ error: "City is a required field" });
      return;
    }
    const result: PlanRecommendationResult = recommendPlans(preferences);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
