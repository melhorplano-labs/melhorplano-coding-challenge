import { Request, Response } from "express";
import {
  getPlans,
  rankPlans,
  searchPlans,
  PlanSearchFilters,
  PlanRankingPreferences,
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

interface PlanRecommendRequest extends Request {
  body: {
    preferences: PlanRankingPreferences;
    page?: number | undefined;
    pageSize?: number | undefined;
  };
}

export function planRecommend(req: PlanRecommendRequest, res: Response) {
  let rankedPlans = rankPlans(
    req.body.preferences,
    req.body.page,
    req.body.pageSize,
  );
  res.json(rankedPlans);
}
