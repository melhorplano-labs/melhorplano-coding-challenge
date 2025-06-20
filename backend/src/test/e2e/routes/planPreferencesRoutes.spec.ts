import { clearAllPreferencesMock } from "../../../services/planPreferencesService";
import { mockServer, ServerMock } from "../../mocks/server";

describe("planPreferencesRoutes", () => {
  let server: ServerMock;

  beforeAll(() => {
    server = mockServer();
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    clearAllPreferencesMock();
  });

  const input = {
    city: "São Paulo",
    maxDataCap: 1,
    maxPrice: 2,
    minDataCap: 3,
    minPrice: 4,
    operator: "Vivo",
  };

  const putRequestInit = {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  };

  describe("PUT /plan-preferences", () => {
    it("should create preferences if not exists", async () => {
      const response = await fetch(
        `${server.url}/plan-preferences`,
        putRequestInit
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        id: 1,
        userId: 1,
        ...input,
      });
    });

    it("should update existing preferences if already exists", async () => {
      await fetch(`${server.url}/plan-preferences`, putRequestInit);
      const response = await fetch(
        `${server.url}/plan-preferences`,
        putRequestInit
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        id: 1,
        userId: 1,
        ...input,
      });
    });

    it("should set missing fields as null", async () => {
      const response = await fetch(`${server.url}/plan-preferences`, {
        ...putRequestInit,
        body: JSON.stringify({}),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        id: 1,
        userId: 1,
        city: null,
        operator: null,
        minPrice: null,
        maxPrice: null,
        minDataCap: null,
        maxDataCap: null,
      });
    });
  });

  describe("GET /plan-preferences", () => {
    it("should return null if not exists", async () => {
      const response = await fetch(`${server.url}/plan-preferences`);
      const data = await response.json();

      expect(data).toBeNull();
    });

    it("should return user plan preferences", async () => {
      await fetch(`${server.url}/plan-preferences`, putRequestInit);

      const response = await fetch(`${server.url}/plan-preferences`);
      const data = await response.json();

      expect(data).toEqual({ id: 1, userId: 1, ...input });
    });
  });
});
