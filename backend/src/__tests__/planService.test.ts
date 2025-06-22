import { PlanService } from '../services/planService';
import { Plan } from '../domain/entities/Plan';
import { LocalPlanRepository } from '../infra/repositories/LocalPlanRepository';
import { PlanSearchFilters } from '../domain/repositories/planRepository';
import { PlanFilterCriteria, PlanRecommendationPreferences, RecommendationScore } from '../domain/services/planService';

const mockPlans: Plan[] = [
  {
    id: 1,
    name: 'Plano Básico',
    city: 'São Paulo',
    operator: 'Vivo',
    price: 79.9,
    dataCap: 200,
    speed: '100Mbps',
  },
  {
    id: 2,
    name: 'Plano Intermediário',
    city: 'Rio de Janeiro',
    operator: 'Claro',
    price: 99.9,
    dataCap: 400,
    speed: '300Mbps',
  },
  {
    id: 3,
    name: 'Plano Premium',
    city: 'Belo Horizonte',
    operator: 'TIM',
    price: 149.9,
    dataCap: 800,
    speed: '600Mbps',
  },
  {
    id: 4,
    name: 'Plano Família',
    city: 'Curitiba',
    operator: 'Vivo',
    price: 129.9,
    dataCap: 600,
    speed: '500Mbps',
  },
  {
    id: 5,
    name: 'Plano Ultra',
    city: 'São Paulo',
    operator: 'Claro',
    price: 199.9,
    dataCap: 1000,
    speed: '1Gbps',
  },
];

const makeSut = (plans: Plan[] = mockPlans) => {
  const planRepository = new LocalPlanRepository(plans);
  const planService = new PlanService(planRepository);
  jest.spyOn(planRepository, 'getAllPlans');
  jest.spyOn(planRepository, 'filterPlans');
  return {
    planService,
    planRepository,
  };
};

