import { Request, Response } from 'express';
import { IPlanService, PlanFilterCriteria, PlanRecommendationPreferences, PlanRecommendationResult } from '../domain/services/planService';
import { PlanSearchFilters } from '../domain/repositories/planRepository';

import { PlanModel } from '../models/plan';
import { LocalPlanRepository } from '../infra/repositories/LocalPlanRepository';
import { PlanService } from '../services/planService';

export class PlanController {
  private readonly planService: IPlanService;

  constructor(planService: IPlanService) {
    this.planService = planService;
  }

  // Obtém todos os planos disponíveis
  async allPlans(req: Request, res: Response): Promise<void> {
    const plans = this.planService.getAllPlans();
    res.json(plans);
  }

  // Extrai critérios de filtragem da query
  private extractFilterCriteria(req: Request): PlanFilterCriteria {
    return {
      minimumSpeedInMbps: req.query.minSpeed ? parseInt(req.query.minSpeed as string) : undefined,
      maximumPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
    };
  }

  // Filtra planos com base em velocidade mínima e preço máximo
  async filteredPlans(req: Request, res: Response): Promise<void> {
    const criteria = this.extractFilterCriteria(req);
    const filtered = this.planService.filterByCriteria(criteria);
    res.json(filtered);
  }

  // Extrai filtros de busca da query
  private extractSearchFilters(req: Request): PlanSearchFilters {
    const { minPrice, maxPrice, minDataCap, maxDataCap, operator, city, name } = req.query;
    return {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDataCap: minDataCap ? Number(minDataCap) : undefined,
      maxDataCap: maxDataCap ? Number(maxDataCap) : undefined,
      operator: operator ? String(operator) : undefined,
      city: city ? String(city) : undefined,
      name: name ? String(name) : undefined,
    };
  }

  // Busca planos com paginação
  async planSearch(req: Request, res: Response): Promise<void> {
    const filters = this.extractSearchFilters(req);
    const page = req.query.page ? Number(req.query.page) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5;
    const paginated = this.planService.searchWithPagination(filters, page, pageSize);
    res.json(paginated);
  }

  // Recomenda planos com base nas preferências
  async recommendPlans(req: Request, res: Response): Promise<void> {
    try {
      const preferences: PlanRecommendationPreferences = req.body;
      if (!preferences.city) {
        res.status(400).json({ error: 'City is a required field' });
        return;
      }
      const result: PlanRecommendationResult = this.planService.recommendByPreferences(preferences);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

// Factory para criar o controlador com dependências
export function createPlanController(): PlanController {
  const planRepository = new LocalPlanRepository(PlanModel.storage);
  const planService = new PlanService(planRepository);
  return new PlanController(planService);
}

