import { PlanService } from '../services/planService';
import { IPlanService, PlanFilterCriteria, PlanRecommendationPreferences, PlanRecommendationResult, PaginatedPlans, DataCapLimit, RecommendationScore } from '../domain/services/planService';
import { LocalPlanRepository } from '../infra/repositories/LocalPlanRepository';
import { Plan } from '../domain/entities/Plan';
import { PlanSearchFilters } from '../domain/repositories/planRepository';

// Mock de dados de teste
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

// Mock do repositório
jest.mock('../infra/repositories/LocalPlanRepository');

describe('PlanService', () => {
  let planService: IPlanService;
  let mockRepository: jest.Mocked<LocalPlanRepository>;

  beforeEach(() => {
    // Configura o mock do repositório
    mockRepository = {
      getAllPlans: jest.fn().mockReturnValue(mockPlans),
      filterPlans: jest.fn().mockImplementation((filters) => {
        return mockPlans.filter((plan) => {
          if (filters.city && plan.city.toLowerCase() !== filters.city.toLowerCase()) return false;
          if (filters.maxPrice && plan.price > filters.maxPrice) return false;
          if (filters.minPrice && plan.price < filters.minPrice) return false;
          if (filters.operator && plan.operator.toLowerCase() !== filters.operator.toLowerCase()) return false;
          if (filters.name && !plan.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
          if (filters.minDataCap && plan.dataCap < filters.minDataCap) return false;
          if (filters.maxDataCap && plan.dataCap > filters.maxDataCap) return false;
          return true;
        });
      }),
    } as unknown as jest.Mocked<LocalPlanRepository>;

    // Instancia o serviço com o mock
    planService = new PlanService(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPlans', () => {
    test('returns all plans from the repository', () => {
      const result = planService.getAllPlans();

      expect(result).toHaveLength(5);
      expect(result).toEqual(mockPlans);
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });

    test('returns empty array when repository has no plans', () => {
      mockRepository.getAllPlans.mockReturnValue([]);

      const result = planService.getAllPlans();

      expect(result).toHaveLength(0);
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });
  });

  describe('filterByCriteria', () => {
    test('filters plans by city, budget, speed, operator, and usage profile', () => {
      const criteria: PlanFilterCriteria = {
        city: 'São Paulo',
        maximumPrice: 80,
        minimumSpeedInMbps: 50,
        preferredOperator: 'Vivo',
        usageProfile: 'light',
      };

      const result = planService.filterByCriteria(criteria);

      expect(result).toHaveLength(1); // Only plan ID 1 matches
      expect(result[0].id).toBe(1);
      expect(result[0].price).toBeLessThan(100); // Copied due to price < 100
      expect(result[0]).not.toBe(mockPlans[0]); // Copied object
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });

    test('returns all plans when no criteria provided', () => {
      const criteria: PlanFilterCriteria = {};

      const result = planService.filterByCriteria(criteria);

      expect(result).toHaveLength(5);
      expect(result.map(p => p.id)).toEqual([1, 2, 3, 4, 5]);
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });

    test('copies plans with price less than 100', () => {
      const criteria: PlanFilterCriteria = { city: 'São Paulo', maximumPrice: 80 };

      const result = planService.filterByCriteria(criteria);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0]).not.toBe(mockPlans[0]); // Copied object
      expect(result[0].price).toBe(79.9);
    });

    test('returns empty array when no plans match', () => {
      const criteria: PlanFilterCriteria = { city: 'Brasília' };

      const result = planService.filterByCriteria(criteria);

      expect(result).toHaveLength(0);
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });
  });

  describe('filterByRepositoryFilters', () => {
    test('filters plans using repository filters and copies low-price plans', () => {
      const filters: PlanSearchFilters = {
        city: 'São Paulo',
        maxPrice: 80,
      };

      const result = planService.filterByRepositoryFilters(filters);

      expect(result).toHaveLength(1); // Only plan ID 1 matches
      expect(result[0].id).toBe(1);
      expect(result[0]).not.toBe(mockPlans[0]); // Copied due to price < 100
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });

    test('returns empty array when no plans match', () => {
      const filters: PlanSearchFilters = { city: 'Brasília' };

      const result = planService.filterByRepositoryFilters(filters);

      expect(result).toHaveLength(0);
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });

    test('handles all filter types correctly', () => {
      const filters: PlanSearchFilters = {
        city: 'São Paulo',
        minPrice: 90,
        maxPrice: 110,
        operator: 'Claro',
        name: 'Intermediário',
        minDataCap: 300,
        maxDataCap: 500,
      };

      const result = planService.filterByRepositoryFilters(filters);

      expect(result).toHaveLength(0); // No plans match all criteria
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });
  });

  describe('searchWithPagination', () => {
    test('returns paginated plans with default parameters', () => {
      const filters: PlanSearchFilters = { city: 'São Paulo' };

      const result = planService.searchWithPagination(filters);

      expect(result).toEqual({
        plans: [
          expect.objectContaining({ id: 1 }), // Price 79.9
          expect.objectContaining({ id: 5 }), // Price 199.9
        ],
        total: 2,
        page: 1,
        pageSize: 5,
        totalPages: 1,
      });
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });

    test('paginates correctly with custom page and pageSize', () => {
      const filters: PlanSearchFilters = { city: 'São Paulo' };

      const result = planService.searchWithPagination(filters, 2, 1);

      expect(result).toEqual({
        plans: [expect.objectContaining({ id: 5 })], // Price 199.9
        total: 2,
        page: 2,
        pageSize: 1,
        totalPages: 2,
      });
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });

    test('sorts plans by price and ID', () => {
      const filters: PlanSearchFilters = { city: 'São Paulo' };
      mockPlans.push({
        id: 6,
        name: 'Extra Plan',
        city: 'São Paulo',
        operator: 'Vivo',
        price: 79.9,
        dataCap: 300,
        speed: '50Mbps',
      });

      const result = planService.searchWithPagination(filters, 1, 5);

      expect(result.plans.map(p => p.id)).toEqual([1, 6, 5]);
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });

    test('returns empty pagination when no plans match', () => {
      const filters: PlanSearchFilters = { city: 'Brasília' };

      const result = planService.searchWithPagination(filters);

      expect(result).toEqual({
        plans: [],
        total: 0,
        page: 1,
        pageSize: 5,
        totalPages: 0,
      });
      expect(mockRepository.filterPlans).toHaveBeenCalledWith(filters);
    });
  });

  describe('recommendByPreferences', () => {
    test('recommends plans with correct scores for city, budget, usage profile, and operator', () => {
      const preferences: PlanRecommendationPreferences = {
        city: 'São Paulo',
        budget: 100,
        usageProfile: 'light',
        preferredOperator: 'Vivo',
      };

      const result = planService.recommendByPreferences(preferences, 3);

      expect(result.recommendedPlans).toHaveLength(2);
      expect(result.topRecommendation?.plan.id).toBe(1);
      expect(result.topRecommendation?.score).toBe(
        RecommendationScore.Budget + RecommendationScore.Operator + RecommendationScore.UsageProfile
      );
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });

    test('throws error when city is not provided', () => {
      const preferences: PlanRecommendationPreferences = { city: '' };

      expect(() => planService.recommendByPreferences(preferences)).toThrow(
        'City is a required preference for plan recommendation'
      );
      expect(mockRepository.getAllPlans).not.toHaveBeenCalled();
    });

    test('returns empty result when no plans match', () => {
      const preferences: PlanRecommendationPreferences = { city: 'Brasília' };

      const result = planService.recommendByPreferences(preferences);

      expect(result.recommendedPlans).toHaveLength(0);
      expect(result.topRecommendation).toBeNull();
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });

    test('respects limit parameter', () => {
      const preferences: PlanRecommendationPreferences = { city: 'São Paulo' };

      const result = planService.recommendByPreferences(preferences, 1);

      expect(result.recommendedPlans).toHaveLength(1);
      expect(result.recommendedPlans.map(p => p.plan.id)).toEqual([1]);
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });

    test('assigns correct scores based on preferences', () => {
      const preferences: PlanRecommendationPreferences = {
        city: 'São Paulo',
        usageProfile: 'heavy',
        preferredOperator: 'Claro',
      };

      const result = planService.recommendByPreferences(preferences, 3);

      expect(result.recommendedPlans).toHaveLength(1); // Only plan ID 5 matches
      const claroPlan = result.recommendedPlans.find(p => p.plan.operator === 'Claro');
      expect(claroPlan?.score).toBe(
        RecommendationScore.Budget + RecommendationScore.Operator + RecommendationScore.UsageProfile
      );
      expect(claroPlan?.plan.id).toBe(5);
      expect(mockRepository.getAllPlans).toHaveBeenCalledTimes(1);
    });
  });
});