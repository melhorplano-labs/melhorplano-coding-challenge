import { Request, Response } from "express";
import { PlanPreferences } from "../models/planPreferences";
import {
  createOrUpdatePreferences,
  findPreferences,
} from "../services/planPreferencesService";

export async function putPreferences(req: Request, res: Response) {
  // TODO: get authenticated user
  const userId = 1;

  const { body } = req;

  const data = {
    city: body.city ? String(body.city) : null,
    operator: body.operator ? String(body.operator) : null,
    minPrice: body.minPrice ? Number(body.minPrice) : null,
    maxPrice: body.maxPrice ? Number(body.maxPrice) : null,
    minDataCap: body.minDataCap ? Number(body.minDataCap) : null,
    maxDataCap: body.maxDataCap ? Number(body.maxDataCap) : null,
  } satisfies Omit<PlanPreferences, "id" | "userId">;

  const preferences = await createOrUpdatePreferences(userId, data);
  res.json(preferences);
}

export async function getPreferences(req: Request, res: Response) {
  // TODO: get authenticated user
  const userId = 1;
  const preferences = await findPreferences(userId);
  res.json(preferences);
}
