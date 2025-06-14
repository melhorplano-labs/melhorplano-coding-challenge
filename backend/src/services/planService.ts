import { Plan } from "../models/plan";

const list: Plan[] = [
  { id: 1, name: "Plano Básico", speed: "100Mbps", price: 79.9 },
  { id: 2, name: "Plano Intermediário", speed: "300Mbps", price: 99.9 },
  { id: 3, name: "Plano Premium", speed: "600Mbps", price: 149.9 },
];

export function handleThing(): Plan[] {
  return list.sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));
}
