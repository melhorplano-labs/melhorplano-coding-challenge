import { FormEvent, useState } from "react";
import { CITIES, OPERATORS } from "../constants";
import { PlanPreferences } from "../models/planPreferences";
import {
  setPlanPreferences,
  SetPlanPreferencesBody,
  usePlanPreferences,
} from "../services/api";

function PreferencesForm({
  preferences,
  onUpdate,
}: {
  preferences: PlanPreferences | null;
  onUpdate?: () => void;
}) {
  const [data, setData] = useState<SetPlanPreferencesBody>({
    city: preferences?.city ?? "",
    maxDataCap: preferences?.maxDataCap ?? null,
    maxPrice: preferences?.maxPrice ?? null,
    minDataCap: preferences?.minDataCap ?? null,
    minPrice: preferences?.minPrice ?? null,
    operator: preferences?.operator ?? null,
  });
  const [updating, setUpdating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setUpdating(true);
    setPlanPreferences(data)
      .then(() => {
        alert("Preferências atualizadas!");
        onUpdate?.();
      })
      .catch((error) => {
        alert(`Não foi possível atualizar as preferências: ${error.message}`);
      })
      .finally(() => setUpdating(false));
  };

  return (
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
      <form action="#" onSubmit={handleSubmit}>
        <h2
          style={{
            color: "#00897b",
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 16,
          }}
        >
          Preferências
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
            Operadora
          </label>
          <select
            name="operator"
            onChange={handleChange}
            value={data.operator ?? ""}
            className="input"
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
            className="input"
            value={data.city ?? ""}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              type="number"
              name="minPrice"
              placeholder="Mín."
              onChange={handleChange}
              className="input"
              style={{ width: "50%" }}
              value={data.minPrice ?? undefined}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Máx."
              onChange={handleChange}
              className="input"
              style={{ width: "50%" }}
              value={data.maxPrice ?? undefined}
            />
          </div>
          <label style={{ color: "#00897b", fontWeight: 600, fontSize: 15 }}>
            Franquia (GB)
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="number"
              name="minDataCap"
              placeholder="Mín."
              min={0}
              onChange={handleChange}
              className="input"
              style={{ width: "50%" }}
              value={data.minDataCap ?? undefined}
            />
            <input
              type="number"
              name="maxDataCap"
              placeholder="Máx."
              onChange={handleChange}
              className="input"
              style={{ width: "50%" }}
              value={data.maxDataCap ?? undefined}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: "#fff",
              opacity: updating ? 0.7 : 1,
            }}
            disabled={updating}
          >
            {updating ? "Atualizando..." : "Atualizar preferências"}
          </button>
        </div>
      </form>
    </aside>
  );
}

export default function Preferences({ onUpdate }: { onUpdate?: () => void }) {
  const { loading, result } = usePlanPreferences();

  if (loading) return <p>Carregando...</p>;

  return <PreferencesForm preferences={result} onUpdate={onUpdate} />;
}
