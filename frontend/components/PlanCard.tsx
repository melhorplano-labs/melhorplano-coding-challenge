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
        border: "1px solid #f5f6fa",
        borderRadius: 12,
        boxShadow: "0 2px 8px #0001",
        padding: 24,
        minWidth: 280,
        maxWidth: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#e60014", fontSize: "1.2rem", marginBottom: 8 }}>
        {plan.name}
      </h2>
      <div
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "#00b38f",
          marginBottom: 8,
        }}
      >
        {plan.speed}
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#222",
          marginBottom: 8,
        }}
      >
        R$ {plan.price.toFixed(2)}/mês
      </div>
      {plan.benefits && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            fontSize: "0.95rem",
            color: "#555",
            marginBottom: 8,
          }}
        >
          {plan.benefits.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
      )}
      <button
        style={{
          background: "#00b38f",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          fontWeight: 600,
          fontSize: "1rem",
          marginTop: 8,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#00997a")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#00b38f")}
      >
        Assinar
      </button>
    </div>
  );
}
