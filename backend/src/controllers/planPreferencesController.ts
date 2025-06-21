import { PlanPreferencesController } from "../contracts/controllers/planPreferencesController";
import { PlanPreferencesService } from "../contracts/services/planPreferencesService";
import { PlanPreferences } from "../models/planPreferences";

export function createPlanPreferencesController(
  planPreferencesService: PlanPreferencesService
): PlanPreferencesController {
  return {
    async put(req) {
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

      const preferences =
        await planPreferencesService.createOrUpdatePreferences(userId, data);

      return preferences;
    },

    async get() {
      // TODO: get authenticated user
      const userId = 1;
      const preferences = await planPreferencesService.findPreferences(userId);
      return preferences;
    },
  };
}
