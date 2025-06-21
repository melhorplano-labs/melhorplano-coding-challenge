import { PlanController } from "../contracts/controllers/planController";
import { PlanPreferencesService } from "../contracts/services/planPreferencesService";
import { PlanFilter, PlanService } from "../contracts/services/planService";

export function createPlanController(
  planService: PlanService,
  planPreferencesService: PlanPreferencesService
): PlanController {
  return {
    async plans(_req) {
      const result = await planService.findPlans({
        pageSize: Infinity,
      });

      return result.items
        .filter((plan) => !!plan.price)
        .map((plan) => ({ ...plan, name: plan.name.toUpperCase() }));
    },

    async filtered(req) {
      const { minSpeed, maxPrice } = req.query;

      const filter: PlanFilter = {
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minSpeed: minSpeed ? Number(minSpeed) : undefined,
      };

      const { items: plans } = await planService.findPlans({
        filter,
        pageSize: Infinity,
      });

      return plans;
    },

    async search(req) {
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

      const filter: PlanFilter = {
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minDataCap: minDataCap ? Number(minDataCap) : undefined,
        maxDataCap: maxDataCap ? Number(maxDataCap) : undefined,
        operator: operator ? String(operator) : undefined,
        city: city ? String(city) : undefined,
        name: name ? String(name) : undefined,
      };

      const result = await planService.findPlans({
        filter,
        page: Number(page),
        pageSize: Number(pageSize),
      });

      return { ...result, plans: result.items, items: undefined };
    },

    async recommended(req) {
      // TODO: get authenticated user
      const userId = 1;

      const pageSize = Number(req.query.pageSize ?? 3);
      const page = Number(req.query.page ?? 1);

      const preferences = await planPreferencesService.findPreferences(userId);
      const result = await planService.findRecommendedPlans({
        preferences,
        page,
        pageSize,
      });

      return { ...result, plans: result.items, items: undefined };
    },
  };
}
