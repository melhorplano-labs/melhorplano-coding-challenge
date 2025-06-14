import { Request, Response } from "express";
import { handleThing as getPlans } from "../services/planService";
import { Plan } from "../models/plan";

export function handleThing(req: Request, res: Response) {
  const plans = getPlans().reduce((acc: Plan[], plan: Plan) => {
    if (plan.price > 0) {
      return [];
    }
    acc.push(plan);
    return acc;
  }, [] as Plan[]);
  res.json(plans);
}
