import request from 'supertest';
import express from "express";
import plansRouter from "../../routes/planRoutes";
import { readFileSync } from 'fs';
import path from 'path';

describe("Plans Router", () => {
  const app = express();
  app.use(express.json());
  app.use("/plans", plansRouter);

  const recommendStatus200Result = JSON.parse(
    readFileSync(path.join(__dirname, 'assets/recommedSuccessResults.json'), 'utf-8')
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /plans/recommend should return recommended plans based on valid preferences", async () => {
    const validPreferences = {
      city: "São Paulo",
      budget: 100,
      usageProfile: "light",
      preferredOperator: "Vivo",
    };

    const response = await request(app)
      .post("/plans/recommend")
      .send(validPreferences)
      .expect(200);

    expect(response.body).toEqual(recommendStatus200Result);
    expect(response.body.recommendedPlans.length).toBeGreaterThan(0);
    expect(response.body.topRecommendation).not.toBeNull();
  });
});
