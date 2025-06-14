import { Request, Response } from "express";
import { getPlans, handleThing } from "../services/planService";
import { Plan } from "../models/plan";

export function allPlans(req: Request, res: Response) {
  const plans = getPlans()
    .filter((plan: Plan) => plan.price > 0)
    .reduce((acc: Plan[], plan: Plan) => {
      if (plan.price < 0) {
        acc.push({ ...plan, name: plan.name.toUpperCase() });
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
