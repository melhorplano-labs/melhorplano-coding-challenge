import { Plan } from "../models/plan";
import {
  PlanPreferences,
  PlanPreferencesFields,
} from "../models/planPreferences";

const defaultPlansMock = [
  {
    id: 1,
    name: "Plano Básico",
    speed: "100Mbps",
    price: 79.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 200,
  },
  {
    id: 2,
    name: "Plano Intermediário",
    speed: "300Mbps",
    price: 99.9,
    operator: "Claro",
    city: "Rio de Janeiro",
    dataCap: 400,
  },
  {
    id: 3,
    name: "Plano Premium",
    speed: "600Mbps",
    price: 149.9,
    operator: "TIM",
    city: "Belo Horizonte",
    dataCap: 800,
  },
  {
    id: 4,
    name: "Plano Família",
    speed: "500Mbps",
    price: 129.9,
    operator: "Vivo",
    city: "Curitiba",
    dataCap: 600,
  },
  {
    id: 5,
    name: "Plano Ultra",
    speed: "1Gbps",
    price: 199.9,
    operator: "Claro",
    city: "São Paulo",
    dataCap: 1000,
  },
  {
    id: 6,
    name: "Plano Econômico",
    speed: "50Mbps",
    price: 59.9,
    operator: "Oi",
    city: "Recife",
    dataCap: 100,
  },
  {
    id: 7,
    name: "Plano Regional",
    speed: "200Mbps",
    price: 89.9,
    operator: "TIM",
    city: "Porto Alegre",
    dataCap: 300,
  },
  {
    id: 8,
    name: "Plano Flex",
    speed: "400Mbps",
    price: 109.9,
    operator: "Vivo",
    city: "Salvador",
    dataCap: 500,
  },
  {
    id: 9,
    name: "Plano Jovem",
    speed: "150Mbps",
    price: 69.9,
    operator: "Claro",
    city: "Fortaleza",
    dataCap: 250,
  },
  {
    id: 10,
    name: "Plano Top",
    speed: "2Gbps",
    price: 299.9,
    operator: "TIM",
    city: "Brasília",
    dataCap: 2000,
  },
  {
    id: 11,
    name: "Vivo Turbo",
    speed: "250Mbps",
    price: 109.9,
    operator: "Vivo",
    city: "Campinas",
    dataCap: 350,
  },
  {
    id: 12,
    name: "Vivo Max",
    speed: "800Mbps",
    price: 179.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 1200,
  },
  {
    id: 13,
    name: "Vivo Light",
    speed: "70Mbps",
    price: 64.9,
    operator: "Vivo",
    city: "Ribeirão Preto",
    dataCap: 150,
  },
  {
    id: 14,
    name: "Vivo Família Plus",
    speed: "600Mbps",
    price: 139.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 900,
  },
  {
    id: 15,
    name: "Vivo Ultra HD",
    speed: "1.5Gbps",
    price: 249.9,
    operator: "Vivo",
    city: "Sorocaba",
    dataCap: 1800,
  },
  {
    id: 16,
    name: "Vivo Conecta+",
    speed: "120Mbps",
    price: 89.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 220,
  },
  {
    id: 17,
    name: "Vivo Família 400",
    speed: "400Mbps",
    price: 129.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 700,
  },
  {
    id: 18,
    name: "Vivo Ultra 2Gbps",
    speed: "2Gbps",
    price: 299.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 2200,
  },
  {
    id: 19,
    name: "Vivo Light 60",
    speed: "60Mbps",
    price: 59.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 120,
  },
  {
    id: 20,
    name: "Vivo Max 900",
    speed: "900Mbps",
    price: 189.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 1400,
  },
];

export const allPlansMock: Plan[] = [...defaultPlansMock];

export function mockPlans(plan: Plan[]) {
  allPlansMock.splice(0);
  allPlansMock.push(...plan);
}

export function resetPlans() {
  allPlansMock.splice(0);
  allPlansMock.push(...defaultPlansMock);
}

export function getPlans(): Plan[] {
  return allPlansMock;
}

export function getAllPlans(): Plan[] {
  return allPlansMock;
}

