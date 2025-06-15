import styles from "../styles/Home.module.scss";

interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  benefits?: string[];
}

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #e0e0e0",
        borderRadius: 16,
        boxShadow: "0 4px 16px #0002",
        padding: 0,
        minWidth: 300,
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 8,
        overflow: "hidden",
      }}
    >
      {/* Header do Plano */}
      <div
        style={{
          width: "100%",
          background: "#f5f6fa",
          padding: "18px 0 10px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#222",
            letterSpacing: 0.5,
          }}
        >
          {plan.name}
        </span>
      </div>

      {/* Bloco de Velocidade */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "18px 0 6px 0",
        }}
      >
        <span style={{ fontSize: 32, color: "#00b38f", fontWeight: 700 }}>
          📶 {plan.speed}
        </span>
        <span style={{ fontSize: 14, color: "#888", marginLeft: 4 }}>
          de internet
        </span>
      </div>

      {/* Preço */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#222",
          marginBottom: 4,
        }}
      >
        R$ {plan.price.toFixed(2)}{" "}
        <span style={{ fontSize: 16, fontWeight: 400 }}>/mês</span>
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
        Instalação: <b style={{ color: "#00b38f" }}>Grátis</b>
      </div>

      {/* Benefícios */}
      {plan.benefits && plan.benefits.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            fontSize: "1rem",
            color: "#555",
            marginBottom: 10,
            width: "90%",
            textAlign: "left",
          }}
        >
          {plan.benefits.map((b, i) => (
            <li key={i} style={{ marginBottom: 2 }}>
              ✅ {b}
            </li>
          ))}
        </ul>
      )}

      {/* Botão */}
      <button
        style={{
          background: "linear-gradient(90deg, #00b38f 60%, #00997a 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 32px",
          fontWeight: 700,
          fontSize: "1.1rem",
          margin: "16px 0 18px 0",
          cursor: "pointer",
          boxShadow: "0 2px 8px #00b38f22",
          letterSpacing: 0.5,
          transition: "filter 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
        onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
      >
        Assinar agora
      </button>
    </div>
  );
}
