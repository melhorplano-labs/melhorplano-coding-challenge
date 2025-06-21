import { Plan } from '../entities/Plan';
import { PlanSearchFilters } from '../repositories/planRepository';

// Interfaces fornecidas
export interface PaginatedPlans {
  plans: Plan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PlanRecommendationPreferences {
  city: string;
  budget?: number;
  usageProfile?: 'light' | 'moderate' | 'heavy';
  preferredOperator?: string;
}

export interface RecommendedPlan {
  plan: Plan;
  score: number;
}

export interface PlanRecommendationResult {
  recommendedPlans: RecommendedPlan[];
  topRecommendation: RecommendedPlan | null;
}

export interface PlanFilterCriteria {
  minimumSpeedInMbps?: number;
  maximumPrice?: number;
  city?: string;
  preferredOperator?: string;
  usageProfile?: 'light' | 'moderate' | 'heavy';
}

export enum DataCapLimit {
  LightMax = 300,
  ModerateMax = 800,
}

export enum RecommendationScore {
  Budget = 10,
  Operator = 5,
  UsageProfile = 4,
}

export interface IPlanService {
  /**
   * Obtém todos os planos disponíveis.
   * @returns Lista de todos os planos.
   */
  getAllPlans(): Plan[];

  /**
   * Filtra planos com base em critérios como velocidade, preço, cidade, operadora e perfil de uso.
   * @param criteria Critérios de filtragem.
   * @returns Lista de planos filtrados.
   */
  filterByCriteria(criteria: PlanFilterCriteria): Plan[];

  /**
   * Filtra planos usando filtros do repositório.
   * @param filters Filtros compatíveis com o repositório.
   * @returns Lista de planos filtrados.
   */
  filterByRepositoryFilters(filters: PlanSearchFilters): Plan[];

  /**
   * Busca planos com paginação e ordenação.
   * @param filters Filtros de busca.
   * @param page Número da página (padrão: 1).
   * @param pageSize Tamanho da página (padrão: 5).
   * @returns Resultado paginado com planos.
   */
  searchWithPagination(filters: PlanSearchFilters, page?: number, pageSize?: number): PaginatedPlans;

  /**
   * Recomenda planos com base nas preferências do usuário.
   * @param preferences Preferências de recomendação (cidade obrigatória).
   * @param limit Número máximo de recomendações (padrão: 5).
   * @returns Resultado com planos recomendados e a melhor recomendação.
   */
  recommendByPreferences(preferences: PlanRecommendationPreferences, limit?: number): PlanRecommendationResult;
}