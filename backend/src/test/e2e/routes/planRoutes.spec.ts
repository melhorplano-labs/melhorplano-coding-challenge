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
      expect(plans).toEqual([
        {
          city: "São Paulo",
          dataCap: 120,
          id: 19,
          name: "Vivo Light 60",
          operator: "Vivo",
          price: 59.9,
          speed: "60Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 200,
          id: 1,
          name: "Plano Básico",
          operator: "Vivo",
          price: 79.9,
          speed: "100Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 220,
          id: 16,
          name: "Vivo Conecta+",
          operator: "Vivo",
          price: 89.9,
          speed: "120Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 700,
          id: 17,
          name: "Vivo Família 400",
          operator: "Vivo",
          price: 129.9,
          speed: "400Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 900,
          id: 14,
          name: "Vivo Família Plus",
          operator: "Vivo",
          price: 139.9,
          speed: "600Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 1200,
          id: 12,
          name: "Vivo Max",
          operator: "Vivo",
          price: 179.9,
          speed: "800Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 1400,
          id: 20,
          name: "Vivo Max 900",
          operator: "Vivo",
          price: 189.9,
          speed: "900Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 2200,
          id: 18,
          name: "Vivo Ultra 2Gbps",
          operator: "Vivo",
          price: 299.9,
          speed: "2Gbps",
        },
      ]);
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
      expect(plans).toEqual([
        {
          city: "São Paulo",
          dataCap: 120,
          id: 19,
          name: "Vivo Light 60",
          operator: "Vivo",
          price: 59.9,
          speed: "60Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 200,
          id: 1,
          name: "Plano Básico",
          operator: "Vivo",
          price: 79.9,
          speed: "100Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 220,
          id: 16,
          name: "Vivo Conecta+",
          operator: "Vivo",
          price: 89.9,
          speed: "120Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 700,
          id: 17,
          name: "Vivo Família 400",
          operator: "Vivo",
          price: 129.9,
          speed: "400Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 900,
          id: 14,
          name: "Vivo Família Plus",
          operator: "Vivo",
          price: 139.9,
          speed: "600Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 1200,
          id: 12,
          name: "Vivo Max",
          operator: "Vivo",
          price: 179.9,
          speed: "800Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 1400,
          id: 20,
          name: "Vivo Max 900",
          operator: "Vivo",
          price: 189.9,
          speed: "900Mbps",
        },
        {
          city: "São Paulo",
          dataCap: 2200,
          id: 18,
          name: "Vivo Ultra 2Gbps",
          operator: "Vivo",
          price: 299.9,
          speed: "2Gbps",
        },
      ]);
    });
  });
});
