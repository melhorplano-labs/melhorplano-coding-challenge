import { Request, Response } from "express";
import { getAllPlans, setPlanHighlight } from "../services/planService";

export function getPlans(req: Request, res: Response) {
  const plans = getAllPlans();
  res.json(plans);
}

export function highlightPlan(req: Request, res: Response) {
  const id = Number(req.params.id);
  const plan = setPlanHighlight(id, true);
  if (plan) {
    res.json(plan);
  } else {
    res.status(404).json({ message: "Plano não encontrado" });
  }
}
