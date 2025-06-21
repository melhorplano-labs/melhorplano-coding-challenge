import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { PlanPreferences } from "../models/planPreferences";
import { RecommendedPlan } from "../models/recommendedPlan";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;

export interface PlanSearchParams {
  minPrice?: number;
  maxPrice?: number;
  minDataCap?: number;
  maxDataCap?: number;
  operator?: string;
  city?: string;
  name?: string;
  page?: number;
  pageSize?: number;
}

export async function fetchFilteredPlans(params: PlanSearchParams) {
  const { data } = await api.get("/plans/search", { params });
  return data;
}

export interface RecommendedPlansSearchParams {
  page?: number;
  pageSize?: number;
}

export interface RecommendedPlansResult {
  plans: RecommendedPlan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const useRecommendedPlans = (params: RecommendedPlansSearchParams) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendedPlansResult | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);

    api
      .get("/plans/recommended", { params })
      .then((response) => setResult(response.data))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refetch = useCallback(() => {
    fetch();
  }, [fetch]);

  return { loading, result, refetch };
};

export interface SetPlanPreferencesBody {
  city: string | null;
  operator: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minDataCap: number | null;
  maxDataCap: number | null;
}

export async function setPlanPreferences(body: SetPlanPreferencesBody) {
  await api.put("/plan-preferences", body);
}

export const usePlanPreferences = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlanPreferences | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/plan-preferences")
      .then((response) => setResult(response.data))
      .finally(() => setLoading(false));
  }, []);

  return { loading, result };
};
