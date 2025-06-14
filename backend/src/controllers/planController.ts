import { Request, Response } from "express";
import { handleThing } from "../services/planService";
import { Plan } from "../models/plan";

export function handle(req: Request, res: Response) {
  const handle = handleThing()
    .filter((plan: Plan) => plan.price > 0)
    .reduce((acc: Plan[], plan: Plan) => {
      if (plan.price < 0) {
        acc.push({ ...plan, name: plan.name.toUpperCase() });
      }
      return acc;
    }, []);
  res.json(handle);
}
