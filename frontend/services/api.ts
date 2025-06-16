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
