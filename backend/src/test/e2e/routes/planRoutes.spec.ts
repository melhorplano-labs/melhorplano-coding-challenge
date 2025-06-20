import { Plan } from "../../../models/plan";
import { allPlansMock } from "../../../services/planService";
import { mockServer, ServerMock } from "../../mocks/server";

describe("planRoutes", () => {
  let server: ServerMock;

  beforeAll(() => {
    server = mockServer();
  });

  afterAll(async () => {
    await server.close();
  });

  describe("GET /plans/search", () => {
    const searchAllPlans = async (filter: Record<string, string>) => {
      let page = 1;
      let totalPages: number;
      const plans: Plan[] = [];

      do {
        const url = new URL(`${server.url}/plans/search`);

        Object.entries(filter).forEach((entry) =>
          url.searchParams.set(...entry)
        );
        url.searchParams.set("page", String(page));

        const response = await fetch(url);
        const data = (await response.json()) as {
          page: number;
          plans: Plan[];
          totalPages: number;
        };

        plans.push(...data.plans);

        page += 1;
        totalPages = data.totalPages;
      } while (totalPages >= page);

      return plans;
    };

    it("should not duplicate results when paginating with filters", async () => {
      const plans = await searchAllPlans({
        operator: "Vivo",
        city: "São Paulo",
      });

      const planIds = plans.map((plan) => plan.id);
      const uniquePlanIds = new Set(planIds);
      const hasDuplicatedPlans = planIds.length !== uniquePlanIds.size;

      const filteredPlansMock = allPlansMock.filter(
        (plan) => plan.operator === "Vivo" && plan.city === "São Paulo"
      );

      expect(hasDuplicatedPlans).toBe(false);
      expect(filteredPlansMock.length).toBe(plans.length);
    });

    it("should obtain the plans in ascending order", async () => {
      const plans = await searchAllPlans({
        operator: "Vivo",
        city: "São Paulo",
      });

      const isInAscendingOrder = plans.every((plan, index) => {
        const nextPlans = plans.slice(index + 1);
        const nextPlansMinimumPrice = Math.min(
          ...nextPlans.map((plan) => plan.price)
        );
        return plan.price <= nextPlansMinimumPrice;
      });

      expect(plans.length).toBeGreaterThan(1);
      expect(isInAscendingOrder).toBe(true);
    });
  });
});
