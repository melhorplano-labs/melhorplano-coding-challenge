import { useEffect, useState } from "react";
import api, { fetchFilteredPlans, PlanSearchParams } from "../services/api";
import PlanCard from "../components/PlanCard";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";

interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  operator: string;
  city: string;
  dataCap: number;
  benefits?: string[];
}

interface PaginatedPlans {
  plans: Plan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface RecommendedPlan {
  plan: Plan;
  score: number;
}

interface PlanRecommendationResult {
  recommendedPlans: RecommendedPlan[];
  topRecommendation: RecommendedPlan | null;
}

const OPERATORS = ["Vivo", "Claro", "TIM", "Oi"];
const CITIES = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Recife",
  "Porto Alegre",
  "Salvador",
  "Fortaleza",
  "Brasília",
];
const USAGE_PROFILES = ["light", "moderate", "heavy"];

export default function Home() {
  const [filters, setFilters] = useState<PlanSearchParams>({
    page: 1,
    pageSize: 5,
  });
  const [result, setResult] = useState<PaginatedPlans | null>(null);
  const [loading, setLoading] = useState(false);
  const [planNames, setPlanNames] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<PlanRecommendationResult | null>(null);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [recommendationPreferences, setRecommendationPreferences] = useState<{
    city: string;
    budget?: number;
    usageProfile?: string;
    preferredOperator?: string;
  }>({ city: "" });
  const [viewMode, setViewMode] = useState<"search" | "recommendation">("search");

  useEffect(() => {
    if (viewMode === "search") {
      setLoading(true);
      fetchFilteredPlans(filters)
        .then(setResult)
        .finally(() => setLoading(false));
    }
  }, [filters, viewMode]);

  useEffect(() => {
    api
      .get("/plans/search", { params: { page: 1, pageSize: 1000 } })
      .then((res) => {
        const names = res.data.plans.map((p: any) => p.name);
        setPlanNames(Array.from(new Set(names)));
      });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value ? value : undefined,
      page: 1,
    }));
    setViewMode("search");
  }

  function handleRecommendationChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setRecommendationPreferences((prev) => ({
      ...prev,
      [name]: value ? (name === "budget" ? parseFloat(value) : value) : undefined,
    }));
  }

  function handleRecommendationSubmit() {
    if (!recommendationPreferences.city) {
      alert("Por favor, selecione uma cidade.");
      return;
    }
    console.log("Submitting recommendation, setting viewMode to 'recommendation'");
    setRecommendationLoading(true);
    setRecommendation(null);
    setResult(null);
    setViewMode("recommendation");
    api
      .post("/plans/recommend", recommendationPreferences)
      .then((res) => {
        console.log("Recommendation received, viewMode:", viewMode);
        setRecommendation(res.data);
      })
      .finally(() => setRecommendationLoading(false));
  }

  function handlePageChange(newPage: number) {
    setFilters((prev) => ({ ...prev, page: newPage }));
    setViewMode("search");
  }

  function clearFilters() {
    setFilters({ page: 1, pageSize: 5 });
    setResult(null);
    setViewMode("search");
  }

  function clearRecommendationPreferences() {
    setRecommendationPreferences({ city: "" });
    setRecommendation(null);
    setResult(null);
    setViewMode("search");
  }

  return (
    <>
      <Menu />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <aside
          style={{
            width: 300,
            minHeight: 500,
            background: "#f7fafc",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            padding: 32,
            marginRight: 32,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <h2
            style={{
              color: "#00897b",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            Filtrar planos
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Nome do plano
            </label>
            <select
              name="name"
              onChange={handleChange}
              value={filters.name || ""}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Selecione</option>
              {planNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Operadora
            </label>
            <select
              name="operator"
              onChange={handleChange}
              value={filters.operator || ""}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Selecione</option>
              {OPERATORS.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Cidade
            </label>
            <select
              name="city"
              onChange={handleChange}
              value={filters.city || ""}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Selecione</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Preço
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="number"
                name="minPrice"
                placeholder="Mín."
                value={filters.minPrice || ""}
                onChange={handleChange}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "2px solid #009688",
                  background: "#fff",
                  fontSize: 16,
                  width: 110,
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Máx."
                value={filters.maxPrice || ""}
                onChange={handleChange}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "2px solid #b2dfdb",
                  background: "#fff",
                  fontSize: 16,
                  width: 110,
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
              <button
                type="button"
                style={{
                  background: "#009688",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  marginLeft: 4,
                }}
                title="Buscar por preço"
                disabled
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" stroke="#fff" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#fff" />
                </svg>
              </button>
            </div>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Franquia (GB)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="number"
                name="minDataCap"
                placeholder="Mín."
                value={filters.minDataCap || ""}
                onChange={handleChange}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "2px solid #009688",
                  background: "#fff",
                  fontSize: 16,
                  width: 110,
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
              <input
                type="number"
                name="maxDataCap"
                placeholder="Máx."
                value={filters.maxDataCap || ""}
                onChange={handleChange}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "2px solid #b2dfdb",
                  background: "#fff",
                  fontSize: 16,
                  width: 110,
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
              <button
                type="button"
                style={{
                  background: "#009688",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  marginLeft: 4,
                }}
                title="Buscar por franquia"
                disabled
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" stroke="#fff" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#fff" />
                </svg>
              </button>
            </div>
            <button
              onClick={clearFilters}
              style={{
                background: "#e0e0e0",
                color: "#333",
                padding: "12px 24px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Limpar Filtros
            </button>
          </div>
          <h2
            style={{
              color: "#00897b",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            Recomendações Personalizadas
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Cidade
            </label>
            <select
              name="city"
              onChange={handleRecommendationChange}
              value={recommendationPreferences.city}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Selecione</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Orçamento (R$)
            </label>
            <input
              type="number"
              name="budget"
              placeholder="Orçamento máximo"
              value={recommendationPreferences.budget || ""}
              onChange={handleRecommendationChange}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "2px solid #009688",
                background: "#fff",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Perfil de Uso
            </label>
            <select
              name="usageProfile"
              onChange={handleRecommendationChange}
              value={recommendationPreferences.usageProfile || ""}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Selecione</option>
              {USAGE_PROFILES.map((profile) => (
                <option key={profile} value={profile}>
                  {profile === "light"
                    ? "Leve (até 300GB)"
                    : profile === "moderate"
                    ? "Moderado (300-800GB)"
                    : "Pesado (acima de 800GB)"}
                </option>
              ))}
            </select>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Operadora Preferida
            </label>
            <select
              name="preferredOperator"
              onChange={handleRecommendationChange}
              value={recommendationPreferences.preferredOperator || ""}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Selecione</option>
              {OPERATORS.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <button
              onClick={handleRecommendationSubmit}
              style={{
                background: "#009688",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Obter Recomendações
            </button>
            <button
              onClick={clearRecommendationPreferences}
              style={{
                background: "#e0e0e0",
                color: "#333",
                padding: "12px 24px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Limpar Preferências
            </button>
          </div>
        </aside>
        <div className={styles.container} style={{ flex: 1 }}>
          <h1 className={styles.titulo}>Buscar ofertas de planos</h1>
          <p className={styles.subtitulo}>
            Filtre por preço, franquia, operadora, cidade, nome ou obtenha recomendações personalizadas!
          </p>
          {viewMode === "recommendation" ? (
            <>
              {recommendationLoading ? (
                <div style={{ textAlign: "center", margin: 32 }}>
                  Carregando recomendações...
                </div>
              ) : recommendation && recommendation.topRecommendation ? (
                <>
                  <section style={{ marginBottom: 32 }}>
                    <h2
                      style={{
                        color: "#00897b",
                        fontWeight: 700,
                        fontSize: 24,
                        marginBottom: 16,
                      }}
                    >
                      Plano Mais Recomendado
                    </h2>
                    <PlanCard
                      plan={recommendation.topRecommendation.plan}
                      style={{
                        border: "2px solid #00897b",
                        boxShadow: "0 4px 16px rgba(0, 137, 123, 0.2)",
                      }}
                    />
                  </section>
                  {recommendation.recommendedPlans.length > 1 && (
                    <section style={{ marginBottom: 32 }}>
                      <h2
                        style={{
                          color: "#00897b",
                          fontWeight: 700,
                          fontSize: 24,
                          marginBottom: 16,
                        }}
                      >
                        Outros Planos Recomendados
                      </h2>
                      <div className={styles.planos}>
                        {recommendation.recommendedPlans
                          .filter(
                            (rec) =>
                              !recommendation.topRecommendation ||
                              rec.plan.id !== recommendation.topRecommendation.plan.id
                          )
                          .map((rec) => (
                            <PlanCard key={rec.plan.id} plan={rec.plan} />
                          ))}
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <div style={{ textAlign: "center", margin: 32 }}>
                  Nenhuma recomendação encontrada.
                </div>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <div style={{ textAlign: "center", margin: 32 }}>
                  Carregando...
                </div>
              ) : result && result.plans.length > 0 ? (
                <>
                  <section style={{ marginBottom: 32 }}>
                    <h2
                      style={{
                        color: "#00897b",
                        fontWeight: 700,
                        fontSize: 24,
                        marginBottom: 16,
                      }}
                    >
                      Todos os Planos
                    </h2>
                    <div className={styles.planos}>
                      {result.plans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                      ))}
                    </div>
                  </section>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: 24,
                    }}
                  >
                    <button
                      onClick={() => handlePageChange(result.page - 1)}
                      disabled={result.page === 1}
                      style={{
                        marginRight: 12,
                        padding: "8px 18px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        background: result.page === 1 ? "#eee" : "#fff",
                        cursor: result.page === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      Anterior
                    </button>
                    <span style={{ alignSelf: "center", fontWeight: 500 }}>
                      Página {result.page} de {result.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(result.page + 1)}
                      disabled={result.page === result.totalPages}
                      style={{
                        marginLeft: 12,
                        padding: "8px 18px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        background:
                          result.page === result.totalPages ? "#eee" : "#fff",
                        cursor:
                          result.page === result.totalPages
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Próxima
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", margin: 32 }}>
                  Nenhum plano encontrado.
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