describe('PlanService', () => {
  let sut: ReturnType<typeof makeSut>;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = makeSut();
  });

  describe('getAllPlans', () => {
    it('should return all plans from repository', () => {
      const plans = sut.planService.getAllPlans();
      expect(plans).toEqual(mockPlans);
      expect(sut.planRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });
  });

  describe('hasSufficientSpeed', () => {
    it('should return true when minimumSpeed is undefined', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).hasSufficientSpeed(plan, undefined);
      expect(result).toBe(true);
    });

    it('should return true when plan speed meets or exceeds minimum', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).hasSufficientSpeed(plan, 50);
      expect(result).toBe(true);
    });

    it('should return false when plan speed is below minimum', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).hasSufficientSpeed(plan, 200);
      expect(result).toBe(false);
    });
  });

  describe('isWithinBudget', () => {
    it('should return true when maximumPrice is undefined', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isWithinBudget(plan, undefined);
      expect(result).toBe(true);
    });

    it('should return true when plan price is within budget', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isWithinBudget(plan, 100);
      expect(result).toBe(true);
    });

    it('should return false when plan price exceeds budget', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isWithinBudget(plan, 50);
      expect(result).toBe(false);
    });
  });

  describe('isInCity', () => {
    it('should return true when city is undefined', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isInCity(plan, undefined);
      expect(result).toBe(true);
    });

    it('should return true when plan city matches (case insensitive)', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isInCity(plan, 'são paulo');
      expect(result).toBe(true);
    });

    it('should return false when plan city does not match', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isInCity(plan, 'Rio de Janeiro');
      expect(result).toBe(false);
    });
  });

  describe('isPreferredOperator', () => {
    it('should return true when preferredOperator is undefined', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isPreferredOperator(plan, undefined);
      expect(result).toBe(true);
    });

    it('should return true when plan operator matches (case insensitive)', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isPreferredOperator(plan, 'vivo');
      expect(result).toBe(true);
    });

    it('should return false when plan operator does not match', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).isPreferredOperator(plan, 'Claro');
      expect(result).toBe(false);
    });
  });

  describe('matchesUsageProfile', () => {
    it('should return true when usageProfile is undefined', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).matchesUsageProfile(plan, undefined);
      expect(result).toBe(true);
    });

    it('should return true for light profile with appropriate dataCap', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).matchesUsageProfile(plan, 'light');
      expect(result).toBe(true);
    });

    it('should return true for moderate profile with appropriate dataCap', () => {
      const plan: Plan = mockPlans[1];
      const result = (sut.planService as any).matchesUsageProfile(plan, 'moderate');
      expect(result).toBe(true);
    });

    it('should return false for mismatched profile and dataCap', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).matchesUsageProfile(plan, 'heavy');
      expect(result).toBe(false);
    });
  });

  describe('copyIfLowPrice', () => {
    it('should return a copy of plan if price is less than 100', () => {
      const plan: Plan = mockPlans[0];
      const result = (sut.planService as any).copyIfLowPrice(plan);
      expect(result).not.toBe(plan);
      expect(result).toEqual(plan);
    });

    it('should return same plan if price is 100 or more', () => {
      const plan: Plan = mockPlans[2];
      const result = (sut.planService as any).copyIfLowPrice(plan);
      expect(result).toBe(plan);
    });
  });

  describe('filterByCriteria', () => {
    it('should filter plans based on all criteria', () => {
      const criteria: PlanFilterCriteria = {
        minimumSpeedInMbps: 200,
        maximumPrice: 100,
        city: 'São Paulo',
        preferredOperator: 'Claro',
        usageProfile: 'moderate',
      };
      const plans = sut.planService.filterByCriteria(criteria);
      expect(plans).toHaveLength(0);
    });

    it('should return copied plans for prices under 100', () => {
      const criteria: PlanFilterCriteria = {
        city: 'São Paulo',
        maximumPrice: 80,
      };
      const plans = sut.planService.filterByCriteria(criteria);
      expect(plans).toHaveLength(1);
      expect(plans[0]).not.toBe(mockPlans[0]);
      expect(plans[0]).toEqual(mockPlans[0]);
    });
  });

  describe('filterByRepositoryFilters', () => {
    it('should call repository filter and copy low-priced plans', () => {
      const filters: PlanSearchFilters = { city: 'São Paulo' };
      const plans = sut.planService.filterByRepositoryFilters(filters);
      expect(sut.planRepository.filterPlans).toHaveBeenCalledWith(filters);
      expect(plans.some(plan => plan.price < 100 && plan !== mockPlans.find(p => p.id === plan.id))).toBe(true);
    });
  });

  describe('searchWithPagination', () => {
    it('should return paginated results sorted by price and id', () => {
      const filters: PlanSearchFilters = { city: 'São Paulo' };
      const result = sut.planService.searchWithPagination(filters, 1, 2);
      expect(result).toEqual({
        plans: [mockPlans[0], mockPlans[4]],
        total: 2,
        page: 1,
        pageSize: 2,
        totalPages: 1,
      });
    });

    it('should handle empty results', () => {
      const filters: PlanSearchFilters = { city: 'Nonexistent' };
      const result = sut.planService.searchWithPagination(filters, 1, 5);
      expect(result).toEqual({
        plans: [],
        total: 0,
        page: 1,
        pageSize: 5,
        totalPages: 0,
      });
    });

    it('should handle multiple pages', () => {
      const filters: PlanSearchFilters = {};
      const result = sut.planService.searchWithPagination(filters, 2, 2);
      expect(result.plans).toHaveLength(2);
      expect(result.total).toBe(5);
      expect(result.totalPages).toBe(3);
    });
  });

  describe('recommendByPreferences', () => {
    it('should throw error if city is not provided', () => {
      const preferences: any = {};
      expect(() => sut.planService.recommendByPreferences(preferences)).toThrow('City is a required preference for plan recommendation');
    });

    it('should return recommendations with scores', () => {
      const preferences: PlanRecommendationPreferences = {
        city: 'São Paulo',
        budget: 200,
        preferredOperator: 'Claro',
        usageProfile: 'heavy',
      };
      const result = sut.planService.recommendByPreferences(preferences, 2);
      expect(result.recommendedPlans).toHaveLength(1);
      expect(result.recommendedPlans[0].plan).toEqual(mockPlans[4]);
      expect(result.recommendedPlans[0].score).toBe(
        RecommendationScore.Budget +
        RecommendationScore.Operator +
        RecommendationScore.UsageProfile
      );
      expect(result.topRecommendation).toEqual(result.recommendedPlans[0]);
    });

    it('should return empty recommendations for no matching plans', () => {
      const preferences: PlanRecommendationPreferences = {
        city: 'São Paulo',
        budget: 50,
      };
      const result = sut.planService.recommendByPreferences(preferences);
      expect(result.recommendedPlans).toHaveLength(0);
      expect(result.topRecommendation).toBeNull();
    });
  });
});
