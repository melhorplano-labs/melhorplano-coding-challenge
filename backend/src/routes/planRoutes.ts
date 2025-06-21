import { Router } from 'express';
import { createPlanController, PlanController } from '../controllers/planController';

/**
 * Configura as rotas para operações relacionadas a planos.
 * @returns Um roteador Express configurado com as rotas de planos.
 */
export function createPlanRoutes(): Router {
  const router = Router();
  const planController = createPlanController();

  // Obtém todos os planos disponíveis
  router.get('/', planController.allPlans.bind(planController));

  // Filtra planos por critérios como velocidade mínima e preço máximo
  router.get('/filtered', planController.filteredPlans.bind(planController));

  // Busca planos com filtros e paginação
  router.get('/search', planController.planSearch.bind(planController));

  // Recomenda planos com base nas preferências do usuário
  router.post('/recommend', planController.recommendPlans.bind(planController));

  return router;
}

export default createPlanRoutes();