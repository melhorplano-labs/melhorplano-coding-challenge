import { getSpeedInMbps } from "../../src/models/plan";
import {
  PlanRankingPreferences,
  rankPlans,
  searchPlans,
} from "../../src/services/planService";
import { describe, it, expect } from "@jest/globals";

describe("searchPlans", () => {
  it("should return sorted plans based on ascending price", () => {
    for (let page = 1; page < 5; page++) {
      const results = searchPlans({}, page);
      for (let i = 1; i < results.plans.length; i++) {
        expect(results.plans[i - 1].price).toBeLessThanOrEqual(
          results.plans[i].price,
        );
      }
    }
  });
});

describe("rankPlans", () => {
  it("should prioritize the user's input city, even when it does not meet the budget requirement", () => {
    const preferences = {
      city: "Campinas", // This plan costs 109.90
      budget: 65, // There are other plans that better fit this budget
    };

    const results = rankPlans(preferences, 1, 2);
    const [campinasResult, ribeiraoPretoResult] = results.rankedPlans;

    expect(campinasResult.plan.name).toEqual("Vivo Turbo");
    expect(campinasResult.plan.city).toEqual("Campinas");
    expect(campinasResult.plan.price).toEqual(109.9);

    expect(ribeiraoPretoResult.plan.name).toEqual("Vivo Light");
    expect(ribeiraoPretoResult.plan.city).toEqual("Ribeirão Preto");
    expect(ribeiraoPretoResult.plan.price).toEqual(64.9);
  });

  it("should prioritize plans with the closest data cap and speed to the selected profile", () => {
    const preferences = {
      profile: "Conversação",
    };

    const results = rankPlans(preferences, 1, 10);
    const economicResult = results.rankedPlans[0];

    expect(economicResult.plan.name).toEqual("Plano Econômico");
    expect(economicResult.plan.city).toEqual("Recife");
    expect(economicResult.plan.dataCap).toEqual(100);
    expect(economicResult.plan.speed).toEqual("50Mbps");

    for (let i = 1; i < results.rankedPlans.length; i++) {
      const prev = results.rankedPlans[i - 1].plan;
      const next = results.rankedPlans[i].plan;
      expect(prev.dataCap).toBeLessThanOrEqual(next.dataCap);
      expect(getSpeedInMbps(prev)).toBeLessThanOrEqual(getSpeedInMbps(next));
    }
  });
});
