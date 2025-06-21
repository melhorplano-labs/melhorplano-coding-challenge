import { PlanModel } from '../models/plan';
import { Plan } from '../domain/entities/Plan';
import { PlanSearchFilters } from '../domain/repositories/planRepository';
import { LocalPlanRepository } from '../infra/repositories/LocalPlanRepository';
import { IPlanService, PaginatedPlans, PlanFilterCriteria, PlanRecommendationPreferences, PlanRecommendationResult, RecommendedPlan, DataCapLimit, RecommendationScore } from '../domain/services/planService';

export class PlanService implements IPlanService {
  private readonly planRepository: LocalPlanRepository;

  constructor(planRepository: LocalPlanRepository = new LocalPlanRepository(PlanModel.storage)) {
    this.planRepository = planRepository;
  }

  // Obtém todos os planos disponíveis
  getAllPlans(): Plan[] {
    return this.planRepository.getAllPlans();
  }

  // Verifica se o plano atende à velocidade mínima
  private hasSufficientSpeed(plan: Plan, minimumSpeed?: number): boolean {
    if (!minimumSpeed) return true;
    const speedInMbps = parseInt(plan.speed.replace('Mbps', ''));
    return speedInMbps >= minimumSpeed;
  }

  // Verifica se o plano está dentro do preço máximo
  private isWithinBudget(plan: Plan, maximumPrice?: number): boolean {
    if (!maximumPrice) return true;
    return plan.price <= maximumPrice;
  }

  // Verifica se o plano está na cidade especificada
  private isInCity(plan: Plan, city?: string): boolean {
    if (!city) return true;
    return plan.city.toLowerCase() === city.toLowerCase();
  }

  // Verifica se o plano é da operadora preferida
  private isPreferredOperator(plan: Plan, preferredOperator?: string): boolean {
    if (!preferredOperator) return true;
    return plan.operator.toLowerCase() === preferredOperator.toLowerCase();
  }

  // Verifica se o plano corresponde ao perfil de uso
  private matchesUsageProfile(plan: Plan, usageProfile?: string): boolean {
    if (!usageProfile) return true;
    if (usageProfile === 'light' && plan.dataCap <= DataCapLimit.LightMax) return true;
    if (
      usageProfile === 'moderate' &&
      plan.dataCap > DataCapLimit.LightMax &&
      plan.dataCap <= DataCapLimit.ModerateMax
    ) return true;
    if (usageProfile === 'heavy' && plan.dataCap > DataCapLimit.ModerateMax) return true;
    return false;
  }

  // Cria uma cópia do plano se o preço for baixo
  private copyIfLowPrice(plan: Plan): Plan {
    return plan.price < 100 ? { ...plan } : plan;
  }

  // Filtra planos com base nos critérios fornecidos
  filterByCriteria(criteria: PlanFilterCriteria): Plan[] {
    return this.getAllPlans()
      .filter(plan => this.hasSufficientSpeed(plan, criteria.minimumSpeedInMbps))
      .filter(plan => this.isWithinBudget(plan, criteria.maximumPrice))
      .filter(plan => this.isInCity(plan, criteria.city))
      .filter(plan => this.isPreferredOperator(plan, criteria.preferredOperator))
      .filter(plan => this.matchesUsageProfile(plan, criteria.usageProfile))
      .map(plan => this.copyIfLowPrice(plan));
  }

  // Filtra planos com base em filtros do repositório
  filterByRepositoryFilters(filters: PlanSearchFilters): Plan[] {
    return this.planRepository.filterPlans(filters).map(plan => this.copyIfLowPrice(plan));
  }

  // Busca planos com paginação e ordenação
  searchWithPagination(
    filters: PlanSearchFilters,
    page: number = 1,
    pageSize: number = 5
  ): PaginatedPlans {
    const filteredPlans = this.filterByRepositoryFilters(filters);
    const sortedPlans = [...filteredPlans].sort((a, b) => {
      if (a.price === b.price) return a.id - b.id;
      return a.price - b.price;
    });

    const total = sortedPlans.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const plans = sortedPlans.slice(start, end);

    return {
      plans,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  // Recomenda planos com base nas preferências do usuário
  recommendByPreferences(
    preferences: PlanRecommendationPreferences,
    limit: number = 5
  ): PlanRecommendationResult {
    if (!preferences.city) {
      throw new Error('City is a required preference for plan recommendation');
    }

    const filteredPlans = this.filterByCriteria({
      city: preferences.city,
      maximumPrice: preferences.budget,
      preferredOperator: preferences.preferredOperator,
      usageProfile: preferences.usageProfile,
    });

    const recommendedPlans: RecommendedPlan[] = filteredPlans
      .map(plan => {
        let score = RecommendationScore.Budget;

        if (this.isPreferredOperator(plan, preferences.preferredOperator)) {
          score += RecommendationScore.Operator;
        }

        if (this.matchesUsageProfile(plan, preferences.usageProfile)) {
          score += RecommendationScore.UsageProfile;
        }

        return { plan, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const topRecommendation = recommendedPlans.length > 0 ? recommendedPlans[0] : null;

    return {
      recommendedPlans,
      topRecommendation,
    };
  }
}