export function filterPlans(plans: Plan[], filter: PlanSearchFilters): Plan[] {
  return plans.filter((plan) => {
    if (
      filter.minSpeed != null &&
      parsePlanSpeed(plan.speed) < filter.minSpeed
    ) {
      return false;
    }

    if (filter.maxPrice != null && plan.price > filter.maxPrice) {
      return false;
    }

    if (filter.minPrice != null && plan.price < filter.minPrice) {
      return false;
    }

    if (filter.minDataCap != null && plan.dataCap < filter.minDataCap) {
      return false;
    }

    if (filter.maxDataCap != null && plan.dataCap > filter.maxDataCap) {
      return false;
    }

    if (
      filter.city != null &&
      filter.city.toLowerCase() !== plan.city.toLowerCase()
    ) {
      return false;
    }

    if (
      filter.operator != null &&
      filter.operator.toLowerCase() !== plan.operator.toLowerCase()
    ) {
      return false;
    }

    if (
      filter.name != null &&
      filter.name.toLowerCase() !== plan.name.toLowerCase()
    ) {
      return false;
    }

    return true;
  });
}

export interface PlanSearchFilters {
  minPrice?: number;
  maxPrice?: number;
  minDataCap?: number;
  maxDataCap?: number;
  operator?: string;
  city?: string;
  name?: string;
  minSpeed?: number;
}

export interface PaginatedPlans {
  plans: Plan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

let filteredPlansCache: Plan[] | null = null;
let lastFiltersCache: string | null = null;

export function parsePlanSpeed(speed: string) {
  const unit = speed.replace(/\d/g, "");
  const amountInMbps = parseInt(speed.replace(/\D/g, ""));

  const multiplier =
    {
      Mbps: 1,
      Gbps: 1000,
    }[unit] ?? 1;

  return multiplier * amountInMbps;
}

export function searchPlans(
  filters: PlanSearchFilters,
  page: number = 1,
  pageSize: number = 5
): PaginatedPlans {
  const filtersKey = JSON.stringify(filters);

  if (lastFiltersCache !== filtersKey) {
    let filtered = filterPlans(allPlansMock, filters);

    filteredPlansCache = filtered;
    lastFiltersCache = filtersKey;
  }

  if (filteredPlansCache) {
    filteredPlansCache.sort((a, b) => a.price - b.price);
  }

  const total = filteredPlansCache ? filteredPlansCache.length : 0;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const plans = filteredPlansCache ? filteredPlansCache.slice(start, end) : [];

  return {
    plans,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getRecommendedPlans(
  preferences: PlanPreferences | null,
  page: number,
  pageSize: number
) {
  const noResults = {
    plans: [],
    total: 0,
    page,
    pageSize,
    totalPages: 0,
  };

  if (!preferences) return noResults;

  const preferenceFields = Object.entries(preferences).filter(
    ([key]) => key !== "id" && key !== "userId"
  );
  if (preferenceFields.every(([, value]) => value == null)) return noResults;

  const allPlans = getAllPlans();

  const checkRange = (
    value: number,
    min: number | null,
    max: number | null
  ) => {
    if (min == null && max == null) return null;
    return value >= (min ?? 0) && value <= (max ?? Infinity);
  };

  const checkText = (preference: string | null, plan: string) => {
    if (preference === null) return null;
    return preference === plan;
  };

  const plansWithMatches = allPlans
    .map((plan) => {
      const matches: Record<PlanPreferencesFields, boolean | null> = {
        city: checkText(preferences.city, plan.city),
        operator: checkText(preferences.operator, plan.operator),
        dataCap: checkRange(
          plan.dataCap,
          preferences.minDataCap,
          preferences.maxDataCap
        ),
        price: checkRange(
          plan.price,
          preferences.minPrice,
          preferences.maxPrice
        ),
      };

      const totalFields = Object.keys(matches).length;
      const ratePerField = 100 / totalFields;
      const rateSubtractedPerNeutral = ratePerField * 0.1;

      let rate = 100;

      if (Object.values(matches).every((value) => value !== true)) {
        rate = 0;
      } else {
        Object.values(matches).forEach((value) => {
          if (value === false) rate -= ratePerField;
          if (value === null) rate -= rateSubtractedPerNeutral;
        });
      }

      Object.entries(matches).forEach(([key, value]) => {
        if (value == null) matches[key as PlanPreferencesFields] = false;
      });

      return {
        ...plan,
        preferencesMatchRate: Math.ceil(rate),
        preferencesMatches: matches,
      };
    })
    .filter((plan) => plan.preferencesMatchRate > 0)
    .sort((a, b) => {
      if (a.preferencesMatchRate === b.preferencesMatchRate) {
        return a.price - b.price;
      }

      return b.preferencesMatchRate - a.preferencesMatchRate;
    });

  const total = plansWithMatches.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const plans = plansWithMatches.slice(start, end);

  return {
    plans,
    total,
    page,
    pageSize,
    totalPages,
  };
}
