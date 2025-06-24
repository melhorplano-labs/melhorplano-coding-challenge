import { useEffect, useState } from "react";
import api, {
  fetchAllProfiles,
  fetchRecommendedPlans,
  PlanRecommendParams,
} from "../services/api";
import {
  RecommendedPlanCard,
  RecommendedPlan,
} from "../components/RecommendedPlanCard";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";

interface PaginatedRecommendedPlans {
  rankedPlans: RecommendedPlan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const OPERATORS = ["Vivo", "Claro", "TIM", "Oi"];
const CITIES = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Recife",
  "Campinas",
  "Porto Alegre",
  "Salvador",
  "Fortaleza",
  "Brasília",
];

export default function Recommend() {
  const [params, setParams] = useState<PlanRecommendParams>({
    preferences: {},
    page: 1,
    pageSize: 5,
  });
  const [result, setResult] = useState<PaginatedRecommendedPlans | null>(null);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchRecommendedPlans(params)
      .then(setResult)
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    setLoading(true);
    fetchAllProfiles()
      .then((res) => {
        setProfiles(res.map((profile: any) => profile.name));
      })
      .finally(() => setLoading(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value ? value : undefined,
      },
      page: 1,
    }));
  }

  function handlePageChange(newPage: number) {
    setParams((prev) => ({ ...prev, page: newPage }));
  }

  return (
    <>
      <Menu />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Sidebar de Filtros */}
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
            Recomendação de planos
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
              Perfil de Consumidor
            </label>
            <select
              name="profile"
              onChange={handleChange}
              defaultValue=""
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1.5px solid #b2dfdb",
                background: "#fff",
                fontSize: 15,
              }}
            >
              <option value="">Perfil de Consumidor</option>
              {profiles.map((name) => (
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
              defaultValue=""
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
              defaultValue=""
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
              Orçamento
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="number"
                name="budget"
                placeholder="Orçamento"
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
                tabIndex={-1}
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
          </div>
        </aside>
        {/* Conteúdo principal */}
        <div className={styles.container} style={{ flex: 1 }}>
          <h1 className={styles.titulo}>Recomendador Inteligente de Planos</h1>
          <p className={styles.subtitulo}>
            Informe suas preferências e recomendaremos os planos que mais se
            adequem as suas necesidades!
          </p>
          {/* Resultados */}
          {loading ? (
            <div style={{ textAlign: "center", margin: 32 }}>Carregando...</div>
          ) : result && result.rankedPlans.length > 0 ? (
            <>
              <section className={styles.planos}>
                {result.rankedPlans.map((plan) => (
                  <RecommendedPlanCard
                    key={plan.plan.id}
                    recommendedPlan={plan}
                  />
                ))}
              </section>
              {/* Paginação */}
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
        </div>
      </div>
      <Footer />
    </>
  );
}
