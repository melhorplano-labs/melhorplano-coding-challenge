export interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  operator: string;
  city: string;
  dataCap: number; // franquia em GB
}

export function getSpeedInMbps(plan: Plan): number {
  if (!plan.speed) return 0;
  const lower = plan.speed.toLowerCase().trim();
  if (lower.endsWith("gbps")) {
    return parseFloat(lower) * 1000;
  } else if (lower.endsWith("mbps")) {
    return parseFloat(lower);
  }
  return parseFloat(lower) * 0.001; // implicit kBps
}
