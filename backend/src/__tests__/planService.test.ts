import {PlanRecommendationPreferences, recommendPlans} from '../services/planService'

describe("recommendPlans", () => {
  test("should return plans for a given city with correct scores", () => {
    const preferences: PlanRecommendationPreferences = {
      city: "São Paulo",
      budget: 100,
      usageProfile: "light",
      preferredOperator: "Vivo",
    };

    const result = recommendPlans(preferences, 3);

    expect(result.recommendedPlans.length).toBeGreaterThan(0);
    expect(result.topRecommendation).not.toBeNull();
    expect(result.recommendedPlans[0].plan.city.toLowerCase()).toBe("são paulo");

    expect(result.recommendedPlans[0].score).toBeGreaterThanOrEqual(
      result.recommendedPlans[1]?.score || 0
    );
  });
});