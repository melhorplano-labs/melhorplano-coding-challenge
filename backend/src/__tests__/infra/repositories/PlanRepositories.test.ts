import { Plan } from "../../../domain/entities/Plan";
import { LocalPlanRepository } from "../../../infra/repositories/LocalPlanRepository";


describe("Plan Repositories", () => {
  test("should return all plans when calling getAllPlans", () => {
    const { planRepository } = makeSut();
    const result = planRepository.getAllPlans();
    expect(result).toEqual(allPlansMock);
  });

  test("should return all plans when calling getPlans", () => {
    const { planRepository } = makeSut();
    const result = planRepository.getPlans();
    expect(result).toEqual(allPlansMock);
  });

  test("should return filtered plans by city", () => {
    const { planRepository } = makeSut();
    const filters = { city: "São Paulo" };
    const result = planRepository.filterPlans(filters);
    const expected = allPlansMock.filter(plan => plan.city === "São Paulo");
    expect(result).toEqual(expected);
  });

  test("should return filtered plans by operator", () => {
    const { planRepository } = makeSut();
    const filters = { operator: "Claro" };
    const result = planRepository.filterPlans(filters);
    const expected = allPlansMock.filter(plan => plan.operator === "Claro");
    expect(result).toEqual(expected);
  });

  test("should return filtered plans by city and operator", () => {
    const { planRepository } = makeSut();
    const filters = { city: "São Paulo", operator: "Vivo" };
    const result = planRepository.filterPlans(filters);
    const expected = allPlansMock.filter(plan =>
      plan.city === "São Paulo" && plan.operator === "Vivo"
    );
    expect(result).toEqual(expected);
  });

  test("should return empty list if no plan matches filter", () => {
    const { planRepository } = makeSut();
    const filters = { city: "Londres", operator: "TIM" }; // cidade inexistente
    const result = planRepository.filterPlans(filters);
    expect(result).toEqual([]);
  });
});

const allPlansMock: Plan[] = [
  {
    id: 1,
    name: "Plano Básico",
    speed: "100Mbps",
    price: 79.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 200,
  },
  {
    id: 2,
    name: "Plano Intermediário",
    speed: "300Mbps",
    price: 99.9,
    operator: "Claro",
    city: "Rio de Janeiro",
    dataCap: 400,
  },
  {
    id: 3,
    name: "Plano Premium",
    speed: "600Mbps",
    price: 149.9,
    operator: "TIM",
    city: "Belo Horizonte",
    dataCap: 800,
  },
  {
    id: 4,
    name: "Plano Família",
    speed: "500Mbps",
    price: 129.9,
    operator: "Vivo",
    city: "Curitiba",
    dataCap: 600,
  },
  {
    id: 5,
    name: "Plano Ultra",
    speed: "1Gbps",
    price: 199.9,
    operator: "Claro",
    city: "São Paulo",
    dataCap: 1000,
  },
  {
    id: 6,
    name: "Plano Econômico",
    speed: "50Mbps",
    price: 59.9,
    operator: "Oi",
    city: "Recife",
    dataCap: 100,
  },
  {
    id: 7,
    name: "Plano Regional",
    speed: "200Mbps",
    price: 89.9,
    operator: "TIM",
    city: "Porto Alegre",
    dataCap: 300,
  },
  {
    id: 8,
    name: "Plano Flex",
    speed: "400Mbps",
    price: 109.9,
    operator: "Vivo",
    city: "Salvador",
    dataCap: 500,
  },
  {
    id: 9,
    name: "Plano Jovem",
    speed: "150Mbps",
    price: 69.9,
    operator: "Claro",
    city: "Fortaleza",
    dataCap: 250,
  },
  {
    id: 10,
    name: "Plano Top",
    speed: "2Gbps",
    price: 299.9,
    operator: "TIM",
    city: "Brasília",
    dataCap: 2000,
  },
  {
    id: 11,
    name: "Vivo Turbo",
    speed: "250Mbps",
    price: 109.9,
    operator: "Vivo",
    city: "Campinas",
    dataCap: 350,
  },
  {
    id: 12,
    name: "Vivo Max",
    speed: "800Mbps",
    price: 179.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 1200,
  },
  {
    id: 13,
    name: "Vivo Light",
    speed: "70Mbps",
    price: 64.9,
    operator: "Vivo",
    city: "Ribeirão Preto",
    dataCap: 150,
  },
  {
    id: 14,
    name: "Vivo Família Plus",
    speed: "600Mbps",
    price: 139.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 900,
  },
  {
    id: 15,
    name: "Vivo Ultra HD",
    speed: "1.5Gbps",
    price: 249.9,
    operator: "Vivo",
    city: "Sorocaba",
    dataCap: 1800,
  },
  {
    id: 16,
    name: "Vivo Conecta+",
    speed: "120Mbps",
    price: 89.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 220,
  },
  {
    id: 17,
    name: "Vivo Família 400",
    speed: "400Mbps",
    price: 129.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 700,
  },
  {
    id: 18,
    name: "Vivo Ultra 2Gbps",
    speed: "2Gbps",
    price: 299.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 2200,
  },
  {
    id: 19,
    name: "Vivo Light 60",
    speed: "60Mbps",
    price: 59.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 120,
  },
  {
    id: 20,
    name: "Vivo Max 900",
    speed: "900Mbps",
    price: 189.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 1400,
  },
];

const makeSut = () => {
  const planRepository = new LocalPlanRepository(allPlansMock)
  return {
    planRepository
  }
}