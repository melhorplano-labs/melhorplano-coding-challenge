import { Plan } from "../../../models/plan";
import {
  allPlansMock,
  mockPlans,
  resetPlans,
} from "../../../services/planService";
import { mockServer, ServerMock } from "../../mocks/server";

describe("planRoutes", () => {
  let server: ServerMock;

  beforeAll(() => {
    server = mockServer();
  });

  beforeEach(() => {
    resetPlans();
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

  describe("GET /plans/recommended", () => {
    it("should not return data if user has not preferences", async () => {
      const response = await fetch(`${server.url}/plans/recommended`);
      const data = await response.json();

      expect(data).toEqual({
        plans: [],
        total: 0,
        totalPages: 0,
        page: 1,
        pageSize: 3,
      });
    });

    it("should not return data if user has null preferences", async () => {
      await fetch(`${server.url}/plan-preferences`, {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });

      const response = await fetch(`${server.url}/plans/recommended`);
      const data = await response.json();

      expect(data).toEqual({
        plans: [],
        total: 0,
        totalPages: 0,
        page: 1,
        pageSize: 3,
      });
    });

    it("should return plans based on user preferences", async () => {
      mockPlans([
        {
          id: 1,
          city: "City A",
          dataCap: 10,
          name: "Plan A",
          operator: "Operator A",
          price: 10,
          speed: "10Mbps",
        },
        {
          id: 2,
          city: "City B",
          dataCap: 20,
          name: "Plan B",
          operator: "Operator B",
          price: 20,
          speed: "20Mbps",
        },
        {
          id: 3,
          city: "City C",
          dataCap: 30,
          name: "Plan C",
          operator: "Operator C",
          price: 30,
          speed: "30Mbps",
        },
        {
          id: 4,
          city: "City D",
          dataCap: 40,
          name: "Plan D",
          operator: "Operator D",
          price: 40,
          speed: "40Mbps",
        },
      ]);

      const putPreferences = async (body: unknown) => {
        await fetch(`${server.url}/plan-preferences`, {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
      };

      const getRecommendedPlans = async () => {
        return (
          await fetch(`${server.url}/plans/recommended?pageSize=4`)
        ).json();
      };

      await putPreferences({ city: "City A" });
      const data1 = await getRecommendedPlans();

      await putPreferences({ city: "City A", minDataCap: 20, maxDataCap: 20 });
      const data2 = await getRecommendedPlans();

      await putPreferences({
        city: "City A",
        minDataCap: 20,
        maxDataCap: 20,
        minPrice: 30,
        maxPrice: 30,
      });
      const data3 = await getRecommendedPlans();

      await putPreferences({
        city: "City A",
        minDataCap: 20,
        maxDataCap: 20,
        minPrice: 30,
        maxPrice: 30,
        operator: "Operator D",
      });
      const data4 = await getRecommendedPlans();

      await putPreferences({
        city: "City A",
        minDataCap: 10,
        maxDataCap: 10,
        minPrice: 30,
        maxPrice: 30,
        operator: "Operator D",
      });
      const data5 = await getRecommendedPlans();

      await putPreferences({
        city: "City A",
        minDataCap: 10,
        maxDataCap: 10,
        minPrice: 10,
        maxPrice: 10,
        operator: "Operator D",
      });
      const data6 = await getRecommendedPlans();

      await putPreferences({
        city: "City A",
        minDataCap: 10,
        maxDataCap: 10,
        minPrice: 10,
        maxPrice: 10,
        operator: "Operator A",
      });
      const data7 = await getRecommendedPlans();

      expect(data1).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 93,
            preferencesMatches: {
              city: true,
              dataCap: false,
              operator: false,
              price: false,
            },
            price: 10,
            speed: "10Mbps",
          },
        ],
        total: 1,
        totalPages: 1,
      });

      expect(data2).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 70,
            preferencesMatches: {
              city: true,
              dataCap: false,
              operator: false,
              price: false,
            },
            price: 10,
            speed: "10Mbps",
          },
          {
            city: "City B",
            dataCap: 20,
            id: 2,
            name: "Plan B",
            operator: "Operator B",
            preferencesMatchRate: 70,
            preferencesMatches: {
              city: false,
              dataCap: true,
              operator: false,
              price: false,
            },
            price: 20,
            speed: "20Mbps",
          },
        ],
        total: 2,
        totalPages: 1,
      });

      expect(data3).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 48,
            preferencesMatches: {
              city: true,
              dataCap: false,
              operator: false,
              price: false,
            },
            price: 10,
            speed: "10Mbps",
          },
          {
            city: "City B",
            dataCap: 20,
            id: 2,
            name: "Plan B",
            operator: "Operator B",
            preferencesMatchRate: 48,
            preferencesMatches: {
              city: false,
              dataCap: true,
              operator: false,
              price: false,
            },
            price: 20,
            speed: "20Mbps",
          },
          {
            city: "City C",
            dataCap: 30,
            id: 3,
            name: "Plan C",
            operator: "Operator C",
            preferencesMatchRate: 48,
            preferencesMatches: {
              city: false,
              dataCap: false,
              operator: false,
              price: true,
            },
            price: 30,
            speed: "30Mbps",
          },
        ],
        total: 3,
        totalPages: 1,
      });

      expect(data4).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: true,
              dataCap: false,
              operator: false,
              price: false,
            },
            price: 10,
            speed: "10Mbps",
          },
          {
            city: "City B",
            dataCap: 20,
            id: 2,
            name: "Plan B",
            operator: "Operator B",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: false,
              dataCap: true,
              operator: false,
              price: false,
            },
            price: 20,
            speed: "20Mbps",
          },
          {
            city: "City C",
            dataCap: 30,
            id: 3,
            name: "Plan C",
            operator: "Operator C",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: false,
              dataCap: false,
              operator: false,
              price: true,
            },
            price: 30,
            speed: "30Mbps",
          },
          {
            city: "City D",
            dataCap: 40,
            id: 4,
            name: "Plan D",
            operator: "Operator D",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: false,
              dataCap: false,
              operator: true,
              price: false,
            },
            price: 40,
            speed: "40Mbps",
          },
        ],
        total: 4,
        totalPages: 1,
      });

      expect(data5).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 50,
            preferencesMatches: {
              city: true,
              dataCap: true,
              operator: false,
              price: false,
            },
            price: 10,
            speed: "10Mbps",
          },
          {
            city: "City C",
            dataCap: 30,
            id: 3,
            name: "Plan C",
            operator: "Operator C",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: false,
              dataCap: false,
              operator: false,
              price: true,
            },
            price: 30,
            speed: "30Mbps",
          },
          {
            city: "City D",
            dataCap: 40,
            id: 4,
            name: "Plan D",
            operator: "Operator D",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: false,
              dataCap: false,
              operator: true,
              price: false,
            },
            price: 40,
            speed: "40Mbps",
          },
        ],
        total: 3,
        totalPages: 1,
      });

      expect(data6).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 75,
            preferencesMatches: {
              city: true,
              dataCap: true,
              operator: false,
              price: true,
            },
            price: 10,
            speed: "10Mbps",
          },
          {
            city: "City D",
            dataCap: 40,
            id: 4,
            name: "Plan D",
            operator: "Operator D",
            preferencesMatchRate: 25,
            preferencesMatches: {
              city: false,
              dataCap: false,
              operator: true,
              price: false,
            },
            price: 40,
            speed: "40Mbps",
          },
        ],
        total: 2,
        totalPages: 1,
      });

      expect(data7).toEqual({
        page: 1,
        pageSize: 4,
        plans: [
          {
            city: "City A",
            dataCap: 10,
            id: 1,
            name: "Plan A",
            operator: "Operator A",
            preferencesMatchRate: 100,
            preferencesMatches: {
              city: true,
              dataCap: true,
              operator: true,
              price: true,
            },
            price: 10,
            speed: "10Mbps",
          },
        ],
        total: 1,
        totalPages: 1,
      });
    });
  });
});
