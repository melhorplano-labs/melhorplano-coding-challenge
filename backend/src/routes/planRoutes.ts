import { Router } from 'express';
import { createPlanController } from '../controllers/planController';

export function createPlanRoutes(): Router {
  const router = Router();
  const planController = createPlanController();

  router.get('/', planController.allPlans.bind(planController));
  router.get('/filtered', planController.filteredPlans.bind(planController));
  router.get('/search', planController.planSearch.bind(planController));
  router.post('/recommend', planController.recommendPlans.bind(planController));

  return router;
}

export default createPlanRoutes();