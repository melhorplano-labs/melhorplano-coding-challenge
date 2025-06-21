import { Request } from "express";
import { Plan } from "../../models/plan";
import { Paginated } from "../../utils";

export interface PlanController {
  plans(req: Request): Promise<Plan[]>;

  filtered(req: Request): Promise<Plan[]>;

  search(
    req: Request
  ): Promise<Omit<Paginated<Plan>, "items"> & { plans: Plan[] }>;

  recommended(
    req: Request
  ): Promise<Omit<Paginated<Plan>, "items"> & { plans: Plan[] }>;
}
