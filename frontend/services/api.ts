import axios from "axios";

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

export interface PlanRankingPreferences {
  city?: string;
  profile?: string;
  budget?: number;
  operator?: string;
}

export interface PlanRecommendParams {
  preferences: PlanRankingPreferences;
  page?: number | undefined;
  pageSize?: number | undefined;
}

export async function fetchRecommendedPlans(params: PlanRecommendParams) {
  const { data } = await api.post("/plans/recommend", params);
  return data;
}

export async function fetchAllProfiles() {
  const { data } = await api.get("/profiles/");
  return data;
}
