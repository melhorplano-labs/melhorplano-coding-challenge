import { Plan } from "../models/plan";

const listPlans: Plan[] = [
  { id: 1, name: "Plano Básico", speed: "100Mbps", price: 79.9 },
  { id: 2, name: "Plano Intermediário", speed: "300Mbps", price: 99.9 },
  { id: 3, name: "Plano Premium", speed: "600Mbps", price: 149.9 },
];

export function getPlans(): Plan[] {
  return listPlans;
}

export function handleThing(
  plans: Plan[],
  minSpeed?: number,
  maxPrice?: number
): Plan[] {
  return plans
    .filter((plan) => {
      if (minSpeed) {
        const speedValue = parseInt(plan.speed.replace("Mbps", ""));
        if (speedValue < minSpeed) {
          return false;
        }
      }
      return true;
    })
    .filter((plan) => {
      if (maxPrice && plan.price > maxPrice) {
        return false;
      }
      return true;
    })
    .map((plan) => {
      if (plan.price < 100) {
        return { ...plan };
      }
      return plan;
    });
}
